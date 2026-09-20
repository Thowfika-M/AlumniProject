package com.alumniconnect.dto;

import java.util.List;

public class AlumniRecommendationResponse {

    private AlumniProfileResponse alumni;
    private Integer matchPercentage;
    private String matchReason;
    private List<SkillDto> sharedSkills;

    public AlumniRecommendationResponse() {}

    public AlumniRecommendationResponse(AlumniProfileResponse alumni, Integer matchPercentage, String matchReason, List<SkillDto> sharedSkills) {
        this.alumni = alumni;
        this.matchPercentage = matchPercentage;
        this.matchReason = matchReason;
        this.sharedSkills = sharedSkills;
    }

    public AlumniProfileResponse getAlumni() { return alumni; }
    public void setAlumni(AlumniProfileResponse alumni) { this.alumni = alumni; }

    public Integer getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(Integer matchPercentage) { this.matchPercentage = matchPercentage; }

    public String getMatchReason() { return matchReason; }
    public void setMatchReason(String matchReason) { this.matchReason = matchReason; }

    public List<SkillDto> getSharedSkills() { return sharedSkills; }
    public void setSharedSkills(List<SkillDto> sharedSkills) { this.sharedSkills = sharedSkills; }
}
