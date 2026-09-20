import React, { useState } from 'react';
import { Search, Briefcase, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function AlumniShowcase() {
  const [search, setSearch] = useState('');

  // Sample initial data for Phase 1 public preview
  const sampleAlumni = [
    { id: 1, name: 'Sarah Jenkins', role: 'Senior Software Engineer', company: 'Google', year: 2020, dept: 'Computer Science', location: 'San Francisco, CA', skills: ['Java', 'Spring Boot', 'Kubernetes', 'System Design'] },
    { id: 2, name: 'Alex Rivera', role: 'Lead DevOps Architect', company: 'Amazon Web Services', year: 2018, dept: 'Information Technology', location: 'Seattle, WA', skills: ['Docker', 'AWS', 'Terraform', 'CI/CD'] },
    { id: 3, name: 'Priya Sharma', role: 'Staff Data Scientist', company: 'Microsoft', year: 2019, dept: 'Data Science', location: 'Redmond, WA', skills: ['Python', 'PyTorch', 'SQL', 'Machine Learning'] }
  ];

  const filtered = sampleAlumni.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.company.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Alumni & Mentor Directory</h1>
        <p style={{ color: 'var(--text-muted)' }}>Browse verified alumni working across top global technology organizations.</p>
      </div>

      <div style={{ position: 'relative', maxWidth: '600px' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          className="form-input" 
          style={{ paddingLeft: '2.75rem' }} 
          placeholder="Search by alumni name, company, or job role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid-cols-3">
        {filtered.map(alumni => (
          <div key={alumni.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{alumni.name}</h3>
                <div style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Briefcase size={14} /> {alumni.role} @ {alumni.company}
                </div>
              </div>
              <span className="badge badge-alumni"><CheckCircle2 size={12} /> Verified</span>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div><strong>Graduation Year:</strong> {alumni.year} ({alumni.dept})</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={13} /> {alumni.location}</div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
              {alumni.skills.map((skill, i) => (
                <span key={i} className="badge badge-skill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
