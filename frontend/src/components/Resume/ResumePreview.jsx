// src/components/Resume/ResumePreview.jsx
// Live resume preview with template switching

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { ModernTemplate, MinimalTemplate, ProfessionalTemplate } from './ResumeTemplates';

const TEMPLATE_MAP = {
  modern:       ModernTemplate,
  minimal:      MinimalTemplate,
  professional: ProfessionalTemplate,
};

const ResumePreview = () => {
  const { resumeData } = useResume();
  const TemplateComponent = TEMPLATE_MAP[resumeData.template] || ModernTemplate;

  return (
    <div style={{
      background: '#d1d5db',
      padding: 20,
      borderRadius: 12,
      height: '100%',
      overflowY: 'auto',
    }}>
      <p style={{ textAlign: 'center', fontSize: 11, color: '#6b7280', marginBottom: 12 }}>
        Live Preview · Updates in real-time
      </p>

      {/* Scale down the A4 preview to fit the panel */}
      <div style={{
        transform: 'scale(0.72)',
        transformOrigin: 'top center',
        width: '138.9%',
        marginLeft: '-19.4%',
        marginBottom: '-28%',
      }}>
        {/* Shadow wrapper */}
        <div id="resume-preview" style={{
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          borderRadius: 4,
          overflow: 'hidden',
          background: '#fff',
        }}>
          <TemplateComponent data={resumeData} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
