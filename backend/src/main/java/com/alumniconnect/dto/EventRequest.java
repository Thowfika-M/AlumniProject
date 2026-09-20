package com.alumniconnect.dto;

import com.alumniconnect.entity.EventType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EventRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Event date is required")
    private String eventDate;

    @NotBlank(message = "Event time is required")
    private String eventTime;

    @NotBlank(message = "Location is required")
    private String location;

    private String onlineLink;

    @NotNull(message = "Event type is required")
    private EventType eventType;

    public EventRequest() {}

    public EventRequest(String title, String description, String eventDate, String eventTime, String location, String onlineLink, EventType eventType) {
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.location = location;
        this.onlineLink = onlineLink;
        this.eventType = eventType;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }

    public String getEventTime() { return eventTime; }
    public void setEventTime(String eventTime) { this.eventTime = eventTime; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getOnlineLink() { return onlineLink; }
    public void setOnlineLink(String onlineLink) { this.onlineLink = onlineLink; }

    public EventType getEventType() { return eventType; }
    public void setEventType(EventType eventType) { this.eventType = eventType; }
}
