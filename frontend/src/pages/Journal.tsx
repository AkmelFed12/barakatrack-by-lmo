import { useEffect, useState } from "react";
import { apiGet, apiPost, isAuthed } from "../utils/api";

export default function Journal() {
  const [summary, setSummary] = useState("Aucun resume pour le moment.");
  const [history, setHistory] = useState<
    Array<{ id: string; createdAt: string; summary?: string | null }>
  >([]);
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState("");
  const [prayers, setPrayers] = useState(5);
  const [quranMinutes, setQuranMinutes] = useState(10);
  const [activityMin, setActivityMin] = useState(15);
  const [mood, setMood] = useState("");

  const handleSubmit = async () => {
    try {
      if (!isAuthed()) {
        setStatus("Connecte-toi pour soumettre le journal.");
        return;
      }
      const res = await apiPost("/journal", {
        tasks,
        prayers,
        quranMinutes,
        activityMin,
        mood
      });
      const next = res.entry?.summary ?? "Resume indisponible.";
      setSummary(next);
      setStatus("Journal enregistre.");
    } catch {
      setSummary("Resume indisponible.");
      setStatus("Erreur d envoi.");
    }
  };

  useEffect(() => {
    const run = async () => {
      try {
        if (!isAuthed()) {
          setHistory([]);
          return;
        }
        const res = await apiGet("/journal/history");
        if (Array.isArray(res.entries)) {
          setHistory(res.entries);
        }
      } catch {
        setHistory([]);
      }
    };
    run();
  }, []);

  return (
    <main>
      <div className="section-title">
        <h2>Journal du jour</h2>
        <span className="badge">Resume IA</span>
      </div>

      <section className="grid two">
        <form className="card form">
          <label>Taches accomplies</label>
          <textarea
            rows={3}
            placeholder="Cours, revisions, projets"
            value={tasks}
            onChange={(event) => setTasks(event.target.value)}
          />

          <label>Prieres accomplies</label>
          <select
            value={prayers}
            onChange={(event) => setPrayers(Number(event.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>

          <label>Lecture Coran (minutes)</label>
          <input
            type="number"
            placeholder="15"
            value={quranMinutes}
            onChange={(event) => setQuranMinutes(Number(event.target.value))}
          />

          <label>Activite physique (minutes)</label>
          <input
            type="number"
            placeholder="20"
            value={activityMin}
            onChange={(event) => setActivityMin(Number(event.target.value))}
          />

          <label>Etat emotionnel</label>
          <input
            type="text"
            placeholder="Calme, motive, fatigue"
            value={mood}
            onChange={(event) => setMood(event.target.value)}
          />

          <button className="btn primary" type="button" onClick={handleSubmit}>
            Soumettre
          </button>
          {status && <p>{status}</p>}
        </form>

        <div className="card">
          <h3>Resume automatique</h3>
          <p>{summary}</p>
          <h3>Conseils personnalises</h3>
          <div className="list">
            <div>Bloquer 30 minutes sans ecran avant d dormir.</div>
            <div>Ajouter 10 minutes de dhikr apres asr.</div>
            <div>Preparer la liste de revision pour demain.</div>
          </div>
          <h3>Historique recent</h3>
          <div className="list">
            {history.length === 0 && <div>Aucune entree.</div>}
            {history.map((entry) => (
              <div key={entry.id}>
                {new Date(entry.createdAt).toLocaleDateString("fr-FR")} -{" "}
                {entry.summary ?? "Sans resume"}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
