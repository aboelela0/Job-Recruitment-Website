const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access token missing' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ success: false, message: 'User not found or invalid' });
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role || 'user'
    };

    next();
  } catch (err) {
    console.error('Authentication error:', err.message);
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = {
  authenticateToken
};
