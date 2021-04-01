const express = require('express');
const { getAllNotes } = require('../controllers/notasController');
const router = express.Router();

const { loginUser } = require('../controllers/userController');

// Login
router.route('/login').post(loginUser)

// Notas
router.route('/notas').get(getAllNotes)

module.exports = router;
