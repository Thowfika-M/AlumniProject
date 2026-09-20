package com.alumniconnect.dto;

import com.alumniconnect.entity.Skill;

public class SkillDto {

    private Long id;
    private String name;

    public SkillDto() {}

    public SkillDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static SkillDto fromEntity(Skill skill) {
        return new SkillDto(skill.getId(), skill.getName());
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
