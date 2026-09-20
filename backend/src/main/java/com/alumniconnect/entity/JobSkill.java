package com.alumniconnect.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "job_skills")
public class JobSkill {

    @EmbeddedId
    private JobSkillId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("jobId")
    @JoinColumn(name = "job_id")
    private Job job;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("skillId")
    @JoinColumn(name = "skill_id")
    private Skill skill;

    public JobSkill() {}

    public JobSkill(Job job, Skill skill) {
        this.job = job;
        this.skill = skill;
        this.id = new JobSkillId(job.getId(), skill.getId());
    }

    public JobSkillId getId() { return id; }
    public void setId(JobSkillId id) { this.id = id; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
}
