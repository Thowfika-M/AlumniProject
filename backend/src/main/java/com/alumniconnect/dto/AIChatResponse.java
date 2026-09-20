package com.alumniconnect.dto;

public class AIChatResponse {
    private Long conversationId;
    private String conversationTitle;
    private AIMessageDTO userMessage;
    private AIMessageDTO assistantMessage;
    private String providerUsed; // "OpenAI" or "Rule-based Engine"

    public AIChatResponse() {}

    public AIChatResponse(Long conversationId, String conversationTitle, AIMessageDTO userMessage, AIMessageDTO assistantMessage, String providerUsed) {
        this.conversationId = conversationId;
        this.conversationTitle = conversationTitle;
        this.userMessage = userMessage;
        this.assistantMessage = assistantMessage;
        this.providerUsed = providerUsed;
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public String getConversationTitle() {
        return conversationTitle;
    }

    public void setConversationTitle(String conversationTitle) {
        this.conversationTitle = conversationTitle;
    }

    public AIMessageDTO getUserMessage() {
        return userMessage;
    }

    public void setUserMessage(AIMessageDTO userMessage) {
        this.userMessage = userMessage;
    }

    public AIMessageDTO getAssistantMessage() {
        return assistantMessage;
    }

    public void setAssistantMessage(AIMessageDTO assistantMessage) {
        this.assistantMessage = assistantMessage;
    }

    public String getProviderUsed() {
        return providerUsed;
    }

    public void setProviderUsed(String providerUsed) {
        this.providerUsed = providerUsed;
    }
}
