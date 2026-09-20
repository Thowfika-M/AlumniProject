-- V2__create_users_table.sql: Users schema definition and seed data
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    phone VARCHAR(20),
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed Initial Users (Password: password123)
-- BCrypt Hash for 'password123': $2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym5p.O4tWbJ2w7dCqG3C.O
INSERT INTO users (name, email, password_hash, role, phone, enabled) VALUES 
('System Admin', 'admin@alumniconnect.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym5p.O4tWbJ2w7dCqG3C.O', 'ADMIN', '+15550000000', true),
('Sarah Jenkins', 'sarah.alumni@google.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym5p.O4tWbJ2w7dCqG3C.O', 'ALUMNI', '+15551112222', true),
('John Doe', 'john.student@college.edu', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym5p.O4tWbJ2w7dCqG3C.O', 'STUDENT', '+15553334444', true);
