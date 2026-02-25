import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../utils/db";
import { generateWelcome } from "../services/openaiService";
import { sendWelcomeEmail } from "../services/emailService";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const { email, password, name } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Email already used" });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, name, password: hash }
  });

  const welcome = await generateWelcome(name ?? "etudiant");
  sendWelcomeEmail(
    email,
    "Bienvenue sur BarakaTrack IA",
    welcome
  );

  const secret = process.env.JWT_SECRET || "dev_secret";
  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "7d" });

  return res.json({
    user: { id: user.id, email: user.email, name: user.name },
    token,
    welcome
  });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const secret = process.env.JWT_SECRET || "dev_secret";
  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "7d" });

  return res.json({
    user: { id: user.id, email: user.email, name: user.name },
    token
  });
}

export async function me(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = await prisma.user.findUnique({
    where: { id: reqWithUser.userId },
    select: { id: true, email: true, name: true }
  });
  if (!user) {
    return res.status(404).json({ error: "Not found" });
  }
  return res.json({ user });
}

export async function updateProfile(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { goal, weightS, weightA, weightW, qcmLevel, qcmTopic, name } =
    req.body ?? {};

  const updated = await prisma.user.update({
    where: { id: reqWithUser.userId },
    data: {
      name: name ?? undefined,
      goal: goal ?? undefined,
      weightS: weightS ?? undefined,
      weightA: weightA ?? undefined,
      weightW: weightW ?? undefined,
      qcmLevel: qcmLevel ?? undefined,
      qcmTopic: qcmTopic ?? undefined
    },
    select: {
      id: true,
      email: true,
      name: true,
      goal: true,
      weightS: true,
      weightA: true,
      weightW: true,
      qcmLevel: true,
      qcmTopic: true
    }
  });

  return res.json({ user: updated });
}
