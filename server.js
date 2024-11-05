const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

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

// Port configuration
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
