import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const FAQ = [
  { q: "Is Acadryx really free for small schools?", a: "Yes. If your school has up to 200 active students, the core platform is completely free. This includes all portals (Admin, Teacher, Student, Parent, Alumni). We want to empower small and new schools to go digital without financial barriers." },
  { q: "How does pricing work for larger schools?", a: "For schools with over 200 students, or for multi-campus institutions, we offer custom pricing. We believe in 'bleedingly affordable' rates, but we work with you to ensure the price fits your specific budget and needs. No hidden fees." },
  { q: "Do we get our own branded app?", a: "Yes. Every school gets its own dedicated web app at your-school.acadryx.com. Your students, teachers, and parents never see 'Acadryx' — they see your school. You own the experience." },
  { q: "What about teachers and parents?", a: "Always free. Unlimited teachers. Unlimited parents. You pay only for active student accounts (or a flat custom fee for large schools)." },
  { q: "How do add-on features work?", a: "The Core platform includes all five portals. As we develop more advanced features (like AI Lesson Notes), we will ensure they remain affordable. We are validating the best structure currently." },
  { q: "What if we have multiple campuses?", a: "Each campus can have its own school instance—own branding, own admin. We will create a custom plan for your multi-campus setup." },
  { q: "Is there a free trial?", a: "Yes. Full access, no card, no commitment. Contact us to set up your pilot." },
];

export default function Pricing({ selectedCountry }) {
  const countryCode = selectedCountry?.code || "NG";
  const countryName = selectedCountry?.name || "Nigeria";

  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ padding: "88px 0 80px" }}>
        <div className="wrap">
          <div className="hero-content">
            <span className="eyebrow-pill"><span className="dot" />Pricing</span>
            <h1 style={{ fontSize: "clamp(2.4rem,5vw,4.2rem)", color: "#fff" }}>Pricing that<br /><em>works for every school</em></h1>
            <p className="hero-sub">Free for small schools. Custom for large ones. No monthly fees. No annual contracts.</p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 className="section-h" style={{ marginBottom: 16 }}>{"Get everything today's Edtech offers... plus more."}</h2>
            <p style={{ fontSize: "1.05rem", color: "var(--text-2)", lineHeight: 1.8, marginBottom: 24 }}>
              All five portals are included. No tiers. No feature gating. No enterprise upsell.
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
                  Free — For Small Schools
                </div>
                <div className="price-tag" style={{ color: "#fff" }}>₦0</div>
                <div className="price-note" style={{ color: "rgba(255,255,255,.45)" }}>
                  For up to 200 active students
                </div>
                <ul className="price-list">
                  {[
                    "Your school's own branded web app",
                    "Student, Parent, Teacher, Admin & Alumni Portals",
                    "Results Engine & Report Cards",
                    "Attendance & Basic Reports",
                    "Code-based login (no email required)",
                    "Full data ownership"
                  ].map((x, i) => <li key={i}>{x}</li>)}
                </ul>
                <Link to="/contact" className="btn btn-white" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>
                  Start Free →
                </Link>
                <p style={{ textAlign: "center", fontSize: ".75rem", color: "rgba(255,255,255,.35)", marginTop: 10 }}>
                  No card required · No commitment
                </p>
              </div>
              <div className="price-col light">
                <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 }}>
                  Pro — Custom Pricing
                </div>
                <div className="price-tag" style={{ color: "var(--blue)" }}>Let's Talk</div>
                <div className="price-note" style={{ color: "var(--text-3)" }}>
                  For schools with 1,000+ students or multi-campus groups
                </div>
                <ul className="price-list">
                  {[
                    "Unlimited Students & Staff",
                    "Multi-Campus Management",
                    "AI-Assisted Migration",
                    "Advanced Reporting & Analytics",
                    "Dedicated Onboarding & Support",
                    "Custom Integrations"
                  ].map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
                <Link to="/contact" className="btn btn-outline" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>
                  Request Pricing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison / Note */}
      <section className="section">
        <div className="wrap">
          <div style={{ maxWidth: 760, margin: "0 auto", background: "var(--teal-soft)", borderRadius: "var(--r-xl)", padding: "40px 44px", border: "1px solid rgba(13,124,150,.15)", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>💡</div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: 12 }}>Our Promise</h3>
            <p style={{ color: "var(--text-2)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>
              We aim to eliminate the trade-off between cost and quality. 
              For {countryName} schools, Acadryx is designed to be the most accessible, most powerful platform available.
              If you are a larger school, we will work with you to find a pricing model that fits your budget.
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
