package com.alumniconnect.service;

import com.alumniconnect.dto.SkillDto;
import com.alumniconnect.dto.StudentProfileRequest;
import com.alumniconnect.dto.StudentProfileResponse;
import com.alumniconnect.entity.StudentProfile;
import com.alumniconnect.entity.User;
import com.alumniconnect.repository.StudentProfileRepository;
import com.alumniconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentProfileService {

    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final SkillService skillService;

    public StudentProfileService(StudentProfileRepository studentProfileRepository, UserRepository userRepository, SkillService skillService) {
        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
        this.skillService = skillService;
    }

    public StudentProfileResponse getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        StudentProfile profile = studentProfileRepository.findByUser(user)
                .orElseGet(() -> {
                    StudentProfile newProfile = new StudentProfile();
                    newProfile.setUser(user);
                    return studentProfileRepository.save(newProfile);
                });

        List<SkillDto> skills = skillService.getUserSkills(user.getId());
        return StudentProfileResponse.fromEntity(profile, skills);
    }

    @Transactional
    public StudentProfileResponse updateProfile(String email, StudentProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        StudentProfile profile = studentProfileRepository.findByUser(user)
                .orElseGet(() -> {
                    StudentProfile newProfile = new StudentProfile();
                    newProfile.setUser(user);
                    return newProfile;
                });

        if (request.getStudentId() != null) profile.setStudentId(request.getStudentId());
        if (request.getDepartment() != null) profile.setDepartment(request.getDepartment());
        if (request.getCollege() != null) profile.setCollege(request.getCollege());
        if (request.getGraduationYear() != null) profile.setGraduationYear(request.getGraduationYear());
        if (request.getCareerGoal() != null) profile.setCareerGoal(request.getCareerGoal());
        if (request.getInterests() != null) profile.setInterests(request.getInterests());
        if (request.getResumeUrl() != null) profile.setResumeUrl(request.getResumeUrl());

        StudentProfile savedProfile = studentProfileRepository.save(profile);

        List<SkillDto> updatedSkills = skillService.getUserSkills(user.getId());
        if (request.getSkills() != null) {
            updatedSkills = skillService.updateUserSkills(user, request.getSkills());
        }

        return StudentProfileResponse.fromEntity(savedProfile, updatedSkills);
    }
}
