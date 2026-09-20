package com.alumniconnect.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CareerSkillId implements Serializable {

    private Long careerTemplateId;
    private Long skillId;

    public CareerSkillId() {}

    public CareerSkillId(Long careerTemplateId, Long skillId) {
        this.careerTemplateId = careerTemplateId;
        this.skillId = skillId;
    }

    public Long getCareerTemplateId() { return careerTemplateId; }
    public void setCareerTemplateId(Long careerTemplateId) { this.careerTemplateId = careerTemplateId; }

    public Long getSkillId() { return skillId; }
    public void setSkillId(Long skillId) { this.skillId = skillId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CareerSkillId that = (CareerSkillId) o;
        return Objects.equals(careerTemplateId, that.careerTemplateId) && Objects.equals(skillId, that.skillId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(careerTemplateId, skillId);
    }
}
