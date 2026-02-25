import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearAuth, getUser, showToast } from "../utils/api";
import ToastHost from "./ToastHost";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Tableau de bord", to: "/dashboard" },
  { label: "Journal", to: "/journal" },
  { label: "QCM", to: "/qcm" },
  { label: "Chatbot", to: "/chatbot" },
  { label: "Rapports", to: "/reports" },
  { label: "Ramadan", to: "/ramadan" },
  { label: "Parametres", to: "/settings" },
  { label: "Tarifs", to: "/pricing" },
  { label: "A propos", to: "/about" }
];

export default function Layout() {
  const location = useLocation();
  const [user, setUser] = useState(getUser());
  const [theme, setTheme] = useState<"day" | "night">("day");

  useEffect(() => {
    setUser(getUser());
  }, [location.pathname]);

  useEffect(() => {
    const saved = localStorage.getItem("bt_theme");
    const next = saved === "night" ? "night" : "day";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }, []);

  const toggleTheme = () => {
    const next = theme === "day" ? "night" : "day";
    setTheme(next);
    localStorage.setItem("bt_theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <div>
      <header className="navbar">
        <div className="navbar-inner container">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <div>
              <div>BarakaTrack IA</div>
              <small className="badge">Etudes, Foi, Equilibre</small>
            </div>
          </div>
          <nav className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={location.pathname === item.to ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="actions">
            <button className="btn" type="button" onClick={toggleTheme}>
              Theme: {theme === "day" ? "Clair" : "Nuit"}
            </button>
            {user ? (
              <>
                <span className="badge">Salut {user.name ?? user.email}</span>
                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    clearAuth();
                    setUser(null);
                    showToast("Deconnecte.");
                  }}
                >
                  Deconnexion
                </button>
              </>
            ) : (
              <>
                <Link className="btn" to="/login">Connexion</Link>
                <Link className="btn primary" to="/signup">Inscription</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="footer container">
        <div className="list">
          <div>BarakaTrack IA - Etudes, Foi, Equilibre · Design & Development by LMO Web Services</div>
          <div>
            <a href="/privacy">Confidentialite</a> ·{" "}
            <a href="/legal">Mentions legales</a>
          </div>
        </div>
      </footer>

      <ToastHost />
    </div>
  );
}
