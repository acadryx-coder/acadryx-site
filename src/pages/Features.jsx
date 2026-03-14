import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const sections = [
  {
    title: "Identity & Access",
    desc: "Code login. No emails. No passwords. No IT headaches.",
    body: "School generates login codes. Parents and students enter them once. Dashboards appear — Admin, Teacher, Student, Parent, Alumni. Each sees what they need. Nothing else.",
    quote: "A student's account follows them from Pre-KG to Senior Secondary. Never recreated. Never lost.",
    details: ["Five roles, one school — different views, same data", "Profile permanence across terms, years, sections", "Alumni keep access after graduation"],
    visual: (
      <div style={{ background: "var(--background)", padding: "1.5rem", borderRadius: 16 }}>
        <div style={{ fontWeight: 600, color: "var(--primary)", marginBottom: "1rem" }}>Kogbodi International School</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {["Admin", "Teacher", "Parent", "Student", "Alumni"].map(r => (
            <span key={r} style={{ background: "var(--accent-soft)", color: "var(--accent)", padding: "0.3rem 1rem", borderRadius: 40, fontSize: "0.8rem", fontWeight: 600 }}>{r}</span>
          ))}
        </div>
        <div style={{ background: "white", padding: "1rem", borderRadius: 12 }}>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Login code: KOG-24A7-B3</div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>One code. One click. Dashboard loads.</div>
        </div>
      </div>
    ),
  },
  {
    title: "Academic Boilerplates",
    desc: "Not hardcoded hierarchies. Templates you own.",
    body: "Start with sensible defaults — Primary, Junior Secondary, Senior Secondary, Arms (A, B, C). Then edit, rename, restructure. It's your school. You decide how it's organized.",
    quote: "Set your own terms, session dates, result patterns. Change them anytime.",
    details: ["Pre-KG to Senior Secondary — all sections included", "Rename anything: 'House,' 'Cluster,' 'Stream'", "Subject weights for divided teachers (40/60, 30/70)", "Acadryx remembers your patterns — no rebuilding every term"],
    visual: (
      <div style={{ background: "var(--background)", padding: "1.5rem", borderRadius: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <span style={{ fontWeight: 600 }}>Senior Secondary 1</span>
          <span style={{ color: "var(--accent)" }}>✎ Edit</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {["SS1A", "SS1B", "SS1C", "+ Add arm"].map((a, i) => (
            <span key={a} style={{ background: "white", padding: "0.3rem 1rem", borderRadius: 40, fontSize: "0.8rem", opacity: i === 3 ? 0.6 : 1 }}>{a}</span>
          ))}
        </div>
        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>"We call ours 'Houses' not 'Arms'" — click to rename →</div>
      </div>
    ),
  },
  {
    title: "Results Engine",
    desc: "What took weeks now takes one day.",
    body: "Teachers enter scores. Acadryx calculates weighted totals automatically. Admin reviews. One click publishes every report card.",
    quote: "Schools that used paper for 40 years go digital in one term.",
    details: ["Bulk upload via spreadsheet — generate whole classes at once", "Weighted scoring for subjects with multiple teachers", "One click publishes every report card in a class", "Immutable archives — once a term closes, results lock forever"],
    visual: (
      <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", border: "1px solid var(--border-light)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <span style={{ fontWeight: 700 }}>SS1A — 1st Term 2026</span>
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>● Publish ready</span>
        </div>
        {[100, 80, 60].map((w, i) => (
          <div key={i} style={{ height: 8, background: "rgba(11,41,190,0.1)", borderRadius: 4, marginBottom: 8, width: `${w}%` }} />
        ))}
        <div style={{ marginTop: "1rem", padding: "0.8rem", background: "var(--background)", borderRadius: 8, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.9rem" }}>45 students</span>
          <span style={{ fontWeight: 600, color: "var(--primary)", fontSize: "0.9rem" }}>Publish all →</span>
        </div>
      </div>
    ),
  },
  {
    title: "Living Magazine",
    desc: "Your school's story, published daily — not annually.",
    body: "Events. Student achievements. Photo galleries. News. Admin approves. Teachers submit. Parents see instantly.",
    quote: "No printing costs. No 50-page PDFs in June for events that happened in December.",
    details: ["Feels like social media — familiar, fast, visual", "Alumni stay connected to their school's story", "Annual magazine becomes a highlight reel, not a forgotten archive", "Prospective parents see a school that's alive, not a brochure"],
    visual: (
      <div style={{ background: "white", borderRadius: 16, padding: "1rem", border: "1px solid var(--border-light)" }}>
        <div style={{ display: "flex", gap: "0.8rem", marginBottom: "1rem" }}>
          <div style={{ width: 40, height: 40, background: "var(--accent-soft)", borderRadius: "50%" }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Kogbodi International</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>2 hours ago</div>
          </div>
        </div>
        <p style={{ marginBottom: "0.8rem", fontSize: "0.9rem" }}>SS1 Science Quiz winners! 🏆</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: "0.8rem" }}>
          <div style={{ height: 70, background: "var(--background)", borderRadius: 8 }} />
          <div style={{ height: 70, background: "var(--background)", borderRadius: 8 }} />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", color: "var(--accent)", fontSize: "0.85rem" }}>
          <span>❤️ 24</span>
          <span>💬 7</span>
        </div>
      </div>
    ),
  },
];

export default function Features() {
  return (
    <div className="container" style={{ paddingTop: "3rem" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--primary)", marginBottom: "1rem", letterSpacing: "-0.02em" }}>What Acadryx Actually Does</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-soft)", maxWidth: 600, margin: "0 auto" }}>Not a list of modules. A description of what becomes possible.</p>
      </div>

      {sections.map((s, i) => (
        <div key={i} style={{ marginBottom: "5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "1.8rem", color: "var(--primary)", marginBottom: "1rem", letterSpacing: "-0.01em" }}>{s.title}</h2>
              <p style={{ fontSize: "1.15rem", color: "var(--text-dark)", marginBottom: "1.5rem", fontWeight: 500 }}>{s.desc}</p>
              <p style={{ color: "var(--text-soft)", marginBottom: "1.5rem", lineHeight: 1.7 }}>{s.body}</p>
              <div style={{ background: "var(--card-white)", padding: "1.5rem", borderRadius: 24, borderLeft: "5px solid var(--accent)", marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "1rem", color: "var(--text-soft)", fontStyle: "italic", margin: 0 }}>"{s.quote}"</p>
              </div>
              <ul style={{ listStyle: "none" }}>
                {s.details.map((d, j) => (
                  <li key={j} style={{ padding: "0.4rem 0 0.4rem 1.8rem", position: "relative", fontSize: "0.95rem", color: "var(--text-muted)" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--accent)", fontWeight: 700 }}>→</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "var(--card-white)", padding: "2rem", borderRadius: 32, border: "1px solid var(--border-light)", boxShadow: "0 8px 24px rgba(11,41,190,0.04)" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: "1rem" }}>⬤⬤⬤ {s.title}</div>
              {s.visual}
            </div>
          </div>
          {i < sections.length - 1 && <div style={{ height: 1, background: "var(--border-light)", margin: "3rem 0 0" }} />}
        </div>
      ))}

      <div style={{ background: "var(--primary)", color: "white", padding: "4rem 2.5rem", borderRadius: 40, textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ color: "white", fontSize: "2rem", marginBottom: "1.5rem", fontFamily: "'Syne', sans-serif" }}>Ready to see it in action?</h2>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/demo" style={{ background: "white", color: "var(--primary)", padding: "0.8rem 2rem", borderRadius: 40, fontWeight: 700, textDecoration: "none" }}>Interactive demo →</Link>
          <Link to="/contact" style={{ background: "transparent", color: "white", padding: "0.8rem 2rem", borderRadius: 40, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>Get early access →</Link>
        </div>
      </div>

      <style>{`@media(max-width:800px){.feature-grid{grid-template-columns:1fr!important}}`}</style>
      <Footer />
    </div>
  );
}
