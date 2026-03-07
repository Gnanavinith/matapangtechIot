import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/iot-web-db';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('\n⚠️  Running in memory-only mode (no database persistence)');
    console.log('💡 Email notifications will still work!\n');
    // Don't exit - let server continue without DB
    throw error;
  }
};

export default connectDB;
