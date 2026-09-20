package com.alumniconnect.dto;

public class AICareerAdviceRequest {
    private String targetRole;
    private String resumeText;

    public AICareerAdviceRequest() {}

    public AICareerAdviceRequest(String targetRole, String resumeText) {
        this.targetRole = targetRole;
        this.resumeText = resumeText;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public String getResumeText() {
        return resumeText;
    }

    public void setResumeText(String resumeText) {
        this.resumeText = resumeText;
    }
}
