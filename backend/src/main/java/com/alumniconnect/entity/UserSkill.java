package com.alumniconnect.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_skills")
public class UserSkill {

    @EmbeddedId
    private UserSkillId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("skillId")
    @JoinColumn(name = "skill_id")
    private Skill skill;

    public UserSkill() {}

    public UserSkill(User user, Skill skill) {
        this.user = user;
        this.skill = skill;
        this.id = new UserSkillId(user.getId(), skill.getId());
    }

    public UserSkillId getId() { return id; }
    public void setId(UserSkillId id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
}
