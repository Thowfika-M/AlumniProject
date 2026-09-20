import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { recommendationService } from '../api/recommendationService';
import { mentorshipService } from '../api/mentorshipService';

export default function RecommendedAlumniPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    recommendationService.getRecommendedAlumni()
      .then(setRecommendations)
      .catch((err) => console.error("Failed to load recommended alumni:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleRequestMentorship = async (alumniUserId) => {
    setMsg({ text: '', type: '' });
    try {
      await mentorshipService.requestMentorship(alumniUserId);
      setMsg({ text: 'Mentorship request sent successfully to recommended alumni!', type: 'success' });
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to send request', type: 'error' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Recommended Alumni Mentors</h1>
        <p style={{ color: 'var(--text-muted)' }}>Alumni matched based on technical skills, department, and career alignment.</p>
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
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <Sparkles size={18} />} {msg.text}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Calculating Alumni Mentor Matches...</div>
      ) : recommendations.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <Users size={40} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
          <h3>No Alumni Recommendations Found</h3>
        </div>
      ) : (
        <div className="grid-cols-2">
          {recommendations.map((item, index) => (
            <div key={index} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-alumni" style={{ marginBottom: '0.5rem' }}>
                    <Sparkles size={13} /> {item.matchPercentage}% Alignment Match
                  </span>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{item.alumni?.user?.name}</h3>
                  <div style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.95rem' }}>
                    {item.alumni?.jobRole || 'Engineer'} @ {item.alumni?.currentCompany || 'Tech Corp'}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                {item.matchReason}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                {item.sharedSkills && item.sharedSkills.map((s, i) => (
                  <span key={i} className="badge badge-skill">Shared: {s.name}</span>
                ))}
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleRequestMentorship(item.alumni.user.id)}
              >
                <Send size={14} /> Request Mentorship
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
