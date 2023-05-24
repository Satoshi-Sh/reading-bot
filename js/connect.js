const mongoose = require("mongoose");
require("dotenv").config();
const databaseURL = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!!");
  } catch (err) {
    console.error("Failed to connect to MongoDB" + err);
  }
};

module.exports = connectDB;
