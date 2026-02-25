import { useState } from "react";
import { apiPost } from "../utils/api";

export default function Journal() {
  const [summary, setSummary] = useState("Aucun resume pour le moment.");
  const [tasks, setTasks] = useState("");
  const [prayers, setPrayers] = useState(5);
  const [quranMinutes, setQuranMinutes] = useState(10);
  const [activityMin, setActivityMin] = useState(15);
  const [mood, setMood] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await apiPost("/journal", {
        tasks,
        prayers,
        quranMinutes,
        activityMin,
        mood
      });
      const next = res.entry?.summary ?? "Resume indisponible.";
      setSummary(next);
    } catch {
      setSummary("Resume indisponible.");
    }
  };

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
        </div>
      </section>
    </main>
  );
}
