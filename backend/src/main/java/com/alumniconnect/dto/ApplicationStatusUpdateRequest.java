package com.alumniconnect.dto;

import com.alumniconnect.entity.ApplicationStatus;
import jakarta.validation.constraints.NotNull;

public class ApplicationStatusUpdateRequest {

    @NotNull(message = "Application status is required (APPLIED, UNDER_REVIEW, SHORTLISTED, REJECTED, SELECTED)")
    private ApplicationStatus status;

    public ApplicationStatusUpdateRequest() {}

    public ApplicationStatusUpdateRequest(ApplicationStatus status) {
        this.status = status;
    }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
}
