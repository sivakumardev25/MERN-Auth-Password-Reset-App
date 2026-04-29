//Imports Express framework and create a router instance
const express = require("express");
const router = express.Router();


// Import controller functions for handling authentication-related operations
const {
  forgotPassword,
  verifyTokenAndResetPassword,
  login,
  register,
} = require("../controllers/authController");

//Routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", verifyTokenAndResetPassword);
router.post("/login", login);
router.post("/register", register);
// router.post("/logout", logout);
module.exports = router;
