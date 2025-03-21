const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento para Multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se almacenan las imágenes
  },
  filename: (req, file, cb) => {
    // Crear un nombre único para el archivo basado en la fecha y el nombre original
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// tipo de imagenes permitidas (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true); // Permite archivo
  } else {
    cb(new Error('File not allowed'), false); // Rechaza archivo
  }
};

// Creacion del middleware con la configuración
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limita el tamaño del archivo a 5MB 
});

module.exports = upload;
