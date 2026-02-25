import { Request, Response } from "express";

function buildReminders(hour: number) {
  const reminders: string[] = [];
  if (hour >= 5 && hour < 8) {
    reminders.push("Lecture Coran 10-15 min apres fajr.");
    reminders.push("Bloc revision concentree 40 min.");
  } else if (hour >= 12 && hour < 15) {
    reminders.push("Pause courte + rappel dhuhr.");
    reminders.push("Relecture rapide des notes du matin.");
  } else if (hour >= 15 && hour < 18) {
    reminders.push("Bloc revision leger avant asr.");
    reminders.push("Hydratation et marche 10 min.");
  } else if (hour >= 18 && hour < 21) {
    reminders.push("Rappel maghrib + doa du soir.");
    reminders.push("Planifier la journee de demain.");
  } else {
    reminders.push("Revision calme 20-30 min.");
    reminders.push("Preparation au sommeil + gratitude.");
  }
  return reminders;
}

export async function getReminders(req: Request, res: Response) {
  const now = new Date();
  const reminders = buildReminders(now.getHours());
  return res.json({ reminders, time: now.toISOString() });
}
