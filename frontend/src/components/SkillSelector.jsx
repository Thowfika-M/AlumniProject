import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { skillService } from '../api/skillService';

export default function SkillSelector({ selectedSkills = [], onChange }) {
  const [allSkills, setAllSkills] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    skillService.getAllSkills()
      .then(setAllSkills)
      .catch((err) => console.error("Failed to load global skills catalog:", err));
  }, []);

  const handleAddSkill = (skillName) => {
    if (!skillName.trim()) return;
    const trimmed = skillName.trim();
    if (!selectedSkills.includes(trimmed)) {
      onChange([...selectedSkills, trimmed]);
    }
    setInputValue('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(selectedSkills.filter(s => s !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(inputValue);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {selectedSkills.map((skill, index) => (
          <span key={index} className="badge badge-skill" style={{ padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {skill}
            <X size={14} style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => handleRemoveSkill(skill)} />
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Type or select skill (e.g. Java, React, SQL)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          list="skills-datalist"
        />
        <datalist id="skills-datalist">
          {allSkills.map(s => (
            <option key={s.id} value={s.name} />
          ))}
        </datalist>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => handleAddSkill(inputValue)}
        >
          <Plus size={16} /> Add
        </button>
      </div>
    </div>
  );
}
