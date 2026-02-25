import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../utils/api";

type QcmResponse = {
  qcm?: {
    prompt?: string;
    questions?: Array<{ question: string; options: string[] }>;
  };
};

export default function Qcm() {
  const [prompt, setPrompt] = useState("Chargement du QCM...");
  const [feedback, setFeedback] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    setLoading(true);
    setFeedback("");
    try {
      const payload = Object.entries(answers).map(([q, a]) => ({ q, a }));
      const res = await apiPost("/qcm/submit", { answers: payload });
      setFeedback(res.result?.feedback ?? "Correction indisponible.");
    } catch {
      setFeedback("Correction indisponible.");
    } finally {
      setLoading(false);
    }
  };

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
            <label>
              <input
                type="radio"
                name="q1"
                onChange={() => setAnswers({ ...answers, q1: "a" })}
              />
              Minimiser les pauses.
            </label>
            <label>
              <input
                type="radio"
                name="q1"
                onChange={() => setAnswers({ ...answers, q1: "b" })}
              />
              Structurer le temps d etude.
            </label>
            <label>
              <input
                type="radio"
                name="q1"
                onChange={() => setAnswers({ ...answers, q1: "c" })}
              />
              Etudier sans interruption.
            </label>
            <label>
              <input
                type="radio"
                name="q1"
                onChange={() => setAnswers({ ...answers, q1: "d" })}
              />
              Lire plus vite.
            </label>
          </div>
        </div>
        <div className="card">
          <h3>Question 2</h3>
          <p>Quel est un bon moment pour la lecture du Coran?</p>
          <div className="list">
            <label>
              <input
                type="radio"
                name="q2"
                onChange={() => setAnswers({ ...answers, q2: "a" })}
              />
              Avant fajr.
            </label>
            <label>
              <input
                type="radio"
                name="q2"
                onChange={() => setAnswers({ ...answers, q2: "b" })}
              />
              Apres maghrib.
            </label>
            <label>
              <input
                type="radio"
                name="q2"
                onChange={() => setAnswers({ ...answers, q2: "c" })}
              />
              Avant isha.
            </label>
            <label>
              <input
                type="radio"
                name="q2"
                onChange={() => setAnswers({ ...answers, q2: "d" })}
              />
              Tous les moments.
            </label>
          </div>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <button className="btn primary" onClick={handleSubmit} type="button">
            Soumettre
          </button>
          <button className="btn">Refaire le QCM</button>
        </div>
        <div className="card">
          <h3>Score et explications</h3>
          {loading ? <p>Correction en cours...</p> : <p>{feedback || "Aucune correction."}</p>}
        </div>
      </section>
    </main>
  );
}
