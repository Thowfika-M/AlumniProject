package com.alumniconnect.repository;

import com.alumniconnect.entity.AlumniProfile;
import com.alumniconnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumniProfileRepository extends JpaRepository<AlumniProfile, Long> {
    Optional<AlumniProfile> findByUser(User user);
    Optional<AlumniProfile> findByUserId(Long userId);

    @Query("SELECT a FROM AlumniProfile a WHERE " +
           "(:query IS NULL OR LOWER(a.user.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(a.currentCompany) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(a.jobRole) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(a.department) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<AlumniProfile> searchAlumni(@Param("query") String query);
}
