import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Calendar, LogIn, UserPlus, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    if (user.role === 'STUDENT') return '/student/dashboard';
    if (user.role === 'ALUMNI') return '/alumni/dashboard';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    return '/';
  };

  const getBadgeClass = (role) => {
    if (role === 'STUDENT') return 'badge badge-student';
    if (role === 'ALUMNI') return 'badge badge-alumni';
    return 'badge badge-admin';
  };

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
          {isAuthenticated ? (
            <>
              <Link to={getDashboardPath()} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LayoutDashboard size={15} /> Dashboard
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
                <User size={15} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{user.name}</span>
                <span className={getBadgeClass(user.role)} style={{ fontSize: '0.7rem', padding: '1px 6px' }}>{user.role}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                <LogIn size={15} /> Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <UserPlus size={15} /> Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
