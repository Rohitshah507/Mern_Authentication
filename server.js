import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./Routes/authRoutes.js";
import partnerDocsRoutes from "./Routes/partnerDocsRoutes.js";
import vehicleRoute from "./Routes/vehicleRoute.js";
import adminRoutes from "./Routes/adminRoutes.js";

import connectDB from "./Config/DB.js";
import { connectCloud } from "./Config/Cloudinary.js";

dotenv.config();

const app = express();

// app.use(logger);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/partner", vehicleRoute);
app.use("/partner", partnerDocsRoutes);
app.use("/admin", adminRoutes);

const startServer = async () => {
  try {
    connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on the ${PORT}`);
    });
  } catch (error) {
    console.log("Error while connecting to the server:", error.message);
    process.exit(1);
  }
};

connectCloud();

startServer();
