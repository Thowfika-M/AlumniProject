import React from 'react';
import { ShieldCheck, Cpu, Database, Lock, Layers } from 'lucide-react';

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>About <span className="text-gradient">AlumniConnect</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Production-structured College Capstone Platform connecting higher education ecosystems.
        </p>
      </div>

      <div className="glass-panel">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Architecture & Technical Integrity</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          AlumniConnect is built adhering to production standards: a decoupled React SPA frontend talking via RESTful JSON APIs to a Spring Boot 3 Java backend backed by a normalized MySQL relational database.
        </p>

        <div className="grid-cols-2" style={{ marginTop: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Lock size={20} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '1.1rem' }}>Security & Authorization</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Stateless JWT authentication, BCrypt password hashing, and role-based endpoint validation (STUDENT, ALUMNI, ADMIN).
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Cpu size={20} style={{ color: 'var(--secondary)' }} />
              <h3 style={{ fontSize: '1.1rem' }}>Modular Backend AI Adapter</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              AI operations run behind a backend `AIService` abstraction with zero API key exposure to the client.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
