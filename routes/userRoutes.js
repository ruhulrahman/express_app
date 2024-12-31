const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const { check, validationResult } = require('express-validator');
const ExpressBrute = require('express-brute');

const store = new ExpressBrute.MemoryStore();
const bruteForce = new ExpressBrute(store, {
    freeRetries: 5, // Allow 5 retries
    minWait: 5 * 60 * 1000, // Wait 5 minutes after retries exhausted
    maxWait: 60 * 60 * 1000, // Wait 1 hour max
    failCallback: (req, res, next, nextValidRequestDate) => {
        res.status(429).send(`Too many requests. Try again at ${nextValidRequestDate}`);
    },
});

// Apply brute force protection
app.post('/login-with-brute-force', bruteForce.prevent, (req, res) => {
    res.send('Login attempt processed');
});


app.post('/user', [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.send('User created successfully!');
});

// OAuth Passwport Authentication Start
// require('../config/passport')

// User Registration
router.post('/register', userController.registerUser);
router.post('/login', userController.registerUser);

// Get User Profile (Protected)
router.get('/profile', authMiddleware, userController.getUser);

// Update User (Protected)
router.put('/update', authMiddleware, userController.updateUser);

// Delete User (Protected)
router.delete('/delete', authMiddleware, userController.deleteUser);

module.exports = router;
