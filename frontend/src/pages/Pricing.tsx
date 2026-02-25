export default function Pricing() {
  return (
    <main>
      <div className="section-title">
        <h2>Tarifs</h2>
        <span className="badge">Simple</span>
      </div>

      <section className="grid two">
        <div className="card">
          <h3>Gratuit</h3>
          <div className="list">
            <div>Journal quotidien</div>
            <div>Resume IA limite</div>
            <div>QCM de base</div>
          </div>
          <button className="btn">Choisir</button>
        </div>
        <div className="card">
          <h3>Pro</h3>
          <div className="list">
            <div>IA illimitee</div>
            <div>Rapports PDF</div>
            <div>Mode Ramadan avance</div>
          </div>
          <button className="btn primary">Demarrer</button>
        </div>
      </section>
    </main>
  );
}
