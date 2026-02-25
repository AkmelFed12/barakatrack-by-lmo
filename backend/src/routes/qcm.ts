import { Router } from "express";
import { generateQcm, submitQcm, getHistory } from "../controllers/qcmController";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.get("/", generateQcm);
router.post("/submit", requireAuth, submitQcm);
router.get("/history", requireAuth, getHistory);

export default router;
