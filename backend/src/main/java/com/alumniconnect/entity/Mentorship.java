package com.alumniconnect.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "mentorships")
public class Mentorship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "alumni_id", nullable = false)
    private User alumni;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MentorshipStatus status = MentorshipStatus.REQUESTED;

    @CreationTimestamp
    @Column(name = "requested_at", nullable = false, updatable = false)
    private LocalDateTime requestedAt;

    @Column(name = "responded_at")
    private LocalDateTime respondedAt;

    public Mentorship() {}

    public Mentorship(Long id, User student, User alumni, MentorshipStatus status, LocalDateTime requestedAt, LocalDateTime respondedAt) {
        this.id = id;
        this.student = student;
        this.alumni = alumni;
        this.status = status != null ? status : MentorshipStatus.REQUESTED;
        this.requestedAt = requestedAt;
        this.respondedAt = respondedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public User getAlumni() { return alumni; }
    public void setAlumni(User alumni) { this.alumni = alumni; }

    public MentorshipStatus getStatus() { return status; }
    public void setStatus(MentorshipStatus status) { this.status = status; }

    public LocalDateTime getRequestedAt() { return requestedAt; }
    public void setRequestedAt(LocalDateTime requestedAt) { this.requestedAt = requestedAt; }

    public LocalDateTime getRespondedAt() { return respondedAt; }
    public void setRespondedAt(LocalDateTime respondedAt) { this.respondedAt = respondedAt; }
}
