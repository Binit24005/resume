// src/components/Shared/SectionCard.jsx
// Collapsible section card with add button

import React, { useState } from 'react';

const SectionCard = ({ icon, title, children, onAdd, addLabel = 'Add Entry', defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-header" onClick={() => setOpen(o => !o)}>
        <span className="card-title">
          {icon && <span>{icon}</span>}
          {title}
        </span>
        <span style={{
          fontSize: 18,
          color: 'var(--text-muted)',
          transition: 'transform 0.2s',
          transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          display: 'inline-block',
        }}>▾</span>
      </div>

      {open && (
        <div className="card-body fade-in">
          {children}
          {onAdd && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={onAdd}
              style={{
                marginTop: 8,
                border: '1.5px dashed var(--border)',
                color: 'var(--primary)',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 16 }}>+</span> {addLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionCard;
