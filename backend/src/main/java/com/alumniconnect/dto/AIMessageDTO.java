package com.alumniconnect.dto;

import com.alumniconnect.entity.SenderRole;
import java.time.LocalDateTime;

public class AIMessageDTO {
    private Long id;
    private SenderRole senderRole;
    private String content;
    private LocalDateTime createdAt;

    public AIMessageDTO() {}

    public AIMessageDTO(Long id, SenderRole senderRole, String content, LocalDateTime createdAt) {
        this.id = id;
        this.senderRole = senderRole;
        this.content = content;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SenderRole getSenderRole() {
        return senderRole;
    }

    public void setSenderRole(SenderRole senderRole) {
        this.senderRole = senderRole;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
