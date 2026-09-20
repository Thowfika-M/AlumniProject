package com.alumniconnect.controller;

import com.alumniconnect.dto.ApplicationRequest;
import com.alumniconnect.dto.ApplicationResponse;
import com.alumniconnect.dto.ApplicationStatusUpdateRequest;
import com.alumniconnect.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/jobs/{jobId}/applications")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<ApplicationResponse> applyForJob(Authentication authentication,
                                                           @PathVariable Long jobId,
                                                           @Valid @RequestBody ApplicationRequest request) {
        ApplicationResponse response = applicationService.applyForJob(authentication.getName(), jobId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/applications/me")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> getMyStudentApplications(Authentication authentication) {
        List<ApplicationResponse> list = applicationService.getStudentApplications(authentication.getName());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/jobs/{jobId}/applications")
    @PreAuthorize("hasAnyRole('ALUMNI', 'ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> getJobApplications(Authentication authentication,
                                                                         @PathVariable Long jobId) {
        List<ApplicationResponse> list = applicationService.getJobApplications(authentication.getName(), jobId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/applications/alumni/all")
    @PreAuthorize("hasAnyRole('ALUMNI', 'ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> getAlumniAllApplications(Authentication authentication) {
        List<ApplicationResponse> list = applicationService.getAlumniAllApplications(authentication.getName());
        return ResponseEntity.ok(list);
    }

    @PutMapping("/applications/{id}/status")
    @PreAuthorize("hasAnyRole('ALUMNI', 'ADMIN')")
    public ResponseEntity<ApplicationResponse> updateApplicationStatus(Authentication authentication,
                                                                        @PathVariable Long id,
                                                                        @Valid @RequestBody ApplicationStatusUpdateRequest request) {
        ApplicationResponse updated = applicationService.updateApplicationStatus(authentication.getName(), id, request.getStatus());
        return ResponseEntity.ok(updated);
    }
}
