package com.alumniconnect.controller;

import com.alumniconnect.dto.*;
import com.alumniconnect.entity.Role;
import com.alumniconnect.entity.User;
import com.alumniconnect.repository.UserRepository;
import com.alumniconnect.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final UserRepository userRepository;

    @Autowired
    public AdminController(AdminService adminService, UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedAdmin(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized request.");
        }
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("Authenticated user not found."));

        if (user.getRole() != Role.ADMIN) {
            throw new SecurityException("Access denied. Admin role required.");
        }
        return user;
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> getStats(Authentication authentication) {
        getAuthenticatedAdmin(authentication);
        AdminStatsDTO stats = adminService.getSystemStatistics();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserDTO>> getAllUsers(Authentication authentication) {
        getAuthenticatedAdmin(authentication);
        List<AdminUserDTO> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{id}/toggle-status")
    public ResponseEntity<AdminUserDTO> toggleUserStatus(
            Authentication authentication,
            @PathVariable Long id) {
        User admin = getAuthenticatedAdmin(authentication);
        AdminUserDTO updated = adminService.toggleUserStatus(admin, id);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(
            Authentication authentication,
            @PathVariable Long id) {
        User admin = getAuthenticatedAdmin(authentication);
        adminService.deleteUser(admin, id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully."));
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<AdminJobDTO>> getAllJobs(Authentication authentication) {
        getAuthenticatedAdmin(authentication);
        List<AdminJobDTO> jobs = adminService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<Map<String, String>> deleteJob(
            Authentication authentication,
            @PathVariable Long id) {
        User admin = getAuthenticatedAdmin(authentication);
        adminService.deleteJob(admin, id);
        return ResponseEntity.ok(Map.of("message", "Job deleted successfully."));
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AdminAuditLogDTO>> getAuditLogs(Authentication authentication) {
        getAuthenticatedAdmin(authentication);
        List<AdminAuditLogDTO> logs = adminService.getRecentAuditLogs();
        return ResponseEntity.ok(logs);
    }
}
