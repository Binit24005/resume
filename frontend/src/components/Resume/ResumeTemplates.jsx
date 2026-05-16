// src/components/Resume/ResumeTemplates.jsx
// Modern, Minimal, and Professional resume templates

import React from 'react';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (dateStr) => {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m) - 1] || ''} ${y}`;
};

const skillWidth = { Expert: '100%', Advanced: '80%', Intermediate: '60%', Beginner: '35%' };

// ─── Shared contact row ───────────────────────────────────────────────────────
const ContactItem = ({ icon, value }) =>
  value ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>{icon} {value}</span> : null;

// ═══════════════════════════════════════════════════════════════════════════════
// MODERN TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════════
export const ModernTemplate = ({ data }) => {
  const { personal: p, education, experience, skills, projects, certifications } = data;
  const accent = '#2563eb';

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: '#111', fontSize: 10.5, lineHeight: 1.55, background: '#fff', padding: '30px 34px', minHeight: '297mm' }}>
      {/* Header */}
      <div style={{ borderBottom: `3px solid ${accent}`, paddingBottom: 14, marginBottom: 18 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 3px', fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.5px' }}>
          {p.fullName || 'Your Name'}
        </h1>
        {p.title && <p style={{ fontSize: 13, color: accent, fontWeight: 600, margin: '0 0 8px', fontFamily: 'system-ui' }}>{p.title}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px 14px', fontSize: 9.5, color: '#555' }}>
          <ContactItem icon="✉" value={p.email} />
          <ContactItem icon="☏" value={p.phone} />
          <ContactItem icon="⌖" value={p.address} />
          <ContactItem icon="in" value={p.linkedin} />
          <ContactItem icon="⌥" value={p.github} />
          <ContactItem icon="⊕" value={p.portfolio} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.9fr 1fr', gap: 22 }}>
        {/* Left column */}
        <div>
          {p.summary && <Section title="Summary" accent={accent}>
            <p style={{ margin: 0, color: '#333' }}>{p.summary}</p>
          </Section>}

          {experience.length > 0 && <Section title="Experience" accent={accent}>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div>
                    <strong style={{ fontFamily: 'system-ui', fontSize: 11 }}>{exp.position}</strong>
                    {exp.company && <span style={{ color: accent }}> · {exp.company}</span>}
                  </div>
                  <span style={{ fontSize: 9.5, color: '#777' }}>
                    {fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}
                  </span>
                </div>
                {exp.description && <div style={{ marginTop: 4, color: '#333', whiteSpace: 'pre-line', fontSize: 10 }}>{exp.description}</div>}
              </div>
            ))}
          </Section>}

          {projects.length > 0 && <Section title="Projects" accent={accent}>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontFamily: 'system-ui' }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: 9, color: accent }}>{proj.link}</span>}
                </div>
                {proj.tech && <span style={{ fontSize: 9.5, color: '#777' }}>{proj.tech}</span>}
                {proj.description && <p style={{ margin: '3px 0 0', color: '#333', fontSize: 10 }}>{proj.description}</p>}
              </div>
            ))}
          </Section>}
        </div>

        {/* Right column */}
        <div>
          {education.length > 0 && <Section title="Education" accent={accent}>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 11 }}>
                <strong style={{ fontFamily: 'system-ui', fontSize: 10.5 }}>{edu.school}</strong>
                <div style={{ color: '#333' }}>{edu.degree}</div>
                <div style={{ fontSize: 9.5, color: '#777' }}>{fmt(edu.startDate)} – {fmt(edu.endDate)}</div>
                {edu.gpa && <div style={{ fontSize: 9.5, color: '#777' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </Section>}

          {skills.length > 0 && <Section title="Skills" accent={accent}>
            {skills.map((skill, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, marginBottom: 2 }}>
                  <span style={{ fontWeight: 600 }}>{skill.name}</span>
                  <span style={{ color: '#777' }}>{skill.level}</span>
                </div>
                <div style={{ height: 4, background: '#e2e8f0', borderRadius: 2 }}>
                  <div style={{ height: '100%', borderRadius: 2, background: accent, width: skillWidth[skill.level] || '60%' }} />
                </div>
              </div>
            ))}
          </Section>}

          {certifications.length > 0 && <Section title="Certifications" accent={accent}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <strong style={{ fontFamily: 'system-ui', fontSize: 10.5 }}>{cert.name}</strong>
                <div style={{ fontSize: 9.5, color: '#777' }}>{cert.issuer}</div>
                <div style={{ fontSize: 9, color: '#aaa' }}>{fmt(cert.date)}{cert.expiry ? ` – ${fmt(cert.expiry)}` : ''}</div>
              </div>
            ))}
          </Section>}
        </div>
      </div>
    </div>
  );
};

// Sub-component for section headings in Modern template
const Section = ({ title, accent, children }) => (
  <section style={{ marginBottom: 18 }}>
    <h2 style={{
      fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.12em', color: accent, margin: '0 0 9px',
      fontFamily: 'system-ui, sans-serif',
    }}>{title}</h2>
    {children}
  </section>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MINIMAL TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════════
export const MinimalTemplate = ({ data }) => {
  const { personal: p, education, experience, skills, projects, certifications } = data;

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#111827', fontSize: 10.5, lineHeight: 1.6, background: '#fff', padding: '38px 42px', minHeight: '297mm' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 300, margin: '0 0 5px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {p.fullName || 'Your Name'}
        </h1>
        {p.title && <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 10px', letterSpacing: '0.04em' }}>{p.title}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3px 12px', fontSize: 9.5, color: '#9ca3af' }}>
          {[p.email, p.phone, p.address, p.linkedin, p.github, p.portfolio].filter(Boolean).join(' · ')}
        </div>
      </div>

      {/* Sections */}
      {[
        p.summary && { title: 'Profile', content: <p style={{ margin: 0, color: '#374151' }}>{p.summary}</p> },
        experience.length > 0 && {
          title: 'Experience', content: experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><strong>{exp.position}</strong>{exp.company && <span style={{ color: '#6b7280' }}>, {exp.company}</span>}</div>
                <span style={{ fontSize: 9.5, color: '#9ca3af' }}>{fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}</span>
              </div>
              {exp.description && <div style={{ marginTop: 3, color: '#374151', whiteSpace: 'pre-line', fontSize: 10 }}>{exp.description}</div>}
            </div>
          ))
        },
        education.length > 0 && {
          title: 'Education', content: education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div><strong>{edu.school}</strong> — {edu.degree}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</div>
              <span style={{ fontSize: 9.5, color: '#9ca3af', whiteSpace: 'nowrap' }}>{fmt(edu.startDate)} – {fmt(edu.endDate)}</span>
            </div>
          ))
        },
        skills.length > 0 && {
          title: 'Skills', content: (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ background: '#f3f4f6', color: '#374151', padding: '2px 10px', borderRadius: 20, fontSize: 9.5, fontWeight: 500 }}>
                  {s.name}
                </span>
              ))}
            </div>
          )
        },
        projects.length > 0 && {
          title: 'Projects', content: projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: 9 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{proj.name}</strong>
                {proj.link && <span style={{ fontSize: 9, color: '#6b7280' }}>{proj.link}</span>}
              </div>
              {proj.tech && <span style={{ fontSize: 9.5, color: '#9ca3af' }}>{proj.tech}</span>}
              {proj.description && <p style={{ margin: '2px 0 0', color: '#374151', fontSize: 10 }}>{proj.description}</p>}
            </div>
          ))
        },
        certifications.length > 0 && {
          title: 'Certifications', content: certifications.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <div><strong>{c.name}</strong>{c.issuer && <span style={{ color: '#6b7280' }}> · {c.issuer}</span>}</div>
              <span style={{ fontSize: 9.5, color: '#9ca3af' }}>{fmt(c.date)}</span>
            </div>
          ))
        },
      ].filter(Boolean).map((section, i) => (
        <section key={i} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
            <h2 style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0, color: '#6b7280' }}>{section.title}</h2>
            <div style={{ flex: 1, height: 0.5, background: '#e5e7eb' }} />
          </div>
          {section.content}
        </section>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROFESSIONAL TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════════
export const ProfessionalTemplate = ({ data }) => {
  const { personal: p, education, experience, skills, projects, certifications } = data;
  const sidebar = '#1e3a5f';
  const accent  = '#14b8a6';

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#111', fontSize: 10.5, lineHeight: 1.5, background: '#fff', display: 'grid', gridTemplateColumns: '36% 64%', minHeight: '297mm' }}>
      {/* Sidebar */}
      <div style={{ background: sidebar, color: '#e2e8f0', padding: '28px 20px' }}>
        {/* Avatar & Name */}
        <div style={{ marginBottom: 22 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 10,
          }}>
            {(p.fullName || 'U').split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <h1 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 3px', lineHeight: 1.2 }}>{p.fullName || 'Your Name'}</h1>
          {p.title && <p style={{ fontSize: 10, color: accent, fontWeight: 600, margin: 0 }}>{p.title}</p>}
        </div>

        <SideSection title="Contact" accent={accent}>
          <div style={{ fontSize: 9.5, lineHeight: 1.8 }}>
            {p.email    && <div>✉ {p.email}</div>}
            {p.phone    && <div>☏ {p.phone}</div>}
            {p.address  && <div>⌖ {p.address}</div>}
            {p.linkedin && <div style={{ wordBreak: 'break-all' }}>in {p.linkedin}</div>}
            {p.github   && <div style={{ wordBreak: 'break-all' }}>⌥ {p.github}</div>}
            {p.portfolio && <div style={{ wordBreak: 'break-all' }}>⊕ {p.portfolio}</div>}
          </div>
        </SideSection>

        {skills.length > 0 && <SideSection title="Skills" accent={accent}>
          {skills.map((skill, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, marginBottom: 2 }}>
                <span>{skill.name}</span>
                <span style={{ color: '#94a3b8', fontSize: 9 }}>{skill.level}</span>
              </div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
                <div style={{ height: '100%', borderRadius: 2, background: accent, width: skillWidth[skill.level] || '60%' }} />
              </div>
            </div>
          ))}
        </SideSection>}

        {education.length > 0 && <SideSection title="Education" accent={accent}>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong style={{ fontSize: 10 }}>{edu.school}</strong>
              <div style={{ fontSize: 9.5, color: '#94a3b8' }}>{edu.degree}</div>
              <div style={{ fontSize: 9, color: '#64748b' }}>{fmt(edu.startDate)} – {fmt(edu.endDate)}</div>
            </div>
          ))}
        </SideSection>}

        {certifications.length > 0 && <SideSection title="Certifications" accent={accent}>
          {certifications.map((c, i) => (
            <div key={i} style={{ marginBottom: 7 }}>
              <strong style={{ fontSize: 10 }}>{c.name}</strong>
              <div style={{ fontSize: 9, color: '#94a3b8' }}>{c.issuer} · {fmt(c.date)}</div>
            </div>
          ))}
        </SideSection>}
      </div>

      {/* Main */}
      <div style={{ padding: '28px 26px' }}>
        {p.summary && <MainSection title="Profile" accent={accent} sidebar={sidebar}>
          <p style={{ margin: 0, color: '#334155' }}>{p.summary}</p>
        </MainSection>}

        {experience.length > 0 && <MainSection title="Experience" accent={accent} sidebar={sidebar}>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 14, paddingLeft: 10, borderLeft: `2px solid ${accent}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div>
                  <strong style={{ fontSize: 11 }}>{exp.position}</strong>
                  {exp.company && <span style={{ color: accent }}> · {exp.company}</span>}
                </div>
                <span style={{ fontSize: 9.5, color: '#64748b' }}>
                  {fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}
                </span>
              </div>
              {exp.description && <div style={{ marginTop: 4, color: '#334155', whiteSpace: 'pre-line', fontSize: 10 }}>{exp.description}</div>}
            </div>
          ))}
        </MainSection>}

        {projects.length > 0 && <MainSection title="Projects" accent={accent} sidebar={sidebar}>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{proj.name}</strong>
                {proj.link && <span style={{ fontSize: 9, color: accent }}>{proj.link}</span>}
              </div>
              {proj.tech && <span style={{ fontSize: 9.5, color: '#64748b' }}>{proj.tech}</span>}
              {proj.description && <p style={{ margin: '2px 0 0', color: '#334155', fontSize: 10 }}>{proj.description}</p>}
            </div>
          ))}
        </MainSection>}
      </div>
    </div>
  );
};

const SideSection = ({ title, accent, children }) => (
  <section style={{ marginBottom: 18 }}>
    <h2 style={{ fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: accent, margin: '0 0 8px' }}>{title}</h2>
    {children}
  </section>
);

const MainSection = ({ title, accent, sidebar, children }) => (
  <section style={{ marginBottom: 20 }}>
    <h2 style={{
      fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.1em', color: sidebar, margin: '0 0 10px',
      borderBottom: `2px solid ${accent}`, paddingBottom: 4,
    }}>{title}</h2>
    {children}
  </section>
);
