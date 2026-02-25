import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type TokenPayload = { userId: string };

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = header.replace("Bearer ", "");
  const secret = process.env.JWT_SECRET || "dev_secret";

  try {
    const payload = jwt.verify(token, secret) as TokenPayload;
    (req as Request & { userId?: string }).userId = payload.userId;
    return next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
