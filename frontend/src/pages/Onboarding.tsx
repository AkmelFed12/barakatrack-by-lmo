import { useState } from "react";
import { useNavigate } from "react-router-dom";

type StepData = {
  name: string;
  email: string;
  goal: "spirituel" | "academique" | "equilibre";
  weight: "40-40-20" | "50-30-20" | "30-50-20";
};

const defaultData: StepData = {
  name: "",
  email: "",
  goal: "equilibre",
  weight: "40-40-20"
};

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<StepData>(defaultData);
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const finish = () => {
    localStorage.setItem("bt_onboarded", "true");
    localStorage.setItem("bt_profile", JSON.stringify(data));
    navigate("/signup");
  };

  return (
    <main>
      <div className="section-title">
        <h2>Onboarding</h2>
        <span className="badge">Etape {step} / 3</span>
      </div>

      <section className="grid two">
        <div className="card reveal">
          <h3>Etape {step}</h3>
          {step === 1 && (
            <div className="form">
              <label>Nom complet</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Ton nom"
              />

              <label>Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="email@exemple.com"
              />
            </div>
          )}

          {step === 2 && (
            <div className="form">
              <label>Objectif principal</label>
              <select
                value={data.goal}
                onChange={(e) =>
                  setData({
                    ...data,
                    goal: e.target.value as StepData["goal"]
                  })
                }
              >
                <option value="spirituel">Spirituel</option>
                <option value="academique">Academique</option>
                <option value="equilibre">Equilibre</option>
              </select>

              <label>Rythme prefere</label>
              <select>
                <option>Matin (fajr - midi)</option>
                <option>Apres-midi</option>
                <option>Soir</option>
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="form">
              <label>Ponderation indice d equilibre</label>
              <select
                value={data.weight}
                onChange={(e) =>
                  setData({
                    ...data,
                    weight: e.target.value as StepData["weight"]
                  })
                }
              >
                <option value="40-40-20">40% spirituel / 40% academique / 20% bien-etre</option>
                <option value="50-30-20">50% spirituel / 30% academique / 20% bien-etre</option>
                <option value="30-50-20">30% spirituel / 50% academique / 20% bien-etre</option>
              </select>

              <label>Notifications</label>
              <select>
                <option>Rappels quotidiens</option>
                <option>Rappels hebdomadaires</option>
                <option>Desactiver</option>
              </select>
            </div>
          )}
        </div>

        <div className="card reveal delay-1">
          <h3>Pourquoi cette etape</h3>
          <div className="list">
            <div>Personnaliser ton tableau de bord.</div>
            <div>Adapter l IA a tes objectifs.</div>
            <div>Calculer un indice d equilibre fiable.</div>
          </div>
          <div className="actions">
            {step > 1 && (
              <button className="btn" type="button" onClick={back}>
                Retour
              </button>
            )}
            {step < 3 ? (
              <button className="btn primary" type="button" onClick={next}>
                Continuer
              </button>
            ) : (
              <button className="btn accent" type="button" onClick={finish}>
                Terminer et creer un compte
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
