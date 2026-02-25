import { Router } from "express";
import { createEntry, getSummary } from "../controllers/journalController";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/", requireAuth, createEntry);
router.post("/summary", getSummary);

export default router;
