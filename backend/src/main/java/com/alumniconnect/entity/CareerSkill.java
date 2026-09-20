package com.alumniconnect.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "career_skills")
public class CareerSkill {

    @EmbeddedId
    private CareerSkillId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("careerTemplateId")
    @JoinColumn(name = "career_template_id")
    private CareerTemplate careerTemplate;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("skillId")
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Column(nullable = false, length = 20)
    private String importance = "HIGH";

    public CareerSkill() {}

    public CareerSkill(CareerTemplate careerTemplate, Skill skill, String importance) {
        this.careerTemplate = careerTemplate;
        this.skill = skill;
        this.importance = importance != null ? importance : "HIGH";
        this.id = new CareerSkillId(careerTemplate.getId(), skill.getId());
    }

    public CareerSkillId getId() { return id; }
    public void setId(CareerSkillId id) { this.id = id; }

    public CareerTemplate getCareerTemplate() { return careerTemplate; }
    public void setCareerTemplate(CareerTemplate careerTemplate) { this.careerTemplate = careerTemplate; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }

    public String getImportance() { return importance; }
    public void setImportance(String importance) { this.importance = importance; }
}
