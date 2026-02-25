import { Router } from "express";
import { askChatbot, getHistory } from "../controllers/chatbotController";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/", requireAuth, askChatbot);
router.get("/history", requireAuth, getHistory);

export default router;
