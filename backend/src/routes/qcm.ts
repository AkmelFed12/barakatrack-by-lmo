import { Router } from "express";
import { generateQcm, submitQcm } from "../controllers/qcmController";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.get("/", generateQcm);
router.post("/submit", requireAuth, submitQcm);

export default router;
