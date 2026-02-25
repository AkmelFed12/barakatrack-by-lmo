import { Resend } from "resend";

export async function sendWelcomeEmail(to: string, subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const from = process.env.WELCOME_FROM || "BarakaTrack <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from,
      to,
      subject,
      text
    });
  } catch {
    // ignore email failures
  }
}
