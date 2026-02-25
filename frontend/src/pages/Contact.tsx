export default function Contact() {
  return (
    <main>
      <div className="section-title">
        <h2>Support & Contact</h2>
        <span className="badge">Assistance</span>
      </div>

      <section className="grid two">
        <div className="card">
          <h3>Nous contacter</h3>
          <div className="list">
            <div>Email: support@barakatrack.ai (a remplacer)</div>
            <div>Heures: Lun-Ven, 9h-18h</div>
            <div>Temps de reponse: 24-48h</div>
          </div>
        </div>
        <div className="card form">
          <label>Objet</label>
          <input type="text" placeholder="Probleme de connexion" />
          <label>Message</label>
          <textarea rows={5} placeholder="Explique ton probleme..." />
          <button className="btn primary" type="button">Envoyer</button>
          <small>Ce formulaire est statique pour le moment.</small>
        </div>
      </section>
    </main>
  );
}
