import { Request, Response } from "express";

export async function generatePdf(_req: Request, res: Response) {
  res.json({ url: "/reports/sample.pdf" });
}
