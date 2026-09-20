package com.alumniconnect.dto;

import java.util.List;

public class JobRecommendationResponse {

    private JobResponse job;
    private Integer matchPercentage;
    private List<SkillDto> matchedSkills;
    private List<SkillDto> missingSkills;
    private String AIExplanation;

    public JobRecommendationResponse() {}

    public JobRecommendationResponse(JobResponse job, Integer matchPercentage, List<SkillDto> matchedSkills, List<SkillDto> missingSkills, String AIExplanation) {
        this.job = job;
        this.matchPercentage = matchPercentage;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.AIExplanation = AIExplanation;
    }

    public JobResponse getJob() { return job; }
    public void setJob(JobResponse job) { this.job = job; }

    public Integer getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(Integer matchPercentage) { this.matchPercentage = matchPercentage; }

    public List<SkillDto> getMatchedSkills() { return matchedSkills; }
    public void setMatchedSkills(List<SkillDto> matchedSkills) { this.matchedSkills = matchedSkills; }

    public List<SkillDto> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<SkillDto> missingSkills) { this.missingSkills = missingSkills; }

    public String getAIExplanation() { return AIExplanation; }
    public void setAIExplanation(String AIExplanation) { this.AIExplanation = AIExplanation; }
}
