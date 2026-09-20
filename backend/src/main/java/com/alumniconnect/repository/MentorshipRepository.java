package com.alumniconnect.repository;

import com.alumniconnect.entity.Mentorship;
import com.alumniconnect.entity.MentorshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MentorshipRepository extends JpaRepository<Mentorship, Long> {
    List<Mentorship> findByStudentId(Long studentId);
    List<Mentorship> findByAlumniId(Long alumniId);
    Boolean existsByStudentIdAndAlumniIdAndStatus(Long studentId, Long alumniId, MentorshipStatus status);
    Optional<Mentorship> findByStudentIdAndAlumniId(Long studentId, Long alumniId);
}
