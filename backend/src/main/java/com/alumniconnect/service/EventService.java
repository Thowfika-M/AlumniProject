package com.alumniconnect.service;

import com.alumniconnect.dto.EventRequest;
import com.alumniconnect.dto.EventResponse;
import com.alumniconnect.entity.*;
import com.alumniconnect.repository.EventParticipantRepository;
import com.alumniconnect.repository.EventRepository;
import com.alumniconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventParticipantRepository eventParticipantRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public EventService(EventRepository eventRepository,
                        EventParticipantRepository eventParticipantRepository,
                        UserRepository userRepository,
                        NotificationService notificationService) {
        this.eventRepository = eventRepository;
        this.eventParticipantRepository = eventParticipantRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    public List<EventResponse> getAllEvents(String currentUserEmail, String query, String typeStr) {
        EventType type = null;
        if (typeStr != null && !typeStr.isEmpty()) {
            try {
                type = EventType.valueOf(typeStr.toUpperCase());
            } catch (Exception ignored) {}
        }

        User user = currentUserEmail != null ? userRepository.findByEmail(currentUserEmail).orElse(null) : null;
        Long userId = user != null ? user.getId() : null;

        return eventRepository.searchEvents(query, type).stream()
                .map(event -> {
                    long count = eventParticipantRepository.findByEventId(event.getId()).size();
                    boolean registered = userId != null && eventParticipantRepository.existsByEventIdAndUserId(event.getId(), userId);
                    return EventResponse.fromEntity(event, count, registered);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public EventResponse createEvent(String organizerEmail, EventRequest request) {
        User organizer = userRepository.findByEmail(organizerEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Event event = new Event();
        event.setOrganizer(organizer);
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setEventDate(request.getEventDate());
        event.setEventTime(request.getEventTime());
        event.setLocation(request.getLocation());
        event.setOnlineLink(request.getOnlineLink());
        event.setEventType(request.getEventType());

        Event saved = eventRepository.save(event);
        return EventResponse.fromEntity(saved, 0L, false);
    }

    @Transactional
    public EventResponse registerForEvent(String userEmail, Long eventId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found with ID: " + eventId));

        if (!eventParticipantRepository.existsByEventIdAndUserId(eventId, user.getId())) {
            EventParticipant ep = new EventParticipant(event, user);
            eventParticipantRepository.save(ep);

            notificationService.createNotification(
                    user,
                    "EVENT",
                    "Successfully registered for event: " + event.getTitle() + " on " + event.getEventDate()
            );
        }

        long count = eventParticipantRepository.findByEventId(eventId).size();
        return EventResponse.fromEntity(event, count, true);
    }
}
