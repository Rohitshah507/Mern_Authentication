import express from "express";
import { vehicleController } from "../Controller/vehicleController.js";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

router.post("/vehicle", auth, vehicleController);

export default router;
