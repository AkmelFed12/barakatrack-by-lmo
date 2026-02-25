import { Request, Response } from "express";
import { prisma } from "../utils/db";

export async function getStats(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const [journalCount, qcmCount, lastJournal] = await Promise.all([
    prisma.journal.count({ where: { userId: reqWithUser.userId } }),
    prisma.qcmRun.count({ where: { userId: reqWithUser.userId } }),
    prisma.journal.findFirst({
      where: { userId: reqWithUser.userId },
      orderBy: { createdAt: "desc" }
    })
  ]);

  return res.json({
    journalCount,
    qcmCount,
    lastSummary: lastJournal?.summary ?? null
  });
}
