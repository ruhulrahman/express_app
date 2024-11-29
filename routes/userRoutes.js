const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// User Registration
router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.post('/logout', authMiddleware, userController.logoutUser);


// Get All Users (Protected)
router.get('/', authMiddleware, userController.getAllUsers);

router.get('/details', authMiddleware, userController.getUserWithDetails);

router.get('/:id', authMiddleware, userController.getUserById);

router.get('/search', authMiddleware, userController.searchUsers);

router.get('/blood-group/:bloodGroup', authMiddleware, userController.getUsersByBloodGroup);

router.get('/country/:country', authMiddleware, userController.getUsersByCountry);

router.get('/designation/:designation', authMiddleware, userController.getUsersByDesignation);

router.get('/age-range/:minAge/:maxAge', authMiddleware, userController.getUsersByAgeRange);

router.get('/admin', authMiddleware, userController.getAllAdminUsers);

router.get('/non-admin', authMiddleware, userController.getAllNonAdminUsers);

router.get('/change-password', authMiddleware, userController.changePassword);

router.get('/reset-password/:token', authMiddleware, userController.resetPassword);

router.get('/forgot-password', userController.forgotPassword);

router.post('/verify-email', userController.verifyEmail);

router.post('/send-verification-email', userController.sendVerificationEmail);

router.post('/verify-phone', userController.verifyPhone);

router.post('/send-verification-sms', userController.sendVerificationSMS);

router.post('/upload-avatar', authMiddleware, userController.uploadAvatar);

router.post('/upload-cover', authMiddleware, userController.uploadCover);

router.post('/upload-videos', authMiddleware, userController.uploadVideos);


// Get User Profile (Protected)
router.get('/profile', authMiddleware, userController.getUser);

// Update User (Protected)
router.put('/update', authMiddleware, userController.updateUser);

// Delete User (Protected)
router.delete('/delete', authMiddleware, userController.deleteUser);

module.exports = router;
