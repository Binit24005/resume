// src/components/Layout/Header.jsx

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { exportToPDF } from '../../utils/pdfExport';

const Header = ({ onMenuClick, title = 'Resume Builder' }) => {
  const { saving, saveResume, currentId, resumeData } = useResume();

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)',
    }}>
      {/* Left: Menu + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={onMenuClick}
          className="btn btn-ghost btn-icon"
          style={{ display: 'none' }}
          id="menu-btn"
        >☰</button>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
          {title}
        </h1>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {saving && (
          <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="spinner spinner-dark" style={{ width: 14, height: 14, borderWidth: 1.5 }} />
            Saving...
          </span>
        )}

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => saveResume(true)}
          disabled={saving}
        >
          {saving ? '...' : '💾'} Save
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => exportToPDF('resume-preview', resumeData?.personal?.fullName || 'resume')}
        >
          ⬇ PDF
        </button>
      </div>

      {/* Show hamburger on mobile via CSS */}
      <style>{`
        @media (max-width: 768px) {
          #menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
