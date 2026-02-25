export default function Testimonials() {
  return (
    <main>
      <div className="section-title">
        <h2>Temoignages</h2>
        <span className="badge">Communaute</span>
      </div>

      <section className="grid two">
        <div className="card">
          <p>
            "J ai enfin un rythme stable entre mes cours et ma spiritualite."
          </p>
          <strong>Amina, medecine</strong>
        </div>
        <div className="card">
          <p>
            "Le QCM adaptatif m aide a mieux retenir mes revisions."
          </p>
          <strong>Omar, ingenierie</strong>
        </div>
        <div className="card">
          <p>
            "Les rappels intelligents m ont beaucoup motive."
          </p>
          <strong>Khadija, droit</strong>
        </div>
        <div className="card">
          <p>
            "Dashboard clair et conseils IA utiles chaque jour."
          </p>
          <strong>Youssouf, economie</strong>
        </div>
      </section>
    </main>
  );
}
