// controllers/resumeController.js
// Full CRUD operations for resumes

const Resume = require('../models/Resume');

// ─── @route   GET /api/resumes ────────────────────────────────────────────────
// ─── @desc    Get all resumes for logged-in user
// ─── @access  Private
const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user.id })
      .select('title template lastSaved createdAt updatedAt') // Only return summary fields
      .sort({ updatedAt: -1 }); // Most recently updated first

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   GET /api/resumes/:id ───────────────────────────────────────────
// ─── @desc    Get single resume by ID
// ─── @access  Private
const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Make sure resume belongs to logged-in user
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this resume',
      });
    }

    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    next(error);
  }
};

// ─── @route   POST /api/resumes ───────────────────────────────────────────────
// ─── @desc    Create a new resume
// ─── @access  Private
const createResume = async (req, res, next) => {
  try {
    const {
      title,
      template,
      personal,
      education,
      experience,
      skills,
      projects,
      certifications,
    } = req.body;

    const resume = await Resume.create({
      user:           req.user.id,
      title:          title || 'My Resume',
      template:       template || 'modern',
      personal:       personal || {},
      education:      education || [],
      experience:     experience || [],
      skills:         skills || [],
      projects:       projects || [],
      certifications: certifications || [],
    });

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   PUT /api/resumes/:id ───────────────────────────────────────────
// ─── @desc    Update a resume
// ─── @access  Private
const updateResume = async (req, res, next) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Check ownership
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this resume',
      });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastSaved: new Date() },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Resume saved successfully',
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   DELETE /api/resumes/:id ────────────────────────────────────────
// ─── @desc    Delete a resume
// ─── @access  Private
const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Check ownership
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this resume',
      });
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   POST /api/resumes/:id/duplicate ────────────────────────────────
// ─── @desc    Duplicate a resume
// ─── @access  Private
const duplicateResume = async (req, res, next) => {
  try {
    const original = await Resume.findById(req.params.id);

    if (!original) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    if (original.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const copy = await Resume.create({
      user:           req.user.id,
      title:          `${original.title} (Copy)`,
      template:       original.template,
      personal:       original.personal,
      education:      original.education,
      experience:     original.experience,
      skills:         original.skills,
      projects:       original.projects,
      certifications: original.certifications,
    });

    res.status(201).json({
      success: true,
      message: 'Resume duplicated',
      data: copy,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
};
