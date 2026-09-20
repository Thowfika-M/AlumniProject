package com.alumniconnect.repository;

import com.alumniconnect.entity.CareerSkill;
import com.alumniconnect.entity.CareerSkillId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerSkillRepository extends JpaRepository<CareerSkill, CareerSkillId> {
    List<CareerSkill> findByCareerTemplateId(Long careerTemplateId);
}
