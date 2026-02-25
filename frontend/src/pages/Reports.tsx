import { useState } from "react";
import { apiGet } from "../utils/api";

export default function Reports() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await apiGet("/pdf/generate");
      setPdfUrl(res.url ?? null);
    } catch {
      setPdfUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="section-title">
        <h2>Rapports hebdomadaires</h2>
        <span className="badge">PDF automatique</span>
      </div>

      <section className="grid two">
        <div className="card">
          <h3>Resume du journal</h3>
          <div className="list">
            <div>5 jours remplis.</div>
            <div>Progression academique +18%.</div>
            <div>Lecture Coran moyenne: 12 minutes.</div>
          </div>
        </div>
        <div className="card">
          <h3>QCM et indices</h3>
          <div className="list">
            <div>QCM effectues: 4</div>
            <div>Score moyen: 72%</div>
            <div>Indice d equilibre: 74%</div>
          </div>
        </div>
      </section>

      <section className="card">
        <h3>Doua et conseils personnalises</h3>
        <p>Cette semaine, priorite a la regularite des revisions et au repos.</p>
        <button className="btn primary" onClick={handleDownload} type="button">
          Telecharger PDF
        </button>
        {loading && <p>Generation en cours...</p>}
        {pdfUrl && <p>PDF pret: {pdfUrl}</p>}
      </section>
    </main>
  );
}
