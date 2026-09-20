package com.alumniconnect.controller;

import com.alumniconnect.dto.EventRequest;
import com.alumniconnect.dto.EventResponse;
import com.alumniconnect.service.EventService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents(
            Authentication authentication,
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "type", required = false) String type) {
        String currentUserEmail = authentication != null ? authentication.getName() : null;
        List<EventResponse> events = eventService.getAllEvents(currentUserEmail, query, type);
        return ResponseEntity.ok(events);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ALUMNI', 'ADMIN')")
    public ResponseEntity<EventResponse> createEvent(Authentication authentication,
                                                     @Valid @RequestBody EventRequest request) {
        EventResponse created = eventService.createEvent(authentication.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/{id}/register")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<EventResponse> registerForEvent(Authentication authentication,
                                                          @PathVariable Long id) {
        EventResponse registered = eventService.registerForEvent(authentication.getName(), id);
        return ResponseEntity.ok(registered);
    }
}
