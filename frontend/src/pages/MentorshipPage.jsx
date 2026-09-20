import React, { useState, useEffect } from 'react';
import { Users, Briefcase, CheckCircle2, AlertCircle, Send, UserCheck, UserX, Clock, MessageSquare } from 'lucide-react';
import { mentorshipService } from '../api/mentorshipService';
import { alumniService } from '../api/alumniService';
import { useAuth } from '../context/AuthContext';

export default function MentorshipPage() {
  const { user } = useAuth();
  const [alumniMentors, setAlumniMentors] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      if (user?.role === 'STUDENT') {
        const mentors = await alumniService.getAllAlumni(search);
        setAlumniMentors(mentors);
      }
      const requests = await mentorshipService.getMyRequests();
      setMyRequests(requests);
    } catch (err) {
      console.error("Failed to load mentorship data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, user]);

  const handleRequestMentorship = async (alumniUserId) => {
    setMsg({ text: '', type: '' });
    try {
      await mentorshipService.requestMentorship(alumniUserId);
      setMsg({ text: 'Mentorship request sent successfully! The alumni will be notified in-app.', type: 'success' });
      fetchData();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to send mentorship request', type: 'error' });
    }
  };

  const handleStatusResponse = async (requestId, status) => {
    try {
      await mentorshipService.respondToRequest(requestId, status);
      setMyRequests(myRequests.map(r => r.id === requestId ? { ...r, status } : r));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update request status');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>1-on-1 Alumni Mentorship Hub</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {user?.role === 'ALUMNI' 
            ? 'Manage student mentorship requests and guide the next generation.' 
            : 'Connect directly with verified alumni mentors for career guidance and resume reviews.'}
        </p>
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

      {/* Alumni View: Incoming Requests */}
      {user?.role === 'ALUMNI' && (
        <div className="glass-panel">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Incoming Student Mentorship Requests</h2>
          {myRequests.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No pending mentorship requests at this time.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {myRequests.map(req => (
                <div key={req.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{req.student?.name}</h3>
                    <div style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>{req.student?.email}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                      Requested on: {new Date(req.requestedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="badge badge-skill">{req.status}</span>
                    {req.status === 'REQUESTED' && (
                      <>
                        <button className="btn btn-primary btn-sm" onClick={() => handleStatusResponse(req.id, 'ACCEPTED')}>
                          <UserCheck size={14} /> Accept Request
                        </button>
                        <button className="btn btn-outline btn-sm" style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)' }} onClick={() => handleStatusResponse(req.id, 'REJECTED')}>
                          <UserX size={14} /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Student View: Find Mentors & Active Mentorship Relationships */}
      {user?.role === 'STUDENT' && (
        <>
          {/* Active Mentorship Connections */}
          {myRequests.length > 0 && (
            <div className="glass-panel">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>My Active & Pending Mentorship Requests</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {myRequests.map(req => (
                  <div key={req.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem' }}>Alumni Mentor: {req.alumni?.name}</h3>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{req.alumni?.email}</div>
                    </div>
                    <span className={req.status === 'ACCEPTED' ? 'badge badge-alumni' : 'badge badge-skill'}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Directory of Mentors to Request */}
          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Request Mentorship From Alumni</h2>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Mentors...</div>
            ) : alumniMentors.length === 0 ? (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>No Alumni Mentors Found.</div>
            ) : (
              <div className="grid-cols-3">
                {alumniMentors.map(alumni => (
                  <div key={alumni.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{alumni.user?.name}</h3>
                      <div style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
                        {alumni.jobRole || 'Software Professional'} @ {alumni.currentCompany || 'Tech Corp'}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <div><strong>Mentorship Areas:</strong> {alumni.mentorshipAreas || 'Career Advice, Resume Review'}</div>
                      <div><strong>Experience:</strong> {alumni.experienceYears || 2} Years</div>
                    </div>

                    <button
                      className="btn btn-primary btn-sm"
                      style={{ marginTop: 'auto' }}
                      onClick={() => handleRequestMentorship(alumni.user.id)}
                    >
                      <Send size={14} /> Request 1-on-1 Mentorship
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
