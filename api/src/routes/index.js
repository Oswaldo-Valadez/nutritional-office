const express = require('express');
const { getAllNotes, getNote } = require('../controllers/notasController');
const router = express.Router();

const { loginUser } = require('../controllers/userController');

// Login
router.route('/login').post(loginUser)

// Notas
router.route('/notas').get(getAllNotes)
router.route('/notas/:id_nota').get(getNote)

module.exports = router;
