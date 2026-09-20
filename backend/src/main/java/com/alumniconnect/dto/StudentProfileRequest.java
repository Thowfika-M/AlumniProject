package com.alumniconnect.dto;

import java.util.List;

public class StudentProfileRequest {

    private String studentId;
    private String department;
    private String college;
    private Integer graduationYear;
    private String careerGoal;
    private String interests;
    private String resumeUrl;
    private List<String> skills;

    public StudentProfileRequest() {}

    public StudentProfileRequest(String studentId, String department, String college, Integer graduationYear, String careerGoal, String interests, String resumeUrl, List<String> skills) {
        this.studentId = studentId;
        this.department = department;
        this.college = college;
        this.graduationYear = graduationYear;
        this.careerGoal = careerGoal;
        this.interests = interests;
        this.resumeUrl = resumeUrl;
        this.skills = skills;
    }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }

    public String getCareerGoal() { return careerGoal; }
    public void setCareerGoal(String careerGoal) { this.careerGoal = careerGoal; }

    public String getInterests() { return interests; }
    public void setInterests(String interests) { this.interests = interests; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
}
