import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const FEATURES = [
  { icon: "🏫", t: "School-First Architecture",  b: "Schools are the primary entity. Every portal is school-branded. Students never see Acadryx — they see their school." },
  { icon: "🔐", t: "Unified Identity",            b: "A student's account follows them from Pre-KG to Senior Secondary. Alumni keep access forever. Nothing is ever lost." },
  { icon: "📊", t: "Results Engine",              b: "Teachers enter scores. Acadryx calculates weighted totals. Admin clicks publish. Every report card is live in seconds." },
  { icon: "📰", t: "Living Magazine",             b: "Events, achievements, galleries — published daily, not annually. No printing costs. Alumni stay connected." },
  { icon: "🔒", t: "Permanent Records",           b: "Once a term closes, results are immutable and verifiable by any institution. Complete history, forever." },
  { icon: "⚡", t: "Minimal Friction",            b: "Code login by default. Schools that used paper for 40 years go fully digital in one term." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-content">
            <div className="eyebrow-pill anim">
              <span className="dot" />
              Version 0.1 · Early Access Open
            </div>

            <h1 className="anim d1">
              The Infrastructure<br /><em>Schools Deserve</em>
            </h1>

            <p className="hero-sub anim d2">
              One platform for students, teachers, parents, and alumni.
              Built on permanence — not features. Your school runs on Acadryx
              the way businesses run on AWS.
            </p>

            <div className="hero-btns anim d3">
              <Link to="/signup" className="btn btn-white btn-lg">Get Started →</Link>
              <Link to="/demo"    className="btn btn-ghost btn-lg">See the demo</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-dark">
        <div className="wrap">
          <div className="stat-strip">
            {[
              { v: "5",    l: "Portals in one platform" },
              { v: "Local",  l: "Per-student pricing by country" },
              { v: "∞",   l: "Records stored forever" },
              { v: "₦50k",  l: "One-time setup fee" },
            ].map((s, i) => (
              <div className="stat-item" key={i}>
                <div className="stat-val">{s.v}</div>
                <div className="stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="wrap">
          <div style={{ marginBottom: 56 }}>
            <span className="eyebrow">Platform</span>
            <h2 className="section-h" style={{ maxWidth: 520 }}>Built for how schools actually work</h2>
            <p className="section-p">Every feature designed around the reality of K12 institutions — not retrofitted from consumer apps.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: "var(--white)", padding: "28px 24px" }}>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: "1rem", color: "var(--text)", marginBottom: 8 }}>{f.t}</h3>
                <p style={{ fontSize: ".88rem", color: "var(--text-3)", lineHeight: 1.75, margin: 0 }}>{f.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="section section-off">
        <div className="wrap">
          <div style={{ marginBottom: 48 }}>
            <span className="eyebrow">Pricing</span>
            <h2 className="section-h" style={{ maxWidth: 480 }}>Pay only when your school publishes</h2>
            <p className="section-p">Teachers, parents, and admins are always free. A minimal per-student fee, only on result day.</p>
          </div>

          <div className="pricing-wrap">
            <div className="price-grid">
              <div className="price-col dark">
                <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 14 }}>School Plan</div>
                <div className="price-tag" style={{ color: "#fff" }}>#1000 termly</div>
                <div className="price-note" style={{ color: "rgba(255,255,255,.5)" }}>per student · per term · only on result day</div>
                <ul className="price-list">
                  {["Full platform — every feature", "Permanent, verifiable records", "Student identity: admission to alumni", "One-click result publication", "Living magazine · no print costs", "Alumni network access", "All future features, forever"].map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <Link to="/contact" className="btn btn-white" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>Get early access →</Link>
              </div>
              <div className="price-col light">
                <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 14 }}>Unlimited Free Add-On Features</div>
                <div className="price-tag" style={{ color: "var(--blue)" }}>$0</div>
                <div className="price-note" style={{ color: "var(--text-3)" }}>forever — not a single kobo, ever</div>
                <ul className="price-list">
                  {["Unlimited teacher accounts", "Parent access to student data", "Admin portal — full access", "Alumni network — permanent access", "Chat, announcements & events", "Magazine reading & submissions"].map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <Link to="/pricing" className="btn btn-outline" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>See full pricing →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="eyebrow white">Early Access</span>
          <h2 className="section-h white" style={{ maxWidth: 540, margin: "0 auto 16px" }}>Ready to transform your school?</h2>
          <p className="section-p white" style={{ margin: "0 auto 40px" }}>Join pilot schools already running on Acadryx. Free trial, no card required.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/signup" className="btn btn-blue btn-lg">Get Started →</Link>
            <Link to="/demo"    className="btn btn-ghost btn-lg">Interactive demo</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
