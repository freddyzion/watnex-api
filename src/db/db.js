import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log("Disconnected database!");
};

export { connectDB, disconnectDB };