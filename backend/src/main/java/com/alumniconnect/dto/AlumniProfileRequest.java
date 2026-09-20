package com.alumniconnect.dto;

import java.util.List;

public class AlumniProfileRequest {

    private Integer graduationYear;
    private String department;
    private String college;
    private String currentCompany;
    private String jobRole;
    private Integer experienceYears;
    private String location;
    private String bio;
    private String mentorshipAreas;
    private List<String> skills;

    public AlumniProfileRequest() {}

    public AlumniProfileRequest(Integer graduationYear, String department, String college, String currentCompany, String jobRole, Integer experienceYears, String location, String bio, String mentorshipAreas, List<String> skills) {
        this.graduationYear = graduationYear;
        this.department = department;
        this.college = college;
        this.currentCompany = currentCompany;
        this.jobRole = jobRole;
        this.experienceYears = experienceYears;
        this.location = location;
        this.bio = bio;
        this.mentorshipAreas = mentorshipAreas;
        this.skills = skills;
    }

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

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
}
