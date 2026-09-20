package com.alumniconnect;

import com.alumniconnect.dto.SkillGapAnalysisResponse;
import com.alumniconnect.entity.*;
import com.alumniconnect.repository.*;
import com.alumniconnect.service.RecommendationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class RecommendationServiceTest {

    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Autowired
    private CareerTemplateRepository careerTemplateRepository;

    @Autowired
    private CareerSkillRepository careerSkillRepository;

    private User testStudent;
    private Skill javaSkill;
    private Skill reactSkill;
    private Skill sqlSkill;
    private CareerTemplate softwareEngineerTemplate;

    @BeforeEach
    public void setupData() {
        testStudent = userRepository.save(new User(null, "Test Student", "rec_student@example.com", "hash", Role.STUDENT, "123", true, null, null));

        javaSkill = skillRepository.save(new Skill(null, "Java"));
        reactSkill = skillRepository.save(new Skill(null, "React"));
        sqlSkill = skillRepository.save(new Skill(null, "MySQL"));

        // Add Java and MySQL to student
        userSkillRepository.save(new UserSkill(testStudent, javaSkill));
        userSkillRepository.save(new UserSkill(testStudent, sqlSkill));

        // Create Career Template requiring Java, React, MySQL
        softwareEngineerTemplate = careerTemplateRepository.save(new CareerTemplate(null, "Software Engineer", "Full Stack Web Apps"));
        
        careerSkillRepository.save(new CareerSkill(softwareEngineerTemplate, javaSkill, "HIGH"));
        careerSkillRepository.save(new CareerSkill(softwareEngineerTemplate, reactSkill, "HIGH"));
        careerSkillRepository.save(new CareerSkill(softwareEngineerTemplate, sqlSkill, "HIGH"));
    }

    @Test
    public void testSkillGapAnalysis() {
        SkillGapAnalysisResponse response = recommendationService.analyzeSkillGap(testStudent.getEmail(), softwareEngineerTemplate.getId());

        assertNotNull(response);
        assertEquals("Software Engineer", response.getTargetCareerName());
        assertEquals(3, response.getTotalRequiredSkills());
        assertEquals(2, response.getMatchedSkillCount()); // Has Java & MySQL
        assertEquals(67, response.getMatchPercentage());   // (2 / 3) * 100 = 66.666% -> 67%

        assertEquals(2, response.getMatchedSkills().size());
        assertEquals(1, response.getMissingSkills().size());
        assertEquals("React", response.getMissingSkills().get(0).getName());
    }
}
