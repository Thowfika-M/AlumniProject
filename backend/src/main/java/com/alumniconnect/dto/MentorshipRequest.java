package com.alumniconnect.dto;

import jakarta.validation.constraints.NotNull;

public class MentorshipRequest {

    @NotNull(message = "Alumni ID is required")
    private Long alumniId;

    public MentorshipRequest() {}

    public MentorshipRequest(Long alumniId) {
        this.alumniId = alumniId;
    }

    public Long getAlumniId() { return alumniId; }
    public void setAlumniId(Long alumniId) { this.alumniId = alumniId; }
}
