package com.alumniconnect.dto;

import jakarta.validation.constraints.NotBlank;

public class ApplicationRequest {

    @NotBlank(message = "Resume URL is required")
    private String resumeUrl;

    private String coverMessage;

    public ApplicationRequest() {}

    public ApplicationRequest(String resumeUrl, String coverMessage) {
        this.resumeUrl = resumeUrl;
        this.coverMessage = coverMessage;
    }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public String getCoverMessage() { return coverMessage; }
    public void setCoverMessage(String coverMessage) { this.coverMessage = coverMessage; }
}
