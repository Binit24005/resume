// src/components/Resume/TemplateSelector.jsx

import React from 'react';
import { useResume } from '../../context/ResumeContext';

const TEMPLATES = [
  { id: 'modern',       label: 'Modern',       desc: 'Two-column with color accents',   color: '#2563eb' },
  { id: 'minimal',      label: 'Minimal',       desc: 'Clean single-column',             color: '#374151' },
  { id: 'professional', label: 'Professional',  desc: 'Dark sidebar, executive style',   color: '#14b8a6' },
];

const TemplateSelector = () => {
  const { resumeData, setTemplate } = useResume();
  const active = resumeData.template;

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '14px 16px',
      marginBottom: 16,
    }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
        Template
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: `2px solid ${active === t.id ? t.color : 'var(--border)'}`,
              background: active === t.id ? `${t.color}18` : 'transparent',
              color: active === t.id ? t.color : 'var(--text-secondary)',
              fontWeight: active === t.id ? 700 : 500,
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
