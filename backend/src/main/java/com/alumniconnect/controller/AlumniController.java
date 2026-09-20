package com.alumniconnect.controller;

import com.alumniconnect.dto.AlumniProfileRequest;
import com.alumniconnect.dto.AlumniProfileResponse;
import com.alumniconnect.service.AlumniProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumni")
public class AlumniController {

    private final AlumniProfileService alumniProfileService;

    public AlumniController(AlumniProfileService alumniProfileService) {
        this.alumniProfileService = alumniProfileService;
    }

    @GetMapping
    public ResponseEntity<List<AlumniProfileResponse>> getAllAlumni(@RequestParam(value = "query", required = false) String query) {
        List<AlumniProfileResponse> list = alumniProfileService.getAllAlumni(query);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumniProfileResponse> getAlumniById(@PathVariable Long id) {
        AlumniProfileResponse response = alumniProfileService.getProfileById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('ALUMNI', 'ADMIN')")
    public ResponseEntity<AlumniProfileResponse> getMyProfile(Authentication authentication) {
        AlumniProfileResponse response = alumniProfileService.getProfileByEmail(authentication.getName());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    @PreAuthorize("hasAnyRole('ALUMNI', 'ADMIN')")
    public ResponseEntity<AlumniProfileResponse> updateMyProfile(Authentication authentication,
                                                                 @RequestBody AlumniProfileRequest request) {
        AlumniProfileResponse response = alumniProfileService.updateProfile(authentication.getName(), request);
        return ResponseEntity.ok(response);
    }
}
