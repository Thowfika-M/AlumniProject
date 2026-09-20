import React, { useState, useEffect } from 'react';
import { Search, Briefcase, MapPin, Clock, Upload, CheckCircle2, AlertCircle, X, Send } from 'lucide-react';
import { jobService } from '../api/jobService';
import { applicationService } from '../api/applicationService';
import { fileService } from '../api/fileService';
import { useAuth } from '../context/AuthContext';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [coverMessage, setCoverMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const { user, isAuthenticated } = useAuth();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobService.getAllJobs(search, jobType, 'OPEN');
      setJobs(data);
    } catch (err) {
      console.error("Failed to load job postings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchJobs, 300);
    return () => clearTimeout(timer);
  }, [search, jobType]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setMsg({ text: '', type: '' });
    try {
      const res = await fileService.uploadResume(file);
      setResumeUrl(res.resumeUrl);
      setMsg({ text: 'Resume PDF uploaded successfully!', type: 'success' });
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Resume upload failed', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!resumeUrl) {
      setMsg({ text: 'Please upload or provide a resume URL first.', type: 'error' });
      return;
    }

    setSubmitting(true);
    setMsg({ text: '', type: '' });

    try {
      await applicationService.applyForJob(selectedJob.id, { resumeUrl, coverMessage });
      setMsg({ text: 'Job Application submitted successfully!', type: 'success' });
      setTimeout(() => {
        setSelectedJob(null);
        setResumeUrl('');
        setCoverMessage('');
        setMsg({ text: '', type: '' });
      }, 1500);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to submit application.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Alumni Job & Internship Board</h1>
        <p style={{ color: 'var(--text-muted)' }}>Explore exclusive tech roles posted by alumni mentors.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.75rem' }}
            placeholder="Search jobs by title, company, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="form-select"
          style={{ width: '200px' }}
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">All Job Types</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="CONTRACT">Contract</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading Job Postings...</div>
      ) : jobs.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <Briefcase size={40} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
          <h3>No Job Postings Available</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Check back soon for new opportunities posted by alumni.</p>
        </div>
      ) : (
        <div className="grid-cols-2">
          {jobs.map(job => (
            <div key={job.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-student" style={{ marginBottom: '0.5rem' }}>{job.jobType}</span>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{job.title}</h3>
                  <div style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                    {job.company}
                  </div>
                </div>
                <span className="badge badge-alumni">Posted by Alumni</span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {job.location}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {job.experienceRequired} Yrs Exp</span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineClamp: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {job.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                {job.requiredSkills && job.requiredSkills.map((skill, i) => (
                  <span key={i} className="badge badge-skill">{skill.name}</span>
                ))}
              </div>

              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  Posted {new Date(job.postedAt).toLocaleDateString()}
                </span>
                {isAuthenticated && user.role === 'STUDENT' && (
                  <button className="btn btn-primary btn-sm" onClick={() => setSelectedJob(job)}>
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Modal */}
      {selectedJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ maxWidth: '600px', width: '100%', position: 'relative' }}>
            <button
              onClick={() => setSelectedJob(null)}
              style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Apply for {selectedJob.title}</h2>
            <p style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.5rem' }}>{selectedJob.company} • {selectedJob.location}</p>

            {msg.text && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: msg.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                border: `1px solid ${msg.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
                color: msg.type === 'success' ? '#6ee7b7' : '#fda4af',
                marginBottom: '1.25rem',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {msg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />} {msg.text}
              </div>
            )}

            <form onSubmit={handleApplySubmit}>
              <div className="form-group">
                <label className="form-label">Upload Student PDF Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="resume-upload-input"
                />
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <label htmlFor="resume-upload-input" className="btn btn-secondary" style={{ flex: 1, cursor: 'pointer' }}>
                    <Upload size={16} /> {uploading ? 'Uploading PDF...' : 'Choose Resume File'}
                  </label>
                </div>
                {resumeUrl && (
                  <div style={{ fontSize: '0.85rem', color: '#6ee7b7', marginTop: '0.5rem', wordBreak: 'break-all' }}>
                    Attached Resume: {resumeUrl}
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                <label className="form-label">Cover Note / Message to Alumni Recruiter</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Introduce yourself and explain why your skills match this role..."
                  value={coverMessage}
                  onChange={(e) => setCoverMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }} disabled={submitting}>
                <Send size={16} /> {submitting ? 'Submitting Application...' : 'Submit Job Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
