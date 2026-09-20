-- V5__create_events_mentorship_notifications_tables.sql: Events, Mentorship, and Notification Schema

CREATE TABLE IF NOT EXISTS events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    organizer_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    event_date VARCHAR(20) NOT NULL,
    event_time VARCHAR(20) NOT NULL,
    location VARCHAR(150) NOT NULL,
    online_link VARCHAR(255),
    event_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_events_organizer FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS event_participants (
    event_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id, user_id),
    CONSTRAINT fk_ep_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    CONSTRAINT fk_ep_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mentorships (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    alumni_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'REQUESTED',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP NULL,
    CONSTRAINT fk_m_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_m_alumni FOREIGN KEY (alumni_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed Initial Events (Organized by Sarah Jenkins - User 2)
INSERT INTO events (organizer_id, title, description, event_date, event_time, location, online_link, event_type) VALUES 
(2, 'Annual Alumni & Student Networking Summit 2026', 'Connect directly with industry leaders, hiring managers, and alumni mentors across tech verticals.', '2026-10-15', '18:00 EST', 'Main Auditorium & Online', 'https://zoom.us/j/alumni_summit_2026', 'NETWORKING'),
(2, 'Mastering System Design & Microservices', 'Hands-on technical workshop covering distributed databases, caching strategies, and Spring Boot microservices.', '2026-10-22', '14:00 EST', 'Virtual Zoom Workshop', 'https://zoom.us/j/system_design_workshop', 'TECHNICAL_WORKSHOP');

-- Seed Event Registration (John Doe - User 3 registered for Event 1)
INSERT INTO event_participants (event_id, user_id) VALUES (1, 3);

-- Seed Initial Mentorship Request (John Doe -> Sarah Jenkins)
INSERT INTO mentorships (student_id, alumni_id, status) VALUES (3, 2, 'ACCEPTED');

-- Seed Initial Notification for John Doe
INSERT INTO notifications (user_id, type, message) VALUES 
(3, 'MENTORSHIP', 'Sarah Jenkins accepted your 1-on-1 mentorship request!'),
(3, 'JOB_APPLICATION', 'Your application for Graduate Backend Software Engineer is now UNDER_REVIEW.');
