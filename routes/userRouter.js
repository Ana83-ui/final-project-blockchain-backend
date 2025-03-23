const express = require("express");
const {  getAllUsers,  getUserById,  postNewUser,  patchUser, resetPassword, deleteUser,} = require("../controllers/userController");
const { tokenVerify } = require("../middleware/auth-token");
const router = express.Router();
const upload = require('../middleware/image'); 
const UserModel = require('../models/userModel'); 

router.get("/users", getAllUsers);
router.post("/users", postNewUser);
router.post("/change-password", resetPassword)
router.get("/users/:_id", getUserById);
router.patch("/users/:_id", patchUser);
router.delete("/users/:_id", deleteUser)


router.post('/upload', tokenVerify, upload.single('photo'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No image was uploaded.' });
    }
    // If uploaded correctly, save the image path in the 'photo' field
    const imageUrl = `uploads/${req.file.filename}`; 
    console.log(req.file)
    // Updated the database with new image URL
    UserModel.findByIdAndUpdate(req.user._id, { photo: imageUrl }, { new: true })
    .then((user) => {
      res.json({ photo: imageUrl, user }); // Returns the URL with the new photo and updated user
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error while updating profile photo.' });
    });
  });


module.exports = router;
