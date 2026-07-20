import express from "express";
import { auth } from "../Middleware/auth.js";
import { getAllPartnerDocs } from "../Controller/adminController.js";

const router = express.Router();

router.get("/partner-docs", auth, getAllPartnerDocs);   

export default router;
