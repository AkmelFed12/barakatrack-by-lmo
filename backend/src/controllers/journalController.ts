import { Request, Response } from "express";
import { generateSummary } from "../services/openaiService";
import { prisma } from "../utils/db";

export async function createEntry(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { tasks, prayers, quranMinutes, activityMin, mood } = req.body ?? {};

  const summary = await generateSummary(
    `taches: ${tasks ?? ""}; prieres: ${prayers ?? 0}; coran: ${quranMinutes ?? 0}; sport: ${activityMin ?? 0}; mood: ${mood ?? ""}`
  );

  const entry = await prisma.journal.create({
    data: {
      tasks: tasks ?? null,
      prayers: Number(prayers ?? 0),
      quranMinutes: Number(quranMinutes ?? 0),
      activityMin: Number(activityMin ?? 0),
      mood: mood ?? null,
      summary,
      advice: "Conseils personnalisés à venir.",
      userId: reqWithUser.userId
    }
  });

  return res.json({ entry });
}

export async function getSummary(req: Request, res: Response) {
  const journalText = req.body?.text ?? "";
  const summary = await generateSummary(journalText);
  res.json({ summary });
}

export async function getHistory(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const entries = await prisma.journal.findMany({
    where: { userId: reqWithUser.userId },
    orderBy: { createdAt: "desc" },
    take: 10
  });

  return res.json({ entries });
}
