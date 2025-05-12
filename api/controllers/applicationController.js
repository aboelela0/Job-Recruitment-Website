const Application = require('../models/applicationModel');

// Submit a new application
const submitApplication = async (req, res) => {
  try {
    const { fullName, email, phone, position, additionalInfo, jobId } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Resume file is required' });
    }

    const resumePath = req.file.filename;

    const application = new Application({
      fullName,
      email,
      phone,
      position,
      resumePath,
      additionalInfo,
      userId: req.user.id, // ✅ From authenticated token
      jobId
    });

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application._id
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all applications (admin/recruiter)
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get applications submitted by a specific user
const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }

    const applications = await Application.find({ userId }).populate('job');
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get application by ID
const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['pending', 'reviewing', 'interviewed', 'rejected', 'accepted'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({
      message: 'Application status updated',
      application
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  getUserApplications,
  getApplicationById,
  updateApplicationStatus
};
