const router = require('express').Router();

const { login } = require('../controllers/auth.controller');

router.route('/login').post(login);

module.exports = router;
