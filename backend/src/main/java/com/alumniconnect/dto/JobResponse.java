package com.alumniconnect.dto;

import com.alumniconnect.entity.Job;
import com.alumniconnect.entity.JobStatus;

import java.time.LocalDateTime;
import java.util.List;

public class JobResponse {

    private Long id;
    private UserResponse postedByAlumni;
    private String title;
    private String company;
    private String description;
    private String location;
    private String jobType;
    private Integer experienceRequired;
    private LocalDateTime postedAt;
    private LocalDateTime closingDate;
    private JobStatus status;
    private List<SkillDto> requiredSkills;

    public JobResponse() {}

    public JobResponse(Long id, UserResponse postedByAlumni, String title, String company, String description, String location, String jobType, Integer experienceRequired, LocalDateTime postedAt, LocalDateTime closingDate, JobStatus status, List<SkillDto> requiredSkills) {
        this.id = id;
        this.postedByAlumni = postedByAlumni;
        this.title = title;
        this.company = company;
        this.description = description;
        this.location = location;
        this.jobType = jobType;
        this.experienceRequired = experienceRequired;
        this.postedAt = postedAt;
        this.closingDate = closingDate;
        this.status = status;
        this.requiredSkills = requiredSkills;
    }

    public static JobResponse fromEntity(Job job, List<SkillDto> requiredSkills) {
        return new JobResponse(
                job.getId(),
                UserResponse.fromEntity(job.getPostedByAlumni()),
                job.getTitle(),
                job.getCompany(),
                job.getDescription(),
                job.getLocation(),
                job.getJobType(),
                job.getExperienceRequired(),
                job.getPostedAt(),
                job.getClosingDate(),
                job.getStatus(),
                requiredSkills
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserResponse getPostedByAlumni() { return postedByAlumni; }
    public void setPostedByAlumni(UserResponse postedByAlumni) { this.postedByAlumni = postedByAlumni; }

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

    public LocalDateTime getPostedAt() { return postedAt; }
    public void setPostedAt(LocalDateTime postedAt) { this.postedAt = postedAt; }

    public LocalDateTime getClosingDate() { return closingDate; }
    public void setClosingDate(LocalDateTime closingDate) { this.closingDate = closingDate; }

    public JobStatus getStatus() { return status; }
    public void setStatus(JobStatus status) { this.status = status; }

    public List<SkillDto> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<SkillDto> requiredSkills) { this.requiredSkills = requiredSkills; }
}
