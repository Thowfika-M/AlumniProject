package com.alumniconnect.controller;

import com.alumniconnect.dto.JobCreateRequest;
import com.alumniconnect.dto.JobResponse;
import com.alumniconnect.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "jobType", required = false) String jobType,
            @RequestParam(value = "status", required = false) String status) {
        List<JobResponse> jobs = jobService.getAllJobs(query, jobType, status);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        JobResponse job = jobService.getJobById(id);
        return ResponseEntity.ok(job);
    }

    @GetMapping("/my-posted")
    @PreAuthorize("hasAnyRole('ALUMNI', 'ADMIN')")
    public ResponseEntity<List<JobResponse>> getMyPostedJobs(Authentication authentication) {
        List<JobResponse> jobs = jobService.getMyPostedJobs(authentication.getName());
        return ResponseEntity.ok(jobs);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ALUMNI', 'ADMIN')")
    public ResponseEntity<JobResponse> createJob(Authentication authentication,
                                                 @Valid @RequestBody JobCreateRequest request) {
        JobResponse createdJob = jobService.createJob(authentication.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ALUMNI', 'ADMIN')")
    public ResponseEntity<JobResponse> updateJob(Authentication authentication,
                                                 @PathVariable Long id,
                                                 @Valid @RequestBody JobCreateRequest request) {
        JobResponse updatedJob = jobService.updateJob(authentication.getName(), id, request);
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ALUMNI', 'ADMIN')")
    public ResponseEntity<Void> deleteJob(Authentication authentication, @PathVariable Long id) {
        jobService.deleteJob(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
