const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const facultyRoute = require('./routes/facultyLogin');
require('dotenv').config();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Log requests to the console

// Environment Variable Check
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not set in the environment variables');
  process.exit(1);
}

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit the process with failure
  }
};

// Routes
app.use('/api/review', require('./routes/review'));
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/facultylogin', facultyRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB(); // Connect to the database after the server starts
});
