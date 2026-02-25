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

function computeStreak(entries: Array<{ createdAt: Date }>) {
  const days = new Set(
    entries.map((e) => startOfDay(e.createdAt).toISOString().slice(0, 10))
  );
  let streak = 0;
  let cursor = startOfDay(new Date());
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

function computeBadges(streak: number, journalCount: number, qcmCount: number) {
  const badges: string[] = [];
  if (streak >= 3) badges.push("Streak 3 jours");
  if (streak >= 7) badges.push("Streak 7 jours");
  if (journalCount >= 10) badges.push("10 journaux");
  if (qcmCount >= 5) badges.push("5 QCM");
  if (qcmCount >= 20) badges.push("20 QCM");
  return badges;
}

function computeBalance(
  entry: { prayers: number; quranMinutes: number; activityMin: number } | null,
  weights: { weightS: number; weightA: number; weightW: number },
  qcmWeek: number
) {
  if (!entry) return 0;
  const spiritual = Math.min(100, entry.prayers * 20 + entry.quranMinutes);
  const academic = Math.min(100, 50 + qcmWeek * 10);
  const wellbeing = Math.min(100, entry.activityMin * 3);
  const total = weights.weightS + weights.weightA + weights.weightW;
  return Math.round(
    (spiritual * weights.weightS +
      academic * weights.weightA +
      wellbeing * weights.weightW) /
      total
  );
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

  const [journalCount, qcmCount, lastJournal, user] = await Promise.all([
    prisma.journal.count({ where: { userId: reqWithUser.userId } }),
    prisma.qcmRun.count({ where: { userId: reqWithUser.userId } }),
    prisma.journal.findFirst({
      where: { userId: reqWithUser.userId },
      orderBy: { createdAt: "desc" }
    }),
    prisma.user.findUnique({
      where: { id: reqWithUser.userId },
      select: { weightS: true, weightA: true, weightW: true }
    })
  ]);

  const [journalsWeek, journalsPrevWeek, qcmWeek, qcmPrevWeek, journalsSeries, qcmSeries] =
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
      }),
      prisma.qcmRun.findMany({
        where: { userId: reqWithUser.userId, createdAt: { gte: prevWeekStart } },
        select: { createdAt: true },
        orderBy: { createdAt: "asc" }
      })
    ]);

  const streak = computeStreak(journalsSeries);
  const badges = computeBadges(streak, journalCount, qcmCount);

  return res.json({
    journalCount,
    qcmCount,
    lastSummary: lastJournal?.summary ?? null,
    journalsWeek,
    journalsPrevWeek,
    qcmWeek,
    qcmPrevWeek,
    balanceScore: computeBalance(lastJournal, user ?? { weightS: 40, weightA: 40, weightW: 20 }, qcmWeek),
    journalSeries: buildSeries(journalsSeries, 7),
    qcmSeries: buildSeries(qcmSeries, 7),
    streak,
    badges
  });
}
