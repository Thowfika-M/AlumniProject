package com.alumniconnect.controller;

import com.alumniconnect.dto.StudentProfileRequest;
import com.alumniconnect.dto.StudentProfileResponse;
import com.alumniconnect.service.StudentProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentProfileService studentProfileService;

    public StudentController(StudentProfileService studentProfileService) {
        this.studentProfileService = studentProfileService;
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<StudentProfileResponse> getMyProfile(Authentication authentication) {
        StudentProfileResponse response = studentProfileService.getProfileByEmail(authentication.getName());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<StudentProfileResponse> updateMyProfile(Authentication authentication,
                                                                  @RequestBody StudentProfileRequest request) {
        StudentProfileResponse response = studentProfileService.updateProfile(authentication.getName(), request);
        return ResponseEntity.ok(response);
    }
}
