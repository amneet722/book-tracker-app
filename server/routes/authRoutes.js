const express = require('express');
const { register, login, getMe } = require('../controllers/authController'); // Import getMe
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe); // New protected route to get current user info

module.exports = router;