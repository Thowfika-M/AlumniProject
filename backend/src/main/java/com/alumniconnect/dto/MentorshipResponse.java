package com.alumniconnect.dto;

import com.alumniconnect.entity.Mentorship;
import com.alumniconnect.entity.MentorshipStatus;

import java.time.LocalDateTime;

public class MentorshipResponse {

    private Long id;
    private UserResponse student;
    private UserResponse alumni;
    private MentorshipStatus status;
    private LocalDateTime requestedAt;
    private LocalDateTime respondedAt;

    public MentorshipResponse() {}

    public MentorshipResponse(Long id, UserResponse student, UserResponse alumni, MentorshipStatus status, LocalDateTime requestedAt, LocalDateTime respondedAt) {
        this.id = id;
        this.student = student;
        this.alumni = alumni;
        this.status = status;
        this.requestedAt = requestedAt;
        this.respondedAt = respondedAt;
    }

    public static MentorshipResponse fromEntity(Mentorship mentorship) {
        return new MentorshipResponse(
                mentorship.getId(),
                UserResponse.fromEntity(mentorship.getStudent()),
                UserResponse.fromEntity(mentorship.getAlumni()),
                mentorship.getStatus(),
                mentorship.getRequestedAt(),
                mentorship.getRespondedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserResponse getStudent() { return student; }
    public void setStudent(UserResponse student) { this.student = student; }

    public UserResponse getAlumni() { return alumni; }
    public void setAlumni(UserResponse alumni) { this.alumni = alumni; }

    public MentorshipStatus getStatus() { return status; }
    public void setStatus(MentorshipStatus status) { this.status = status; }

    public LocalDateTime getRequestedAt() { return requestedAt; }
    public void setRequestedAt(LocalDateTime requestedAt) { this.requestedAt = requestedAt; }

    public LocalDateTime getRespondedAt() { return respondedAt; }
    public void setRespondedAt(LocalDateTime respondedAt) { this.respondedAt = respondedAt; }
}
