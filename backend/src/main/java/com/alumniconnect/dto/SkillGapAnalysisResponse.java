package com.alumniconnect.dto;

import java.util.List;

public class SkillGapAnalysisResponse {

    private String targetCareerName;
    private Integer totalRequiredSkills;
    private Integer matchedSkillCount;
    private Integer matchPercentage;
    private List<SkillDto> matchedSkills;
    private List<SkillDto> missingSkills;
    private String AIExplanation;

    public SkillGapAnalysisResponse() {}

    public SkillGapAnalysisResponse(String targetCareerName, Integer totalRequiredSkills, Integer matchedSkillCount, Integer matchPercentage, List<SkillDto> matchedSkills, List<SkillDto> missingSkills, String AIExplanation) {
        this.targetCareerName = targetCareerName;
        this.totalRequiredSkills = totalRequiredSkills;
        this.matchedSkillCount = matchedSkillCount;
        this.matchPercentage = matchPercentage;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.AIExplanation = AIExplanation;
    }

    public String getTargetCareerName() { return targetCareerName; }
    public void setTargetCareerName(String targetCareerName) { this.targetCareerName = targetCareerName; }

    public Integer getTotalRequiredSkills() { return totalRequiredSkills; }
    public void setTotalRequiredSkills(Integer totalRequiredSkills) { this.totalRequiredSkills = totalRequiredSkills; }

    public Integer getMatchedSkillCount() { return matchedSkillCount; }
    public void setMatchedSkillCount(Integer matchedSkillCount) { this.matchedSkillCount = matchedSkillCount; }

    public Integer getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(Integer matchPercentage) { this.matchPercentage = matchPercentage; }

    public List<SkillDto> getMatchedSkills() { return matchedSkills; }
    public void setMatchedSkills(List<SkillDto> matchedSkills) { this.matchedSkills = matchedSkills; }

    public List<SkillDto> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<SkillDto> missingSkills) { this.missingSkills = missingSkills; }

    public String getAIExplanation() { return AIExplanation; }
    public void setAIExplanation(String AIExplanation) { this.AIExplanation = AIExplanation; }
}
