package com.alumniconnect.repository;

import com.alumniconnect.entity.JobSkill;
import com.alumniconnect.entity.JobSkillId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobSkillRepository extends JpaRepository<JobSkill, JobSkillId> {
    List<JobSkill> findByJobId(Long jobId);
    void deleteByJobId(Long jobId);
}
