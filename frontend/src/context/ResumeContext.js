// src/context/ResumeContext.js
// Global resume state management

import React, {
  createContext, useContext, useState, useCallback, useRef, useEffect,
} from 'react';
import { resumeService } from '../services/api';
import toast from 'react-hot-toast';

const ResumeContext = createContext(null);

// ─── Default empty resume ─────────────────────────────────────────────────────
export const defaultResumeData = {
  title:    'My Resume',
  template: 'modern',
  personal: {
    fullName: '', title: '', email: '', phone: '',
    address: '', linkedin: '', github: '', portfolio: '', summary: '',
  },
  education:      [],
  experience:     [],
  skills:         [],
  projects:       [],
  certifications: [],
};

export const ResumeProvider = ({ children }) => {
  const [resumeData,   setResumeData]   = useState(defaultResumeData);
  const [currentId,    setCurrentId]    = useState(null); // MongoDB _id of active resume
  const [resumeList,   setResumeList]   = useState([]);
  const [saving,       setSaving]       = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [darkMode,     setDarkMode]     = useState(() => localStorage.getItem('darkMode') === 'true');
  const autoSaveTimer = useRef(null);

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // ── Fetch all resumes for the user ────────────────────────────────────────
  const fetchResumes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await resumeService.getAll();
      setResumeList(data.data);
    } catch (error) {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Load a specific resume into editor ────────────────────────────────────
  const loadResume = useCallback(async (id) => {
    setLoading(true);
    try {
      const { data } = await resumeService.getById(id);
      setResumeData(data.data);
      setCurrentId(data.data._id);
    } catch (error) {
      toast.error('Failed to load resume');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Save (create or update) ───────────────────────────────────────────────
  const saveResume = useCallback(async (showToast = true) => {
    setSaving(true);
    try {
      let res;
      if (currentId) {
        res = await resumeService.update(currentId, resumeData);
      } else {
        res = await resumeService.create(resumeData);
        setCurrentId(res.data.data._id);
      }
      if (showToast) toast.success('Resume saved! ✅');
      return res.data.data;
    } catch (error) {
      toast.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  }, [currentId, resumeData]);

  // ── Auto-save: debounced, 3 seconds after last change ────────────────────
  const triggerAutoSave = useCallback(() => {
    if (!currentId) return; // Only auto-save existing resumes
    clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      saveResume(false); // Silent auto-save
    }, 3000);
  }, [currentId, saveResume]);

  // ── Create new blank resume ───────────────────────────────────────────────
  const newResume = useCallback(() => {
    setResumeData(defaultResumeData);
    setCurrentId(null);
  }, []);

  // ── Delete a resume ───────────────────────────────────────────────────────
  const deleteResume = useCallback(async (id) => {
    try {
      await resumeService.delete(id);
      setResumeList(prev => prev.filter(r => r._id !== id));
      if (currentId === id) newResume();
      toast.success('Resume deleted');
    } catch {
      toast.error('Failed to delete resume');
    }
  }, [currentId, newResume]);

  // ── Duplicate ─────────────────────────────────────────────────────────────
  const duplicateResume = useCallback(async (id) => {
    try {
      const { data } = await resumeService.duplicate(id);
      setResumeList(prev => [data.data, ...prev]);
      toast.success('Resume duplicated');
    } catch {
      toast.error('Failed to duplicate resume');
    }
  }, []);

  // ── Update helpers ────────────────────────────────────────────────────────

  const updatePersonal = useCallback((field, value) => {
    setResumeData(d => ({ ...d, personal: { ...d.personal, [field]: value } }));
    triggerAutoSave();
  }, [triggerAutoSave]);

  const setTemplate = useCallback((template) => {
    setResumeData(d => ({ ...d, template }));
  }, []);

  const setTitle = useCallback((title) => {
    setResumeData(d => ({ ...d, title }));
  }, []);

  // Generic section add/update/delete
  const addItem = useCallback((section, item) => {
    setResumeData(d => ({ ...d, [section]: [...d[section], { ...item, _id: Date.now().toString() }] }));
    triggerAutoSave();
  }, [triggerAutoSave]);

  const updateItem = useCallback((section, index, field, value) => {
    setResumeData(d => ({
      ...d,
      [section]: d[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
    triggerAutoSave();
  }, [triggerAutoSave]);

  const deleteItem = useCallback((section, index) => {
    setResumeData(d => ({
      ...d,
      [section]: d[section].filter((_, i) => i !== index),
    }));
    triggerAutoSave();
  }, [triggerAutoSave]);

  return (
    <ResumeContext.Provider value={{
      resumeData, setResumeData,
      currentId,
      resumeList,
      saving, loading,
      darkMode, setDarkMode,
      fetchResumes, loadResume, saveResume,
      newResume, deleteResume, duplicateResume,
      updatePersonal, setTemplate, setTitle,
      addItem, updateItem, deleteItem,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
};
