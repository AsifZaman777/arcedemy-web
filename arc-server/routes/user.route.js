const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/user.controller');
const { getUserById } = require('../controllers/user.controller');
const { createUser } = require('../controllers/user.controller');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

module.exports = router;