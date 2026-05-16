// src/components/Shared/InputField.jsx
// Reusable controlled input with validation display

import React from 'react';

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  error = '',
  required = false,
  rows,         // if provided, renders a textarea
  options,      // if provided, renders a select
  className = '',
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      {options ? (
        /* ── Select ── */
        <select
          id={name}
          name={name}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="form-select"
        >
          {options.map(opt => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>

      ) : rows ? (
        /* ── Textarea ── */
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`form-textarea ${error ? 'error' : ''}`}
        />

      ) : (
        /* ── Input ── */
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`form-input ${error ? 'error' : ''}`}
        />
      )}

      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default InputField;
