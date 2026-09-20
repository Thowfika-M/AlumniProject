package com.alumniconnect.service;

import com.alumniconnect.dto.AlumniProfileRequest;
import com.alumniconnect.dto.AlumniProfileResponse;
import com.alumniconnect.dto.SkillDto;
import com.alumniconnect.entity.AlumniProfile;
import com.alumniconnect.entity.User;
import com.alumniconnect.repository.AlumniProfileRepository;
import com.alumniconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlumniProfileService {

    private final AlumniProfileRepository alumniProfileRepository;
    private final UserRepository userRepository;
    private final SkillService skillService;

    public AlumniProfileService(AlumniProfileRepository alumniProfileRepository, UserRepository userRepository, SkillService skillService) {
        this.alumniProfileRepository = alumniProfileRepository;
        this.userRepository = userRepository;
        this.skillService = skillService;
    }

    public AlumniProfileResponse getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        AlumniProfile profile = alumniProfileRepository.findByUser(user)
                .orElseGet(() -> {
                    AlumniProfile newProfile = new AlumniProfile();
                    newProfile.setUser(user);
                    return alumniProfileRepository.save(newProfile);
                });

        List<SkillDto> skills = skillService.getUserSkills(user.getId());
        return AlumniProfileResponse.fromEntity(profile, skills);
    }

    public AlumniProfileResponse getProfileById(Long id) {
        AlumniProfile profile = alumniProfileRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Alumni profile not found with ID: " + id));

        List<SkillDto> skills = skillService.getUserSkills(profile.getUser().getId());
        return AlumniProfileResponse.fromEntity(profile, skills);
    }

    public List<AlumniProfileResponse> getAllAlumni(String query) {
        List<AlumniProfile> list = alumniProfileRepository.searchAlumni(query);
        return list.stream()
                .map(profile -> {
                    List<SkillDto> skills = skillService.getUserSkills(profile.getUser().getId());
                    return AlumniProfileResponse.fromEntity(profile, skills);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public AlumniProfileResponse updateProfile(String email, AlumniProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        AlumniProfile profile = alumniProfileRepository.findByUser(user)
                .orElseGet(() -> {
                    AlumniProfile newProfile = new AlumniProfile();
                    newProfile.setUser(user);
                    return newProfile;
                });

        if (request.getGraduationYear() != null) profile.setGraduationYear(request.getGraduationYear());
        if (request.getDepartment() != null) profile.setDepartment(request.getDepartment());
        if (request.getCollege() != null) profile.setCollege(request.getCollege());
        if (request.getCurrentCompany() != null) profile.setCurrentCompany(request.getCurrentCompany());
        if (request.getJobRole() != null) profile.setJobRole(request.getJobRole());
        if (request.getExperienceYears() != null) profile.setExperienceYears(request.getExperienceYears());
        if (request.getLocation() != null) profile.setLocation(request.getLocation());
        if (request.getBio() != null) profile.setBio(request.getBio());
        if (request.getMentorshipAreas() != null) profile.setMentorshipAreas(request.getMentorshipAreas());

        AlumniProfile savedProfile = alumniProfileRepository.save(profile);

        List<SkillDto> updatedSkills = skillService.getUserSkills(user.getId());
        if (request.getSkills() != null) {
            updatedSkills = skillService.updateUserSkills(user, request.getSkills());
        }

        return AlumniProfileResponse.fromEntity(savedProfile, updatedSkills);
    }
}
