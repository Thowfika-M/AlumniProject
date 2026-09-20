import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import AlumniShowcase from './pages/AlumniShowcase';
import EventsPage from './pages/EventsPage';
import MentorshipPage from './pages/MentorshipPage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentProfilePage from './pages/StudentProfilePage';
import AlumniProfilePage from './pages/AlumniProfilePage';
import JobsPage from './pages/JobsPage';
import StudentApplicationsPage from './pages/StudentApplicationsPage';
import AlumniManageJobsPage from './pages/AlumniManageJobsPage';
import SkillGapAnalysisPage from './pages/SkillGapAnalysisPage';
import RecommendedJobsPage from './pages/RecommendedJobsPage';
import RecommendedAlumniPage from './pages/RecommendedAlumniPage';
import AICareerAssistantPage from './pages/AICareerAssistantPage';
import { User, Briefcase, GraduationCap, ArrowRight, FileText, MessageSquare, Calendar, Target, Sparkles, Bot, Users } from 'lucide-react';

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

      <div className="grid-cols-4">
        <div className="glass-card">
          <Bot size={28} style={{ color: 'var(--primary-light)', marginBottom: '1rem' }} />
          <h3>AI Career Assistant</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.25rem' }}>
            Chat with AI for career roadmaps, resume ATS review, and interview prep.
          </p>
          <Link to="/ai-assistant" className="btn btn-primary btn-sm">
            Launch AI Chat <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-card">
          <Target size={28} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
          <h3>Skill Gap Analysis</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.25rem' }}>
            Compare your current skills against industry role templates.
          </p>
          <Link to="/student/skill-gap" className="btn btn-secondary btn-sm">
            Run Skill Gap <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-card">
          <Sparkles size={28} style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }} />
          <h3>Recommended Jobs</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.25rem' }}>
            View job postings sorted by skill match accuracy.
          </p>
          <Link to="/student/recommended-jobs" className="btn btn-secondary btn-sm">
            View Job Matches <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-card">
          <Users size={28} style={{ color: 'var(--accent-emerald)', marginBottom: '1rem' }} />
          <h3>Mentor Matches</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.25rem' }}>
            Connect with alumni mentors matched to your tech stack.
          </p>
          <Link to="/student/recommended-alumni" className="btn btn-secondary btn-sm">
            View Mentors <ArrowRight size={14} />
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
            Update your company, job role, experience, and mentorship areas.
          </p>
          <Link to="/alumni/profile" className="btn btn-secondary btn-sm">
            Edit Profile <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-card">
          <Briefcase size={28} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <h3>Manage Jobs & Applicants</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.25rem' }}>
            Post job opportunities and review student resume submissions.
          </p>
          <Link to="/alumni/jobs" className="btn btn-secondary btn-sm">
            Manage Jobs <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-card">
          <MessageSquare size={28} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
          <h3>Mentorship Requests</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.25rem' }}>
            Review incoming student 1-on-1 mentorship requests.
          </p>
          <Link to="/mentorship" className="btn btn-secondary btn-sm">
            Review Requests <ArrowRight size={14} />
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
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/alumni" element={<AlumniShowcase />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/mentorship" element={<MentorshipPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/ai-assistant" element={<AICareerAssistantPage />} />

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
              <Route
                path="/student/applications"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT']}>
                    <StudentApplicationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/skill-gap"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT']}>
                    <SkillGapAnalysisPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/recommended-jobs"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT']}>
                    <RecommendedJobsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/recommended-alumni"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT']}>
                    <RecommendedAlumniPage />
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
              <Route
                path="/alumni/jobs"
                element={
                  <ProtectedRoute allowedRoles={['ALUMNI']}>
                    <AlumniManageJobsPage />
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
