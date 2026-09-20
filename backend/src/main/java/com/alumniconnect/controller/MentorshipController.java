package com.alumniconnect.controller;

import com.alumniconnect.dto.MentorshipRequest;
import com.alumniconnect.dto.MentorshipResponse;
import com.alumniconnect.entity.MentorshipStatus;
import com.alumniconnect.service.MentorshipService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentorship")
public class MentorshipController {

    private final MentorshipService mentorshipService;

    public MentorshipController(MentorshipService mentorshipService) {
        this.mentorshipService = mentorshipService;
    }

    @PostMapping("/requests")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<MentorshipResponse> requestMentorship(Authentication authentication,
                                                                 @Valid @RequestBody MentorshipRequest request) {
        MentorshipResponse response = mentorshipService.requestMentorship(authentication.getName(), request.getAlumniId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/requests")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<MentorshipResponse>> getMyMentorshipRequests(Authentication authentication) {
        List<MentorshipResponse> list = mentorshipService.getMyMentorships(authentication.getName());
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ALUMNI', 'ADMIN')")
    public ResponseEntity<MentorshipResponse> respondToMentorship(Authentication authentication,
                                                                  @PathVariable Long id,
                                                                  @RequestParam MentorshipStatus status) {
        MentorshipResponse updated = mentorshipService.respondToMentorshipRequest(authentication.getName(), id, status);
        return ResponseEntity.ok(updated);
    }
}
