const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.post('/register', studentController.registerStudent);
router.get('/', studentController.getAllStudents);
router.get('/filter/:field/:value', studentController.filterStudents);
router.post('/search', studentController.searchStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/delete/:id', studentController.deleteStudent);
router.put('/forgotpassword', studentController.forgotPassword);
router.post('/login', studentController.login);

module.exports = router;
