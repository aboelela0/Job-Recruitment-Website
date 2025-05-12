    const express = require('express');
    const router = express.Router();
    const authController = require('../controllers/authController');

    router.post('/signup', authController.signup);
    router.post('/login', authController.login);
    router.get('/profile/:id', authController.getUserProfile);
    router.put('/profile/:id', authController.updateProfile);
    router.get('/verify', authController.verifyUser);

    // ✅ Add this new route
    router.get('/verify', authController.verifyUser);

    module.exports = router;