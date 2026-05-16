// models/Resume.js
// Full resume schema with all sections

const mongoose = require('mongoose');

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

const PersonalInfoSchema = new mongoose.Schema({
  fullName:  { type: String, default: '' },
  title:     { type: String, default: '' },
  email:     { type: String, default: '' },
  phone:     { type: String, default: '' },
  address:   { type: String, default: '' },
  linkedin:  { type: String, default: '' },
  github:    { type: String, default: '' },
  portfolio: { type: String, default: '' },
  summary:   { type: String, default: '' },
}, { _id: false });

const EducationSchema = new mongoose.Schema({
  school:      { type: String, default: '' },
  degree:      { type: String, default: '' },
  field:       { type: String, default: '' },
  startDate:   { type: String, default: '' },
  endDate:     { type: String, default: '' },
  gpa:         { type: String, default: '' },
  description: { type: String, default: '' },
});

const ExperienceSchema = new mongoose.Schema({
  company:     { type: String, default: '' },
  position:    { type: String, default: '' },
  startDate:   { type: String, default: '' },
  endDate:     { type: String, default: '' },
  current:     { type: Boolean, default: false },
  description: { type: String, default: '' },
});

const SkillSchema = new mongoose.Schema({
  name:  { type: String, default: '' },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate',
  },
});

const ProjectSchema = new mongoose.Schema({
  name:        { type: String, default: '' },
  description: { type: String, default: '' },
  link:        { type: String, default: '' },
  tech:        { type: String, default: '' },
});

const CertificationSchema = new mongoose.Schema({
  name:   { type: String, default: '' },
  issuer: { type: String, default: '' },
  date:   { type: String, default: '' },
  expiry: { type: String, default: '' },
});

// ─── Main Resume Schema ───────────────────────────────────────────────────────

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Index for faster user-based queries
    },
    title: {
      type: String,
      required: [true, 'Resume title is required'],
      default: 'My Resume',
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    template: {
      type: String,
      enum: ['modern', 'minimal', 'professional'],
      default: 'modern',
    },
    personal:       { type: PersonalInfoSchema,          default: () => ({}) },
    education:      { type: [EducationSchema],           default: [] },
    experience:     { type: [ExperienceSchema],          default: [] },
    skills:         { type: [SkillSchema],               default: [] },
    projects:       { type: [ProjectSchema],             default: [] },
    certifications: { type: [CertificationSchema],       default: [] },
    isPublic: {
      type: Boolean,
      default: false,
    },
    lastSaved: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Update lastSaved before every save
ResumeSchema.pre('save', function (next) {
  this.lastSaved = new Date();
  next();
});

module.exports = mongoose.model('Resume', ResumeSchema);
