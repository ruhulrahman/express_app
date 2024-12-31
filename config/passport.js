const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Save user info in DB or session
    done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


// OAuth Passwport Authentication Start
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

// OAuth Passwport Authentication Start
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

// OAuth Passwport Authentication Start
router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

// OAuth Passwport Authentication Start
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

// OAuth Passwport Authentication Start
router.get('/auth/linkedin', passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});
// OAuth Passwport Authentication End

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.send({ message: 'Welcome to the dashboard!', user: req.user });
});

app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = app;
