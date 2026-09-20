import React, { useEffect, useState } from 'react';
import { applicationService } from '../api/applicationService';
import { Briefcase, MapPin, Calendar, Clock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getMyApplications()
      .then(setApplications)
      .catch((err) => console.error("Failed to load applications:", err))
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'SELECTED': return 'badge badge-alumni';
      case 'SHORTLISTED': return 'badge badge-student';
      case 'UNDER_REVIEW': return 'badge badge-skill';
      case 'REJECTED': return 'badge badge-admin';
      default: return 'badge badge-skill';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>My Job Applications</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track real-time statuses of your job & internship applications.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading Submitted Applications...</div>
      ) : applications.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <Briefcase size={40} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
          <h3>No Job Applications Submitted Yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Browse the Job Board and apply to alumni postings.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {applications.map(app => (
            <div key={app.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{app.job?.title}</h3>
                  <span className={getStatusBadgeClass(app.status)}>{app.status.replace('_', ' ')}</span>
                </div>
                <div style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  {app.job?.company} • {app.job?.location}
                </div>
                {app.coverMessage && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    "{app.coverMessage}"
                  </p>
                )}
              </div>

              <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'flex-end' }}>
                  <Calendar size={14} /> Applied on {new Date(app.appliedAt).toLocaleDateString()}
                </div>
                <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-end', marginTop: '0.25rem' }}>
                  <FileText size={14} /> View Resume File
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
