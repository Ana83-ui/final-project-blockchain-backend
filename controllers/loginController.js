const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/utils");
const { registerEmail } = require("../services/emailService");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existsEmail = await UserModel.findOne({ email });

    if (existsEmail) {
      return res.status(400).json({ message: "Email already registered. " });
    }
    const newUser = new UserModel({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    await newUser.save();
    await registerEmail(email);
    res.status(201).json({ status: "Success", message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({  status: "Failed", error: "User already exists in the database",});
    }
    res.status(500).json({ status: "Failed", message: "There was an error registering the user.", error: error.message, });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: "Failed",  message: "Email and password are required.", });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: "Failed", message: "Invalid credentials" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({ status: "Failed", message: "Invalid credentials" });
    }

    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      balance: user.balance,
      photo: user.photo,
    };

    const token = createToken(payload, false);
    const refreshToken = createToken(payload, true);

    res.status(200).json({ status: "Success", message: "Login successful", user: payload, token, refreshToken,
    });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "There was an error logging in.", error: error.message,
      });
  }
};

const tokenRefresh = async (req, res) => {
  try {
    const { _id, username, email } = req.payload;
    const payload = { _id, username, email };
    const token = createToken(payload, false);
    const refreshToken = createToken(payload, true);
    res.status(200).json({ status: "Success", message: "Tokens generated successfully", token, refreshToken, });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "There was an error refreshing the tokens.", error: error.message,
      });
  }
};

module.exports = { signup, login, tokenRefresh };
