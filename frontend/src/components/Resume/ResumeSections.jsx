// src/components/Resume/ResumeSections.jsx
// All editable resume sections: Personal, Education, Experience, Skills, Projects, Certifications

import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import SectionCard from '../Shared/SectionCard';
import InputField  from '../Shared/InputField';

// ─── Validation helpers ───────────────────────────────────────────────────────
const isValidEmail = (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone = (v) => !v || /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v.replace(/\s/g, ''));

// ─── Delete button ────────────────────────────────────────────────────────────
const DeleteBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="btn btn-danger btn-sm btn-icon"
    title="Delete"
    style={{ position: 'absolute', top: 10, right: 10 }}
  >✕</button>
);

// ─── Item wrapper ─────────────────────────────────────────────────────────────
const ItemWrap = ({ children, onDelete }) => (
  <div style={{
    background: 'var(--bg-primary)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '14px 14px 6px',
    marginBottom: 12,
    position: 'relative',
  }}>
    <DeleteBtn onClick={onDelete} />
    {children}
  </div>
);

// ─── Empty state ──────────────────────────────────────────────────────────────
const Empty = ({ message }) => (
  <div className="empty-state" style={{ padding: '20px 0' }}>
    <p style={{ fontSize: 13 }}>{message}</p>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PERSONAL INFO
// ═══════════════════════════════════════════════════════════════════════════════
export const PersonalSection = () => {
  const { resumeData, updatePersonal } = useResume();
  const p = resumeData.personal;
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    updatePersonal(field, value);
    // Live validation
    if (field === 'email')
      setErrors(e => ({ ...e, email: !isValidEmail(value) ? 'Invalid email address' : '' }));
    if (field === 'phone')
      setErrors(e => ({ ...e, phone: !isValidPhone(value) ? 'Invalid phone number' : '' }));
  };

  return (
    <SectionCard icon="👤" title="Personal Information">
      <div className="form-grid">
        <InputField label="Full Name"          name="fullName"  value={p.fullName}  onChange={v => handleChange('fullName', v)}  placeholder="Jane Smith" required />
        <InputField label="Professional Title" name="title"     value={p.title}     onChange={v => handleChange('title', v)}     placeholder="Software Engineer" />
        <InputField label="Email"              name="email"     value={p.email}     onChange={v => handleChange('email', v)}     placeholder="jane@email.com" type="email" error={errors.email} required />
        <InputField label="Phone"              name="phone"     value={p.phone}     onChange={v => handleChange('phone', v)}     placeholder="+1 (555) 000-0000" error={errors.phone} />
        <InputField label="Address"            name="address"   value={p.address}   onChange={v => handleChange('address', v)}  placeholder="City, State" />
        <InputField label="LinkedIn"           name="linkedin"  value={p.linkedin}  onChange={v => handleChange('linkedin', v)} placeholder="linkedin.com/in/username" />
        <InputField label="GitHub"             name="github"    value={p.github}    onChange={v => handleChange('github', v)}   placeholder="github.com/username" />
        <InputField label="Portfolio"          name="portfolio" value={p.portfolio} onChange={v => handleChange('portfolio', v)} placeholder="yoursite.com" />
      </div>
      <InputField label="Professional Summary" name="summary" value={p.summary} onChange={v => handleChange('summary', v)} placeholder="Brief overview of your experience and goals..." rows={4} />
    </SectionCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// EDUCATION
// ═══════════════════════════════════════════════════════════════════════════════
export const EducationSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume();

  const handleAdd = () => addItem('education', {
    school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', description: '',
  });

  return (
    <SectionCard icon="🎓" title="Education" onAdd={handleAdd} addLabel="Add Education">
      {resumeData.education.length === 0 && <Empty message="No education added yet. Click below to add one." />}
      {resumeData.education.map((edu, i) => (
        <ItemWrap key={edu._id || i} onDelete={() => deleteItem('education', i)}>
          <div className="form-grid">
            <InputField label="School"     name="school" value={edu.school} onChange={v => updateItem('education', i, 'school', v)} placeholder="University Name" />
            <InputField label="Degree"     name="degree" value={edu.degree} onChange={v => updateItem('education', i, 'degree', v)} placeholder="B.S. Computer Science" />
            <InputField label="Start Date" name="start"  value={edu.startDate} onChange={v => updateItem('education', i, 'startDate', v)} type="month" />
            <InputField label="End Date"   name="end"    value={edu.endDate}   onChange={v => updateItem('education', i, 'endDate', v)}   type="month" />
            <InputField label="GPA (opt)"  name="gpa"    value={edu.gpa}       onChange={v => updateItem('education', i, 'gpa', v)}       placeholder="3.9" />
          </div>
          <InputField label="Activities & Awards" name="desc" value={edu.description} onChange={v => updateItem('education', i, 'description', v)} placeholder="Dean's list, clubs..." rows={2} />
        </ItemWrap>
      ))}
    </SectionCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPERIENCE
// ═══════════════════════════════════════════════════════════════════════════════
export const ExperienceSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume();

  const handleAdd = () => addItem('experience', {
    company: '', position: '', startDate: '', endDate: '', current: false, description: '',
  });

  return (
    <SectionCard icon="💼" title="Work Experience" onAdd={handleAdd} addLabel="Add Experience">
      {resumeData.experience.length === 0 && <Empty message="No experience added yet. Click below to add one." />}
      {resumeData.experience.map((exp, i) => (
        <ItemWrap key={exp._id || i} onDelete={() => deleteItem('experience', i)}>
          <div className="form-grid">
            <InputField label="Company"  value={exp.company}  onChange={v => updateItem('experience', i, 'company', v)}  placeholder="Acme Corp." />
            <InputField label="Position" value={exp.position} onChange={v => updateItem('experience', i, 'position', v)} placeholder="Senior Engineer" />
            <InputField label="Start Date" value={exp.startDate} onChange={v => updateItem('experience', i, 'startDate', v)} type="month" />
            {!exp.current && (
              <InputField label="End Date" value={exp.endDate} onChange={v => updateItem('experience', i, 'endDate', v)} type="month" />
            )}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)' }}>
            <input
              type="checkbox"
              checked={exp.current}
              onChange={e => updateItem('experience', i, 'current', e.target.checked)}
            />
            Currently working here
          </label>
          <InputField label="Description" value={exp.description} onChange={v => updateItem('experience', i, 'description', v)} placeholder="Describe your key responsibilities and achievements..." rows={4} />
        </ItemWrap>
      ))}
    </SectionCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SKILLS
// ═══════════════════════════════════════════════════════════════════════════════
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const SkillsSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume();

  const handleAdd = () => addItem('skills', { name: '', level: 'Intermediate' });

  return (
    <SectionCard icon="⚡" title="Skills" onAdd={handleAdd} addLabel="Add Skill">
      {resumeData.skills.length === 0 && <Empty message="No skills added yet." />}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
        {resumeData.skills.map((skill, i) => (
          <div key={skill._id || i} style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '12px 12px 6px',
            marginBottom: 10,
            position: 'relative',
          }}>
            <DeleteBtn onClick={() => deleteItem('skills', i)} />
            <InputField label="Skill" value={skill.name} onChange={v => updateItem('skills', i, 'name', v)} placeholder="e.g. React.js" />
            <InputField
              label="Level"
              value={skill.level}
              onChange={v => updateItem('skills', i, 'level', v)}
              options={SKILL_LEVELS}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════════════════════════════════════
export const ProjectsSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume();

  const handleAdd = () => addItem('projects', { name: '', description: '', link: '', tech: '' });

  return (
    <SectionCard icon="🚀" title="Projects" onAdd={handleAdd} addLabel="Add Project">
      {resumeData.projects.length === 0 && <Empty message="No projects added yet." />}
      {resumeData.projects.map((proj, i) => (
        <ItemWrap key={proj._id || i} onDelete={() => deleteItem('projects', i)}>
          <div className="form-grid">
            <InputField label="Project Name"  value={proj.name} onChange={v => updateItem('projects', i, 'name', v)}        placeholder="My Awesome Project" />
            <InputField label="Link / URL"    value={proj.link} onChange={v => updateItem('projects', i, 'link', v)}        placeholder="github.com/user/project" />
          </div>
          <InputField label="Technologies Used" value={proj.tech} onChange={v => updateItem('projects', i, 'tech', v)} placeholder="React, Node.js, PostgreSQL" />
          <InputField label="Description" value={proj.description} onChange={v => updateItem('projects', i, 'description', v)} placeholder="What did you build and why?" rows={3} />
        </ItemWrap>
      ))}
    </SectionCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CERTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════════
export const CertificationsSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume();

  const handleAdd = () => addItem('certifications', { name: '', issuer: '', date: '', expiry: '' });

  return (
    <SectionCard icon="🏆" title="Certifications" onAdd={handleAdd} addLabel="Add Certification">
      {resumeData.certifications.length === 0 && <Empty message="No certifications added yet." />}
      {resumeData.certifications.map((cert, i) => (
        <ItemWrap key={cert._id || i} onDelete={() => deleteItem('certifications', i)}>
          <div className="form-grid">
            <InputField label="Certification Name" value={cert.name}   onChange={v => updateItem('certifications', i, 'name', v)}   placeholder="AWS Solutions Architect" />
            <InputField label="Issuing Organization" value={cert.issuer} onChange={v => updateItem('certifications', i, 'issuer', v)} placeholder="Amazon Web Services" />
            <InputField label="Issue Date"  value={cert.date}   onChange={v => updateItem('certifications', i, 'date', v)}   type="month" />
            <InputField label="Expiry Date" value={cert.expiry} onChange={v => updateItem('certifications', i, 'expiry', v)} type="month" />
          </div>
        </ItemWrap>
      ))}
    </SectionCard>
  );
};
