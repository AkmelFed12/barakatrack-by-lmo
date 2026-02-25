import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import journalRoutes from "./routes/journal";
import qcmRoutes from "./routes/qcm";
import chatbotRoutes from "./routes/chatbot";
import pdfRoutes from "./routes/pdf";
import { getStats } from "./controllers/statsController";
import { requireAuth } from "./middlewares/auth";
import { getReminders } from "./controllers/reminderController";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "barakatrack-backend" });
});

app.use("/auth", authRoutes);
app.use("/journal", journalRoutes);
app.use("/qcm", qcmRoutes);
app.use("/chatbot", chatbotRoutes);
app.use("/pdf", pdfRoutes);
app.get("/stats", requireAuth, getStats);
app.get("/reminders", requireAuth, getReminders);

export default app;
