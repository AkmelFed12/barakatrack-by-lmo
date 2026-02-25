import { Router } from "express";
import { generatePdf } from "../controllers/pdfController";

const router = Router();

router.get("/generate", generatePdf);

export default router;
