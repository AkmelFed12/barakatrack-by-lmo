import { Router } from "express";
import { createEntry, getSummary, getHistory } from "../controllers/journalController";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/", requireAuth, createEntry);
router.post("/summary", getSummary);
router.get("/history", requireAuth, getHistory);

export default router;
