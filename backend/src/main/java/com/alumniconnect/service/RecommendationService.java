package com.alumniconnect.service;

import com.alumniconnect.dto.*;
import com.alumniconnect.entity.*;
import com.alumniconnect.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final CareerTemplateRepository careerTemplateRepository;
    private final CareerSkillRepository careerSkillRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final AlumniProfileRepository alumniProfileRepository;
    private final JobRepository jobRepository;
    private final JobSkillRepository jobSkillRepository;
    private final UserRepository userRepository;
    private final SkillService skillService;

    public RecommendationService(CareerTemplateRepository careerTemplateRepository,
                                 CareerSkillRepository careerSkillRepository,
                                 StudentProfileRepository studentProfileRepository,
                                 AlumniProfileRepository alumniProfileRepository,
                                 JobRepository jobRepository,
                                 JobSkillRepository jobSkillRepository,
                                 UserRepository userRepository,
                                 SkillService skillService) {
        this.careerTemplateRepository = careerTemplateRepository;
        this.careerSkillRepository = careerSkillRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.alumniProfileRepository = alumniProfileRepository;
        this.jobRepository = jobRepository;
        this.jobSkillRepository = jobSkillRepository;
        this.userRepository = userRepository;
        this.skillService = skillService;
    }

    public List<CareerTemplateResponse> getAllCareerTemplates() {
        return careerTemplateRepository.findAll().stream()
                .map(t -> {
                    List<SkillDto> skills = careerSkillRepository.findByCareerTemplateId(t.getId()).stream()
                            .map(cs -> SkillDto.fromEntity(cs.getSkill()))
                            .collect(Collectors.toList());
                    return CareerTemplateResponse.fromEntity(t, skills);
                })
                .collect(Collectors.toList());
    }

    // Deterministic Skill Gap Analysis Engine
    public SkillGapAnalysisResponse analyzeSkillGap(String studentEmail, Long careerTemplateId) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        CareerTemplate template = careerTemplateRepository.findById(careerTemplateId)
                .orElseThrow(() -> new IllegalArgumentException("Career template not found with ID: " + careerTemplateId));

        List<SkillDto> studentSkills = skillService.getUserSkills(student.getId());
        Set<String> studentSkillNames = studentSkills.stream()
                .map(s -> s.getName().toLowerCase())
                .collect(Collectors.toSet());

        List<CareerSkill> requiredCareerSkills = careerSkillRepository.findByCareerTemplateId(careerTemplateId);
        List<SkillDto> matchedSkills = new ArrayList<>();
        List<SkillDto> missingSkills = new ArrayList<>();

        for (CareerSkill cs : requiredCareerSkills) {
            Skill skill = cs.getSkill();
            if (studentSkillNames.contains(skill.getName().toLowerCase())) {
                matchedSkills.add(SkillDto.fromEntity(skill));
            } else {
                missingSkills.add(SkillDto.fromEntity(skill));
            }
        }

        int totalRequired = requiredCareerSkills.size();
        int matchedCount = matchedSkills.size();
        int matchPercentage = totalRequired > 0 ? (int) Math.round(((double) matchedCount / totalRequired) * 100.0) : 0;

        String explanation = String.format(
                "Skill Gap Breakdown for %s: You currently possess %d out of %d key required competencies (%d%% readiness). Focus on learning %s to close your skill gap.",
                template.getName(),
                matchedCount,
                totalRequired,
                matchPercentage,
                missingSkills.isEmpty() ? "advanced industry projects" : missingSkills.stream().map(SkillDto::getName).collect(Collectors.joining(", "))
        );

        return new SkillGapAnalysisResponse(
                template.getName(),
                totalRequired,
                matchedCount,
                matchPercentage,
                matchedSkills,
                missingSkills,
                explanation
        );
    }

    // Deterministic Job Recommendation Engine
    public List<JobRecommendationResponse> getRecommendedJobs(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<SkillDto> studentSkills = skillService.getUserSkills(student.getId());
        Set<String> studentSkillNames = studentSkills.stream()
                .map(s -> s.getName().toLowerCase())
                .collect(Collectors.toSet());

        List<Job> openJobs = jobRepository.searchJobs(null, null, JobStatus.OPEN);
        List<JobRecommendationResponse> recommendations = new ArrayList<>();

        for (Job job : openJobs) {
            List<SkillDto> jobRequiredSkills = jobSkillRepository.findByJobId(job.getId()).stream()
                    .map(js -> SkillDto.fromEntity(js.getSkill()))
                    .collect(Collectors.toList());

            List<SkillDto> matched = new ArrayList<>();
            List<SkillDto> missing = new ArrayList<>();

            for (SkillDto required : jobRequiredSkills) {
                if (studentSkillNames.contains(required.getName().toLowerCase())) {
                    matched.add(required);
                } else {
                    missing.add(required);
                }
            }

            int total = jobRequiredSkills.size();
            int matchPercentage = total > 0 ? (int) Math.round(((double) matched.size() / total) * 100.0) : 50;

            JobResponse jobResponse = JobResponse.fromEntity(job, jobRequiredSkills);
            String explanation = String.format(
                    "Matched %d of %d required skills (%d%% match). Matched skills: [%s]. Missing skills: [%s].",
                    matched.size(),
                    total,
                    matchPercentage,
                    matched.stream().map(SkillDto::getName).collect(Collectors.joining(", ")),
                    missing.stream().map(SkillDto::getName).collect(Collectors.joining(", "))
            );

            recommendations.add(new JobRecommendationResponse(jobResponse, matchPercentage, matched, missing, explanation));
        }

        // Sort descending by match percentage score
        recommendations.sort(Comparator.comparingInt(JobRecommendationResponse::getMatchPercentage).reversed());
        return recommendations;
    }

    // Deterministic Alumni Mentor Recommendation Engine
    public List<AlumniRecommendationResponse> getRecommendedAlumni(String studentEmail) {
        User studentUser = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        StudentProfile studentProfile = studentProfileRepository.findByUser(studentUser).orElse(null);
        List<SkillDto> studentSkills = skillService.getUserSkills(studentUser.getId());
        Set<String> studentSkillNames = studentSkills.stream()
                .map(s -> s.getName().toLowerCase())
                .collect(Collectors.toSet());

        List<AlumniProfile> allAlumni = alumniProfileRepository.findAll();
        List<AlumniRecommendationResponse> recommendations = new ArrayList<>();

        for (AlumniProfile alumni : allAlumni) {
            if (alumni.getUser().getId().equals(studentUser.getId())) continue;

            List<SkillDto> alumniSkills = skillService.getUserSkills(alumni.getUser().getId());
            List<SkillDto> sharedSkills = alumniSkills.stream()
                    .filter(s -> studentSkillNames.contains(s.getName().toLowerCase()))
                    .collect(Collectors.toList());

            int score = 40; // Base score
            score += Math.min(sharedSkills.size() * 15, 40);

            if (studentProfile != null && studentProfile.getDepartment() != null &&
                alumni.getDepartment() != null &&
                studentProfile.getDepartment().equalsIgnoreCase(alumni.getDepartment())) {
                score += 15;
            }

            if (score > 98) score = 98;

            AlumniProfileResponse alumniResponse = AlumniProfileResponse.fromEntity(alumni, alumniSkills);
            String reason = String.format(
                    "Recommended because %s works as %s at %s with expertise in %s, matching your technical goals and sharing %d skill competencies.",
                    alumni.getUser().getName(),
                    alumni.getJobRole() != null ? alumni.getJobRole() : "Software Professional",
                    alumni.getCurrentCompany() != null ? alumni.getCurrentCompany() : "Tech Industry",
                    alumniSkills.stream().map(SkillDto::getName).limit(3).collect(Collectors.joining(", ")),
                    sharedSkills.size()
            );

            recommendations.add(new AlumniRecommendationResponse(alumniResponse, score, reason, sharedSkills));
        }

        recommendations.sort(Comparator.comparingInt(AlumniRecommendationResponse::getMatchPercentage).reversed());
        return recommendations;
    }
}
