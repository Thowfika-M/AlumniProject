import React, { useState, useEffect } from 'react';
import { Search, Briefcase, MapPin, CheckCircle2, User } from 'lucide-react';
import { alumniService } from '../api/alumniService';

export default function AlumniShowcase() {
  const [search, setSearch] = useState('');
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const data = await alumniService.getAllAlumni(search);
        setAlumniList(data);
      } catch (err) {
        console.error("Failed to load alumni list from backend:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchAlumni, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Alumni Directory & Mentors</h1>
        <p style={{ color: 'var(--text-muted)' }}>Search real verified alumni working across tech organizations.</p>
      </div>

      <div style={{ position: 'relative', maxWidth: '600px' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          className="form-input" 
          style={{ paddingLeft: '2.75rem' }} 
          placeholder="Search by name, company, job role, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Searching Alumni Database...</div>
      ) : alumniList.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <User size={40} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
          <h3>No Alumni Profiles Found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Try adjusting your search filters or check back when more alumni register.</p>
        </div>
      ) : (
        <div className="grid-cols-3">
          {alumniList.map(alumni => (
            <div key={alumni.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{alumni.user?.name || 'Alumni Member'}</h3>
                  <div style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <Briefcase size={14} /> {alumni.jobRole || 'Software Professional'} {alumni.currentCompany ? `@ ${alumni.currentCompany}` : ''}
                  </div>
                </div>
                <span className="badge badge-alumni"><CheckCircle2 size={12} /> Verified</span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {alumni.graduationYear && <div><strong>Class of:</strong> {alumni.graduationYear} ({alumni.department || 'Engineering'})</div>}
                {alumni.experienceYears && <div><strong>Experience:</strong> {alumni.experienceYears} Years</div>}
                {alumni.location && <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={13} /> {alumni.location}</div>}
              </div>

              {alumni.bio && (
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {alumni.bio}
                </p>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                {alumni.skills && alumni.skills.map((skill, i) => (
                  <span key={i} className="badge badge-skill">{skill.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
