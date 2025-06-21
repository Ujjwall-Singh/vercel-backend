const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Faculty' },
});

module.exports = mongoose.model('Faculty', FacultySchema);
