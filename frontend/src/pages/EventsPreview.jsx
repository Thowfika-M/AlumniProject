import React from 'react';
import { Calendar, Clock, MapPin, Users, Video } from 'lucide-react';

export default function EventsPreview() {
  const events = [
    { id: 1, title: 'Annual Alumni & Student Networking Summit 2026', type: 'NETWORKING', date: '2026-10-15', time: '18:00 EST', location: 'Main Auditorium & Online Stream', organizer: 'Alumni Association' },
    { id: 2, title: 'Mastering System Design & Microservices', type: 'TECHNICAL_WORKSHOP', date: '2026-10-22', time: '14:00 EST', location: 'Virtual (Zoom)', organizer: 'Sarah Jenkins (Google)' },
    { id: 3, title: 'Resume Review & Mock Interview Prep', type: 'CAREER_GUIDANCE', date: '2026-11-05', time: '16:30 EST', location: 'Virtual (Google Meet)', organizer: 'Alex Rivera (AWS)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Upcoming Campus & Alumni Events</h1>
        <p style={{ color: 'var(--text-muted)' }}>Participate in workshops, webinars, and networking sessions hosted by alumni.</p>
      </div>

      <div className="grid-cols-3">
        {events.map(event => (
          <div key={event.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span className="badge badge-student" style={{ width: 'fit-content' }}>{event.type.replace('_', ' ')}</span>
            <h3 style={{ fontSize: '1.2rem' }}>{event.title}</h3>
            
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={15} style={{ color: 'var(--primary)' }} /> {event.date}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={15} style={{ color: 'var(--secondary)' }} /> {event.time}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={15} style={{ color: 'var(--accent-purple)' }} /> {event.location}</div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Host: {event.organizer}</span>
              <button className="btn btn-secondary btn-sm">Register</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
