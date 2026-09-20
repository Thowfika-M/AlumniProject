package com.alumniconnect.service;

import com.alumniconnect.dto.JobCreateRequest;
import com.alumniconnect.dto.JobResponse;
import com.alumniconnect.dto.SkillDto;
import com.alumniconnect.entity.*;
import com.alumniconnect.repository.JobRepository;
import com.alumniconnect.repository.JobSkillRepository;
import com.alumniconnect.repository.SkillRepository;
import com.alumniconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final JobSkillRepository jobSkillRepository;
    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public JobService(JobRepository jobRepository,
                      JobSkillRepository jobSkillRepository,
                      SkillRepository skillRepository,
                      UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.jobSkillRepository = jobSkillRepository;
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    public List<JobResponse> getAllJobs(String query, String jobType, String statusStr) {
        JobStatus status = null;
        if (statusStr != null && !statusStr.isEmpty()) {
            try {
                status = JobStatus.valueOf(statusStr.toUpperCase());
            } catch (Exception ignored) {}
        } else {
            status = JobStatus.OPEN;
        }

        List<Job> jobs = jobRepository.searchJobs(query, jobType, status);
        return jobs.stream()
                .map(this::mapJobToResponse)
                .collect(Collectors.toList());
    }

    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job posting not found with ID: " + id));
        return mapJobToResponse(job);
    }

    public List<JobResponse> getMyPostedJobs(String alumniEmail) {
        User alumni = userRepository.findByEmail(alumniEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return jobRepository.findByPostedByAlumniId(alumni.getId()).stream()
                .map(this::mapJobToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public JobResponse createJob(String alumniEmail, JobCreateRequest request) {
        User alumni = userRepository.findByEmail(alumniEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (alumni.getRole() != Role.ALUMNI && alumni.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("Only Alumni users can publish job postings");
        }

        Job job = new Job();
        job.setPostedByAlumni(alumni);
        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setExperienceRequired(request.getExperienceRequired());
        job.setClosingDate(request.getClosingDate());
        job.setStatus(request.getStatus() != null ? request.getStatus() : JobStatus.OPEN);

        Job savedJob = jobRepository.save(job);
        List<SkillDto> savedSkills = updateJobSkills(savedJob, request.getRequiredSkills());

        return JobResponse.fromEntity(savedJob, savedSkills);
    }

    @Transactional
    public JobResponse updateJob(String userEmail, Long jobId, JobCreateRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        if (!job.getPostedByAlumni().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("You are not authorized to edit another alumni's job posting");
        }

        if (request.getTitle() != null) job.setTitle(request.getTitle());
        if (request.getCompany() != null) job.setCompany(request.getCompany());
        if (request.getDescription() != null) job.setDescription(request.getDescription());
        if (request.getLocation() != null) job.setLocation(request.getLocation());
        if (request.getJobType() != null) job.setJobType(request.getJobType());
        if (request.getExperienceRequired() != null) job.setExperienceRequired(request.getExperienceRequired());
        if (request.getClosingDate() != null) job.setClosingDate(request.getClosingDate());
        if (request.getStatus() != null) job.setStatus(request.getStatus());

        Job updatedJob = jobRepository.save(job);
        List<SkillDto> updatedSkills = updateJobSkills(updatedJob, request.getRequiredSkills());

        return JobResponse.fromEntity(updatedJob, updatedSkills);
    }

    @Transactional
    public void deleteJob(String userEmail, Long jobId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        if (!job.getPostedByAlumni().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("You are not authorized to delete another alumni's job posting");
        }

        jobRepository.delete(job);
    }

    private List<SkillDto> updateJobSkills(Job job, List<String> skillNames) {
        jobSkillRepository.deleteByJobId(job.getId());

        if (skillNames == null || skillNames.isEmpty()) {
            return new ArrayList<>();
        }

        List<SkillDto> skillsList = new ArrayList<>();
        for (String name : skillNames) {
            if (name == null || name.trim().isEmpty()) continue;
            String trimmed = name.trim();
            Skill skill = skillRepository.findByNameIgnoreCase(trimmed)
                    .orElseGet(() -> skillRepository.save(new Skill(trimmed)));

            JobSkill jobSkill = new JobSkill(job, skill);
            jobSkillRepository.save(jobSkill);
            skillsList.add(SkillDto.fromEntity(skill));
        }

        return skillsList;
    }

    private JobResponse mapJobToResponse(Job job) {
        List<SkillDto> requiredSkills = jobSkillRepository.findByJobId(job.getId()).stream()
                .map(js -> SkillDto.fromEntity(js.getSkill()))
                .collect(Collectors.toList());
        return JobResponse.fromEntity(job, requiredSkills);
    }
}
