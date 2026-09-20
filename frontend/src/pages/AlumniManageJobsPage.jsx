import React, { useState, useEffect } from 'react';
import { Plus, Briefcase, Users, FileText, CheckCircle2, AlertCircle, X, Trash2 } from 'lucide-react';
import { jobService } from '../api/jobService';
import { applicationService } from '../api/applicationService';
import SkillSelector from '../components/SkillSelector';

export default function AlumniManageJobsPage() {
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    jobType: 'FULL_TIME',
    experienceRequired: 0,
    requiredSkills: [],
  });

  const [selectedJobApplicants, setSelectedJobApplicants] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const fetchMyJobs = async () => {
    setLoading(true);
    try {
      const data = await jobService.getMyPostedJobs();
      setPostedJobs(data);
    } catch (err) {
      console.error("Failed to load alumni posted jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleCreateJobSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    try {
      await jobService.createJob(newJob);
      setMsg({ text: 'Job posting published successfully!', type: 'success' });
      setShowCreateModal(false);
      setNewJob({
        title: '',
        company: '',
        description: '',
        location: '',
        jobType: 'FULL_TIME',
        experienceRequired: 0,
        requiredSkills: [],
      });
      fetchMyJobs();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to publish job', type: 'error' });
    }
  };

  const handleViewApplicants = async (job) => {
    setSelectedJobApplicants(job);
    try {
      const list = await applicationService.getJobApplications(job.id);
      setApplicants(list);
    } catch (err) {
      console.error("Failed to fetch applicants:", err);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await applicationService.updateStatus(appId, newStatus);
      setApplicants(applicants.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update application status');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await jobService.deleteJob(jobId);
      setPostedJobs(postedJobs.filter(j => j.id !== jobId));
    } catch (err) {
      alert("Failed to delete job posting");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Manage Posted Jobs</h1>
          <p style={{ color: 'var(--text-muted)' }}>Publish tech roles and review student applications.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus size={18} /> Post New Job
        </button>
      </div>

      {msg.text && (
        <div style={{
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-sm)',
          background: msg.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
          border: `1px solid ${msg.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
          color: msg.type === 'success' ? '#6ee7b7' : '#fda4af',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />} {msg.text}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading Posted Jobs...</div>
      ) : postedJobs.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <Briefcase size={40} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
          <h3>No Jobs Posted Yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Click "Post New Job" to publish opportunities for students.</p>
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} /> Post First Job
          </button>
        </div>
      ) : (
        <div className="grid-cols-2">
          {postedJobs.map(job => (
            <div key={job.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-student" style={{ marginBottom: '0.5rem' }}>{job.jobType}</span>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{job.title}</h3>
                  <div style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.95rem' }}>{job.company} • {job.location}</div>
                </div>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {job.requiredSkills && job.requiredSkills.map((skill, i) => (
                  <span key={i} className="badge badge-skill">{skill.name}</span>
                ))}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status: {job.status}</span>
                <button className="btn btn-secondary btn-sm" onClick={() => handleViewApplicants(job)}>
                  <Users size={15} /> Review Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Post Job Modal */}
      {showCreateModal && (
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
          <div className="glass-panel" style={{ maxWidth: '650px', width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button
              onClick={() => setShowCreateModal(false)}
              style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Post New Job / Internship</h2>

            <form onSubmit={handleCreateJobSubmit}>
              <div className="grid-cols-2">
                <div className="form-group">
                  <label className="form-label">Job Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Backend Software Engineer"
                    required
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Google / AWS"
                    required
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="San Francisco, CA (Hybrid)"
                    required
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Job Type</label>
                  <select
                    className="form-select"
                    value={newJob.jobType}
                    onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
                  >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="CONTRACT">Contract</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Job Description & Responsibilities</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  required
                  placeholder="Outline expectations, tech stack, and qualifications..."
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Required Skills Catalog</label>
                <SkillSelector
                  selectedSkills={newJob.requiredSkills}
                  onChange={(skills) => setNewJob({ ...newJob, requiredSkills: skills })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                Publish Job Posting
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Review Applicants Modal */}
      {selectedJobApplicants && (
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
          <div className="glass-panel" style={{ maxWidth: '750px', width: '100%', position: 'relative', maxHeight: '85vh', overflowY: 'auto' }}>
            <button
              onClick={() => setSelectedJobApplicants(null)}
              style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Applicants for {selectedJobApplicants.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{applicants.length} Student Application(s)</p>

            {applicants.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No student applications submitted yet for this job posting.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {applicants.map(app => (
                  <div key={app.id} className="glass-card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>{app.student?.name}</h4>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{app.student?.email}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status:</span>
                        <select
                          className="form-select"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', width: 'auto' }}
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        >
                          <option value="APPLIED">APPLIED</option>
                          <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                          <option value="SHORTLISTED">SHORTLISTED</option>
                          <option value="REJECTED">REJECTED</option>
                          <option value="SELECTED">SELECTED</option>
                        </select>
                      </div>
                    </div>

                    {app.coverMessage && (
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '0.75rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                        "{app.coverMessage}"
                      </p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      <span>Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                      <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                        <FileText size={14} /> Review Student Resume
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
