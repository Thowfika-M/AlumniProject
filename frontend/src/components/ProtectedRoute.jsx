import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Verifying Authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--accent-rose)', marginBottom: '1rem' }}>Access Restricted</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          You do not have the required permissions ({allowedRoles.join(', ')}) to access this page. Your role is: <strong>{user.role}</strong>.
        </p>
      </div>
    );
  }

  return children;
}
