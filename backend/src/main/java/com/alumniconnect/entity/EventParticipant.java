package com.alumniconnect.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "event_participants")
public class EventParticipant {

    @EmbeddedId
    private EventParticipantId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("eventId")
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @CreationTimestamp
    @Column(name = "registered_at", nullable = false, updatable = false)
    private LocalDateTime registeredAt;

    public EventParticipant() {}

    public EventParticipant(Event event, User user) {
        this.event = event;
        this.user = user;
        this.id = new EventParticipantId(event.getId(), user.getId());
    }

    public EventParticipantId getId() { return id; }
    public void setId(EventParticipantId id) { this.id = id; }

    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDateTime getRegisteredAt() { return registeredAt; }
    public void setRegisteredAt(LocalDateTime registeredAt) { this.registeredAt = registeredAt; }
}
