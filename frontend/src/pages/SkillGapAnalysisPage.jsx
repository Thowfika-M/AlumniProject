import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, Zap, BookOpen } from 'lucide-react';
import { recommendationService } from '../api/recommendationService';

export default function SkillGapAnalysisPage() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    recommendationService.getCareerTemplates()
      .then((data) => {
        setTemplates(data);
        if (data.length > 0) {
          setSelectedTemplateId(data[0].id);
        }
      })
      .catch((err) => console.error("Failed to load career templates:", err));
  }, []);

  useEffect(() => {
    if (!selectedTemplateId) return;
    setLoading(true);
    recommendationService.analyzeSkillGap(selectedTemplateId)
      .then(setAnalysis)
      .catch((err) => console.error("Failed to run skill gap analysis:", err))
      .finally(() => setLoading(false));
  }, [selectedTemplateId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Skill Gap Analysis Engine</h1>
        <p style={{ color: 'var(--text-muted)' }}>Compare your current skills against industry-standard career templates.</p>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <label className="form-label" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Select Your Target Career Role</label>
        <select
          className="form-select"
          style={{ fontSize: '1.05rem', padding: '0.85rem' }}
          value={selectedTemplateId}
          onChange={(e) => setSelectedTemplateId(e.target.value)}
        >
          {templates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Analyzing Relational Skill System...</div>
      ) : analysis && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Readiness Meter Card */}
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Zap size={22} style={{ color: 'var(--secondary)' }} />
                <h2 style={{ fontSize: '1.5rem' }}>{analysis.targetCareerName} Readiness</h2>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{analysis.aiexplanation}</p>
            </div>

            <div style={{ textAlign: 'center', minWidth: '150px' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                color: analysis.matchPercentage >= 70 ? '#6ee7b7' : analysis.matchPercentage >= 40 ? '#fbbf24' : '#fda4af'
              }}>
                {analysis.matchPercentage}%
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {analysis.matchedSkillCount} of {analysis.totalRequiredSkills} Skills Matched
              </div>
            </div>
          </div>

          {/* Matched vs Missing Skills Grid */}
          <div className="grid-cols-2">
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#6ee7b7' }}>
                <CheckCircle2 size={20} />
                <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Matched Skills ({analysis.matchedSkills.length})</h3>
              </div>
              {analysis.matchedSkills.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No skills matched yet. Update your profile skills.</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.matchedSkills.map((s, i) => (
                    <span key={i} className="badge badge-alumni" style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}>
                      ✓ {s.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#fda4af' }}>
                <AlertTriangle size={20} />
                <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Skill Gaps to Acquire ({analysis.missingSkills.length})</h3>
              </div>
              {analysis.missingSkills.length === 0 ? (
                <p style={{ color: '#6ee7b7', fontSize: '0.9rem' }}>Congratulations! You meet all required core skills for this role.</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.missingSkills.map((s, i) => (
                    <span key={i} className="badge badge-admin" style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}>
                      + {s.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
