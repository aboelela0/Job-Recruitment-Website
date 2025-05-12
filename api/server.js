const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

// Serve uploaded resumes statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Global error handler (Multer & server)
app.use((err, req, res, next) => {
  console.error('Server Error:', err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds the 5MB limit'
      });
    }
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`
    });
  }

  if (err.message === 'Only PDF, DOC, and DOCX files are allowed!') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  res.status(500).json({
    success: false,
    message: 'An internal server error occurred'
  });
});

const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);


module.exports = app;
