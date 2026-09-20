package com.alumniconnect.service.ai;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class AIServiceConfig {

    @Value("${openai.api.key:}")
    private String apiKey;

    @Bean
    @Primary
    public AIService activeAIService(
            @Qualifier("openAIService") OpenAIService openAIService,
            @Qualifier("mockAIService") MockAIService mockAIService) {
        if (openAIService.isConfigured()) {
            System.out.println("AI Service initialized with OpenAIService adapter.");
            return openAIService;
        } else {
            System.out.println("AI Service initialized with MockAIService fallback adapter.");
            return mockAIService;
        }
    }
}
