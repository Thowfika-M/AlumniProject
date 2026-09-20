package com.alumniconnect.dto;

import com.alumniconnect.entity.Application;
import com.alumniconnect.entity.ApplicationStatus;

import java.time.LocalDateTime;

public class ApplicationResponse {

    private Long id;
    private JobResponse job;
    private UserResponse student;
    private String resumeUrl;
    private String coverMessage;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;

    public ApplicationResponse() {}

    public ApplicationResponse(Long id, JobResponse job, UserResponse student, String resumeUrl, String coverMessage, ApplicationStatus status, LocalDateTime appliedAt, LocalDateTime updatedAt) {
        this.id = id;
        this.job = job;
        this.student = student;
        this.resumeUrl = resumeUrl;
        this.coverMessage = coverMessage;
        this.status = status;
        this.appliedAt = appliedAt;
        this.updatedAt = updatedAt;
    }

    public static ApplicationResponse fromEntity(Application application, JobResponse jobResponse) {
        return new ApplicationResponse(
                application.getId(),
                jobResponse,
                UserResponse.fromEntity(application.getStudent()),
                application.getResumeUrl(),
                application.getCoverMessage(),
                application.getStatus(),
                application.getAppliedAt(),
                application.getUpdatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public JobResponse getJob() { return job; }
    public void setJob(JobResponse job) { this.job = job; }

    public UserResponse getStudent() { return student; }
    public void setStudent(UserResponse student) { this.student = student; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public String getCoverMessage() { return coverMessage; }
    public void setCoverMessage(String coverMessage) { this.coverMessage = coverMessage; }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }

    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
