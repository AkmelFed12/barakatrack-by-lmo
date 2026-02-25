import { useEffect, useState } from "react";
import { apiGet, apiPost, isAuthed, showToast } from "../utils/api";

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
  const [history, setHistory] = useState<Array<{ id: string; createdAt: string; score: number }>>([]);
  const [topic, setTopic] = useState("etudes et spiritualite");
  const [level, setLevel] = useState("intermediaire");

  useEffect(() => {
    const run = async () => {
      try {
        const res: QcmResponse = await apiGet(`/qcm?topic=${encodeURIComponent(topic)}&level=${encodeURIComponent(level)}`);
        setPrompt(res.qcm?.prompt ?? "QCM indisponible.");
      } catch {
        setPrompt("QCM indisponible.");
      }
    };
    run();
  }, [topic, level]);

  useEffect(() => {
    const runHistory = async () => {
      try {
        if (!isAuthed()) {
          setHistory([]);
          return;
        }
        const res = await apiGet("/qcm/history");
        if (Array.isArray(res.runs)) {
          setHistory(res.runs);
        }
      } catch {
        setHistory([]);
      }
    };
    runHistory();
  }, []);

  const handleSubmit = async () => {
    if (!isAuthed()) {
      setFeedback("Connecte-toi pour soumettre le QCM.");
      showToast("Connexion requise.");
      return;
    }
    setLoading(true);
    setFeedback("");
    try {
      const payload = Object.entries(answers).map(([q, a]) => ({ q, a }));
      const res = await apiPost("/qcm/submit", { answers: payload });
      setFeedback(res.result?.feedback ?? "Correction indisponible.");
      showToast("QCM soumis.");
    } catch {
      setFeedback("Correction indisponible.");
      showToast("Erreur QCM.");
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
          <div className="form">
            <label>Matiere</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="etudes et spiritualite">Etudes et spiritualite</option>
              <option value="maths">Maths</option>
              <option value="organisation">Organisation</option>
              <option value="coran">Coran</option>
            </select>

            <label>Niveau</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="debutant">Debutant</option>
              <option value="intermediaire">Intermediaire</option>
              <option value="avance">Avance</option>
            </select>
          </div>
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
          <h3>Historique</h3>
          <div className="list">
            {history.length === 0 && <div>Aucun QCM.</div>}
            {history.map((run) => (
              <div key={run.id}>
                {new Date(run.createdAt).toLocaleDateString("fr-FR")} - score {run.score}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
