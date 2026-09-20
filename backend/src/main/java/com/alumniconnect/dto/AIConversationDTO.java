package com.alumniconnect.dto;

import java.time.LocalDateTime;
import java.util.List;

public class AIConversationDTO {
    private Long id;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int messageCount;
    private List<AIMessageDTO> messages;

    public AIConversationDTO() {}

    public AIConversationDTO(Long id, String title, LocalDateTime createdAt, LocalDateTime updatedAt, int messageCount, List<AIMessageDTO> messages) {
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.messageCount = messageCount;
        this.messages = messages;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public int getMessageCount() {
        return messageCount;
    }

    public void setMessageCount(int messageCount) {
        this.messageCount = messageCount;
    }

    public List<AIMessageDTO> getMessages() {
        return messages;
    }

    public void setMessages(List<AIMessageDTO> messages) {
        this.messages = messages;
    }
}
