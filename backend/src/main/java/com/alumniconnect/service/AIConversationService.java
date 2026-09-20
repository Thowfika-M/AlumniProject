package com.alumniconnect.service;

import com.alumniconnect.dto.*;
import com.alumniconnect.entity.*;
import com.alumniconnect.repository.*;
import com.alumniconnect.service.ai.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AIConversationService {

    private final AIConversationRepository conversationRepository;
    private final AIMessageRepository messageRepository;
    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final UserSkillRepository userSkillRepository;
    private final AIService activeAIService;

    @Autowired
    public AIConversationService(
            AIConversationRepository conversationRepository,
            AIMessageRepository messageRepository,
            UserRepository userRepository,
            StudentProfileRepository studentProfileRepository,
            UserSkillRepository userSkillRepository,
            AIService activeAIService) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.userSkillRepository = userSkillRepository;
        this.activeAIService = activeAIService;
    }

    @Transactional
    public AIChatResponse processChatMessage(Long userId, AIChatRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        AIConversation conversation;
        if (request.getConversationId() != null) {
            conversation = conversationRepository.findById(request.getConversationId())
                    .orElseThrow(() -> new IllegalArgumentException("Conversation not found with ID: " + request.getConversationId()));
            if (!conversation.getUser().getId().equals(userId)) {
                throw new SecurityException("Unauthorized access to conversation.");
            }
        } else {
            conversation = new AIConversation();
            conversation.setUser(user);
            String titlePrompt = request.getPrompt().trim();
            if (titlePrompt.length() > 40) {
                titlePrompt = titlePrompt.substring(0, 40) + "...";
            }
            conversation.setTitle(titlePrompt);
            conversation = conversationRepository.save(conversation);
        }

        // Save User Message
        AIMessage userMessage = new AIMessage();
        userMessage.setConversation(conversation);
        userMessage.setSenderRole(SenderRole.USER);
        userMessage.setContent(request.getPrompt());
        userMessage = messageRepository.save(userMessage);

        // Fetch conversation history for context
        List<AIMessage> history = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversation.getId());

        // Generate AI Response
        String aiResponseText = activeAIService.generateResponse(request.getPrompt(), history, request.getMode(), user);

        // Save AI Message
        AIMessage assistantMessage = new AIMessage();
        assistantMessage.setConversation(conversation);
        assistantMessage.setSenderRole(SenderRole.ASSISTANT);
        assistantMessage.setContent(aiResponseText);
        assistantMessage = messageRepository.save(assistantMessage);

        // Update conversation timestamp
        conversation.setUpdatedAt(LocalDateTime.now());
        conversationRepository.save(conversation);

        AIMessageDTO userDto = new AIMessageDTO(userMessage.getId(), userMessage.getSenderRole(), userMessage.getContent(), userMessage.getCreatedAt());
        AIMessageDTO assistantDto = new AIMessageDTO(assistantMessage.getId(), assistantMessage.getSenderRole(), assistantMessage.getContent(), assistantMessage.getCreatedAt());

        return new AIChatResponse(
                conversation.getId(),
                conversation.getTitle(),
                userDto,
                assistantDto,
                activeAIService.getProviderName()
        );
    }

    @Transactional(readOnly = true)
    public List<AIConversationDTO> getUserConversations(Long userId) {
        List<AIConversation> conversations = conversationRepository.findByUserIdOrderByUpdatedAtDesc(userId);
        return conversations.stream().map(c -> {
            List<AIMessage> msgs = messageRepository.findByConversationIdOrderByCreatedAtAsc(c.getId());
            List<AIMessageDTO> msgDtos = msgs.stream()
                    .map(m -> new AIMessageDTO(m.getId(), m.getSenderRole(), m.getContent(), m.getCreatedAt()))
                    .collect(Collectors.toList());
            return new AIConversationDTO(c.getId(), c.getTitle(), c.getCreatedAt(), c.getUpdatedAt(), msgs.size(), msgDtos);
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AIConversationDTO getConversationDetails(Long userId, Long conversationId) {
        AIConversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found with ID: " + conversationId));

        if (!conversation.getUser().getId().equals(userId)) {
            throw new SecurityException("Unauthorized access to conversation.");
        }

        List<AIMessage> msgs = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
        List<AIMessageDTO> msgDtos = msgs.stream()
                .map(m -> new AIMessageDTO(m.getId(), m.getSenderRole(), m.getContent(), m.getCreatedAt()))
                .collect(Collectors.toList());

        return new AIConversationDTO(
                conversation.getId(),
                conversation.getTitle(),
                conversation.getCreatedAt(),
                conversation.getUpdatedAt(),
                msgs.size(),
                msgDtos
        );
    }

    @Transactional
    public void deleteConversation(Long userId, Long conversationId) {
        AIConversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found with ID: " + conversationId));

        if (!conversation.getUser().getId().equals(userId)) {
            throw new SecurityException("Unauthorized access to conversation.");
        }

        conversationRepository.delete(conversation);
    }

    @Transactional(readOnly = true)
    public String generatePersonalizedCareerAdvice(Long userId, String targetRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        List<UserSkill> userSkills = userSkillRepository.findByUserId(userId);
        List<String> skillNames = userSkills.stream()
                .map(us -> us.getSkill().getName())
                .collect(Collectors.toList());

        return activeAIService.generateCareerAdvice(user, targetRole, skillNames);
    }

    @Transactional(readOnly = true)
    public String generateResumeFeedback(String resumeText, String targetRole) {
        return activeAIService.generateResumeFeedback(resumeText, targetRole);
    }
}
