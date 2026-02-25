import { useState } from "react";
import { apiPost, setAuth } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    setStatus("Connexion...");
    try {
      const res = await apiPost("/auth/login", { email, password });
      if (res.token && res.user) {
        setAuth(res.token, res.user);
        setStatus("Connecte.");
      } else {
        setStatus(res.error ?? `Erreur (${res._status ?? "?"}).`);
      }
    } catch {
      setStatus("Erreur.");
    }
  };

  return (
    <main>
      <div className="section-title">
        <h2>Connexion</h2>
      </div>

      <section className="card form">
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
          Se connecter
        </button>
        {status && <p>{status}</p>}
      </section>
    </main>
  );
}
