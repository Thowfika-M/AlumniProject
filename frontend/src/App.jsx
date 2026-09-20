import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import StudentProfilePage from './pages/StudentProfilePage';
import AlumniProfilePage from './pages/AlumniProfilePage';
import { User, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

function StudentDashboardHub() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Student Portal Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Access direct alumni mentorship, job board, and AI career tools.</p>
        </div>
        <Link to="/student/profile" className="btn btn-primary">
          <User size={16} /> Manage Student Profile
        </Link>
      </div>

      <div className="grid-cols-3">
        <div className="glass-card">
          <GraduationCap size={28} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <h3>Student Profile</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.25rem' }}>
            Update your academic details, career goals, and technical skill tags.
          </p>
          <Link to="/student/profile" className="btn btn-secondary btn-sm">
            View & Edit Profile <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-card">
          <Briefcase size={28} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
          <h3>Alumni Directory</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.25rem' }}>
            Browse verified alumni mentors and request career guidance.
          </p>
          <Link to="/alumni" className="btn btn-secondary btn-sm">
            Find Mentors <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function AlumniDashboardHub() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Alumni Mentor Hub</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your mentorship profile, post jobs, and connect with students.</p>
        </div>
        <Link to="/alumni/profile" className="btn btn-primary">
          <User size={16} /> Manage Alumni Profile
        </Link>
      </div>

      <div className="grid-cols-3">
        <div className="glass-card">
          <User size={28} style={{ color: 'var(--accent-emerald)', marginBottom: '1rem' }} />
          <h3>Alumni Profile</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.25rem' }}>
            Update your company, job role, experience years, and mentorship areas.
          </p>
          <Link to="/alumni/profile" className="btn btn-secondary btn-sm">
            Edit Alumni Profile <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function AdminDashboardHub() {
  return (
    <div className="glass-panel" style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Operations Dashboard</h1>
      <p style={{ color: 'var(--text-muted)' }}>System Moderation, Statistics Query Engine, and User Account Management.</p>
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

              {/* Student Protected Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT']}>
                    <StudentDashboardHub />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/profile"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT']}>
                    <StudentProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Alumni Protected Routes */}
              <Route
                path="/alumni/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ALUMNI']}>
                    <AlumniDashboardHub />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/alumni/profile"
                element={
                  <ProtectedRoute allowedRoles={['ALUMNI']}>
                    <AlumniProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AdminDashboardHub />
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
