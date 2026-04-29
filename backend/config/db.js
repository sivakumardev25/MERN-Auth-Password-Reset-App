// Database configuration and connection setup using Mongoose
// Imports Mongoose library
const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Connect to the MongoDB database using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;

