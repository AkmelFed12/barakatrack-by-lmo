export default function Privacy() {
  return (
    <main>
      <div className="section-title">
        <h2>Confidentialite</h2>
        <span className="badge">Donnees</span>
      </div>

      <section className="card">
        <p>
          Nous collectons uniquement les informations necessaires au bon
          fonctionnement de BarakaTrack IA.
        </p>
        <div className="list">
          <div>Donnees: email, profil, journaux, activites.</div>
          <div>Usage: personnalisation, statistiques, recommandations IA.</div>
          <div>Suppression: sur demande.</div>
        </div>
      </section>
    </main>
  );
}
