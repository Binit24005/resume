// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/Shared/InputField';

const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email)    errs.email    = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await login(form.email, form.password);
    if (result.success) navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>📄 ResumeForge</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={v => setForm(f => ({ ...f, email: v }))}
            placeholder="you@email.com"
            error={errors.email}
            required
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={v => setForm(f => ({ ...f, password: v }))}
            placeholder="••••••••"
            error={errors.password}
            required
          />

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
          >
            {loading ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Signing in...</> : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Create one free
          </Link>
        </p>

        {/* Demo hint */}
        <div style={{
          marginTop: 20, padding: '10px 14px', background: '#eff6ff',
          borderRadius: 8, fontSize: 12, color: '#3b82f6',
        }}>
          💡 <strong>Demo:</strong> Register a new account to get started
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
