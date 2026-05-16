// src/pages/BuilderPage.jsx
// Main resume editor with side-by-side layout

import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import Sidebar          from '../components/Layout/Sidebar';
import Header           from '../components/Layout/Header';
import TemplateSelector from '../components/Resume/TemplateSelector';
import ResumePreview    from '../components/Resume/ResumePreview';
import {
  PersonalSection,
  EducationSection,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  CertificationsSection,
} from '../components/Resume/ResumeSections';
import InputField from '../components/Shared/InputField';
import { exportToPDF } from '../utils/pdfExport';

const BuilderPage = () => {
  const { resumeData, setTitle, saveResume, saving, currentId } = useResume();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab,   setActiveTab]   = useState('edit'); // 'edit' | 'preview' — mobile only

  const handleSave = async () => {
    await saveResume(true);
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        className="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
        style={sidebarOpen ? { display: 'block' } : {}}
      />

      <div className="main-content">
        <Header
          title={resumeData.title || 'Resume Builder'}
          onMenuClick={() => setSidebarOpen(o => !o)}
        />

        {/* Resume title bar */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          <input
            value={resumeData.title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Resume title..."
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--text-primary)',
              outline: 'none',
              flex: 1,
              minWidth: 180,
              fontFamily: 'inherit',
            }}
          />
          {currentId && (
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {saving ? 'Auto-saving...' : '✓ Auto-save on'}
            </span>
          )}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => exportToPDF('resume-preview', resumeData.personal?.fullName || 'resume')}
          >⬇ Download PDF</button>
        </div>

        {/* Mobile tab switcher */}
        <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }} className="mobile-tabs">
          {['edit', 'preview'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: '11px', border: 'none',
                background: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 13, fontWeight: activeTab === tab ? 700 : 400,
                color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
              }}
            >
              {tab === 'edit' ? '✏️ Edit' : '👁 Preview'}
            </button>
          ))}
        </div>

        {/* Main editor layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          flex: 1,
          height: 'calc(100vh - var(--header-height) - 84px)',
          overflow: 'hidden',
        }} className="builder-grid">

          {/* LEFT: Form */}
          <div style={{
            overflowY: 'auto',
            padding: '16px 16px',
            background: 'var(--bg-primary)',
          }} className={`form-panel ${activeTab === 'preview' ? 'hide-mobile' : ''}`}>
            <TemplateSelector />
            <PersonalSection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
            <CertificationsSection />

            {/* Save button (bottom of form) */}
            <button
              className="btn btn-primary btn-lg"
              onClick={handleSave}
              disabled={saving}
              style={{ width: '100%', justifyContent: 'center', marginTop: 8, marginBottom: 24 }}
            >
              {saving ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Saving...</> : '💾 Save Resume'}
            </button>
          </div>

          {/* RIGHT: Preview */}
          <div style={{
            overflowY: 'auto',
            padding: '16px',
            background: '#e2e8f0',
          }} className={`preview-panel ${activeTab === 'edit' ? 'hide-mobile' : ''}`}>
            <ResumePreview />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .builder-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .hide-mobile { display: none !important; }
          .mobile-tabs { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-tabs { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default BuilderPage;
