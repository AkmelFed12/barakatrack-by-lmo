import { Request, Response } from "express";
import { prisma } from "../utils/db";

type Reminder = {
  message: string;
  priority: "low" | "medium" | "high";
  type: "spirituel" | "academique" | "bienetre";
};

function buildReminders(hour: number) {
  const reminders: Reminder[] = [];
  if (hour >= 5 && hour < 8) {
    reminders.push({
      message: "Lecture Coran 10-15 min apres fajr.",
      priority: "high",
      type: "spirituel"
    });
    reminders.push({
      message: "Bloc revision concentree 40 min.",
      priority: "medium",
      type: "academique"
    });
  } else if (hour >= 12 && hour < 15) {
    reminders.push({
      message: "Pause courte + rappel dhuhr.",
      priority: "medium",
      type: "spirituel"
    });
    reminders.push({
      message: "Relecture rapide des notes du matin.",
      priority: "low",
      type: "academique"
    });
  } else if (hour >= 15 && hour < 18) {
    reminders.push({
      message: "Bloc revision leger avant asr.",
      priority: "medium",
      type: "academique"
    });
    reminders.push({
      message: "Hydratation et marche 10 min.",
      priority: "low",
      type: "bienetre"
    });
  } else if (hour >= 18 && hour < 21) {
    reminders.push({
      message: "Rappel maghrib + doa du soir.",
      priority: "high",
      type: "spirituel"
    });
    reminders.push({
      message: "Planifier la journee de demain.",
      priority: "medium",
      type: "academique"
    });
  } else {
    reminders.push({
      message: "Revision calme 20-30 min.",
      priority: "low",
      type: "academique"
    });
    reminders.push({
      message: "Preparation au sommeil + gratitude.",
      priority: "medium",
      type: "bienetre"
    });
  }
  return reminders;
}

export async function getReminders(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const [lastJournal, qcmToday, user] = await Promise.all([
    prisma.journal.findFirst({
      where: { userId: reqWithUser.userId },
      orderBy: { createdAt: "desc" }
    }),
    prisma.qcmRun.count({
      where: { userId: reqWithUser.userId, createdAt: { gte: startOfDay } }
    }),
    prisma.user.findUnique({
      where: { id: reqWithUser.userId },
      select: { goal: true }
    })
  ]);

  const base = buildReminders(now.getHours());
  const extras: Reminder[] = [];

  if (!lastJournal || lastJournal.createdAt < startOfDay) {
    extras.push({
      message: "Remplis ton journal du jour.",
      priority: "high",
      type: "academique"
    });
  }

  if (qcmToday === 0) {
    extras.push({
      message: "Lance un QCM pour valider tes acquis.",
      priority: "medium",
      type: "academique"
    });
  }

  if (user?.goal === "spirituel") {
    extras.push({
      message: "Ajoute 5 minutes de dhikr aujourd hui.",
      priority: "low",
      type: "spirituel"
    });
  } else if (user?.goal === "academique") {
    extras.push({
      message: "Planifie une session de 45 min de revision.",
      priority: "high",
      type: "academique"
    });
  } else {
    extras.push({
      message: "Equilibre: 1 bloc etudes + 10 min marche.",
      priority: "medium",
      type: "bienetre"
    });
  }

  return res.json({ reminders: [...extras, ...base], time: now.toISOString() });
}
