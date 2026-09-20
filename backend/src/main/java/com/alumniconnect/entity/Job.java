package com.alumniconnect.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "posted_by_alumni_id", nullable = false)
    private User postedByAlumni;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 150)
    private String company;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false, length = 150)
    private String location;

    @Column(name = "job_type", nullable = false, length = 50)
    private String jobType;

    @Column(name = "experience_required", nullable = false)
    private Integer experienceRequired = 0;

    @CreationTimestamp
    @Column(name = "posted_at", nullable = false, updatable = false)
    private LocalDateTime postedAt;

    @Column(name = "closing_date")
    private LocalDateTime closingDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private JobStatus status = JobStatus.OPEN;

    public Job() {}

    public Job(Long id, User postedByAlumni, String title, String company, String description, String location, String jobType, Integer experienceRequired, LocalDateTime postedAt, LocalDateTime closingDate, JobStatus status) {
        this.id = id;
        this.postedByAlumni = postedByAlumni;
        this.title = title;
        this.company = company;
        this.description = description;
        this.location = location;
        this.jobType = jobType;
        this.experienceRequired = experienceRequired != null ? experienceRequired : 0;
        this.postedAt = postedAt;
        this.closingDate = closingDate;
        this.status = status != null ? status : JobStatus.OPEN;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getPostedByAlumni() { return postedByAlumni; }
    public void setPostedByAlumni(User postedByAlumni) { this.postedByAlumni = postedByAlumni; }

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
}
