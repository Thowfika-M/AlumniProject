package com.alumniconnect.repository;

import com.alumniconnect.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentId(Long studentId);
    List<Application> findByJobId(Long jobId);
    List<Application> findByJobPostedByAlumniId(Long alumniId);
    Boolean existsByJobIdAndStudentId(Long jobId, Long studentId);
    Optional<Application> findByJobIdAndStudentId(Long jobId, Long studentId);
}
