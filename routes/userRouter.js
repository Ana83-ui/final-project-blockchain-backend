const express = require("express");
const {  getAllUsers,  getUserById,  postNewUser,  patchUser, resetPassword,} = require("../controllers/userController");
const { tokenVerify } = require("../middleware/auth-token");
const router = express.Router();
const upload = require('../middleware/image'); 
const UserModel = require('../models/userModel'); 

router.get("/users", getAllUsers);
router.post("/users", postNewUser);
router.post("/change-password", resetPassword)
router.get("/users/:_id", getUserById);
router.patch("/users/:_id", patchUser);

router.post('/upload', tokenVerify, upload.single('photo'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No image was uploaded.' });
    }
    // Si se sube correctamente , guarda la ruta de la imagen en el campo 'photo'
    const imageUrl = `uploads/${req.file.filename}`; 
    console.log(req.file)
    // Actualiza la BdD con la nueva URL de la imagen
    UserModel.findByIdAndUpdate(req.user._id, { photo: imageUrl }, { new: true })
    .then((user) => {
      res.json({ photo: imageUrl, user }); // Devuelve la URL con la nueva foto y el usuario actualizado
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error while updating profile photo.' });
    });
  });


module.exports = router;
