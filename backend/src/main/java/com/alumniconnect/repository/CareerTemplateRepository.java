package com.alumniconnect.repository;

import com.alumniconnect.entity.CareerTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CareerTemplateRepository extends JpaRepository<CareerTemplate, Long> {
    Optional<CareerTemplate> findByNameIgnoreCase(String name);
}
