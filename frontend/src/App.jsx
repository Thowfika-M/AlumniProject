import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import AlumniShowcase from './pages/AlumniShowcase';
import EventsPreview from './pages/EventsPreview';
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard Placeholders (Full feature implementations in subsequent phases)
function StudentDashboardPlaceholder() {
  return (
    <div className="glass-panel" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Student Dashboard</h1>
      <p style={{ color: 'var(--text-muted)' }}>Welcome to your Student Portal. Profile, mentorship, job applications & AI career guidance tools will populate here.</p>
    </div>
  );
}

function AlumniDashboardPlaceholder() {
  return (
    <div className="glass-panel" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Alumni Dashboard</h1>
      <p style={{ color: 'var(--text-muted)' }}>Welcome to your Alumni Mentor Hub. Post jobs, respond to mentorship requests, and manage events here.</p>
    </div>
  );
}

function AdminDashboardPlaceholder() {
  return (
    <div className="glass-panel" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
      <p style={{ color: 'var(--text-muted)' }}>System Statistics, User Moderation, Job approvals, and Platform Audits.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/alumni" element={<AlumniShowcase />} />
              <Route path="/events" element={<EventsPreview />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Dashboard Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT']}>
                    <StudentDashboardPlaceholder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/alumni/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ALUMNI']}>
                    <AlumniDashboardPlaceholder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AdminDashboardPlaceholder />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
