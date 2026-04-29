// import necessary modules and dependencies
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

// Forgot password controller
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ success: false, message: "Email required" });

  // Check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  // Generate a random token for password reset
  const token = crypto.randomBytes(32).toString("hex");

  // Set the reset token and its expiration time on the user document
  user.resetToken = token; //Saves token inside the user document
  user.resetTokenExpire = Date.now() + 30 * 60 * 1000; // Token expires in 30 minutes

  await user.save(); // Save the updated user document to the database

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`; // URL for the password reset page

  //send the email to the user with the reset link
  await sendEmail(email, resetLink);

  res.status(200).json({
    success: true,
    message: "Password reset link sent to your email",
  });
};

//Verify the token and reset the password controller
exports.verifyTokenAndResetPassword = async (req, res) => {
  const { token } = req.params; // Get the token from the URL parameters
  const { newPassword } = req.body; // Get the new password from the request body

  if (!newPassword)
    return res
      .status(400)
      .json({ success: false, message: "Password required" });

  // Find the user where
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() }, // Check if the token has not expired
  });

  // Invalid/expired token
  if (!user)
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired token" });

  // Hash the new password before saving it to the database
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword; // Update the user's password
  user.resetToken = undefined; // Clear the reset token
  user.resetTokenExpire = undefined; // Clear the token expiration time

  await user.save(); // Save the updated user document to the database

  res.status(200).json({ success: true, message: "Password reset successful" });
};

//Register controller
exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email and password required" });

  const userExists = await User.findOne({ email });

  if (userExists)
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 6);

  const user = await User.create({ email, password: hashedPassword });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res
    .status(200)
    .json({ success: true, token, user, message: "Registration successful" });
};

//Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email and password required" });

  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res
    .status(200)
    .json({ success: true, token, user, message: "Login successful" });
};

//Logout controller
exports.logout = async (req, res) => {
  res.status(200).json({ success: true, message: "Logout successful" });
};
