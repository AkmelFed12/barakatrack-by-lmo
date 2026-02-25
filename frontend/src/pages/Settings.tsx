export default function Settings() {
  return (
    <main>
      <div className="section-title">
        <h2>Parametres utilisateur</h2>
        <span className="badge">Profil</span>
      </div>

      <section className="card form">
        <label>Nom et prenom</label>
        <input type="text" placeholder="Nour El Amine" />

        <label>Email</label>
        <input type="email" placeholder="nour@email.com" />

        <label>Objectif principal</label>
        <select>
          <option>Spirituel</option>
          <option>Academique</option>
          <option>Equilibre</option>
        </select>

        <label>Ponderation indice d equilibre</label>
        <select>
          <option>40% spirituel / 40% academique / 20% bien-etre</option>
          <option>50% spirituel / 30% academique / 20% bien-etre</option>
          <option>30% spirituel / 50% academique / 20% bien-etre</option>
        </select>

        <label>Preferences notifications</label>
        <select>
          <option>Rappels quotidiens</option>
          <option>Rappels hebdomadaires</option>
          <option>Desactiver</option>
        </select>

        <button className="btn primary" type="button">Sauvegarder</button>
      </section>
    </main>
  );
}
