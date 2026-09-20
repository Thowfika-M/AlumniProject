package com.alumniconnect.controller;

import com.alumniconnect.dto.SkillDto;
import com.alumniconnect.service.SkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<SkillDto>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @PostMapping
    public ResponseEntity<SkillDto> createSkill(@RequestParam String name) {
        SkillDto created = skillService.createSkill(name);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
