// routes/login.js
const express = require('express');
const bcrypt = require('bcryptjs'); // Use the same library
const Student = require('../models/Student');

const router = express.Router(); 

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }  

    // Compare hashed password
    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // If successful, return success response (you can return user data or a token)
    res.json({ success: true, message: 'Login successful', studentId: student._id });
  } catch (error) {
    console.error('Login error:', error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;