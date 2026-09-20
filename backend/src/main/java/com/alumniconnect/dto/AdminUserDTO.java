package com.alumniconnect.dto;

import com.alumniconnect.entity.Role;
import java.time.LocalDateTime;

public class AdminUserDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String phone;
    private Boolean enabled;
    private LocalDateTime createdAt;
    private String extraInfo; // Department/Batch for Student, Company/Designation for Alumni

    public AdminUserDTO() {}

    public AdminUserDTO(Long id, String name, String email, Role role, String phone, Boolean enabled, LocalDateTime createdAt, String extraInfo) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.enabled = enabled;
        this.createdAt = createdAt;
        this.extraInfo = extraInfo;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Boolean getEnabled() { return enabled; }
    public void setEnabled(Boolean enabled) { this.enabled = enabled; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getExtraInfo() { return extraInfo; }
    public void setExtraInfo(String extraInfo) { this.extraInfo = extraInfo; }
}
