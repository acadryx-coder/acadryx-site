import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

export default function Contact() {
  return (
    <div className="container" style={{ paddingTop: "3rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--primary)", marginBottom: "1rem", letterSpacing: "-0.02em" }}>Get in Touch</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-soft)", maxWidth: 500, margin: "0 auto" }}>No bots. No tickets. Direct line to the team.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
        {/* Direct contact */}
        <div style={{ background: "var(--card-white)", padding: "2.5rem", borderRadius: 32, border: "1px solid var(--border-light)" }}>
          <h2 style={{ fontSize: "1.4rem", color: "var(--primary)", marginBottom: "2rem", fontFamily: "'Syne', sans-serif" }}>Reach us directly</h2>

          {[
            { label: "Email", value: <a href="mailto:acadryx.os@gmail.com" style={{ color: "var(--primary)", borderBottom: "2px solid var(--accent-soft)" }}>acadryx.os@gmail.com</a>, note: "We reply personally within 12 hours", badge: "⚡ 12h response guarantee" },
            { label: "WhatsApp (fastest)", value: <a href="https://wa.me/2347062605368" style={{ color: "var(--primary)", borderBottom: "2px solid var(--accent-soft)" }}>+234 706 260 5368</a>, note: "Text or call. We answer when we can." },
            { label: "Currently accepting", value: "Pilot school partners", note: "Free trial available. No card required." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: "0.3rem" }}>{item.label}</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text-dark)", marginBottom: "0.3rem" }}>{item.value}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{item.note}</div>
              {item.badge && (
                <span style={{ display: "inline-block", background: "var(--accent-soft)", color: "var(--accent)", padding: "0.3rem 1rem", borderRadius: 40, fontSize: "0.75rem", fontWeight: 600, marginTop: "0.5rem" }}>{item.badge}</span>
              )}
            </div>
          ))}
        </div>

        {/* Where to find us */}
        <div style={{ background: "var(--card-white)", padding: "2.5rem", borderRadius: 32, border: "1px solid var(--border-light)" }}>
          <h2 style={{ fontSize: "1.4rem", color: "var(--primary)", marginBottom: "2rem", fontFamily: "'Syne', sans-serif" }}>Where to find us</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { flag: "🇳🇬", name: "Main HQ", location: "Delta State, Nigeria", note: "Where the platform gets built.", badge: "Active", active: true },
              { flag: "🌍", name: "Branch HQs", location: "Multiple locations", note: "Coming as schools request them.", badge: "Upcoming", active: false },
            ].map((o, i) => (
              <div key={i} style={{ background: "rgba(11,41,190,0.02)", padding: "1.5rem", borderRadius: 24, border: "1px solid var(--border-light)" }}>
                <h3 style={{ fontSize: "1.1rem", color: "var(--primary)", marginBottom: "0.8rem", fontFamily: "'Syne', sans-serif" }}>{o.flag} {o.name}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-soft)", marginBottom: "0.3rem" }}>{o.location}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.8rem" }}>{o.note}</p>
                <span style={{ background: o.active ? "var(--accent-soft)" : "rgba(13,124,150,0.05)", color: o.active ? "var(--accent)" : "var(--text-muted)", padding: "0.2rem 0.8rem", borderRadius: 40, fontSize: "0.7rem", fontWeight: 600 }}>{o.badge}</span>
              </div>
            ))}
          </div>

          <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border-light)" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Early-stage means you get direct access to the people building Acadryx — not a support tier. Your feedback shapes what gets built next.
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div style={{ background: "var(--primary)", padding: "3rem", borderRadius: 40, marginBottom: "4rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ color: "white", fontSize: "2rem", marginBottom: "1rem", fontFamily: "'Syne', sans-serif" }}>Need answers in minutes?</h2>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem", maxWidth: 450, margin: "0 auto 2rem" }}>WhatsApp is the fastest way to reach us directly.</p>
        <a href="https://wa.me/2347062605368" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "#25D366", color: "white", padding: "0.8rem 2.5rem",
          borderRadius: 60, textDecoration: "none", fontWeight: 600, fontSize: "1.05rem",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(37,211,102,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
        >
          📱 Chat on WhatsApp
        </a>
        <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>+234 706 260 5368 · replies within hours, not days</p>
      </div>

      {/* Mini FAQ */}
      <div style={{ background: "var(--card-white)", padding: "2.5rem", borderRadius: 32, border: "1px solid var(--border-light)", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "var(--primary)", marginBottom: "1.5rem", textAlign: "center", fontFamily: "'Syne', sans-serif" }}>Before you reach out</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {[
            { q: "❓ Is Acadryx live?", a: "Currently in beta with pilot schools. Full launch May 2026." },
            { q: "❓ Can I try it for free?", a: "Yes. Free trial, no card required. Contact us to start." },
            { q: "❓ Do you have a demo?", a: "Yes — check the interactive demo. We can also walk you through live." },
            { q: "❓ What's response time really?", a: "We reply within 12 hours. Usually much faster." },
          ].map((f, i) => (
            <div key={i}>
              <h4 style={{ fontSize: "0.95rem", color: "var(--text-dark)", marginBottom: "0.4rem", fontFamily: "'Syne', sans-serif" }}>{f.q}</h4>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
