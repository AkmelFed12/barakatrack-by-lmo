import { Router } from "express";
import { askChatbot } from "../controllers/chatbotController";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/", requireAuth, askChatbot);

export default router;
