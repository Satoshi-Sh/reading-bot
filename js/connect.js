const mongoose = require('mongoose');
require("dotenv").config();
const databaseURL = process.env.DATABASE_URL;

async function connect() {
  try {
    await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { connect };

