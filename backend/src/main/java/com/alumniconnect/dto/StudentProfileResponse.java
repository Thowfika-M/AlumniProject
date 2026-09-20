package com.alumniconnect.dto;

import com.alumniconnect.entity.StudentProfile;

import java.util.List;

public class StudentProfileResponse {

    private Long id;
    private UserResponse user;
    private String studentId;
    private String department;
    private String college;
    private Integer graduationYear;
    private String careerGoal;
    private String interests;
    private String resumeUrl;
    private List<SkillDto> skills;

    public StudentProfileResponse() {}

    public StudentProfileResponse(Long id, UserResponse user, String studentId, String department, String college, Integer graduationYear, String careerGoal, String interests, String resumeUrl, List<SkillDto> skills) {
        this.id = id;
        this.user = user;
        this.studentId = studentId;
        this.department = department;
        this.college = college;
        this.graduationYear = graduationYear;
        this.careerGoal = careerGoal;
        this.interests = interests;
        this.resumeUrl = resumeUrl;
        this.skills = skills;
    }

    public static StudentProfileResponse fromEntity(StudentProfile profile, List<SkillDto> skills) {
        return new StudentProfileResponse(
                profile.getId(),
                UserResponse.fromEntity(profile.getUser()),
                profile.getStudentId(),
                profile.getDepartment(),
                profile.getCollege(),
                profile.getGraduationYear(),
                profile.getCareerGoal(),
                profile.getInterests(),
                profile.getResumeUrl(),
                skills
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserResponse getUser() { return user; }
    public void setUser(UserResponse user) { this.user = user; }

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

    public List<SkillDto> getSkills() { return skills; }
    public void setSkills(List<SkillDto> skills) { this.skills = skills; }
}
