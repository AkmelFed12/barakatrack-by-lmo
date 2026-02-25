import { Request, Response } from "express";
import { generateQcmSet, gradeQcm } from "../services/openaiService";
import { prisma } from "../utils/db";

export async function generateQcm(_req: Request, res: Response) {
  const { topic, level, userId } = _req.query;
  let finalTopic = typeof topic === "string" ? topic : "etudes et spiritualite";
  let finalLevel = typeof level === "string" ? level : "intermediaire";

  if (typeof userId === "string") {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { qcmLevel: true, qcmTopic: true }
    });
    if (user?.qcmTopic) finalTopic = user.qcmTopic;
    if (user?.qcmLevel) finalLevel = user.qcmLevel;
  }

  const qcm = await generateQcmSet(finalTopic, finalLevel);
  res.json({ qcm });
}

export async function submitQcm(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const answers = req.body?.answers ?? [];
  const result = await gradeQcm(answers);
  await prisma.qcmRun.create({
    data: {
      score: Number(result.score ?? 0),
      details: JSON.stringify(result),
      userId: reqWithUser.userId
    }
  });
  res.json({ result });
}

export async function getHistory(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const runs = await prisma.qcmRun.findMany({
    where: { userId: reqWithUser.userId },
    orderBy: { createdAt: "desc" },
    take: 10
  });

  return res.json({ runs });
}
