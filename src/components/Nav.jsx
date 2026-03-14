import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // close on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <nav className="nav">
        <div className="wrap">
          <div className="nav-inner">
            <Link to="/" className="nav-logo">Acadryx</Link>

            {/* Desktop links */}
            <div className="nav-links">
              <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
              <NavLink to="/features" className={({ isActive }) => isActive ? "active" : ""}>Features</NavLink>
              <NavLink to="/pricing"  className={({ isActive }) => isActive ? "active" : ""}>Pricing</NavLink>
              <NavLink to="/demo"     className={({ isActive }) => isActive ? "active" : ""}>Demo</NavLink>
              <NavLink to="/contact"  className={({ isActive }) => `nav-cta${isActive ? " active" : ""}`}>Get access</NavLink>
            </div>

            {/* Hamburger */}
            <div className="ham" onClick={() => setOpen(o => !o)} aria-label="Menu">
              <span style={{ transform: open ? "rotate(45deg) translate(5px,5px)" : "" }} />
              <span style={{ opacity: open ? 0 : 1 }} />
              <span style={{ transform: open ? "rotate(-45deg) translate(5px,-5px)" : "" }} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-nav${open ? " open" : ""}`}>
      	<NavLink to="/">Home</NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/demo">Demo</NavLink>
        <NavLink to="/contact" style={{ color: "var(--teal)" }}>Get early access →</NavLink>
      </div>
    </>
  );
}
