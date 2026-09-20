package com.alumniconnect.service;

import com.alumniconnect.dto.MentorshipResponse;
import com.alumniconnect.entity.*;
import com.alumniconnect.repository.MentorshipRepository;
import com.alumniconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MentorshipService {

    private final MentorshipRepository mentorshipRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public MentorshipService(MentorshipRepository mentorshipRepository,
                             UserRepository userRepository,
                             NotificationService notificationService) {
        this.mentorshipRepository = mentorshipRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public MentorshipResponse requestMentorship(String studentEmail, Long alumniUserId) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (student.getRole() != Role.STUDENT && student.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("Only registered students can send mentorship requests");
        }

        User alumni = userRepository.findById(alumniUserId)
                .orElseThrow(() -> new IllegalArgumentException("Alumni mentor not found with ID: " + alumniUserId));

        if (alumni.getRole() != Role.ALUMNI && alumni.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("Target user is not registered as an alumni mentor");
        }

        if (mentorshipRepository.existsByStudentIdAndAlumniIdAndStatus(student.getId(), alumni.getId(), MentorshipStatus.REQUESTED)) {
            throw new IllegalArgumentException("You already have an active pending mentorship request with this alumni mentor.");
        }

        Mentorship mentorship = new Mentorship();
        mentorship.setStudent(student);
        mentorship.setAlumni(alumni);
        mentorship.setStatus(MentorshipStatus.REQUESTED);

        Mentorship saved = mentorshipRepository.save(mentorship);

        // Send in-app notification to Alumni mentor
        notificationService.createNotification(
                alumni,
                "MENTORSHIP",
                "Student " + student.getName() + " requested 1-on-1 career mentorship with you."
        );

        return MentorshipResponse.fromEntity(saved);
    }

    public List<MentorshipResponse> getMyMentorships(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Mentorship> list;
        if (user.getRole() == Role.ALUMNI) {
            list = mentorshipRepository.findByAlumniId(user.getId());
        } else {
            list = mentorshipRepository.findByStudentId(user.getId());
        }

        return list.stream()
                .map(MentorshipResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public MentorshipResponse respondToMentorshipRequest(String alumniEmail, Long mentorshipId, MentorshipStatus newStatus) {
        User alumni = userRepository.findByEmail(alumniEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Mentorship mentorship = mentorshipRepository.findById(mentorshipId)
                .orElseThrow(() -> new IllegalArgumentException("Mentorship request not found"));

        if (!mentorship.getAlumni().getId().equals(alumni.getId()) && alumni.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("You are not authorized to respond to this mentorship request");
        }

        mentorship.setStatus(newStatus);
        mentorship.setRespondedAt(LocalDateTime.now());
        Mentorship updated = mentorshipRepository.save(mentorship);

        // Send notification back to Student
        notificationService.createNotification(
                mentorship.getStudent(),
                "MENTORSHIP",
                "Alumni mentor " + alumni.getName() + " has " + newStatus.name().toLowerCase() + " your mentorship request."
        );

        return MentorshipResponse.fromEntity(updated);
    }
}
