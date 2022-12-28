const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../public/images');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 10 * 1024 * 1024,
};

module.exports = multer({ storage, fileFilter, limits });
