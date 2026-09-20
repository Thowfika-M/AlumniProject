import React, { useEffect, useState } from 'react';
import { alumniService } from '../api/alumniService';
import SkillSelector from '../components/SkillSelector';
import { Briefcase, MapPin, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AlumniProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const [formData, setFormData] = useState({
    graduationYear: 2020,
    department: '',
    college: '',
    currentCompany: '',
    jobRole: '',
    experienceYears: 5,
    location: '',
    bio: '',
    mentorshipAreas: '',
    skills: [],
  });

  useEffect(() => {
    alumniService.getMyProfile()
      .then((data) => {
        setProfile(data);
        setFormData({
          graduationYear: data.graduationYear || 2020,
          department: data.department || '',
          college: data.college || '',
          currentCompany: data.currentCompany || '',
          jobRole: data.jobRole || '',
          experienceYears: data.experienceYears || 0,
          location: data.location || '',
          bio: data.bio || '',
          mentorshipAreas: data.mentorshipAreas || '',
          skills: data.skills ? data.skills.map(s => s.name) : [],
        });
      })
      .catch((err) => setMsg({ text: 'Failed to load alumni profile', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ text: '', type: '' });

    try {
      const updated = await alumniService.updateMyProfile(formData);
      setProfile(updated);
      setMsg({ text: 'Alumni Profile updated successfully!', type: 'success' });
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to update profile', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Alumni Profile...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Alumni Mentor Profile</h1>
        <p style={{ color: 'var(--text-muted)' }}>Share your professional experience and mentorship availability with students.</p>
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

      <div className="glass-panel">
        <form onSubmit={handleSubmit}>
          <div className="grid-cols-2">
            <div className="form-group">
              <label className="form-label">Current Company / Employer</label>
              <input
                type="text"
                className="form-input"
                placeholder="Google / Microsoft / Amazon"
                value={formData.currentCompany}
                onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Job Role / Designation</label>
              <input
                type="text"
                className="form-input"
                placeholder="Senior Software Engineer / Architect"
                value={formData.jobRole}
                onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Years of Professional Experience</label>
              <input
                type="number"
                className="form-input"
                placeholder="5"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location (City, Country)</label>
              <input
                type="text"
                className="form-input"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department Graduated From</label>
              <input
                type="text"
                className="form-input"
                placeholder="Computer Science"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Graduation Year</label>
              <input
                type="number"
                className="form-input"
                placeholder="2020"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) || 2020 })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mentorship Offering Areas</label>
            <input
              type="text"
              className="form-input"
              placeholder="Backend System Design, Code Reviews, Mock Technical Interviews"
              value={formData.mentorshipAreas}
              onChange={(e) => setFormData({ ...formData, mentorshipAreas: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Professional Biography</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Brief professional background, career journey, and tips for students..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Areas of Technical Expertise (Skills)</label>
            <SkillSelector
              selectedSkills={formData.skills}
              onChange={(newSkills) => setFormData({ ...formData, skills: newSkills })}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving} style={{ padding: '0.85rem 2rem' }}>
            <Save size={18} /> {saving ? 'Saving Profile...' : 'Save Profile Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
