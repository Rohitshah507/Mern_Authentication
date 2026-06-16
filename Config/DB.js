import mongoose from "mongoose";
import dotenv from "dotenv";

import config from "./Config.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodb_url);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Connection Failed", error.message);
  }
};

export default connectDB;