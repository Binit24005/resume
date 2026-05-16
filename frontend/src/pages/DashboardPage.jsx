// src/pages/DashboardPage.jsx
// Shows all user resumes with create/delete/duplicate actions

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Layout/Sidebar';
import Header  from '../components/Layout/Header';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    resumeList, loading,
    fetchResumes, newResume, loadResume, deleteResume, duplicateResume,
  } = useResume();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  useEffect(() => { fetchResumes(); }, [fetchResumes]);

  const handleNew = () => {
    newResume();
    navigate('/builder');
  };

  const handleOpen = async (id) => {
    await loadResume(id);
    navigate('/builder');
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Delete this resume? This cannot be undone.')) {
      await deleteResume(id);
    }
  };

  const handleDuplicate = async (e, id) => {
    e.stopPropagation();
    await duplicateResume(id);
    await fetchResumes();
  };

  const fmtDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} style={sidebarOpen ? { display: 'block' } : {}} />

      <div className="main-content">
        <Header title="My Resumes" onMenuClick={() => setSidebarOpen(o => !o)} />

        <div style={{ padding: '24px', maxWidth: 960, margin: '0 auto' }}>
          {/* Welcome banner */}
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
            borderRadius: 14,
            padding: '24px 28px',
            color: '#fff',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px' }}>
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h2>
              <p style={{ fontSize: 14, opacity: 0.85, margin: 0 }}>
                {resumeList.length === 0
                  ? 'Create your first professional resume today'
                  : `You have ${resumeList.length} resume${resumeList.length > 1 ? 's' : ''}`}
              </p>
            </div>
            <button className="btn btn-lg" onClick={handleNew} style={{ background: '#fff', color: '#2563eb', fontWeight: 700 }}>
              + New Resume
            </button>
          </div>

          {/* Resume grid */}
          {loading ? (
            <div className="page-loading">
              <span className="spinner spinner-dark" style={{ width: 28, height: 28 }} />
              <span style={{ color: 'var(--text-muted)' }}>Loading resumes...</span>
            </div>
          ) : resumeList.length === 0 ? (
            <div className="empty-state" style={{ padding: '60px 20px' }}>
              <div className="empty-icon">📄</div>
              <h3>No resumes yet</h3>
              <p>Click "New Resume" to build your first one!</p>
              <button className="btn btn-primary" onClick={handleNew} style={{ marginTop: 16 }}>
                + Create Resume
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {/* Create New card */}
              <div
                onClick={handleNew}
                style={{
                  border: '2px dashed var(--border)',
                  borderRadius: 14,
                  padding: '30px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  color: 'var(--text-muted)',
                  transition: 'all 0.15s',
                  background: 'var(--bg-secondary)',
                  minHeight: 160,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <span style={{ fontSize: 32 }}>+</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>New Resume</span>
              </div>

              {/* Resume cards */}
              {resumeList.map(resume => (
                <div
                  key={resume._id}
                  className="card fade-in"
                  onClick={() => handleOpen(resume._id)}
                  style={{ cursor: 'pointer', transition: 'box-shadow 0.15s', minHeight: 160 }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  <div style={{ padding: '18px 18px 14px' }}>
                    {/* Icon + title */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                      <div style={{
                        width: 40, height: 44, background: 'var(--primary-light)',
                        borderRadius: 8, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: 20, flexShrink: 0,
                      }}>📄</div>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 3px', color: 'var(--text-primary)' }}>
                          {resume.title}
                        </h3>
                        <span className="badge badge-primary" style={{ fontSize: 10 }}>
                          {resume.template}
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 14px' }}>
                      Updated {fmtDate(resume.updatedAt)}
                    </p>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                      <button className="btn btn-primary btn-sm" onClick={() => handleOpen(resume._id)} style={{ flex: 1, justifyContent: 'center' }}>
                        Edit
                      </button>
                      <button className="btn btn-secondary btn-sm btn-icon" onClick={e => handleDuplicate(e, resume._id)} title="Duplicate">⧉</button>
                      <button className="btn btn-danger btn-sm btn-icon" onClick={e => handleDelete(e, resume._id)} title="Delete">✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
