import { useState } from "react";
import { apiGet, isAuthed } from "../utils/api";

export default function Reports() {
  const [pdfStatus, setPdfStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setPdfStatus(null);
    try {
      if (!isAuthed()) {
        setPdfStatus("Connecte-toi pour telecharger le PDF.");
        setLoading(false);
        return;
      }
      const res = await apiGet("/pdf/generate");
      if (res.base64 && res.filename) {
        const byteCharacters = atob(res.base64);
        const byteNumbers = Array.from(byteCharacters).map((char) =>
          char.charCodeAt(0)
        );
        const blob = new Blob([new Uint8Array(byteNumbers)], {
          type: "application/pdf"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = res.filename;
        link.click();
        URL.revokeObjectURL(url);
        setPdfStatus("PDF telecharge.");
      } else {
        setPdfStatus("PDF indisponible.");
      }
    } catch {
      setPdfStatus("PDF indisponible.");
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
        {pdfStatus && <p>{pdfStatus}</p>}
      </section>
    </main>
  );
}
