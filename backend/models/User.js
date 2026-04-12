const mongoose = require("mongoose");

// Define the User schema for MongoDB using Mongoose
const userSchema = new mongoose.Schema(
  // Define the structure of the user document
  {
    email: {
      type: String,
      required: true,
      unique: true, // prevent duplicate users
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: {
      type: String,
      // required: false,
    },
    resetTokenExpire: {
      type: Date,
      // required: false,
    },
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt fields
);

// Create the User model based on the defined schema
const User = mongoose.model("User", userSchema);
module.exports = User;
