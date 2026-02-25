import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import journalRoutes from "./routes/journal";
import qcmRoutes from "./routes/qcm";
import chatbotRoutes from "./routes/chatbot";
import pdfRoutes from "./routes/pdf";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/journal", journalRoutes);
app.use("/qcm", qcmRoutes);
app.use("/chatbot", chatbotRoutes);
app.use("/pdf", pdfRoutes);

export default app;
