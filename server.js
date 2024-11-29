const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const countryRoutes = require('./routes/countryRoutes');
const designationRoutes = require('./routes/designationRoutes');
const bloodGroupRoutes = require('./routes/bloodGroupRoutes');
const https = require('https');
const fs = require('fs');

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

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/bloodgroups', bloodGroupRoutes);

// Port configuration
const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Start the HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on https://localhost:${PORT}`);
});
