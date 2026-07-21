import express from "express";
import { vehicleController, getVehicles } from "../Controller/vehicleController.js";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

router.post("/vehicle", auth, vehicleController);
router.get("/", auth, getVehicles)

export default router;
