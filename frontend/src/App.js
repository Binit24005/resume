// src/App.js
// Root component with routing and providers

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider }   from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import ProtectedRoute     from './components/Auth/ProtectedRoute';

import LoginPage    from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BuilderPage  from './pages/BuilderPage';

import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResumeProvider>

          {/* Global toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: '10px',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
              error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />

          <Routes>
            {/* Public */}
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected */}
            <Route path="/dashboard" element={
              <ProtectedRoute><DashboardPage /></ProtectedRoute>
            } />
            <Route path="/builder" element={
              <ProtectedRoute><BuilderPage /></ProtectedRoute>
            } />
            <Route path="/builder/:id" element={
              <ProtectedRoute><BuilderPage /></ProtectedRoute>
            } />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>

        </ResumeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
