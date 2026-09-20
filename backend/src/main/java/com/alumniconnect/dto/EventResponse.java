package com.alumniconnect.dto;

import com.alumniconnect.entity.Event;
import com.alumniconnect.entity.EventType;

import java.time.LocalDateTime;

public class EventResponse {

    private Long id;
    private UserResponse organizer;
    private String title;
    private String description;
    private String eventDate;
    private String eventTime;
    private String location;
    private String onlineLink;
    private EventType eventType;
    private LocalDateTime createdAt;
    private Long participantCount;
    private Boolean isRegistered;

    public EventResponse() {}

    public EventResponse(Long id, UserResponse organizer, String title, String description, String eventDate, String eventTime, String location, String onlineLink, EventType eventType, LocalDateTime createdAt, Long participantCount, Boolean isRegistered) {
        this.id = id;
        this.organizer = organizer;
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.location = location;
        this.onlineLink = onlineLink;
        this.eventType = eventType;
        this.createdAt = createdAt;
        this.participantCount = participantCount;
        this.isRegistered = isRegistered;
    }

    public static EventResponse fromEntity(Event event, Long participantCount, Boolean isRegistered) {
        return new EventResponse(
                event.getId(),
                UserResponse.fromEntity(event.getOrganizer()),
                event.getTitle(),
                event.getDescription(),
                event.getEventDate(),
                event.getEventTime(),
                event.getLocation(),
                event.getOnlineLink(),
                event.getEventType(),
                event.getCreatedAt(),
                participantCount,
                isRegistered
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserResponse getOrganizer() { return organizer; }
    public void setOrganizer(UserResponse organizer) { this.organizer = organizer; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Long getParticipantCount() { return participantCount; }
    public void setParticipantCount(Long participantCount) { this.participantCount = participantCount; }

    public Boolean getIsRegistered() { return isRegistered; }
    public void setIsRegistered(Boolean isRegistered) { this.isRegistered = isRegistered; }
}
