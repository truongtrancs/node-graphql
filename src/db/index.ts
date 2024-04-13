import mongoose from "mongoose";

// const MONGO_URI = "mongodb://localhost:27017/yourDatabaseName"; // Adjust the URI as needed
const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
