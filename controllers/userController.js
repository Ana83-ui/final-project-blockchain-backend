const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const { registerEmail } = require("../services/emailService");
const bcrypt = require("bcrypt");
const {changePasswordEmail} = require("../services/emailService")

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json({ status: "Success", users: users });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "There was an error fetching the users.", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params._id;
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

const postNewUser = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    await UserModel.create(user);
    await registerEmail(user.email);
    res.status(200).json({ status: "Success", message: "User registered successfully" });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ status: "Failed", message: "There was an error registering the user.", error: error.message });
  }
};

const patchUser = async (req, res) => {
  try {
    const userId = req.params._id;
    const newUser = req.body;
    const user = await UserModel.findByIdAndUpdate(userId, newUser, {
      new: true,
    });
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json({ status: "Success", message: "User updated successfully", user: user});
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "There was an error updating the user.",  error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: 'User with this email not found' });
  }

  if (newPassword) {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await changePasswordEmail(email);

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  }

  res.status(400).json({ success: false, message: 'New password is required' });
};


const deleteUser = async (req, res) => {
  try {
    const idUser = req.params._id;
    const user = await UserModel.findByIdAndDelete(idUser);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found",});
    }
    res.status(200).json({ success: true, message: "User successfully deleted", });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting de user", error: error.message,});
  }
};

module.exports = { getAllUsers, getUserById, postNewUser, patchUser, resetPassword, deleteUser };
