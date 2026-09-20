import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { recommendationService } from '../api/recommendationService';
import { Link } from 'react-router-dom';

export default function RecommendedJobsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recommendationService.getRecommendedJobs()
      .then(setRecommendations)
      .catch((err) => console.error("Failed to load recommended jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>AI & Deterministic Recommended Jobs</h1>
        <p style={{ color: 'var(--text-muted)' }}>Job postings sorted by transparent skill match accuracy.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Calculating Skill Match Scores...</div>
      ) : recommendations.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <Briefcase size={40} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
          <h3>No Job Recommendations Available</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Update your profile skills to view transparent match scores.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {recommendations.map((item, index) => (
            <div key={index} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                  <span className="badge badge-student">{item.job?.jobType}</span>
                  <span className="badge badge-alumni" style={{ fontSize: '0.85rem' }}>
                    <Sparkles size={13} /> {item.matchPercentage}% Skill Match
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>{item.job?.title}</h3>
                <div style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                  {item.job?.company} • {item.job?.location}
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  {item.aiexplanation}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.matchedSkills && item.matchedSkills.map((s, i) => (
                    <span key={i} className="badge badge-alumni">✓ {s.name}</span>
                  ))}
                  {item.missingSkills && item.missingSkills.map((s, i) => (
                    <span key={i} className="badge badge-admin">+ {s.name}</span>
                  ))}
                </div>
              </div>

              <div style={{ alignSelf: 'center' }}>
                <Link to="/jobs" className="btn btn-primary btn-sm">
                  View Posting <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
