export default function Ramadan() {
  return (
    <main>
      <div className="section-title">
        <h2>Mode Ramadan</h2>
        <span className="badge">Actif</span>
      </div>

      <section className="grid two">
        <div className="card">
          <h3>Planification ajustee</h3>
          <div className="list">
            <div>Blocs d etude apres fajr et avant asr.</div>
            <div>Repos renforce apres tarawih.</div>
            <div>Rappels hydratation apres iftar.</div>
          </div>
          <div className="list">
            <div><strong>Plages recommandees</strong></div>
            <div>05:30 - 07:00 (concentration maximale)</div>
            <div>14:00 - 16:00 (revision legere)</div>
            <div>21:30 - 22:30 (lecture calme)</div>
          </div>
        </div>
        <div className="card">
          <h3>Doua du jour</h3>
          <p>"Ya Allah, facilite mes efforts et accepte mon jeun."</p>
          <div className="list">
            <div><strong>Conseil IA</strong></div>
            <div>Garde 20 minutes pour la relecture apres tarawih.</div>
          </div>
        </div>
      </section>

      <section className="card">
        <h3>Suivi Ramadan</h3>
        <div className="list">
          <div>Prieres: 5/5</div>
          <div>Lecture Coran: 25 minutes</div>
          <div>QCM: 1 complete</div>
        </div>
      </section>
    </main>
  );
}
