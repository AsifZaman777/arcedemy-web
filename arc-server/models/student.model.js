const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  password: String,
  enrollmentStatus: { type: String, default: "enrolled" },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  passwordChangedAt: Date,
});

module.exports = mongoose.model('Student', studentSchema);
