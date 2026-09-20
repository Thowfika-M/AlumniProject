package com.alumniconnect.service;

import com.alumniconnect.dto.ApplicationRequest;
import com.alumniconnect.dto.ApplicationResponse;
import com.alumniconnect.dto.JobResponse;
import com.alumniconnect.dto.SkillDto;
import com.alumniconnect.entity.*;
import com.alumniconnect.repository.ApplicationRepository;
import com.alumniconnect.repository.JobRepository;
import com.alumniconnect.repository.JobSkillRepository;
import com.alumniconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final JobSkillRepository jobSkillRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                              JobRepository jobRepository,
                              UserRepository userRepository,
                              JobSkillRepository jobSkillRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.jobSkillRepository = jobSkillRepository;
    }

    @Transactional
    public ApplicationResponse applyForJob(String studentEmail, Long jobId, ApplicationRequest request) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (student.getRole() != Role.STUDENT && student.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("Only registered students can apply for job postings");
        }

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job posting not found with ID: " + jobId));

        if (job.getStatus() != JobStatus.OPEN) {
            throw new IllegalArgumentException("This job posting is currently closed for applications");
        }

        // Enforce Duplicate Application Prevention Rule
        if (applicationRepository.existsByJobIdAndStudentId(jobId, student.getId())) {
            throw new IllegalArgumentException("You have already submitted an active application for this job posting.");
        }

        Application application = new Application();
        application.setJob(job);
        application.setStudent(student);
        application.setResumeUrl(request.getResumeUrl());
        application.setCoverMessage(request.getCoverMessage());
        application.setStatus(ApplicationStatus.APPLIED);

        Application savedApp = applicationRepository.save(application);
        return mapToResponse(savedApp);
    }

    public List<ApplicationResponse> getStudentApplications(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return applicationRepository.findByStudentId(student.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ApplicationResponse> getJobApplications(String userEmail, Long jobId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        if (!job.getPostedByAlumni().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("You are not authorized to view applications for this job posting");
        }

        return applicationRepository.findByJobId(jobId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ApplicationResponse> getAlumniAllApplications(String alumniEmail) {
        User alumni = userRepository.findByEmail(alumniEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return applicationRepository.findByJobPostedByAlumniId(alumni.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApplicationResponse updateApplicationStatus(String userEmail, Long applicationId, ApplicationStatus newStatus) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("Application not found with ID: " + applicationId));

        if (!application.getJob().getPostedByAlumni().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("You are not authorized to update application status for another alumni's job");
        }

        application.setStatus(newStatus);
        Application updated = applicationRepository.save(application);
        return mapToResponse(updated);
    }

    private ApplicationResponse mapToResponse(Application application) {
        List<SkillDto> skills = jobSkillRepository.findByJobId(application.getJob().getId()).stream()
                .map(js -> SkillDto.fromEntity(js.getSkill()))
                .collect(Collectors.toList());
        JobResponse jobResponse = JobResponse.fromEntity(application.getJob(), skills);
        return ApplicationResponse.fromEntity(application, jobResponse);
    }
}
