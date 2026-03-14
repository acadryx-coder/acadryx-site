import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const FAQ = [
  { q: "When exactly do we get charged?",     a: "Only when results are published. Not monthly, not annually — just when you push results to students." },
  { q: "What about teachers and parents?",     a: "Always free. Unlimited teachers. Unlimited parents. We charge for published student results, not for people." },
  { q: "Will the price ever increase?",        a: "No. We guarantee per-student pricing will never increase. It will only decrease as Acadryx grows." },
  { q: "What if we have multiple campuses?",   a: "Each campus is its own school instance — own branding, own admin, own pricing. You pay per campus, only when that campus publishes." },
  { q: "Discounts for large schools?",         a: "Yes. Contact us. We're building long-term infrastructure, not extracting maximum revenue." },
  { q: "Is there a free trial?",               a: "Yes. Full access, no card, no commitment. Contact us to set up your pilot." },
];

export default function Pricing() {
  return (
    <>
      <section className="hero" style={{ padding: "88px 0 80px" }}>
        <div className="wrap">
          <div className="hero-content">
            <span className="eyebrow-pill"><span className="dot" />Pricing</span>
            <h1 style={{ fontSize: "clamp(2.4rem,5vw,4.2rem)", color: "#fff" }}>Pricing that<br /><em>disappears</em></h1>
            <p className="hero-sub">So small you won't feel it. So fair you'll never want to leave.</p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 className="section-h" style={{ marginBottom: 16 }}>We don't have "plans." We have promises.</h2>
            <p style={{ fontSize: "1.05rem", color: "var(--text-2)", lineHeight: 1.8, marginBottom: 24 }}>
              No tiers. No feature gating. No enterprise upsell. Every school gets everything Acadryx 
              builds — today and everything that ships in the future.
            </p>
            <div style={{ display: "inline-block", background: "var(--teal-soft)", color: "var(--teal)", padding: "13px 24px", borderRadius: 40, fontWeight: 600, fontSize: ".95rem", border: "1px solid rgba(13,124,150,.15)" }}>
              ⚡ You pay only when your school publishes. No results? No invoice.
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
                <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 16 }}>School Plan</div>
                <div className="price-tag" style={{ color: "#fff" }}>#1000</div>
                <div className="price-note" style={{ color: "rgba(255,255,255,.45)" }}>per student · per term · on result day only</div>
                <ul className="price-list">
                  {["Full platform — every single feature","Permanent, verifiable academic records","Student identity: admission through alumni","One-click result publication","Living magazine · zero printing costs","Alumni network access","Priority support","All future features, forever"].map((x,i)=><li key={i}>{x}</li>)}
                </ul>
                <Link to="/contact" className="btn btn-white" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>Get early access →</Link>
                <p style={{ textAlign: "center", fontSize: ".75rem", color: "rgba(255,255,255,.35)", marginTop: 10 }}>No card required · No commitment</p>
              </div>
              <div className="price-col light">
                <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 }}>Unlimted Free Add-On Features</div>
                <div className="price-tag" style={{ color: "var(--blue)" }}>$0</div>
                <div className="price-note" style={{ color: "var(--text-3)" }}>forever — not a single kobo, ever</div>
                <ul className="price-list">
                  {["Unlimited teacher accounts","Parent access to all student data","Admin portal — complete access","Alumni network — permanent access","Chat, announcements & events","Magazine reading & article submissions"].map((x,i)=><li key={i}>{x}</li>)}
                </ul>
                <Link to="/contact" className="btn btn-outline" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>Get started →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section">
        <div className="wrap">
          <div style={{ maxWidth: 760, margin: "0 auto", background: "var(--teal-soft)", borderRadius: "var(--r-xl)", padding: "40px 44px", border: "1px solid rgba(13,124,150,.15)", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>🧮</div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: 12 }}>A quick comparison</h3>
            <p style={{ color: "var(--text-2)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>
              Most school software charges <strong>$200 to $500 upfront</strong> plus annual fees. 
              Acadryx charges <strong>₦1,000 per student when you publish results</strong>. 
              A 500-student school pays ₦500,000 per term — no upfront, no annual contract, just results.
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

      <section className="section section-dark">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="section-h white" style={{ maxWidth: 440, margin: "0 auto 16px" }}>Still have questions?</h2>
          <p className="section-p white" style={{ margin: "0 auto 36px" }}>Or ready to start your free pilot with zero commitment?</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-blue  btn-lg">Get early access →</Link>
            <Link to="/contact" className="btn btn-ghost btn-lg">Contact us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
