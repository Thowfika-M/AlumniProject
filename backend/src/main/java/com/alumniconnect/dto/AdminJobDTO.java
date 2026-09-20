package com.alumniconnect.dto;

import com.alumniconnect.entity.JobStatus;
import java.time.LocalDateTime;

public class AdminJobDTO {
    private Long id;
    private String title;
    private String companyName;
    private String location;
    private String jobType;
    private JobStatus status;
    private String postedByAlumniName;
    private String postedByAlumniEmail;
    private int applicationCount;
    private LocalDateTime createdAt;

    public AdminJobDTO() {}

    public AdminJobDTO(Long id, String title, String companyName, String location, String jobType, JobStatus status, String postedByAlumniName, String postedByAlumniEmail, int applicationCount, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.companyName = companyName;
        this.location = location;
        this.jobType = jobType;
        this.status = status;
        this.postedByAlumniName = postedByAlumniName;
        this.postedByAlumniEmail = postedByAlumniEmail;
        this.applicationCount = applicationCount;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getJobType() { return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }

    public JobStatus getStatus() { return status; }
    public void setStatus(JobStatus status) { this.status = status; }

    public String getPostedByAlumniName() { return postedByAlumniName; }
    public void setPostedByAlumniName(String postedByAlumniName) { this.postedByAlumniName = postedByAlumniName; }

    public String getPostedByAlumniEmail() { return postedByAlumniEmail; }
    public void setPostedByAlumniEmail(String postedByAlumniEmail) { this.postedByAlumniEmail = postedByAlumniEmail; }

    public int getApplicationCount() { return applicationCount; }
    public void setApplicationCount(int applicationCount) { this.applicationCount = applicationCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
