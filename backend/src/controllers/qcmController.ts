import { Request, Response } from "express";
import { generateQcmSet, gradeQcm } from "../services/openaiService";
import { prisma } from "../utils/db";

export async function generateQcm(_req: Request, res: Response) {
  const qcm = await generateQcmSet("Etudes et spiritualite", "intermediaire");
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
