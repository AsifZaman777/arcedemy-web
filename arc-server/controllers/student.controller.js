const Student = require('../models/student.model');
const jwt = require('jsonwebtoken');

const registerStudent = async (req, res) => {
  try {
    const student = req.body;
    const existingPhone = await Student.findOne({ mobile: student.mobile });
    if (existingPhone) return res.status(400).json({ message: "Phone number already exists" });

    const existingEmail = await Student.findOne({ email: student.email });
    if (existingEmail) return res.status(400).json({ message: "Email already exists" });

    student.enrollmentStatus = student.enrollmentStatus === "unenrolled" ? "Unenrolled" : "enrolled";
    const newStudent = new Student(student);
    const result = await newStudent.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getAllStudents = async (req, res) => {
  const result = await Student.find();
  res.send(result);
};

const filterStudents = async (req, res) => {
  const { field, value } = req.params;
  const query = { [field]: value };
  const result = await Student.find(query);
  res.send(result);
};

const searchStudent = async (req, res) => {
  const query = req.body;
  const result = await Student.find(query);
  res.send(result);
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Student.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = req.body;
    const result = await Student.findByIdAndUpdate(id, updatedStudent, { new: true, upsert: true });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const forgotPassword = async (req, res) => {
  const { phoneNumber, password } = req.body;
  const user = await Student.findOne({ mobile: phoneNumber });
  if (user) {
    user.password = password;
    user.passwordChangedAt = new Date();
    await user.save();
    res.send(user);
  } else {
    res.status(401).json({ message: "Invalid phone number" });
  }
};

const login = async (req, res) => {
  const { phoneNumber, password } = req.body;
  const user = await Student.findOne({ mobile: phoneNumber });
  if (user && user.password === password) {
    user.lastLogin = new Date();
    await user.save();
    const token = jwt.sign({ phoneNumber: user.mobile }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = {
  registerStudent,
  getAllStudents,
  filterStudents,
  searchStudent,
  deleteStudent,
  updateStudent,
  forgotPassword,
  login
};
