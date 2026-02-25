import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main>
      <section className="hero">
        <h1>Etudes, Foi, Equilibre - tout en un.</h1>
        <p>
          BarakaTrack IA accompagne les etudiants musulmans avec un tableau de bord clair,
          des rappels spirituels, et des conseils d organisation pour chaque jour.
        </p>
        <div className="actions">
          <button className="btn accent">Commencer maintenant</button>
          <Link className="btn" to="/dashboard">Voir le tableau de bord</Link>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <h3>Apercu indice d equilibre</h3>
          <p className="list">Spirituel, Academique, Bien-etre, avec radar et tendances.</p>
          <div className="kpi">
            <div className="card">
              <strong>78%</strong>
              <div>Spirituel</div>
            </div>
            <div className="card">
              <strong>71%</strong>
              <div>Academique</div>
            </div>
            <div className="card">
              <strong>66%</strong>
              <div>Bien-etre</div>
            </div>
          </div>
        </div>
        <div className="card">
          <h3>Pourquoi BarakaTrack IA</h3>
          <div className="list">
            <div>Planifie tes etudes sans sacrifier ta spiritualite.</div>
            <div>Resume IA quotidien avec conseils concrets.</div>
            <div>Doua, versets, QCM et suivi de progression.</div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-title">
          <h2>Exemples de tableaux de bord</h2>
          <span className="badge">Modules IA</span>
        </div>
        <div className="grid three">
          <div className="card">
            <h3>Resume journalier</h3>
            <p>5 prieres, 2h etudes, 20 min marche. Conseil: micro-pauses.</p>
          </div>
          <div className="card">
            <h3>Doua personnalisee</h3>
            <p>Invocation courte adaptee a l etat emotionnel du jour.</p>
          </div>
          <div className="card">
            <h3>QCM intelligent</h3>
            <p>Questions adaptees au niveau, correction et explications.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-title">
          <h2>Temoignages</h2>
        </div>
        <div className="grid two">
          <div className="card">
            <p>
              "J ai enfin un rythme stable entre cours et spiritualite."
            </p>
            <strong>Amina, medecine</strong>
          </div>
          <div className="card">
            <p>
              "Le resume IA et le QCM m aident a rester motive."
            </p>
            <strong>Omar, ingenierie</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
