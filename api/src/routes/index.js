const router = require("express").Router();

const { getAllNotes, getNote, getLastNote, createNote } = require('../controllers/notasController');

const authRoutes = require("./auth.routes");
const expedientsRoutes = require("./expedients.routes");

router.use(authRoutes);
router.use(expedientsRoutes);

// Notas
router.route('/notas').get(getAllNotes)
router.route('/notas/:id_nota').get(getNote)
router.route('/notas/ultimaNota/:id_expedient').get(getLastNote)
router.route('/notas/crearNota').post(createNote)

module.exports = router;
