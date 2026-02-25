import { Request, Response } from "express";
import { askAssistant } from "../services/openaiService";
import { prisma } from "../utils/db";

export async function askChatbot(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const message = req.body?.message ?? "";
  const response = await askAssistant(message);

  await prisma.chatMessage.createMany({
    data: [
      { role: "user", content: message, userId: reqWithUser.userId },
      { role: "assistant", content: response, userId: reqWithUser.userId }
    ]
  });

  res.json({ response });
}
