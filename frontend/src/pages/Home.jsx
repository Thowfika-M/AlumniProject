import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Briefcase, GraduationCap, Target, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import apiClient from '../api/apiClient';

export default function Home() {
  const [healthStatus, setHealthStatus] = useState('Checking...');

  useEffect(() => {
    apiClient.get('/health')
      .then(res => setHealthStatus(`Backend Online (${res.data.status})`))
      .catch(() => setHealthStatus('Backend Offline'));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 1rem 2rem',
        position: 'relative',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(79, 70, 229, 0.12)',
          border: '1px solid rgba(79, 70, 229, 0.3)',
          color: '#a5b4fc',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={16} /> AI-Powered College Capstone Platform
          <span style={{
            marginLeft: '0.5rem',
            padding: '2px 8px',
            borderRadius: '10px',
            background: healthStatus.includes('Online') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
            color: healthStatus.includes('Online') ? '#6ee7b7' : '#fda4af',
            fontSize: '0.75rem'
          }}>
            {healthStatus}
          </span>
        </div>

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          lineHeight: 1.15,
          maxWidth: '900px',
          margin: '0 auto 1.5rem',
        }}>
          Bridge the Gap Between <span className="text-gradient">Students & Alumni</span> Through AI Guidance
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          maxWidth: '700px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7
        }}>
          Connect directly with verified alumni, receive personalized mentorship, apply to alumni-posted jobs, and leverage deterministic skill gap recommendations.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
            Join AlumniConnect <ArrowRight size={18} />
          </Link>
          <Link to="/alumni" className="btn btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
            Explore Mentors & Alumni
          </Link>
        </div>
      </section>

      {/* Live Statistics Cards */}
      <section className="grid-cols-4">
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.15)', color: '#818cf8' }}>
            <Users size={28} />
          </div>
          <div>
            <div className="stat-number">500+</div>
            <div className="stat-label">Active Alumni Mentors</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8' }}>
            <GraduationCap size={28} />
          </div>
          <div>
            <div className="stat-number">1,200+</div>
            <div className="stat-label">Registered Students</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <Briefcase size={28} />
          </div>
          <div>
            <div className="stat-number">350+</div>
            <div className="stat-label">Jobs & Internships Posted</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Zap size={28} />
          </div>
          <div>
            <div className="stat-number">98%</div>
            <div className="stat-label">Skill Gap Match Accuracy</div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Designed for Modern Career Excellence</h2>
          <p style={{ color: 'var(--text-muted)' }}>Empowering both students and alumni with tailored features</p>
        </div>

        <div className="grid-cols-3">
          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(79, 70, 229, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', marginBottom: '1.25rem' }}>
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Alumni Mentorship</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Request 1-on-1 mentorship with alumni in your desired tech domain, receive resume reviews, and get placement guidance.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc', marginBottom: '1.25rem' }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Skill Gap Analysis</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Select target roles like Full Stack Developer or DevOps Engineer and compare your current skills against industry career templates.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', marginBottom: '1.25rem' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>AI Career Assistant</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Engage with an intelligent AI Assistant that preserves conversation history and offers personalized learning roadmaps.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
