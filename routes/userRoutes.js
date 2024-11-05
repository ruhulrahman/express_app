const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// User Registration
router.post('/register', userController.registerUser);

// Get User Profile (Protected)
router.get('/profile', authMiddleware, userController.getUser);

// Update User (Protected)
router.put('/update', authMiddleware, userController.updateUser);

// Delete User (Protected)
router.delete('/delete', authMiddleware, userController.deleteUser);

module.exports = router;
