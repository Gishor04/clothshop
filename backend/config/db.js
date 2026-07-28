const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let isConnected = false;

const ATLAS_URI = 'mongodb+srv://gishor14_db_user:1408@cluster0.nyovru8.mongodb.net/cloth_shop_db?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const uri = process.env.MONGODB_URI || ATLAS_URI;
    
    const conn = await mongoose.connect(uri, {
      dbName: 'cloth_shop_db',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 2,
      family: 4,
    });

    isConnected = true;
    console.log(`MongoDB Connected to [${conn.connection.name}]: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
