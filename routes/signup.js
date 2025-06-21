// routes/signup.js
const express = require('express');
const bcrypt = require('bcryptjs'); // Use bcryptjs consistently
const router = express.Router();
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');

router.post('/', async (req, res) => {
  const { email, username, password, role } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'Faculty') {
      const newFaculty = new Faculty({
        email,
        username,
        password: hashedPassword,
        role,
      });
      await newFaculty.save();
      res.json({ msg: 'Faculty signed up successfully' });
    } else if (role === 'Student') {
      const newStudent = new Student({
        email,
        username,
        password: hashedPassword,
        role,
      });
      await newStudent.save();
      res.json({ msg: 'Student signed up successfully' });
    } else {
      res.status(400).json({ error: 'Invalid role selected' });
    }
  } catch (error) {
    console.error('Signup error:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

module.exports = router;
