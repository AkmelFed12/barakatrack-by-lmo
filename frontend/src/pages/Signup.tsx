import { useState } from "react";
import { apiPost } from "../utils/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    setStatus("Creation du compte...");
    try {
      const res = await apiPost("/auth/register", { name, email, password });
      if (res.token) {
        localStorage.setItem("bt_token", res.token);
        setStatus("Compte cree.");
      } else {
        setStatus(res.error ?? "Erreur.");
      }
    } catch {
      setStatus("Erreur.");
    }
  };

  return (
    <main>
      <div className="section-title">
        <h2>Inscription</h2>
      </div>

      <section className="card form">
        <label>Nom complet</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nour El Amine"
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="email@exemple.com"
        />

        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
        />

        <button className="btn primary" type="button" onClick={handleSubmit}>
          Creer un compte
        </button>
        {status && <p>{status}</p>}
      </section>
    </main>
  );
}
