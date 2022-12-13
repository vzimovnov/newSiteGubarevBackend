const express = require('express');

const { news: { getNews } } = require('../controllers');

const router = express.Router();

router.get('/', getNews);

module.exports = router;
