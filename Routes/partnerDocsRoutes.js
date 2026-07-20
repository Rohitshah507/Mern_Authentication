import express from "express";
import {
  partnerDocs,
  getPartnerDocs,
  updatePartnerDocs,
} from "../Controller/partnerDocsController.js";
import { auth } from "../Middleware/auth.js";
import multer, { memoryStorage } from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/document/",
  auth,
  upload.fields([
    { name: "citizenship", maxCount: 1 },
    { name: "billBook", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  partnerDocs,
);
router.get("/", auth, getPartnerDocs);

router.put(
  "/edit",
  auth,
  upload.fields([
    {
      name: "citizenship",
      maxCount: 1,
    },
    {
      name: "billBook",
      maxCount: 1,
    },
    {
      name: "license",
      maxCount: 1,
    },
  ]),
  updatePartnerDocs,
);

export default router;
