import { Request, Response } from "express";
import { prisma } from "../utils/db";

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function buildSeries(entries: Array<{ createdAt: Date }>, days: number) {
  const today = startOfDay(new Date());
  const map = new Map<string, number>();
  entries.forEach((e) => {
    const key = startOfDay(e.createdAt).toISOString().slice(0, 10);
    map.set(key, (map.get(key) ?? 0) + 1);
  });
  return Array.from({ length: days }).map((_, i) => {
    const d = addDays(today, -days + 1 + i);
    const key = d.toISOString().slice(0, 10);
    return map.get(key) ?? 0;
  });
}

function computeBalance(entry?: {
  prayers: number;
  quranMinutes: number;
  activityMin: number;
}) {
  if (!entry) return 0;
  const spiritual = Math.min(100, entry.prayers * 20 + entry.quranMinutes);
  const academic = 70;
  const wellbeing = Math.min(100, entry.activityMin * 3);
  return Math.round((spiritual + academic + wellbeing) / 3);
}

export async function getStats(req: Request, res: Response) {
  const reqWithUser = req as Request & { userId?: string };
  if (!reqWithUser.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const today = startOfDay(new Date());
  const weekStart = addDays(today, -6);
  const prevWeekStart = addDays(today, -13);
  const prevWeekEnd = addDays(today, -7);

  const [journalCount, qcmCount, lastJournal] = await Promise.all([
    prisma.journal.count({ where: { userId: reqWithUser.userId } }),
    prisma.qcmRun.count({ where: { userId: reqWithUser.userId } }),
    prisma.journal.findFirst({
      where: { userId: reqWithUser.userId },
      orderBy: { createdAt: "desc" }
    })
  ]);

  const [journalsWeek, journalsPrevWeek, qcmWeek, qcmPrevWeek, journalsSeries] =
    await Promise.all([
      prisma.journal.count({
        where: { userId: reqWithUser.userId, createdAt: { gte: weekStart } }
      }),
      prisma.journal.count({
        where: {
          userId: reqWithUser.userId,
          createdAt: { gte: prevWeekStart, lt: prevWeekEnd }
        }
      }),
      prisma.qcmRun.count({
        where: { userId: reqWithUser.userId, createdAt: { gte: weekStart } }
      }),
      prisma.qcmRun.count({
        where: {
          userId: reqWithUser.userId,
          createdAt: { gte: prevWeekStart, lt: prevWeekEnd }
        }
      }),
      prisma.journal.findMany({
        where: { userId: reqWithUser.userId, createdAt: { gte: prevWeekStart } },
        select: { createdAt: true },
        orderBy: { createdAt: "asc" }
      })
    ]);

  return res.json({
    journalCount,
    qcmCount,
    lastSummary: lastJournal?.summary ?? null,
    journalsWeek,
    journalsPrevWeek,
    qcmWeek,
    qcmPrevWeek,
    balanceScore: computeBalance(lastJournal ?? undefined),
    journalSeries: buildSeries(journalsSeries, 7)
  });
}
