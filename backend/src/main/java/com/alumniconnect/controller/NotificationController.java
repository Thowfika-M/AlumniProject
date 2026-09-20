package com.alumniconnect.controller;

import com.alumniconnect.dto.NotificationResponse;
import com.alumniconnect.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<NotificationResponse>> getUserNotifications(Authentication authentication) {
        List<NotificationResponse> list = notificationService.getUserNotifications(authentication.getName());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/unread-count")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Long>> getUnreadCount(Authentication authentication) {
        Long unread = notificationService.getUnreadCount(authentication.getName());
        Map<String, Long> response = new HashMap<>();
        response.put("unreadCount", unread);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<NotificationResponse> markAsRead(Authentication authentication, @PathVariable Long id) {
        NotificationResponse updated = notificationService.markAsRead(authentication.getName(), id);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/read-all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> markAllAsRead(Authentication authentication) {
        notificationService.markAllAsRead(authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
