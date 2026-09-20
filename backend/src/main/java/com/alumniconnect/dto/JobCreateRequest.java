package com.alumniconnect.dto;

import com.alumniconnect.entity.JobStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public class JobCreateRequest {

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Company name is required")
    private String company;

    @NotBlank(message = "Job description is required")
    private String description;

    @NotBlank(message = "Job location is required")
    private String location;

    @NotBlank(message = "Job type is required (e.g. FULL_TIME, INTERNSHIP, CONTRACT)")
    private String jobType;

    private Integer experienceRequired = 0;
    private LocalDateTime closingDate;
    private JobStatus status = JobStatus.OPEN;
    private List<String> requiredSkills;

    public JobCreateRequest() {}

    public JobCreateRequest(String title, String company, String description, String location, String jobType, Integer experienceRequired, LocalDateTime closingDate, JobStatus status, List<String> requiredSkills) {
        this.title = title;
        this.company = company;
        this.description = description;
        this.location = location;
        this.jobType = jobType;
        this.experienceRequired = experienceRequired != null ? experienceRequired : 0;
        this.closingDate = closingDate;
        this.status = status != null ? status : JobStatus.OPEN;
        this.requiredSkills = requiredSkills;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getJobType() { return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }

    public Integer getExperienceRequired() { return experienceRequired; }
    public void setExperienceRequired(Integer experienceRequired) { this.experienceRequired = experienceRequired; }

    public LocalDateTime getClosingDate() { return closingDate; }
    public void setClosingDate(LocalDateTime closingDate) { this.closingDate = closingDate; }

    public JobStatus getStatus() { return status; }
    public void setStatus(JobStatus status) { this.status = status; }

    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }
}
