import express from "express";
import { auth } from "../Middleware/auth.js";
import {
  getAllPartnerDocs,
  getAllVehicles,
} from "../Controller/adminController.js";

const router = express.Router();

router.get("/partner-docs", auth, getAllPartnerDocs);
router.get("/vehicles", auth, getAllVehicles);

export default router;
