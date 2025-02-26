const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/db');
const financeRoutes = require('./routes/FinanceRoutes');
const userRoutes = require('./routes/UserRoutes');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

app.use(cors()); // Enable Cross-Origin Requests
app.use(express.json()); // Parse incoming JSON data
app.use('/api/users', userRoutes);
app.use('/api/finance', financeRoutes);
// Middleware

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
