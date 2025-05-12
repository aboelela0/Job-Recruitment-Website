const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const {
  submitApplication,
  getAllApplications,
  getUserApplications,
  getApplicationById,
  updateApplicationStatus
} = require('../controllers/applicationController');

const { authenticateToken } = require('../middlewares/authMiddleware');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'resume-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Controllers inline handler for '/me'
const Application = require('../models/applicationModel');
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, applications });
  } catch (err) {
    console.error('Error fetching user applications:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Routes

router.post('/submit', authenticateToken, upload.single('resume'), submitApplication);

router.get('/', authenticateToken, getAllApplications);
router.get('/user/:userId', authenticateToken, getUserApplications);
router.get('/:id', authenticateToken, getApplicationById);
router.patch('/:id/status', authenticateToken, updateApplicationStatus);

module.exports = router;
