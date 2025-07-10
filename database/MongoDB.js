import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "../config/env.js";

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected successfully in ${NODE_ENV ? NODE_ENV : 'development'} mode.`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;