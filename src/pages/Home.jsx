import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const FEATURES = [
  { icon: "🏫", t: "Your Own School App",  b: "Every school gets a dedicated, branded web app at your-school.acadryx.com. Students see your school, not us. You own the experience — we power the infrastructure." },
  { icon: "🔐", t: "Unified Identity",            b: "A student's account follows them from Pre-KG to Senior Secondary. Alumni keep access forever. Nothing is ever lost." },
  { icon: "📊", t: "Results Engine",              b: "Teachers enter scores. Acadryx calculates weighted totals. Admin clicks publish. Every report card is live in seconds." },
  { icon: "📰", t: "Living Magazine(Add-On)",             b: "Events, achievements, galleries — published daily, not annually. No printing costs. Alumni stay connected." },
  { icon: "🔒", t: "Permanent Records",           b: "Once a term closes, results are immutable and verifiable by any institution. Complete history, forever." },
  { icon: "⚡", t: "Minimal Friction",            b: "Code login by default. Schools that used paper for 40 years go fully digital in one term." },
];

export default function Home({ selectedCountry }) {
  const currencySymbol = selectedCountry?.currency || "₦"
  const pricePerStudent = selectedCountry?.price_per_student || 1000
  const countryCode = selectedCountry?.code || "NG"

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-content">
            <div className="eyebrow-pill anim">
              <span className="dot" />
              School is More Than Classes 💯
            </div>

            <h1 className="anim d1">
              The Infrastructure<br /><em>Schools Deserve</em>
            </h1>

            <p className="hero-sub anim d2">
              <strong>Your school gets its own branded web app</strong> — not just another login. 
              Students, teachers, parents, and alumni each get their own portal. 
              Your school runs on Acadryx the way businesses run on AWS.
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
              { value: "5",    label: "Portals in one platform" },
              { value: "∞",   label: "Records stored forever" },
              { value: "Local",  label: "Per-student pricing by country" },
              { value: "Permanent",  label: "Built for Legacy and Global Dominance" },
            ].map((stat, index) => (
              <div className="stat-item" key={index}>
                <div className="stat-val">{stat.value}</div>
                <div className="stat-lbl">{stat.label}</div>
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
            <h2 className="section-h" style={{ maxWidth: 480 }}>{"Get everything today's Edtech offers... "} plus an optional more.</h2>
            <p className="section-p">All five portals are included. Add only the tools your school needs from the marketplace.</p>
          </div>

          <div className="pricing-wrap">
            <div className="price-grid">
              {/* CORE — YOUR SCHOOL APP */}
              <div className="price-col dark">
                <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 14 }}>
                  Core — Your School App
                </div>
                <div className="price-tag" style={{ color: "#fff" }}>
                  {currencySymbol}{pricePerStudent.toLocaleString()} ({countryCode})
                </div>
                <div className="price-note" style={{ color: "rgba(255,255,255,.5)" }}>
                  per active student · per term
                </div>
                <ul className="price-list">
                  <li>📊 One-click school-wide digital generation and publication</li>
                  <li>🏫 Student Portal — results, records, portfolio</li>
                  <li>{"👨‍👩‍👧 Parent Portal — access to child's data"}</li>
                  <li>👩‍🏫 Teacher Portal — grading, attendance, classes</li>
                  <li>⚙️ Admin Portal — full school management</li>
                  <li>🎓 Alumni Portal — permanent access, forever</li>
                  <li>🔒 Permanent, verifiable, credentials storage & access</li>
                </ul>
                <Link to="/contact" className="btn btn-white" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>Get early access →</Link>
              </div>

              {/* FEATURE MARKETPLACE */}
              <div className="price-col light">
                <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 14 }}>
                  Add-On Feature Marketplace
                </div>
                <div className="price-tag" style={{ color: "var(--blue)" }}>Under Development</div>
                <div className="price-note" style={{ color: "var(--text-3)" }}>Add-on tools that serve your users — launching after pilot schools</div>
                <ul className="price-list">
                  <li>🤖 AI Lesson Note Assistant — for teachers</li>
                  <li>🧠 Acadryx Exam Driller — for students</li>
                  <li>📷 Lifetime Event Photo Storage — for school</li>
                  <li>👥 Advanced Career Advancement Features — for alumni</li>
                  <li>📅 Events & Digital Magazine — for students</li>
                  <li>✨ More, requested by schools like yours</li>
                </ul>
                <Link to="/contact" className="btn btn-outline" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>Join pilot → Get early access</Link>
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
