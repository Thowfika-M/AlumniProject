package com.alumniconnect.repository;

import com.alumniconnect.entity.UserSkill;
import com.alumniconnect.entity.UserSkillId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, UserSkillId> {
    List<UserSkill> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}
