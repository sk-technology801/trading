// lib/db.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'crypto-trade',
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Error", err);
  }
};
