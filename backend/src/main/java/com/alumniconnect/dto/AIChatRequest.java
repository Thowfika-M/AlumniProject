package com.alumniconnect.dto;

public class AIChatRequest {
    private Long conversationId;
    private String prompt;
    private String mode; // e.g. "CAREER_GUIDANCE", "RESUME_FEEDBACK", "INTERVIEW_PREP", "GENERAL"

    public AIChatRequest() {}

    public AIChatRequest(Long conversationId, String prompt, String mode) {
        this.conversationId = conversationId;
        this.prompt = prompt;
        this.mode = mode;
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }
}
