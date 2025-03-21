const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  photo: {
    type: String,
    default: '/uploads/user-default-profile.png',
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "The password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.model("User", userSchema, "user");

module.exports = userModel;
