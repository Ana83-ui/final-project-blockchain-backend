const multer = require('multer');
const path = require('path');

// Storage configuration for Multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Storage of images
  },
  filename: (req, file, cb) => {
    // Create unique name for the file based on date and original name
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// type of images allowed (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true); // allows file
  } else {
    cb(new Error('File not allowed'), false); // reject file
  }
};

// Creation of the middleware with configuration
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limits the size of the file to 5MB 
});

module.exports = upload;
