const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

// Signup
const signup = async (req, res) => {
  const { username, email, password, profile } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const userProfile = {
      fullName: `${profile.firstName} ${profile.lastName}`,
      phone: profile.phone || '',
      location: profile.location || '',
      professionalSummary: profile.professionalSummary || '',
      title: profile.title || 'Job Seeker',
      skills: profile.skills || [],
      education: [],
      experience: [],
      applications: [],
      savedJobs: []
    };

    const user = new User({ username, email, password, profile: userProfile });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    const savedUser = await User.findById(user._id).select('-password');

const userData = {
  id: savedUser._id,
  username: savedUser.username,
  email: savedUser.email,
  profile: savedUser.profile
};


    res.status(201).json({ message: 'User created successfully', user: userData, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      profile: user.profile
    };

    res.status(200).json({ message: 'Login successful', user: userData, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, profile } = req.body;

    const updatedProfile = {
      fullName: profile.fullName || `${profile.firstName} ${profile.lastName}`,
      phone: profile.phone || '',
      location: profile.location || '',
      professionalSummary: profile.professionalSummary || '',
      title: profile.title || 'Job Seeker',
      skills: Array.isArray(profile.skills) ? profile.skills : [],
      education: profile.education || [],
      experience: profile.experience || [],
      applications: profile.applications || [],
      savedJobs: profile.savedJobs || []
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, profile: updatedProfile },
      { new: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify token
const verifyUser = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  signup,
  login,
  getUserProfile,
  updateProfile,
  verifyUser
};