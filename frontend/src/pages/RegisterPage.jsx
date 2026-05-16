// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/Shared/InputField';

const RegisterPage = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim())   errs.name     = 'Name is required';
    if (!form.email)         errs.email    = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password)      errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await register(form.name, form.email, form.password);
    if (result.success) navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>📄 ResumeForge</h1>
          <p>Create your free account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <InputField label="Full Name" name="name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Jane Smith" error={errors.name} required />
          <InputField label="Email Address" name="email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="you@email.com" error={errors.email} required />
          <InputField label="Password" name="password" type="password" value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} placeholder="Min. 6 characters" error={errors.password} required />
          <InputField label="Confirm Password" name="confirm" type="password" value={form.confirm} onChange={v => setForm(f => ({ ...f, confirm: v }))} placeholder="Repeat password" error={errors.confirm} required />

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
          >
            {loading
              ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Creating account...</>
              : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
