import Footer from "../components/Footer.jsx";

export default function Contact() {
  return (
    <>
      <section className="hero" style={{ padding: "88px 0 80px" }}>
        <div className="wrap">
          <div className="hero-content">
            <span className="eyebrow-pill"><span className="dot" />Contact</span>
            <h1 style={{ fontSize: "clamp(2.4rem,5vw,4.2rem)", color: "#fff" }}>Get in <em>touch</em></h1>
            <p className="hero-sub">No bots. No tickets. Direct line to the team building Acadryx.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-split">

            {/* Left */}
            <div>
              <h2 className="section-h" style={{ marginBottom: 32 }}>Reach us directly</h2>

              <div className="c-item">
                <div className="c-lbl">Email</div>
                <div className="c-val"><a href="mailto:acadryx.os@gmail.com">acadryx.os@gmail.com</a></div>
                <div className="c-note">We reply personally within 12 hours</div>
                <span className="c-badge">⚡ 12h response guarantee</span>
              </div>

              <div className="c-item">
                <div className="c-lbl">WhatsApp — fastest</div>
                <div className="c-val"><a href="https://wa.me/2347062605368">+234 706 260 5368</a></div>
                <div className="c-note">Text or call. We answer when we can.</div>
              </div>

              <div className="c-item">
                <div className="c-lbl">Currently accepting</div>
                <div className="c-val" style={{ color: "var(--text)" }}>Pilot school partners</div>
                <div className="c-note">Free trial available. No card required.</div>
              </div>

              <div className="c-item">
                <div className="c-lbl">Location</div>
                <div className="c-val" style={{ color: "var(--text)" }}>🇳🇬 Delta State, Nigeria</div>
                <div className="c-note">Building globally from here.</div>
              </div>
            </div>

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* WhatsApp box */}
              <div style={{ background: "linear-gradient(135deg,var(--blue),var(--teal))", borderRadius: "var(--r-xl)", padding: "36px 32px", color: "white", textAlign: "center" }}>
                <div style={{ fontSize: "2.4rem", marginBottom: 14 }}>📱</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.3rem", color: "white", marginBottom: 8, letterSpacing: "-.02em" }}>Fastest response</h3>
                <p style={{ color: "rgba(255,255,255,.72)", fontSize: ".9rem", marginBottom: 22, lineHeight: 1.6 }}>WhatsApp gets you a reply in minutes, not hours.</p>
                <a href="https://wa.me/2347062605368" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#25D366", color: "white",
                  padding: "12px 28px", borderRadius: 40,
                  fontWeight: 700, fontSize: ".95rem", textDecoration: "none",
                  transition: "transform .15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform=""}
                >Chat on WhatsApp</a>
                <div style={{ marginTop: 12, fontSize: ".75rem", color: "rgba(255,255,255,.45)" }}>+234 706 260 5368</div>
              </div>

              {/* FAQ mini */}
              <div style={{ background: "var(--g1)", borderRadius: "var(--r-xl)", padding: "28px 28px" }}>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", color: "var(--text)", marginBottom: 16, letterSpacing: "-.01em" }}>Before you reach out</h3>
                {[
                  ["Is Acadryx live?",     "Beta with pilots now. Full launch May 2026."],
                  ["Free trial?",          "Yes. No card, no commitment."],
                  ["Live demo?",           "Yes — see the demo page, or we'll show you live."],
                  ["Response time?",       "12h by email. Faster on WhatsApp."],
                ].map(([q,a], i) => (
                  <div key={i} style={{ padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ fontSize: ".85rem", fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{q}</div>
                    <div style={{ fontSize: ".8rem", color: "var(--text-3)" }}>{a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
