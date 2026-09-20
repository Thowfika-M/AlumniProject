package com.alumniconnect.service;

import com.alumniconnect.dto.SkillDto;
import com.alumniconnect.entity.Skill;
import com.alumniconnect.entity.User;
import com.alumniconnect.entity.UserSkill;
import com.alumniconnect.repository.SkillRepository;
import com.alumniconnect.repository.UserSkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserSkillRepository userSkillRepository;

    public SkillService(SkillRepository skillRepository, UserSkillRepository userSkillRepository) {
        this.skillRepository = skillRepository;
        this.userSkillRepository = userSkillRepository;
    }

    public List<SkillDto> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(SkillDto::fromEntity)
                .collect(Collectors.toList());
    }

    public SkillDto createSkill(String name) {
        String trimmed = name.trim();
        Skill skill = skillRepository.findByNameIgnoreCase(trimmed)
                .orElseGet(() -> skillRepository.save(new Skill(trimmed)));
        return SkillDto.fromEntity(skill);
    }

    public List<SkillDto> getUserSkills(Long userId) {
        return userSkillRepository.findByUserId(userId).stream()
                .map(us -> SkillDto.fromEntity(us.getSkill()))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<SkillDto> updateUserSkills(User user, List<String> skillNames) {
        userSkillRepository.deleteByUserId(user.getId());

        if (skillNames == null || skillNames.isEmpty()) {
            return new ArrayList<>();
        }

        List<SkillDto> updatedSkills = new ArrayList<>();
        for (String rawName : skillNames) {
            if (rawName == null || rawName.trim().isEmpty()) continue;
            String trimmed = rawName.trim();

            Skill skill = skillRepository.findByNameIgnoreCase(trimmed)
                    .orElseGet(() -> skillRepository.save(new Skill(trimmed)));

            UserSkill userSkill = new UserSkill(user, skill);
            userSkillRepository.save(userSkill);
            updatedSkills.add(SkillDto.fromEntity(skill));
        }

        return updatedSkills;
    }
}
