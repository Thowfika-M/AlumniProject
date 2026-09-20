-- V4__create_jobs_and_applications_tables.sql: Job Posting & Application Schema

CREATE TABLE IF NOT EXISTS jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    posted_by_alumni_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    job_type VARCHAR(50) NOT NULL,
    experience_required INT NOT NULL DEFAULT 0,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closing_date TIMESTAMP NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    CONSTRAINT fk_jobs_alumni FOREIGN KEY (posted_by_alumni_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS job_skills (
    job_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    PRIMARY KEY (job_id, skill_id),
    CONSTRAINT fk_job_skills_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT fk_job_skills_skill FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    resume_url VARCHAR(255) NOT NULL,
    cover_message TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'APPLIED',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uk_job_student UNIQUE (job_id, student_id),
    CONSTRAINT fk_apps_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT fk_apps_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed Initial Jobs (Posted by Sarah Jenkins - User ID 2)
INSERT INTO jobs (posted_by_alumni_id, title, company, description, location, job_type, experience_required, status) VALUES 
(2, 'Graduate Backend Software Engineer', 'Google', 'We are looking for enthusiastic computer science graduates to join our Cloud Infrastructure & Microservices team. You will work on scalable Java Spring Boot backend services.', 'San Francisco, CA (Hybrid)', 'FULL_TIME', 0, 'OPEN'),
(2, 'DevOps & Cloud Systems Intern', 'Google', 'Summer Internship opportunity for students passionate about Docker, Kubernetes, AWS, and CI/CD pipelines.', 'Mountain View, CA', 'INTERNSHIP', 0, 'OPEN');

-- Link Job Required Skills
-- Job 1 (Backend Engineer): Java (1), Spring Boot (2), SQL (3), REST APIs (5)
INSERT INTO job_skills (job_id, skill_id) VALUES (1, 1), (1, 2), (1, 3), (1, 5);

-- Job 2 (DevOps Intern): Docker (10), Kubernetes (11), AWS (9), Git (12)
INSERT INTO job_skills (job_id, skill_id) VALUES (2, 9), (2, 10), (2, 11), (2, 12);

-- Seed Sample Application (by John Doe - User ID 3 for Job 1)
INSERT INTO applications (job_id, student_id, resume_url, cover_message, status) VALUES 
(1, 3, 'uploads/resumes/john_doe_resume.pdf', 'Dear Hiring Manager, I am a senior CS student with strong Java and Spring Boot experience. I would love to contribute to Google Cloud.', 'UNDER_REVIEW');
