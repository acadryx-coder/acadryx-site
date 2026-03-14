import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span className="logo-text">Acadryx</span>
      </Link>
      <nav className="nav-links">
        <NavLink to="/features" className={({ isActive }) => isActive ? "active" : ""}>Features</NavLink>
        <NavLink to="/pricing" className={({ isActive }) => isActive ? "active" : ""}>Pricing</NavLink>
        <NavLink to="/demo" className={({ isActive }) => isActive ? "active" : ""}>Demo</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
      </nav>
    </header>
  );
}
