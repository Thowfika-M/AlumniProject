package com.alumniconnect.dto;

import java.time.LocalDateTime;

public class AdminAuditLogDTO {
    private Long id;
    private String adminName;
    private String adminEmail;
    private String action;
    private String targetType;
    private Long targetId;
    private String details;
    private LocalDateTime createdAt;

    public AdminAuditLogDTO() {}

    public AdminAuditLogDTO(Long id, String adminName, String adminEmail, String action, String targetType, Long targetId, String details, LocalDateTime createdAt) {
        this.id = id;
        this.adminName = adminName;
        this.adminEmail = adminEmail;
        this.action = action;
        this.targetType = targetType;
        this.targetId = targetId;
        this.details = details;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAdminName() { return adminName; }
    public void setAdminName(String adminName) { this.adminName = adminName; }

    public String getAdminEmail() { return adminEmail; }
    public void setAdminEmail(String adminEmail) { this.adminEmail = adminEmail; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getTargetType() { return targetType; }
    public void setTargetType(String targetType) { this.targetType = targetType; }

    public Long getTargetId() { return targetId; }
    public void setTargetId(Long targetId) { this.targetId = targetId; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
