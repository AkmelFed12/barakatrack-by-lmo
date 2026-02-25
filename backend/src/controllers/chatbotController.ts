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

export async function getHistory(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const messages = await prisma.chatMessage.findMany({
    where: { userId: reqWithUser.userId },
    orderBy: { createdAt: "desc" },
    take: 20
  });

  return res.json({ messages: messages.reverse() });
}
