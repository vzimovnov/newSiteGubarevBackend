const express = require('express');
const passport = require('passport');

const { register, login, whoAmI } = require('../controllers/auth/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/whoami', passport.authenticate('jwt', { session: false }), whoAmI);

module.exports = router;
