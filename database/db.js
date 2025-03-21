const mongoose = require("mongoose");

const dbURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Successful connection to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }
};

module.exports = connectDB;
