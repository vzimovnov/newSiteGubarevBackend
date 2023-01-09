const express = require('express');
const passport = require('passport');

const { users: { getUser, updateUser } } = require('../controllers');
const uploadFile = require('../middleware/uploadFile');

const router = express.Router();

router.get('/:id', getUser);
router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  uploadFile.single('avatar'),
  updateUser,
);

module.exports = router;
