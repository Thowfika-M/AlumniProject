package com.alumniconnect.controller;

import com.alumniconnect.dto.*;
import com.alumniconnect.entity.User;
import com.alumniconnect.repository.UserRepository;
import com.alumniconnect.service.AIConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIConversationService aiConversationService;
    private final UserRepository userRepository;

    @Autowired
    public AIController(AIConversationService aiConversationService, UserRepository userRepository) {
        this.aiConversationService = aiConversationService;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized request.");
        }
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("Authenticated user not found."));
    }

    @PostMapping("/chat")
    public ResponseEntity<AIChatResponse> chat(
            Authentication authentication,
            @RequestBody AIChatRequest request) {
        User user = getAuthenticatedUser(authentication);
        AIChatResponse response = aiConversationService.processChatMessage(user.getId(), request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<AIConversationDTO>> getUserConversations(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        List<AIConversationDTO> conversations = aiConversationService.getUserConversations(user.getId());
        return ResponseEntity.ok(conversations);
    }

    @GetMapping("/conversations/{id}")
    public ResponseEntity<AIConversationDTO> getConversationDetails(
            Authentication authentication,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(authentication);
        AIConversationDTO conversation = aiConversationService.getConversationDetails(user.getId(), id);
        return ResponseEntity.ok(conversation);
    }

    @DeleteMapping("/conversations/{id}")
    public ResponseEntity<Map<String, String>> deleteConversation(
            Authentication authentication,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(authentication);
        aiConversationService.deleteConversation(user.getId(), id);
        return ResponseEntity.ok(Map.of("message", "Conversation deleted successfully."));
    }

    @PostMapping("/career-advice")
    public ResponseEntity<Map<String, String>> getCareerAdvice(
            Authentication authentication,
            @RequestBody AICareerAdviceRequest request) {
        User user = getAuthenticatedUser(authentication);
        String advice = aiConversationService.generatePersonalizedCareerAdvice(user.getId(), request.getTargetRole());
        return ResponseEntity.ok(Map.of("advice", advice));
    }

    @PostMapping("/resume-feedback")
    public ResponseEntity<Map<String, String>> getResumeFeedback(
            @RequestBody AICareerAdviceRequest request) {
        String feedback = aiConversationService.generateResumeFeedback(request.getResumeText(), request.getTargetRole());
        return ResponseEntity.ok(Map.of("feedback", feedback));
    }
}
