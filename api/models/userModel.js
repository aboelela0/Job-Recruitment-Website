// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // Added for admin access control
  profile: {
    fullName: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    professionalSummary: { type: String, default: '' },
    title: { type: String, default: 'Job Seeker' },
    education: [{
      institution: String,
      degree: String,
      years: String
    }],
    experience: [{
      company: String,
      position: String,
      years: String,
      description: String
    }],
    skills: [String],
    applications: [{
      position: String,
      company: String,
      date: String,
      status: String
    }],
    savedJobs: [{
      position: String,
      company: String,
      location: String
    }]
  }
}, {
  timestamps: true // Added timestamps for user creation and updates
});

module.exports = mongoose.model('User', userSchema);