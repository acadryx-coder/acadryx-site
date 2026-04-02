// Pricing.jsx
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const FAQ = [
  { q: "When do we pay?", a: "You pay for active student accounts. Pay anytime within the term. Disable accounts for fee defaulters instantly—their data stays intact. Re-enable when fees are settled." },
  { q: "Do we get our own branded app?", a: "Yes. Every school gets its own dedicated web app at your-school.acadryx.com. Your students, teachers, and parents never see 'Acadryx' — they see your school. Your logo. Your colors. Your domain. We're the infrastructure; you own the experience." },
  { q: "What about teachers and parents?", a: "Always free. Unlimited teachers. Unlimited parents. They each get their own portal within your school's branded app — no extra cost. You pay only for active student accounts." },
  { q: "How do add-on features work?", a: "The Core platform includes all five portals. Add-ons from our marketplace are priced per role count—meaning you pay based on how many users (students, teachers, parents, or alumni) will actually use that specific feature. Only pay for what your school needs." },
  /*{ q: "Will the price ever increase?", a: "No. We guarantee per-student pricing will never increase. It will only decrease as Acadryx grows. We're building infrastructure, not extracting maximum revenue." },*/
  { q: "What if we have multiple campuses?", a: "Each campus can have its own school instance—own branding, own admin, own control. You pay per campus, only for active student accounts and any add-ons you choose." },
  { q: "What about fee defaulters?", a: "Disable any student account without deletion. Their records stay intact. You only pay for accounts you keep active. Simple." },
  { q: "How does pricing work for different school sizes?", a: "It scales naturally—a small school with 100 students pays the equivalent of 100 × per-student price per term. A large school with 2,000 students pays 2,000 × per-student price. Schools typically add the per-student fee to school fees, and parents see exactly what they're paying for: a platform their child uses daily, with permanent records, parent access, and alumni connection that lasts forever. No hidden costs. Just transparent, fair pricing." },
  { q: "Is there a free trial?", a: "Yes. Full access, no card, no commitment. Contact us to set up your pilot and see how we handle your real data." },
];

export default function Pricing({ selectedCountry }) {
  const currencySymbol = selectedCountry?.currency_symbol || "₦"
  const pricePerStudent = selectedCountry?.price_per_student || 1000
  const countryCode = selectedCountry?.code || "NG"
  const countryName = selectedCountry?.name || "Nigeria"

  // Example calculation for 500 students
  const exampleTotal = pricePerStudent * 500
  const formattedTotal = exampleTotal.toLocaleString()

  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ padding: "88px 0 80px" }}>
        <div className="wrap">
          <div className="hero-content">
            <span className="eyebrow-pill"><span className="dot" />Pricing</span>
            <h1 style={{ fontSize: "clamp(2.4rem,5vw,4.2rem)", color: "#fff" }}>Pricing that<br /><em>works for every school</em></h1>
            <p className="hero-sub">Local per-student pricing by country. Pay at your convenience WITHIN the term. No monthly fees. No annual contracts.</p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 className="section-h" style={{ marginBottom: 16 }}>{"Get everything today's Edtech offers... plus more."}</h2>
            <p style={{ fontSize: "1.05rem", color: "var(--text-2)", lineHeight: 1.8, marginBottom: 24 }}>
              All five portals are included. Add only the tools your school needs from the marketplace.
              No tiers. No feature gating. No enterprise upsell.
            </p>
            <div style={{ display: "inline-block", background: "var(--teal-soft)", color: "var(--teal)", padding: "13px 24px", borderRadius: 40, fontWeight: 600, fontSize: ".95rem", border: "1px solid rgba(13,124,150,.15)" }}>
              ⚡ Let users decide what they want and give them that, anytime.
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-sm section-off">
        <div className="wrap">
          <div className="pricing-wrap" style={{ maxWidth: 860, margin: "0 auto" }}>
            <div className="price-grid">
              <div className="price-col dark">
                <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 16 }}>
                  Core — Your School App
                </div>
                <div className="price-tag" style={{ color: "#fff" }}>
                  {currencySymbol}{pricePerStudent.toLocaleString()} ({countryCode})
                </div>
                <div className="price-note" style={{ color: "rgba(255,255,255,.45)" }}>
                  per student · per term · by country
                </div>
                <ul className="price-list">
                  {[
                    "Your school's own branded web app — fully customizable",
                    "One-click school-wide digital result generation and publication",
                    "Student Portal — results, records, portfolio",
                    "Parent Portal — access to child's data and live notifications",
                    "Teacher Portal — grading, attendance, classes",
                    "Admin Portal — full school management",
                    "Alumni Portal — permanent access, forever",
                    "Permanent, verifiable credentials. Lifetime storage & access enabled"
                  ].map((x, i) => <li key={i}>{x}</li>)}
                </ul>
                <Link to="/contact" className="btn btn-white" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>
                  Get early access →
                </Link>
                <p style={{ textAlign: "center", fontSize: ".75rem", color: "rgba(255,255,255,.35)", marginTop: 10 }}>
                  No card required · No commitment
                </p>
              </div>
              <div className="price-col light">
                <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 }}>
                  Add-On Feature Marketplace
                </div>
                <div className="price-tag" style={{ color: "var(--blue)" }}>Upcoming</div>
                <div className="price-note" style={{ color: "var(--text-3)" }}>
                  Add-on tools that serve your users — launching after pilot schools
                </div>
                <ul className="price-list">
                  {[
                    "AI Lesson Note Assistant — for teachers",
                    "Acadryx Exam Driller — for students",
                    "Lifetime Event Photo Storage — for school",
                    "Advanced Career Advancement Features — for alumni",
                    "Events & Digital Magazine — for students",
                    "More, requested by schools like yours"
                  ].map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
                <Link to="/contact" className="btn btn-outline" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>
                  Join pilot → Get early access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section">
        <div className="wrap">
          <div style={{ maxWidth: 760, margin: "0 auto", background: "var(--teal-soft)", borderRadius: "var(--r-xl)", padding: "40px 44px", border: "1px solid rgba(13,124,150,.15)", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>💰</div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: 12 }}>No upfront. No monthly fees.</h3>
            <p style={{ color: "var(--text-2)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>
              Acadryx charges {currencySymbol}{pricePerStudent.toLocaleString()} per active student account. Disable accounts for school-fee defaulters, without deleting.
              A 500-student {countryName} school pays {currencySymbol}{formattedTotal} per term — no upfront, no annual contract, pay as you go.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-off">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <h2 className="section-h" style={{ marginBottom: 40 }}>Common questions</h2>
            {FAQ.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="section-h white" style={{ maxWidth: 440, margin: "0 auto 16px" }}>Still have questions?</h2>
          <p className="section-p white" style={{ margin: "0 auto 36px" }}>Or ready to start your free pilot with zero commitment?</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-blue btn-lg">Get early access →</Link>
            <Link to="/contact" className="btn btn-ghost btn-lg">Contact us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
