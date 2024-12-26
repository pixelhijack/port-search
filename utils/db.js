require('dotenv').config(); // Load .env variables

const mongoose = require('mongoose');

const dbOptions = {};

const connectToDatabase = async () => {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI, dbOptions);
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process on failure
  }
};

module.exports = connectToDatabase;