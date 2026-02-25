import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost, setAuth, showToast } from "../utils/api";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    setStatus("Creation du compte...");
    try {
      const res = await apiPost("/auth/register", { name, email, password });
      if (res.token && res.user) {
        setAuth(res.token, res.user);
        setStatus("Compte cree.");
        showToast("Compte cree.");
        const profile = localStorage.getItem("bt_profile");
        if (profile) {
          try {
            const parsed = JSON.parse(profile);
            const weightMap: Record<string, [number, number, number]> = {
              "40-40-20": [40, 40, 20],
              "50-30-20": [50, 30, 20],
              "30-50-20": [30, 50, 20]
            };
            const [weightS, weightA, weightW] =
              weightMap[parsed.weight] ?? [40, 40, 20];
            await apiPost("/auth/profile", {
              goal: parsed.goal,
              weightS,
              weightA,
              weightW,
              name: parsed.name || name,
              qcmLevel: "intermediaire",
              qcmTopic: "etudes et spiritualite"
            });
          } catch {
            // ignore
          }
        }
        const target = location.state?.from ?? "/dashboard";
        navigate(target);
      } else {
        setStatus(res.error ?? `Erreur (${res._status ?? "?"}).`);
        showToast("Echec inscription.");
      }
    } catch {
      setStatus("Erreur.");
      showToast("Echec inscription.");
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
