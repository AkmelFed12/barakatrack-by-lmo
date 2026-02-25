import { Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Tableau de bord", to: "/dashboard" },
  { label: "Journal", to: "/journal" },
  { label: "QCM", to: "/qcm" },
  { label: "Chatbot", to: "/chatbot" },
  { label: "Rapports", to: "/reports" },
  { label: "Ramadan", to: "/ramadan" },
  { label: "Parametres", to: "/settings" }
];

export default function Layout() {
  const location = useLocation();

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
            <Link className="btn" to="/login">Connexion</Link>
            <Link className="btn primary" to="/signup">Inscription</Link>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="footer container">
        BarakaTrack IA - Etudes, Foi, Equilibre · Design & Development by LMO Web Services
      </footer>
    </div>
  );
}
