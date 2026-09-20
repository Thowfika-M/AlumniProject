package com.alumniconnect.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "organizer_id", nullable = false)
    private User organizer;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "event_date", nullable = false, length = 20)
    private String eventDate;

    @Column(name = "event_time", nullable = false, length = 20)
    private String eventTime;

    @Column(nullable = false, length = 150)
    private String location;

    @Column(name = "online_link", length = 255)
    private String onlineLink;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false, length = 50)
    private EventType eventType;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Event() {}

    public Event(Long id, User organizer, String title, String description, String eventDate, String eventTime, String location, String onlineLink, EventType eventType, LocalDateTime createdAt) {
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
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getOrganizer() { return organizer; }
    public void setOrganizer(User organizer) { this.organizer = organizer; }

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
}
