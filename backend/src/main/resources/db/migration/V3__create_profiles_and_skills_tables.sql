-- V3__create_profiles_and_skills_tables.sql: Student & Alumni Profiles and Relational Skills Schema

CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    student_id VARCHAR(50),
    department VARCHAR(100),
    college VARCHAR(150),
    graduation_year INT,
    career_goal VARCHAR(255),
    interests TEXT,
    resume_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_student_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS alumni_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    graduation_year INT,
    department VARCHAR(100),
    college VARCHAR(150),
    current_company VARCHAR(150),
    job_role VARCHAR(150),
    experience_years INT,
    location VARCHAR(150),
    bio TEXT,
    mentorship_areas VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_alumni_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_skills (
    user_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, skill_id),
    CONSTRAINT fk_user_skills_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_skills_skill FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- Seed Common Standard Skills
INSERT INTO skills (name) VALUES 
('Java'), ('Spring Boot'), ('SQL'), ('MySQL'), ('REST APIs'), ('React.js'), 
('JavaScript'), ('Python'), ('AWS'), ('Docker'), ('Kubernetes'), ('Git'), 
('System Design'), ('DevOps'), ('Data Structures'), ('Machine Learning'), ('Microservices');

-- Seed Sample Alumni Profile (for Sarah Jenkins - User ID 2)
INSERT INTO alumni_profiles (user_id, graduation_year, department, college, current_company, job_role, experience_years, location, bio, mentorship_areas) VALUES 
(2, 2020, 'Computer Science', 'Stanford University', 'Google', 'Senior Software Engineer', 6, 'San Francisco, CA', 'Passionate backend engineer specializing in distributed systems, Spring Boot, and cloud architecture. Available for mock interviews and resume feedback.', 'Backend Development, System Design, Career Growth');

-- Seed Sample Student Profile (for John Doe - User ID 3)
INSERT INTO student_profiles (user_id, student_id, department, college, graduation_year, career_goal, interests) VALUES 
(3, 'STU-2024-001', 'Computer Science', 'Stanford University', 2026, 'Full Stack Java & React Developer', 'Web Application Development, Cloud Computing, System Architecture');

-- Link Skills to Users
-- Sarah (User 2): Java (1), Spring Boot (2), SQL (3), REST APIs (5), System Design (13), Microservices (17)
INSERT INTO user_skills (user_id, skill_id) VALUES (2, 1), (2, 2), (2, 3), (2, 5), (2, 13), (2, 17);

-- John (User 3): Java (1), SQL (3), Git (12), React.js (6)
INSERT INTO user_skills (user_id, skill_id) VALUES (3, 1), (3, 3), (3, 6), (3, 12);
