import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(11, 15, 25, 0.95)',
      borderTop: '1px solid var(--border-glass)',
      padding: '3rem 1.5rem 1.5rem',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <GraduationCap size={24} style={{ color: 'var(--primary)' }} />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', color: '#fff' }}>
                Alumni<span className="text-gradient">Connect</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Empowering students with direct alumni mentorship, AI-driven career recommendations, job opportunities, and skill gap roadmap analysis.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1rem' }}>Platform Features</h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>Direct Alumni Mentorship</li>
              <li>AI Career Assistant</li>
              <li>Skill Gap Analysis Engine</li>
              <li>Job & Internship Board</li>
              <li>Alumni & Student Events</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1rem' }}>User Roles</h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>Student Portal</li>
              <li>Alumni Mentor Hub</li>
              <li>Admin Moderation Console</li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-glass)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-dim)',
        }}>
          <span>© {new Date().getFullYear()} AlumniConnect. Production Capstone Application.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Built with <Heart size={14} style={{ color: 'var(--accent-rose)' }} /> for Student & Alumni Networking
          </span>
        </div>
      </div>
    </footer>
  );
}
