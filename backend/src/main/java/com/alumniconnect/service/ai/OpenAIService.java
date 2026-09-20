package com.alumniconnect.service.ai;

import com.alumniconnect.entity.AIMessage;
import com.alumniconnect.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service("openAIService")
public class OpenAIService implements AIService {

    @Value("${openai.api.key:}")
    private String apiKey;

    @Value("${openai.model:gpt-3.5-turbo}")
    private String modelName;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String getProviderName() {
        return "OpenAI (" + modelName + ")";
    }

    public boolean isConfigured() {
        return apiKey != null && !apiKey.isBlank() && !apiKey.equalsIgnoreCase("your-openai-api-key");
    }

    @Override
    public String generateResponse(String prompt, List<AIMessage> history, String mode, User user) {
        if (!isConfigured()) {
            throw new IllegalStateException("OpenAI API Key is not configured. Falling back to MockAIService.");
        }

        try {
            String url = "https://api.openai.com/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            List<Map<String, String>> messagesPayload = new ArrayList<>();

            // System prompt
            Map<String, String> systemMsg = new HashMap<>();
            systemMsg.put("role", "system");
            systemMsg.put("content", "You are an expert career counselor and technical interview coach for the AlumniConnect college capstone platform. Provide structured, actionable, and encouraging career advice, resume tips, and technical roadmap guidance.");
            messagesPayload.add(systemMsg);

            // History
            if (history != null) {
                for (AIMessage msg : history) {
                    Map<String, String> m = new HashMap<>();
                    m.put("role", msg.getSenderRole() == com.alumniconnect.entity.SenderRole.USER ? "user" : "assistant");
                    m.put("content", msg.getContent());
                    messagesPayload.add(m);
                }
            }

            // Current prompt
            Map<String, String> userMsg = new HashMap<>();
            userMsg.put("role", "user");
            userMsg.put("content", prompt);
            messagesPayload.add(userMsg);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", modelName);
            requestBody.put("messages", messagesPayload);
            requestBody.put("temperature", 0.7);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                List choices = (List) response.getBody().get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map firstChoice = (Map) choices.get(0);
                    Map message = (Map) firstChoice.get("message");
                    if (message != null && message.containsKey("content")) {
                        return (String) message.get("content");
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("OpenAI API call failed: " + e.getMessage());
        }

        // Return error message if OpenAI call fails
        return "I encountered an issue connecting to the OpenAI service. Please check backend API configuration or try again shortly.";
    }

    @Override
    public String generateCareerAdvice(User user, String targetRole, List<String> currentSkills) {
        String prompt = String.format(
            "Generate personalized career advice for student %s aiming for the role of '%s'. Current skills: %s.",
            user != null ? user.getName() : "Student",
            targetRole != null ? targetRole : "Software Engineer",
            currentSkills != null ? String.join(", ", currentSkills) : "None specified"
        );
        return generateResponse(prompt, null, "CAREER_GUIDANCE", user);
    }

    @Override
    public String generateResumeFeedback(String resumeText, String targetRole) {
        String prompt = String.format("Analyze this resume content for a target role of '%s' and provide bulleted feedback: %s", targetRole, resumeText);
        return generateResponse(prompt, null, "RESUME_FEEDBACK", null);
    }
}
