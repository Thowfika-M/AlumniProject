package com.alumniconnect.dto;

import com.alumniconnect.entity.Notification;

import java.time.LocalDateTime;

public class NotificationResponse {

    private Long id;
    private String type;
    private String message;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;

    public NotificationResponse() {}

    public NotificationResponse(Long id, String type, String message, LocalDateTime createdAt, LocalDateTime readAt) {
        this.id = id;
        this.type = type;
        this.message = message;
        this.createdAt = createdAt;
        this.readAt = readAt;
    }

    public static NotificationResponse fromEntity(Notification notification) {
        return new NotificationResponse(
                notification.getId(),
                notification.getType(),
                notification.getMessage(),
                notification.getCreatedAt(),
                notification.getReadAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getReadAt() { return readAt; }
    public void setReadAt(LocalDateTime readAt) { this.readAt = readAt; }
}
