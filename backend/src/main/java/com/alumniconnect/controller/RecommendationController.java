package com.alumniconnect.controller;

import com.alumniconnect.dto.*;
import com.alumniconnect.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/career-templates")
    public ResponseEntity<List<CareerTemplateResponse>> getCareerTemplates() {
        List<CareerTemplateResponse> list = recommendationService.getAllCareerTemplates();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/skill-gap")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<SkillGapAnalysisResponse> analyzeSkillGap(Authentication authentication,
                                                                    @RequestParam Long careerTemplateId) {
        SkillGapAnalysisResponse response = recommendationService.analyzeSkillGap(authentication.getName(), careerTemplateId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/jobs")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<List<JobRecommendationResponse>> getRecommendedJobs(Authentication authentication) {
        List<JobRecommendationResponse> list = recommendationService.getRecommendedJobs(authentication.getName());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/alumni")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<List<AlumniRecommendationResponse>> getRecommendedAlumni(Authentication authentication) {
        List<AlumniRecommendationResponse> list = recommendationService.getRecommendedAlumni(authentication.getName());
        return ResponseEntity.ok(list);
    }
}
