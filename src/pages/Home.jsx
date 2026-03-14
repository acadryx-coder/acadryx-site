import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const features = [
  { title: "School-First Architecture", body: "Schools are the primary entity. Students, teachers, and parents access school-specific apps while Acadryx provides the backbone." },
  { title: "Unified Identity", body: "Student and school identity is permanent. Alumni stay connected. Records persist across sessions, terms, and years." },
  { title: "Academic Management", body: "Classes, sections, arms, and terms structured for real school hierarchies. Automatic promotion workflows built-in." },
  { title: "Results & Publications", body: "Weighted teacher-subject scoring with automatic result calculation. Read-only archival once terms close." },
  { title: "Permanent Auditability", body: "Past sessions, terms, and results are immutable. Nothing is lost. Complete academic history preserved." },
  { title: "Minimal Friction", body: "Code login by default. Fast onboarding. Efficient result entry. Predictable workflows for every role." },
];

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: "3rem" }}>
      {/* HERO */}
      <section style={{ textAlign: "center", marginBottom: "5rem", animation: "fadeUp 0.5s ease forwards" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.5rem 1.2rem", background: "rgba(11,41,190,0.06)",
          borderRadius: "40px", fontSize: "0.85rem", fontWeight: 600,
          color: "var(--primary)", border: "1px solid rgba(11,41,190,0.12)",
          marginBottom: "2rem",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulse 2.5s infinite", display: "inline-block" }} />
          Version 0.1 — Now in Early Access
        </div>

        <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", marginBottom: "1.5rem", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--primary)" }}>
          The Infrastructure<br />Schools Deserve
        </h1>

        <p style={{ fontSize: "1.2rem", color: "var(--text-soft)", maxWidth: 680, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Acadryx provides identity, continuity, and community for schools. 
          One platform for students, teachers, and parents — built on permanence, not features.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
          <Link to="/contact" className="btn btn-primary">Get early access →</Link>
          <Link to="/features" className="btn btn-secondary">See what's inside →</Link>
        </div>

        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", color: "var(--accent)", fontWeight: 500, fontSize: "0.95rem" }}>
          <span>🏫 School-First Philosophy</span>
          <span>🔐 Identity Permanence</span>
          <span>⚡ Minimal Friction</span>
        </div>
      </section>

      {/* FEATURES */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--primary)", letterSpacing: "-0.01em" }}>Everything you need, nothing you don't</h2>
      </div>
      <p style={{ textAlign: "center", color: "var(--text-soft)", marginBottom: "1rem", fontSize: "1.1rem" }}>
        A single, invisible layer that makes administration feel like it's 2030.
      </p>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--primary)", letterSpacing: "-0.01em" }}>Built for How Schools Actually Work</h2>
      </div>
      <p style={{ textAlign: "center", color: "var(--text-soft)", marginBottom: "3rem", fontSize: "1.1rem" }}>
        Every feature designed around the reality of academic institutions — not retrofitted from consumer apps.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "5rem" }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: "var(--card-white)", padding: "2rem 1.8rem",
            borderRadius: 24, border: "1px solid var(--border-light)",
            transition: "all 0.2s", cursor: "default",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(11,41,190,0.06)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "var(--border-light)"; }}
          >
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.8rem", color: "var(--primary)", fontFamily: "'Syne', sans-serif" }}>{f.title}</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>{f.body}</p>
          </div>
        ))}
      </div>

      {/* PRICING PREVIEW */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--primary)", letterSpacing: "-0.01em" }}>Fair, Minimal Pricing</h2>
      </div>
      <p style={{ textAlign: "center", color: "var(--text-soft)", marginBottom: "2.5rem", maxWidth: 600, margin: "0 auto 2.5rem", fontSize: "1.05rem" }}>
        Teachers, parents, and school admins are always free. Minimal fees based on student count, calculated only when results publish.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
        <div style={{ background: "var(--primary)", padding: "2.5rem 2rem", borderRadius: 32, color: "white" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", marginBottom: "0.5rem", color: "white" }}>School Plan</h3>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>Based on active student count</p>
          <div style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.3rem" }}>Minimal</div>
          <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>per publish — charged only on result day</div>
          {["Full Acadryx infrastructure", "Permanent academic records", "Student identity management", "Result publication system", "Living magazine", "Alumni network access"].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}>
              <span style={{ fontWeight: 700 }}>✓</span>{item}
            </div>
          ))}
          <Link to="/contact" style={{ display: "block", marginTop: "1.5rem", background: "white", color: "var(--primary)", padding: "0.8rem", borderRadius: 40, textAlign: "center", fontWeight: 600, textDecoration: "none", transition: "opacity 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >Get early access →</Link>
        </div>

        <div style={{ background: "var(--card-white)", padding: "2.5rem 2rem", borderRadius: 32, border: "1px solid var(--border-light)" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", marginBottom: "0.5rem", color: "var(--text-dark)" }}>Always Free</h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>For teachers, parents, and administrators</p>
          <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.3rem" }}>₦0</div>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "2rem" }}>forever — not a single kobo</div>
          {["Unlimited teacher accounts", "Parent access to student data", "Admin portal full access", "Event and resource management", "Result entry and viewing", "Community features"].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem", fontSize: "0.9rem", color: "var(--text-dark)" }}>
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>{item}
            </div>
          ))}
          <Link to="/contact" style={{ display: "block", marginTop: "1.5rem", background: "transparent", color: "var(--primary)", padding: "0.8rem", borderRadius: 40, textAlign: "center", fontWeight: 600, textDecoration: "none", border: "1.5px solid var(--border-light)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "var(--accent-soft)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-light)"; e.currentTarget.style.background = "transparent"; }}
          >Get started →</Link>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "var(--primary)", color: "white", padding: "4rem 2.5rem", borderRadius: 40, textAlign: "center", margin: "5rem 0 3rem" }}>
        <h2 style={{ color: "white", fontSize: "2rem", marginBottom: "1.5rem", fontFamily: "'Syne', sans-serif" }}>Ready to Transform Your School?</h2>
        <p style={{ color: "rgba(255,255,255,0.9)", maxWidth: 600, margin: "0 auto 2rem", fontSize: "1.1rem" }}>
          Join pilot schools already using Acadryx. Get early access today.
        </p>
        <Link to="/contact" style={{ background: "white", color: "var(--primary)", padding: "0.9rem 2.5rem", borderRadius: 40, fontWeight: 700, textDecoration: "none", fontSize: "1.05rem", display: "inline-block", transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >Get early access →</Link>
      </div>

      <Footer />
    </div>
  );
}
