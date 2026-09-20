package com.alumniconnect.dto;

import com.alumniconnect.entity.CareerTemplate;
import java.util.List;

public class CareerTemplateResponse {

    private Long id;
    private String name;
    private String description;
    private List<SkillDto> requiredSkills;

    public CareerTemplateResponse() {}

    public CareerTemplateResponse(Long id, String name, String description, List<SkillDto> requiredSkills) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.requiredSkills = requiredSkills;
    }

    public static CareerTemplateResponse fromEntity(CareerTemplate template, List<SkillDto> requiredSkills) {
        return new CareerTemplateResponse(template.getId(), template.getName(), template.getDescription(), requiredSkills);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<SkillDto> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<SkillDto> requiredSkills) { this.requiredSkills = requiredSkills; }
}
