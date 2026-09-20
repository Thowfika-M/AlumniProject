package com.alumniconnect.repository;

import com.alumniconnect.entity.Job;
import com.alumniconnect.entity.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByPostedByAlumniId(Long alumniId);

    @Query("SELECT j FROM Job j WHERE " +
           "(:query IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(j.company) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(j.location) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:jobType IS NULL OR j.jobType = :jobType) AND " +
           "(:status IS NULL OR j.status = :status)")
    List<Job> searchJobs(@Param("query") String query,
                         @Param("jobType") String jobType,
                         @Param("status") JobStatus status);
}
