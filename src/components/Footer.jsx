// Footer.jsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand">
            <span className="footer-logo">Acadryx</span>
            <p className="footer-tagline">
              School infrastructure for the institutions that shape the future.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <div className="footer-col-title">Product</div>
              <Link to="/features">Features</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/demo">Demo</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Company</div>
              <Link to="/contact">Contact</Link>
              <a href="mailto:acadryx.os@gmail.com">Email us</a>
              <a href="https://wa.me/2347062605368" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Account</div>
              <Link to="/signup">Get started</Link>
              <Link to="/login">Log in</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Acadryx — 🇳🇬 Delta State, Nigeria</span>
          <span className="footer-copy">Infrastructure for K-12 schools</span>
        </div>
      </div>
    </footer>
  )
}
