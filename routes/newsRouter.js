const express = require('express');
const passport = require('passport');

const { news: { getNews } } = require('../controllers');
const { addNews } = require('../controllers/news/addNews');
const uploadFile = require('../middleware/uploadFile');

const router = express.Router();

router.get('/', getNews);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  uploadFile.single('picture'),
  addNews,
);

module.exports = router;
