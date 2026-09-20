import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Users, Briefcase, Calendar, Sparkles, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-glass)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-purple) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 15px var(--primary-glow)'
          }}>
            <GraduationCap size={24} />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.35rem', color: '#fff' }}>
            Alumni<span className="text-gradient">Connect</span>
          </span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <Link to="/" style={{
            color: isActive('/') ? '#fff' : 'var(--text-muted)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'color 0.2s',
          }}>Home</Link>
          
          <Link to="/about" style={{
            color: isActive('/about') ? '#fff' : 'var(--text-muted)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'color 0.2s',
          }}>About</Link>

          <Link to="/alumni" style={{
            color: isActive('/alumni') ? '#fff' : 'var(--text-muted)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'color 0.2s',
          }}>
            <Users size={16} /> Alumni Directory
          </Link>

          <Link to="/events" style={{
            color: isActive('/events') ? '#fff' : 'var(--text-muted)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'color 0.2s',
          }}>
            <Calendar size={16} /> Events
          </Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Link to="/login" className="btn btn-secondary btn-sm">
            <LogIn size={15} /> Login
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm">
            <UserPlus size={15} /> Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
