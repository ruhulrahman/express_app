const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const helmet = require('helmet');
const { IpFilter, IpDeniedError } = require('express-ipfilter');

// List of blocked IPs
const blockedIps = ['192.168.1.1', '10.0.0.1'];

app.use(IpFilter(blockedIps, { mode: 'deny' }));

app.use((err, req, res, next) => {
    if (err instanceof IpDeniedError) {
        res.status(403).send('Access Denied');
    } else {
        next(err);
    }
});


// Load SSL certificate and key
const sslOptions = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Rate limiting middleware
// Define rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    headers: true, // Add rate limit info to headers
});
// Apply the limiter to all routes
app.use(limiter);

// Define speed limiter
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50, // Allow 50 requests per windowMs without delay
    delayMs: 500, // Delay each request by 500ms after the limit
});

// Apply the speed limiter to all routes
app.use(speedLimiter);

app.use(helmet());
// Example: Content Security Policy
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'trusted-cdn.com'],
        },
    })
);

// Middleware
app.use(express.json());
// app.use(express.json({ limit: '10kb' })); // Limit body size to 10KB

// Routes
app.use('/api/users', userRoutes);

// Port configuration
const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Start the HTTPS server

// const server = https.createServer((req, res) => {
//     const filePath = path.join(__dirname, 'large-file.txt');

//     fs.createReadStream(filePath) // Non-blocking file read
//         .on('open', () => {
//             res.writeHead(200, { 'Content-Type': 'text/plain' });
//         })
//         .on('error', (err) => {
//             res.writeHead(500);
//             res.end('Error reading file');
//         })
//         .pipe(res); // Stream data directly to the response
// });

// server.listen(PORT, () => {
//     console.log(`HTTP Server is running on http://localhost:${PORT}`);
// });
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on https://localhost:${PORT}`);
});
