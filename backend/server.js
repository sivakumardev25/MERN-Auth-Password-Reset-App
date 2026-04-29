const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

const connectDB = require("./config/db.js");

// Define routes for authentication-related operations
const userRoutes = require("./routes/authRoutes");

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Start the server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to the MongoDB database before starting the server
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};
startServer();
module.exports = app;
