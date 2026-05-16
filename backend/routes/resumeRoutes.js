// routes/resumeRoutes.js

const express = require('express');
const router = express.Router();
const {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');

// All resume routes are protected
router.use(protect);

router.route('/')
  .get(getResumes)      // GET    /api/resumes
  .post(createResume);  // POST   /api/resumes

router.route('/:id')
  .get(getResumeById)   // GET    /api/resumes/:id
  .put(updateResume)    // PUT    /api/resumes/:id
  .delete(deleteResume); // DELETE /api/resumes/:id

router.post('/:id/duplicate', duplicateResume); // POST /api/resumes/:id/duplicate

module.exports = router;
