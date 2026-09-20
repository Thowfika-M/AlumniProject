package com.alumniconnect.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "alumni_profiles")
public class AlumniProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "graduation_year")
    private Integer graduationYear;

    @Column(length = 100)
    private String department;

    @Column(length = 150)
    private String college;

    @Column(name = "current_company", length = 150)
    private String currentCompany;

    @Column(name = "job_role", length = 150)
    private String jobRole;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(length = 150)
    private String location;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "mentorship_areas", length = 255)
    private String mentorshipAreas;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public AlumniProfile() {}

    public AlumniProfile(Long id, User user, Integer graduationYear, String department, String college, String currentCompany, String jobRole, Integer experienceYears, String location, String bio, String mentorshipAreas, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.graduationYear = graduationYear;
        this.department = department;
        this.college = college;
        this.currentCompany = currentCompany;
        this.jobRole = jobRole;
        this.experienceYears = experienceYears;
        this.location = location;
        this.bio = bio;
        this.mentorshipAreas = mentorshipAreas;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getCurrentCompany() { return currentCompany; }
    public void setCurrentCompany(String currentCompany) { this.currentCompany = currentCompany; }

    public String getJobRole() { return jobRole; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getMentorshipAreas() { return mentorshipAreas; }
    public void setMentorshipAreas(String mentorshipAreas) { this.mentorshipAreas = mentorshipAreas; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
