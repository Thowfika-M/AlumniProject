package com.alumniconnect.service;

import com.alumniconnect.dto.NotificationResponse;
import com.alumniconnect.entity.Notification;
import com.alumniconnect.entity.User;
import com.alumniconnect.repository.NotificationRepository;
import com.alumniconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public void createNotification(User user, String type, String message) {
        Notification notification = new Notification(user, type, message);
        notificationRepository.save(notification);
    }

    public List<NotificationResponse> getUserNotifications(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(NotificationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public Long getUnreadCount(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return notificationRepository.countByUserIdAndReadAtIsNull(user.getId());
    }

    @Transactional
    public NotificationResponse markAsRead(String userEmail, Long notificationId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));

        if (!notification.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Unauthorized notification access");
        }

        notification.setReadAt(LocalDateTime.now());
        Notification saved = notificationRepository.save(notification);
        return NotificationResponse.fromEntity(saved);
    }

    @Transactional
    public void markAllAsRead(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        LocalDateTime now = LocalDateTime.now();
        for (Notification n : notifications) {
            if (n.getReadAt() == null) {
                n.setReadAt(now);
                notificationRepository.save(n);
            }
        }
    }
}
