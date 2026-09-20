package com.alumniconnect.service.ai;

import com.alumniconnect.entity.AIMessage;
import com.alumniconnect.entity.User;

import java.util.List;

public interface AIService {

    /**
     * Generate AI response based on current prompt and conversation history.
     */
    String generateResponse(String prompt, List<AIMessage> history, String mode, User user);

    /**
     * Generate customized career recommendations for a student.
     */
    String generateCareerAdvice(User user, String targetRole, List<String> currentSkills);

    /**
     * Generate resume analysis and optimization tips.
     */
    String generateResumeFeedback(String resumeText, String targetRole);

    /**
     * Returns human readable provider identifier e.g. "OpenAI (GPT-4o)" or "AlumniConnect AI Engine".
     */
    String getProviderName();
}
