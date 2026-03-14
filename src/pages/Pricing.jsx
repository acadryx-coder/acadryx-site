import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const faq = [
  { q: "When exactly do we get charged?", a: "Only when results are published. Not per month, not annually — just when you push results to students." },
  { q: "What about teachers and parents?", a: "Always free. Unlimited teachers. Unlimited parents. We don't charge for people — only for published student results." },
  { q: "Will the price go up later?", a: "No. We guarantee that per-student pricing will never increase. It will only decrease as we grow." },
  { q: "What if we have multiple campuses?", a: "Each campus is a separate school instance. You pay per campus, per term, only when results are published." },
  { q: "Do you offer discounts for large schools?", a: "Yes. Contact us and we'll structure something fair. We're not here to extract maximum revenue — we're here to fund development." },
  { q: "Is there a free trial?", a: "Yes. Full access, no card required. Contact us to set up your pilot." },
];

export default function Pricing() {
  return (
    <div className="container" style={{ paddingTop: "3rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--primary)", marginBottom: "1rem", letterSpacing: "-0.02em" }}>Pricing That Disappears</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-soft)", maxWidth: 600, margin: "0 auto" }}>So small you won't feel it. So fair you'll never want to leave.</p>
      </div>

      {/* Philosophy */}
      <div style={{ background: "var(--card-white)", padding: "3rem", borderRadius: 40, marginBottom: "4rem", border: "1px solid var(--border-light)", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8rem", color: "var(--primary)", marginBottom: "1.5rem", fontFamily: "'Syne', sans-serif" }}>We don't have "plans." We have promises.</h2>
        <p style={{ fontSize: "1.1rem", color: "var(--text-soft)", maxWidth: 700, margin: "0 auto 1rem", lineHeight: 1.7 }}>No tiers. No feature gating. No enterprise upsell. Every school gets everything Acadryx builds — today and forever.</p>
        <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: 600, margin: "0 auto 1.5rem" }}>The only cost is a tiny per-student fee when you publish results. Teachers, parents, and admins are always free.</p>
        <div style={{ display: "inline-block", background: "var(--accent-soft)", color: "var(--accent)", padding: "0.8rem 1.5rem", borderRadius: 60, fontWeight: 600, fontSize: "1.1rem" }}>
          ⚡ You pay only when your school is active. No results? No invoice.
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
        <div style={{ background: "var(--primary)", padding: "2.5rem 2rem", borderRadius: 32, color: "white", transition: "transform 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={e => e.currentTarget.style.transform = ""}
        >
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.8rem", marginBottom: "0.5rem", color: "white" }}>School Plan</h3>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "2rem", fontSize: "0.9rem" }}>For primary, secondary, and nursery institutions</p>
          <div style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "0.3rem" }}>Minimal</div>
          <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>per student, per term — only on result day</div>
          {["Full Acadryx infrastructure — all features", "Permanent academic records, forever", "Student identity from admission to alumni", "One-click result publication", "Living magazine — no printing costs", "Alumni network access", "Priority support", "All future features, included"].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.8rem", marginBottom: "0.8rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.92)" }}>
              <span style={{ fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
            </div>
          ))}
          <Link to="/contact" style={{ display: "block", marginTop: "1.5rem", background: "white", color: "var(--primary)", padding: "0.8rem", borderRadius: 40, textAlign: "center", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
            Get early access →
          </Link>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", marginTop: "0.8rem", textAlign: "center" }}>No card required. No commitment.</p>
        </div>

        <div style={{ background: "var(--card-white)", padding: "2.5rem 2rem", borderRadius: 32, border: "1px solid var(--border-light)", transition: "transform 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(11,41,190,0.06)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
        >
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Always Free</h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.9rem" }}>For teachers, parents, and alumni — forever</p>
          <div style={{ fontSize: "3rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.3rem" }}>₦0</div>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "2rem" }}>never a single kobo</div>
          {["Unlimited teacher accounts", "Parent access to results and events", "Admin portal — full access", "Alumni network — permanent access", "Chat and announcements", "Magazine reading and submissions"].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.8rem", marginBottom: "0.8rem", fontSize: "0.9rem", color: "var(--text-dark)" }}>
              <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
            </div>
          ))}
          <Link to="/contact" style={{ display: "block", marginTop: "1.5rem", background: "transparent", color: "var(--primary)", padding: "0.8rem", borderRadius: 40, textAlign: "center", fontWeight: 600, textDecoration: "none", border: "1.5px solid var(--border-light)", fontSize: "0.95rem" }}>
            Get started →
          </Link>
        </div>
      </div>

      {/* Comparison */}
      <div style={{ background: "var(--accent-soft)", padding: "2rem", borderRadius: 40, marginBottom: "4rem", textAlign: "center", border: "1px solid rgba(13,124,150,0.2)" }}>
        <p style={{ fontSize: "1.1rem", color: "var(--text-dark)", marginBottom: "0.5rem" }}>🧮 <strong>A quick comparison</strong></p>
        <p style={{ color: "var(--text-soft)", maxWidth: 700, margin: "0 auto" }}>Most school software charges ₦300,000–₦1,000,000 upfront plus annual fees. Acadryx charges ₦1,000 per student when you publish. A 500-student school pays ₦500,000 per term. No upfront. No annual. Just results.</p>
      </div>

      {/* FAQ */}
      <div style={{ background: "var(--card-white)", padding: "3rem", borderRadius: 40, marginBottom: "4rem", border: "1px solid var(--border-light)" }}>
        <h2 style={{ fontSize: "1.8rem", color: "var(--primary)", marginBottom: "2rem", textAlign: "center", fontFamily: "'Syne', sans-serif" }}>Common Questions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {faq.map((f, i) => (
            <div key={i}>
              <h4 style={{ fontSize: "1rem", color: "var(--text-dark)", marginBottom: "0.5rem", fontFamily: "'Syne', sans-serif" }}>{f.q}</h4>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "var(--primary)", color: "white", padding: "4rem 2rem", borderRadius: 40, textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ color: "white", fontSize: "2rem", marginBottom: "1.5rem", fontFamily: "'Syne', sans-serif" }}>Still have questions?</h2>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto 2rem" }}>Or ready to try Acadryx with zero commitment?</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/contact" style={{ background: "white", color: "var(--primary)", padding: "0.8rem 2rem", borderRadius: 40, fontWeight: 700, textDecoration: "none" }}>Get early access →</Link>
          <Link to="/contact" style={{ background: "transparent", color: "white", padding: "0.8rem 2rem", borderRadius: 40, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>Contact us →</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
