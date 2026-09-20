package com.alumniconnect;

import com.alumniconnect.entity.Role;
import com.alumniconnect.entity.User;
import com.alumniconnect.service.ai.AIService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class AIServiceTest {

    @Autowired
    private AIService activeAIService;

    @Test
    public void testMockAIServiceFallbackProducesStructuredResponse() {
        assertNotNull(activeAIService);
        assertNotNull(activeAIService.getProviderName());

        User testUser = new User(1L, "AI Student", "aistudent@example.com", "hash", Role.STUDENT, "123", true, null, null);

        String careerAdvice = activeAIService.generateCareerAdvice(testUser, "Software Engineer", List.of("Java", "React"));
        assertNotNull(careerAdvice);
        assertTrue(careerAdvice.contains("Career Roadmap"));
        assertTrue(careerAdvice.contains("Software Engineer"));

        String resumeFeedback = activeAIService.generateResumeFeedback("Experienced Java Developer", "Backend Developer");
        assertNotNull(resumeFeedback);
        assertTrue(resumeFeedback.contains("Resume Analysis"));
    }
}
