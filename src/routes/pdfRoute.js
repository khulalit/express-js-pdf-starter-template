import express from "express";
import { createPDF } from "../controllers/pdfController.js";

const router = express.Router();

router.get("/generate", createPDF);
router.post("/generate", createPDF);

export default router;
