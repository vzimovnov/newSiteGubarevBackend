const express = require('express');

const { users: { getUser } } = require('../controllers');

const router = express.Router();

router.get('/:id', getUser);

module.exports = router;
