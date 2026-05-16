// src/components/Layout/Sidebar.jsx

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';

const NAV_ITEMS = [
  { icon: '🏠', label: 'Dashboard',   path: '/dashboard' },
  { icon: '✏️', label: 'Builder',      path: '/builder' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuth();
  const { darkMode, setDarkMode, resumeList } = useResume();

  const handleNav = (path) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, background: 'var(--primary)',
            borderRadius: 10, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 20, flexShrink: 0,
          }}>📄</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>ResumeForge</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>Resume Builder</div>
          </div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 8,
          }}>
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{user.name}</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>{user.email}</div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
            {resumeList.length} resume{resumeList.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 12px' }}>
        {NAV_ITEMS.map(item => {
          const active = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: 'none',
                background: active ? 'rgba(37,99,235,0.25)' : 'transparent',
                color: active ? '#93c5fd' : '#94a3b8',
                fontWeight: active ? 600 : 400,
                fontSize: 14,
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: 2,
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { if (!active) e.target.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { if (!active) e.target.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div style={{ padding: '12px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Dark Mode Toggle */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', marginBottom: 4,
        }}>
          <span style={{ fontSize: 14, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{darkMode ? '🌙' : '☀️'}</span> Dark Mode
          </span>
          <button
            onClick={() => setDarkMode(d => !d)}
            style={{
              width: 42, height: 24, borderRadius: 12,
              background: darkMode ? 'var(--primary)' : '#475569',
              border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
            }}
          >
            <div style={{
              position: 'absolute', top: 3, left: darkMode ? 21 : 3,
              width: 18, height: 18, borderRadius: '50%', background: '#fff',
              transition: 'left 0.2s',
            }} />
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '10px 14px', borderRadius: 8,
            border: 'none', background: 'transparent',
            color: '#f87171', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
