export default function Faq() {
  return (
    <main>
      <div className="section-title">
        <h2>FAQ</h2>
        <span className="badge">Questions frequentes</span>
      </div>

      <section className="grid two">
        <div className="card">
          <h3>Comment fonctionne l IA ?</h3>
          <p>
            L IA analyse tes saisies quotidiennes et propose des conseils
            personnalises pour equilibrer etudes, spiritualite et bien-etre.
          </p>
        </div>
        <div className="card">
          <h3>Mes donnees sont-elles protegees ?</h3>
          <p>
            Oui. Nous collectons uniquement le necessaire et tu peux demander la
            suppression de tes donnees a tout moment.
          </p>
        </div>
        <div className="card">
          <h3>Puis-je utiliser la version gratuite ?</h3>
          <p>
            Oui, la version gratuite donne acces au journal, aux QCM et aux
            resumes IA de base.
          </p>
        </div>
        <div className="card">
          <h3>Le mode Ramadan est-il automatique ?</h3>
          <p>
            Oui, il propose des plages horaires adaptees, des conseils et un
            suivi simplifie.
          </p>
        </div>
        <div className="card">
          <h3>Puis-je changer mes objectifs ?</h3>
          <p>
            Oui. Tu peux modifier tes objectifs et la ponderation dans les
            parametres.
          </p>
        </div>
        <div className="card">
          <h3>Comment contacter le support ?</h3>
          <p>
            Envoie un email a support@barakatrack.ai (a remplacer).
          </p>
        </div>
      </section>
    </main>
  );
}
