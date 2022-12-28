const multer = require('multer');

const FILE_SIZE = 10 * 1024 * 1024;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images/');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/gif'
    || file.mimetype === 'image/svg'
    || file.mimetype === 'image/webp') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  FILE_SIZE,
};

module.exports = multer({ storage, fileFilter, limits });
