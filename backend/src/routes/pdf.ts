import { Router } from "express";
import { generatePdf } from "../controllers/pdfController";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.get("/generate", requireAuth, generatePdf);

export default router;
