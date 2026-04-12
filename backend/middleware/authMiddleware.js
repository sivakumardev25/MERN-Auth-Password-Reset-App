// Imports JWT library and User model
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes and verify JWT tokens
const authMiddleware = async (req, res, next) => {
  // initialize token variable to store the extracted token from the request header
  let token;
  // Check if the Authorization header is present and starts with "Bearer"
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1]; // Get the token part after "Bearer"SS

      // Verify the token using the secret key from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Fetch user from DB using ID from token
      req.user = await User.findById(decoded.id).select("-password"); // Exclude password from the user object

      //if user doesn’t exist in DB
      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      next(); // Proceed to the next middleware or route handler
    } else {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;
