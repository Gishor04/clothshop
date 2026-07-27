const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cloth_shop_db';
    
    const conn = await mongoose.connect(uri, {
      dbName: 'cloth_shop_db',
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, avoids IPv6 ECONNRESET issues on some serverless hosts
    });

    isConnected = true;
    console.log(`MongoDB Connected to [${conn.connection.name}]: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
