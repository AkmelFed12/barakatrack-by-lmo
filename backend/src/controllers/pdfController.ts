import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import { prisma } from "../utils/db";

export async function generatePdf(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const [journals, qcms] = await Promise.all([
    prisma.journal.findMany({
      where: { userId: reqWithUser.userId },
      orderBy: { createdAt: "desc" },
      take: 5
    }),
    prisma.qcmRun.findMany({
      where: { userId: reqWithUser.userId },
      orderBy: { createdAt: "desc" },
      take: 5
    })
  ]);

  const doc = new PDFDocument({ margin: 50 });
  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(chunk));

  doc.fontSize(20).text("BarakaTrack IA - Rapport", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString("fr-FR")}`);
  doc.moveDown();

  doc.fontSize(14).text("Journal recent");
  doc.moveDown(0.5);
  journals.forEach((entry, index) => {
    doc.fontSize(11).text(
      `${index + 1}. ${entry.createdAt.toLocaleDateString("fr-FR")} - ` +
        `${entry.summary ?? "Sans resume"}`
    );
  });

  doc.moveDown();
  doc.fontSize(14).text("QCM recents");
  doc.moveDown(0.5);
  qcms.forEach((run, index) => {
    doc.fontSize(11).text(
      `${index + 1}. ${run.createdAt.toLocaleDateString("fr-FR")} - score ${run.score}`
    );
  });

  doc.end();

  const pdfBuffer = await new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  const base64 = pdfBuffer.toString("base64");
  return res.json({ filename: "barakatrack-rapport.pdf", base64 });
}
