import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

type QcmResponse = {
  qcm?: {
    prompt?: string;
    questions?: Array<{ question: string; options: string[] }>;
  };
};

export default function Qcm() {
  const [prompt, setPrompt] = useState("Chargement du QCM...");

  useEffect(() => {
    const run = async () => {
      try {
        const res: QcmResponse = await apiGet("/qcm");
        setPrompt(res.qcm?.prompt ?? "QCM indisponible.");
      } catch {
        setPrompt("QCM indisponible.");
      }
    };
    run();
  }, []);

  return (
    <main>
      <div className="section-title">
        <h2>QCM du jour</h2>
        <span className="badge">IA generation</span>
      </div>

      <section className="grid two">
        <div className="card">
          <h3>Prompt IA</h3>
          <p>{prompt}</p>
        </div>
        <div className="card">
          <h3>Question 1</h3>
          <p>Quel est l objectif principal du pomodoro en revision?</p>
          <div className="list">
            <label><input type="radio" name="q1" /> Minimiser les pauses.</label>
            <label><input type="radio" name="q1" /> Structurer le temps d etude.</label>
            <label><input type="radio" name="q1" /> Etudier sans interruption.</label>
            <label><input type="radio" name="q1" /> Lire plus vite.</label>
          </div>
        </div>
        <div className="card">
          <h3>Question 2</h3>
          <p>Quel est un bon moment pour la lecture du Coran?</p>
          <div className="list">
            <label><input type="radio" name="q2" /> Avant fajr.</label>
            <label><input type="radio" name="q2" /> Apres maghrib.</label>
            <label><input type="radio" name="q2" /> Avant isha.</label>
            <label><input type="radio" name="q2" /> Tous les moments.</label>
          </div>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <button className="btn primary">Soumettre</button>
          <button className="btn">Refaire le QCM</button>
        </div>
        <div className="card">
          <h3>Score et explications</h3>
          <p>Score: 1/2. Explication detaillee generee par IA.</p>
        </div>
      </section>
    </main>
  );
}
