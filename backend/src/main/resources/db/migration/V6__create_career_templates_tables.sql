-- V6__create_career_templates_tables.sql: Career Templates and Skill Requirements Schema

CREATE TABLE IF NOT EXISTS career_templates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS career_skills (
    career_template_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    importance VARCHAR(20) NOT NULL DEFAULT 'HIGH',
    PRIMARY KEY (career_template_id, skill_id),
    CONSTRAINT fk_cs_template FOREIGN KEY (career_template_id) REFERENCES career_templates(id) ON DELETE CASCADE,
    CONSTRAINT fk_cs_skill FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- Seed Standard Career Templates
INSERT INTO career_templates (name, description) VALUES 
('Java Backend Engineer', 'Specializes in server-side application logic, RESTful microservices, transactional databases, and enterprise Java backend architectures.'),
('DevOps & Cloud Engineer', 'Focuses on continuous integration/continuous deployment (CI/CD), containerization, cloud infrastructure automation, and system reliability.'),
('Full Stack Developer', 'End-to-end web developer building responsive React.js frontends and robust Spring Boot backend REST APIs.'),
('Data Scientist & AI Engineer', 'Analyzes complex datasets, builds machine learning models, and develops intelligent data-driven software solutions.');

-- Link Skills to Career Templates
-- 1. Java Backend Engineer: Java (1), Spring Boot (2), SQL (3), REST APIs (5), Git (12), System Design (13), Microservices (17)
INSERT INTO career_skills (career_template_id, skill_id, importance) VALUES 
(1, 1, 'HIGH'), (1, 2, 'HIGH'), (1, 3, 'HIGH'), (1, 5, 'HIGH'), (1, 12, 'MEDIUM'), (1, 13, 'HIGH'), (1, 17, 'HIGH');

-- 2. DevOps & Cloud Engineer: AWS (9), Docker (10), Kubernetes (11), Git (12), System Design (13), DevOps (14)
INSERT INTO career_skills (career_template_id, skill_id, importance) VALUES 
(2, 9, 'HIGH'), (2, 10, 'HIGH'), (2, 11, 'HIGH'), (2, 12, 'MEDIUM'), (2, 13, 'HIGH'), (2, 14, 'HIGH');

-- 3. Full Stack Developer: Java (1), Spring Boot (2), SQL (3), REST APIs (5), React.js (6), JavaScript (7), Git (12)
INSERT INTO career_skills (career_template_id, skill_id, importance) VALUES 
(3, 1, 'HIGH'), (3, 2, 'HIGH'), (3, 3, 'HIGH'), (3, 5, 'HIGH'), (3, 6, 'HIGH'), (3, 7, 'HIGH'), (3, 12, 'MEDIUM');

-- 4. Data Scientist & AI Engineer: Python (8), SQL (3), Data Structures (15), Machine Learning (16)
INSERT INTO career_skills (career_template_id, skill_id, importance) VALUES 
(4, 8, 'HIGH'), (4, 3, 'MEDIUM'), (4, 15, 'HIGH'), (4, 16, 'HIGH');
