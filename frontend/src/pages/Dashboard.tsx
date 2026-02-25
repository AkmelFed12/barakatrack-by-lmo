import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiPost, isAuthed } from "../utils/api";

export default function Dashboard() {
  const [summary, setSummary] = useState("Chargement du resume IA...");
  const [stats, setStats] = useState<{ journalCount: number; qcmCount: number } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        if (!isAuthed()) {
          setError("Connecte-toi pour voir tes statistiques.");
          setSummary("Connecte-toi pour voir le resume IA.");
          setStats(null);
          return;
        }
        const res = await apiPost("/journal/summary", {
          text: "5 prieres, 2h etudes, marche 20 minutes"
        });
        setSummary(res.summary ?? "Resume indisponible.");
        const statsRes = await apiGet("/stats");
        setStats(statsRes);
      } catch {
        setSummary("Resume indisponible.");
        setStats(null);
        setError("Connexion requise ou service indisponible.");
      }
    };
    run();
  }, []);

  return (
    <main>
      <div className="section-title">
        <h2>Salut, Nour.</h2>
        <span className="badge">Indice d equilibre</span>
      </div>

      <section className="grid two">
        <div className="card">
          <h3>Radar equilibre</h3>
          <div className="list">
            <div>Spirituel: 78%</div>
            <div>Academique: 71%</div>
            <div>Bien-etre: 66%</div>
          </div>
          <div className="actions">
            <span className="icon-pill">
              <span className="icon-dot" />
              Semaine en cours
            </span>
            <span className="icon-pill">
              <span className="icon-dot" />
              +4% vs semaine derniere
            </span>
          </div>
          <div className="kpi">
            <div className="card">
              <strong>{stats?.journalCount ?? 0}</strong>
              <div>Journaux</div>
            </div>
            <div className="card">
              <strong>{stats?.qcmCount ?? 0}</strong>
              <div>QCM effectues</div>
            </div>
          </div>
        </div>
        <div className="card">
          <h3>Resume IA du jour</h3>
          {error && <p>{error}</p>}
          <p>{summary}</p>
          <div className="list">
            <div>Conseil 1: planifier les pauses de revision.</div>
            <div>Conseil 2: lire 10 minutes apres fajr.</div>
            <div>Conseil 3: verifier l hydratation.</div>
          </div>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <h3>Doua ou verset du jour</h3>
          <p>
            "Seigneur, augmente-moi en savoir et en serenite aujourd hui."
          </p>
        </div>
        <div className="card">
          <h3>QCM du jour</h3>
          <p>Teste tes connaissances et obtiens des explications detaillees.</p>
          <Link className="btn primary" to="/qcm">Commencer QCM</Link>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <h3>Acces rapide</h3>
          <div className="actions">
            <Link className="btn" to="/journal">Journal</Link>
            <Link className="btn" to="/chatbot">Chatbot</Link>
            <Link className="btn" to="/reports">PDF</Link>
          </div>
        </div>
        <div className="card">
          <h3>Notifications</h3>
          <div className="list">
            <div>Rappel: QCM disponible.</div>
            <div>Nouvelle recommandation IA ajoutee.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
