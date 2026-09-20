package com.alumniconnect.service;

import com.alumniconnect.dto.*;
import com.alumniconnect.entity.*;
import com.alumniconnect.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final AlumniProfileRepository alumniProfileRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final EventRepository eventRepository;
    private final EventParticipantRepository eventParticipantRepository;
    private final MentorshipRepository mentorshipRepository;
    private final AdminAuditLogRepository auditLogRepository;

    @Autowired
    public AdminService(
            UserRepository userRepository,
            StudentProfileRepository studentProfileRepository,
            AlumniProfileRepository alumniProfileRepository,
            JobRepository jobRepository,
            ApplicationRepository applicationRepository,
            EventRepository eventRepository,
            EventParticipantRepository eventParticipantRepository,
            MentorshipRepository mentorshipRepository,
            AdminAuditLogRepository auditLogRepository) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.alumniProfileRepository = alumniProfileRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.eventRepository = eventRepository;
        this.eventParticipantRepository = eventParticipantRepository;
        this.mentorshipRepository = mentorshipRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional(readOnly = true)
    public AdminStatsDTO getSystemStatistics() {
        long totalUsers = userRepository.count();
        long totalStudents = userRepository.findAll().stream().filter(u -> u.getRole() == Role.STUDENT).count();
        long totalAlumni = userRepository.findAll().stream().filter(u -> u.getRole() == Role.ALUMNI).count();
        long totalAdmins = userRepository.findAll().stream().filter(u -> u.getRole() == Role.ADMIN).count();

        long totalJobs = jobRepository.count();
        long openJobs = jobRepository.findAll().stream().filter(j -> j.getStatus() == JobStatus.OPEN).count();
        long closedJobs = totalJobs - openJobs;

        long totalApplications = applicationRepository.count();
        long acceptedApps = applicationRepository.findAll().stream().filter(a -> a.getStatus() == ApplicationStatus.SELECTED).count();

        long totalEvents = eventRepository.count();
        long totalParticipants = eventParticipantRepository.count();

        long totalMentorships = mentorshipRepository.count();
        long approvedMentorships = mentorshipRepository.findAll().stream().filter(m -> m.getStatus() == MentorshipStatus.ACCEPTED).count();

        return new AdminStatsDTO(
                totalUsers, totalStudents, totalAlumni, totalAdmins,
                totalJobs, openJobs, closedJobs,
                totalApplications, acceptedApps,
                totalEvents, totalParticipants,
                totalMentorships, approvedMentorships
        );
    }

    @Transactional(readOnly = true)
    public List<AdminUserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(u -> {
            String extraInfo = "";
            if (u.getRole() == Role.STUDENT) {
                Optional<StudentProfile> sp = studentProfileRepository.findByUserId(u.getId());
                if (sp.isPresent()) {
                    extraInfo = sp.get().getDepartment() + " (Batch " + sp.get().getGraduationYear() + ")";
                }
            } else if (u.getRole() == Role.ALUMNI) {
                Optional<AlumniProfile> ap = alumniProfileRepository.findByUserId(u.getId());
                if (ap.isPresent()) {
                    extraInfo = ap.get().getJobRole() + " @ " + ap.get().getCurrentCompany();
                }
            }
            return new AdminUserDTO(u.getId(), u.getName(), u.getEmail(), u.getRole(), u.getPhone(), u.getEnabled(), u.getCreatedAt(), extraInfo);
        }).collect(Collectors.toList());
    }

    @Transactional
    public AdminUserDTO toggleUserStatus(User adminUser, Long targetUserId) {
        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + targetUserId));

        targetUser.setEnabled(!targetUser.getEnabled());
        User saved = userRepository.save(targetUser);

        // Audit Log
        logAdminAction(adminUser, "TOGGLE_USER_STATUS", "User", targetUserId, 
                "User " + targetUser.getEmail() + " enabled status set to: " + saved.getEnabled());

        return new AdminUserDTO(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole(), saved.getPhone(), saved.getEnabled(), saved.getCreatedAt(), "");
    }

    @Transactional
    public void deleteUser(User adminUser, Long targetUserId) {
        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + targetUserId));

        if (targetUser.getRole() == Role.ADMIN) {
            throw new IllegalArgumentException("Cannot delete Admin user accounts.");
        }

        String userEmail = targetUser.getEmail();
        userRepository.delete(targetUser);

        // Audit Log
        logAdminAction(adminUser, "DELETE_USER", "User", targetUserId, "Deleted user account: " + userEmail);
    }

    @Transactional(readOnly = true)
    public List<AdminJobDTO> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        return jobs.stream().map(j -> {
            int appCount = applicationRepository.findByJobId(j.getId()).size();
            String alumniName = j.getPostedByAlumni() != null ? j.getPostedByAlumni().getName() : "System";
            String alumniEmail = j.getPostedByAlumni() != null ? j.getPostedByAlumni().getEmail() : "system@alumniconnect.com";
            return new AdminJobDTO(
                    j.getId(), j.getTitle(), j.getCompany(), j.getLocation(),
                    j.getJobType(), j.getStatus(), alumniName, alumniEmail, appCount, j.getPostedAt()
            );
        }).collect(Collectors.toList());
    }

    @Transactional
    public void deleteJob(User adminUser, Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found with ID: " + jobId));

        String jobTitle = job.getTitle();
        jobRepository.delete(job);

        // Audit Log
        logAdminAction(adminUser, "DELETE_JOB", "Job", jobId, "Deleted job posting: " + jobTitle);
    }

    @Transactional(readOnly = true)
    public List<AdminAuditLogDTO> getRecentAuditLogs() {
        List<AdminAuditLog> logs = auditLogRepository.findTop20ByOrderByCreatedAtDesc();
        return logs.stream().map(l -> new AdminAuditLogDTO(
                l.getId(), l.getAdmin().getName(), l.getAdmin().getEmail(),
                l.getAction(), l.getTargetType(), l.getTargetId(), l.getDetails(), l.getCreatedAt()
        )).collect(Collectors.toList());
    }

    private void logAdminAction(User admin, String action, String targetType, Long targetId, String details) {
        AdminAuditLog log = new AdminAuditLog();
        log.setAdmin(admin);
        log.setAction(action);
        log.setTargetType(targetType);
        log.setTargetId(targetId);
        log.setDetails(details);
        auditLogRepository.save(log);
    }
}
