import Footer from "../components/Footer.jsx";

export default function Demo() {
  return (
    <>
      <section className="hero" style={{ padding: "72px 0 60px" }}>
        <div className="wrap">
          <div className="hero-content">
            <span className="eyebrow-pill"><span className="dot" />Interactive Demo</span>
            <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#fff" }}>See Acadryx<br /><em>in action</em></h1>
            <p className="hero-sub">Click through all five portals. Use the role switcher at the top of the phone.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ background: "var(--ink)", borderRadius: "var(--r-xl)", padding: "40px 20px", display: "flex", justifyContent: "center" }}>
            <iframe src="https://acadryxschools.vercel.app" style={{ width: "120%", maxWidth: 960, height: 900, border: "none", borderRadius: 16 }} title="Acadryx Demo" />
          </div>
          <p style={{ textAlign: "center", fontSize: ".82rem", color: "var(--text-3)", marginTop: 16 }}>
            UI prototype. Real data connects from Supabase in production.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
