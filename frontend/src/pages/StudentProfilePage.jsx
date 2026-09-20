import React, { useEffect, useState } from 'react';
import { studentService } from '../api/studentService';
import SkillSelector from '../components/SkillSelector';
import { GraduationCap, Target, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const [formData, setFormData] = useState({
    studentId: '',
    department: '',
    college: '',
    graduationYear: 2026,
    careerGoal: '',
    interests: '',
    resumeUrl: '',
    skills: [],
  });

  useEffect(() => {
    studentService.getMyProfile()
      .then((data) => {
        setProfile(data);
        setFormData({
          studentId: data.studentId || '',
          department: data.department || '',
          college: data.college || '',
          graduationYear: data.graduationYear || 2026,
          careerGoal: data.careerGoal || '',
          interests: data.interests || '',
          resumeUrl: data.resumeUrl || '',
          skills: data.skills ? data.skills.map(s => s.name) : [],
        });
      })
      .catch((err) => setMsg({ text: 'Failed to load student profile', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ text: '', type: '' });

    try {
      const updated = await studentService.updateMyProfile(formData);
      setProfile(updated);
      setMsg({ text: 'Student Profile updated successfully!', type: 'success' });
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to update profile', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Student Profile...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Student Profile Management</h1>
        <p style={{ color: 'var(--text-muted)' }}>Keep your academic info, career goals, and skills up to date for AI recommendations.</p>
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
              <label className="form-label">Student ID Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="STU-2024-001"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department / Major</label>
              <input
                type="text"
                className="form-input"
                placeholder="Computer Science & Engineering"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">College / University</label>
              <input
                type="text"
                className="form-input"
                placeholder="School of Engineering"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Expected Graduation Year</label>
              <input
                type="number"
                className="form-input"
                placeholder="2026"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) || 2026 })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Primary Career Goal</label>
            <input
              type="text"
              className="form-input"
              placeholder="Full Stack Java Developer / Cloud Engineer"
              value={formData.careerGoal}
              onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technical Interests & Specializations</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Web Application Development, Distributed Systems, Microservices..."
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Resume URL / File Reference</label>
            <input
              type="text"
              className="form-input"
              placeholder="https://alumniconnect.com/resumes/john_doe_resume.pdf"
              value={formData.resumeUrl}
              onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Technical Skills Catalog</label>
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
