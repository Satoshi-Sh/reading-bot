const mongoose = require('mongoose');
require("dotenv").config();
const databaseURL = process.env.DATABASE_URL;
const fs = require('fs')

const options = {
  tls: true,
  tlsCertificateKeyFile: '/etc/ssl/mongodb.pem',
  tlsAllowInvalidCertificates: true,
};

async function connect() {
  try {
    await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...options
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { connect };

