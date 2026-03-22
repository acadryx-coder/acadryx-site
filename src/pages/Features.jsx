import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import ProfileAvatar from "../components/ProfileAvatar";

const FEATURES = [
  {
    num: "01", title: "Identity & Access",
    tagline: "One identity. From admission to alumni.",
    body: "Every student gets a single profile that follows them from Pre-KG through graduation. Never recreated. Never lost. Schools generate access codes—no emails, no passwords. The right dashboard loads automatically for each role: Admin, Teacher, Student, Parent, Alumni.",
    pts: ["Five roles, one school—different views, same backbone", "Profile permanence across terms, years, and sections", "Alumni keep full access after graduation", /*"Optional Google auth—school decides what they allow"*/],
    mockup: <LoginMockup />,
    flip: false,
  },
  {
    num: "02", title: "Academic Structure",
    tagline: "Your school. Your hierarchy. No vendor lock-in.",
    body: "Start with sensible defaults—Primary, Junior Secondary, Senior Secondary, Arms A/B/C. Rename anything. Restructure anytime. It's your school. Acadryx remembers your patterns so you never rebuild from scratch each term.",
    pts: ["Pre-KG to Senior Secondary—every section included", "Rename anything: 'House', 'Cluster', 'Stream'", "Subject weights configurable per teacher assignment", "Divided subjects and optional vs mandatory subjects setting fully supported.", "Sessions, terms, and dates fully yours to set"],
    mockup: <StructureMockup />,
    flip: true,
  },
  {
    num: "03", title: "Results Engine",
    tagline: "What took weeks now takes one day.",
    body: "Teachers enter scores per assessment component. Acadryx calculates weighted totals automatically. Admin reviews the class summary and clicks publish. Every report card goes live in seconds. Results are permanently immutable from that moment—verifiable by any institution, forever.",
    pts: ["Bulk score entry for entire classes", "Weighted scoring for multi-teacher subjects", "One-click publication for every report card in a class", "Immutable archives—published results lock forever"],
    mockup: <ResultsMockup />,
    flip: false,
  },
  {
    num: "04", title: "Upcoming => Living Magazine",
    tagline: "Your school's story, published daily—not annually.",
    body: "Events, achievements, galleries, student articles, sports recaps. Admin approves. Students and teachers submit. Parents and alumni see instantly. No printing costs. No 50-page PDF in June for events that happened in December. The magazine is our first open-source add-on feature.",
    pts: ["Familiar social-feed interface—fast adoption", "Alumni see and engage with live events from their school", "No more 'Page limits' due to printing costs. Everyone's story get's published", "Print option for hardcopy lovers available"],
    mockup: <MagazineMockup />,
    flip: true,
  },
  {
    num: "05",
    title: "Alumni & Legacy",
    tagline: "Your school's greatest asset. Connected forever.",
    body: "Most school software forgets students the moment they graduate. Acadryx doesn't. Every graduate keeps permanent access to their records, their network, and their school—for life. Principals call this their favorite feature. Because legacy matters.",
    pts: [
      "Lifetime access — graduates never lose their credentials, results, or portfolio",
      "Alumni network — classmates stay connected; school stays in their lives",
      "Career & mentorship — former students support current ones; employers find talent",
      "Your school's legacy — every graduating class adds value to your institution forever"
    ],
    mockup: <AlumniMockup />,
    flip: true,
  },
];

function LoginMockup() {
  return (
    <div className="mockup">
      <div className="mockup-bar"><span className="dot-r"/><span className="dot-y"/><span className="dot-g"/></div>
      <div style={{ background: "var(--white)", borderRadius: 12, padding: 20, border: "1px solid var(--border)" }}>
        <div style={{ fontWeight: 700, color: "var(--blue)", fontSize: ".95rem", marginBottom: 14 }}>{"MyDemo Int'l School"}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {["Admin","Teacher","Parent","Student","Alumni"].map(r => (
            <span key={r} style={{ background: "var(--teal-soft)", color: "var(--teal)", padding: "4px 11px", borderRadius: 40, fontSize: ".75rem", fontWeight: 600 }}>{r}</span>
          ))}
        </div>
        <div style={{ background: "var(--g1)", borderRadius: 10, padding: "14px 16px", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: ".72rem", color: "var(--text-3)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".08em" }}>Access code</div>
          <div style={{ fontSize: "1.5rem", width: "100%", fontWeight: 800, wordBreak: "break-all", letterSpacing: ".1em", color: "var(--blue)" }}>STU083897</div>
          <div style={{ fontSize: ".78rem", color: "var(--text-3)", marginTop: 8 }}>One code. Dashboard loads. Done.</div>
        </div>
      </div>
    </div>
  );
}

function StructureMockup() {
  return (
    <div className="mockup">
      <div className="mockup-bar"><span className="dot-r"/><span className="dot-y"/><span className="dot-g"/></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[["Senior Secondary", ["SS1A","SS1B","SS1C","SS2A","SS2B","SS3A"]], ["Junior Secondary", ["JSS1A","JSS1B","JSS2A","JSS3A"]]].map(([name, arms]) => (
          <div key={name} style={{ background: "var(--white)", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontWeight: 600, fontSize: ".9rem" }}>{name}</span>
              <span style={{ color: "var(--teal)", fontSize: ".8rem" }}>✎ Rename</span>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {arms.map(a => <span key={a} style={{ background: "var(--g1)", padding: "3px 10px", borderRadius: 40, fontSize: ".75rem", border: "1px solid var(--border)" }}>{a}</span>)}
              <span style={{ background: "transparent", padding: "3px 10px", borderRadius: 40, fontSize: ".75rem", border: "1px dashed var(--g3)", color: "var(--text-3)" }}>+ Add</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsMockup() {
  const rows = [
    { n: "Mathematics", s: 88, p: "88% ready", c: "var(--green)" },
    { n: "English",     s: 84, p: "84% ready", c: "var(--green)" },
    { n: "Chemistry",   s: 79, p: "79% ready", c: "var(--teal)" },
    { n: "Physics",     s: 76, p: "76% ready", c: "var(--teal)" },
    { n: "Economics",   s: 69, p: "69% ready", c: "#f59e0b" },
  ];
  return (
    <div className="mockup">
      <div className="mockup-bar"><span className="dot-r"/><span className="dot-y"/><span className="dot-g"/></div>
      <div style={{ background: "var(--white)", borderRadius: 12, padding: "16px 18px", border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: ".9rem" }}>SSS 2A — 2nd Term</span>
          <span style={{ color: "var(--green)", fontSize: ".78rem", fontWeight: 700 }}>● Ready</span>
        </div>
        {rows.map(r => (
          <div key={r.n} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 76, fontSize: ".78rem", color: "var(--text-3)", flexShrink: 0 }}>{r.n}</div>
            <div style={{ flex: 1, height: 5, background: "var(--g2)", borderRadius: 4 }}>
              <div style={{ height: "100%", width: `${r.s}%`, background: r.c, borderRadius: 4 }} />
            </div>
            <div style={{ fontSize: ".85rem", fontWeight: 700, width: 26, textAlign: "right", flexShrink: 0 }}>{r.p}</div>
          </div>
        ))}
        <div style={{ marginTop: 16, background: "var(--blue)", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,.75)", fontSize: ".8rem" }}>42 students ready</span>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: ".85rem" }}>Publish all →</span>
        </div>
      </div>
    </div>
  );
}

function MagazineMockup() {
  return (
    <div className="mockup">
      <div className="mockup-bar"><span className="dot-r"/><span className="dot-y"/><span className="dot-g"/></div>
      <div style={{ background: "linear-gradient(135deg,var(--blue),var(--teal))", borderRadius: 12, padding: "16px 18px", color: "white", marginBottom: 12 }}>
        <div style={{ fontSize: ".65rem", opacity: .65, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>VOL XIV · 2024/25</div>
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: "bold", fontSize: "1.1rem", marginBottom: 10 }}>{"Your School's Digital Magazine"}</div>
      </div>
      {[
      	["🏆","Achievement","We Won the National Science Quiz Competition"],
      	["🎨","Culture","Art Exhibition 2025: Colours of Tomorrow"],
      	["⚽","Sports","Football Season: A Historic Year"]
      ]
      .map(([icon,cat,title]) => (
        <div key={title} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
          <div>
            <div style={{ fontSize: ".68rem", color: "var(--teal)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>{cat}</div>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--text)" }}>{title}</div>
          </div>
        </div>
      ))}
      <div>
      	<button>See More</button>
      </div>
    </div>
  );
}


function AlumniMockup() {
  return (
    <div className="mockup" style={{ maxWidth: "100%", overflow: "hidden" }}>
      <div className="mockup-bar">
        <span className="dot-r" />
        <span className="dot-y" />
        <span className="dot-g" />
      </div>
      <div
        style={{
          background: "var(--white)",
          borderRadius: 12,
          border: "1px solid var(--border)",
          overflow: "hidden",
          width: "100%"
        }}
      >
        {/* Header */}
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
          <div
            style={{
              fontWeight: 700,
              color: "var(--blue)",
              fontSize: ".9rem",
              marginBottom: 12
            }}
          >
            {"MyDemo Int'l Alumni"}
          </div>

          {/* Nav row 
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 14
            }}
          >
            <span style={{ fontSize: ".7rem", color: "var(--text-2)" }}>👥 Network</span>
            <span style={{ fontSize: ".7rem", color: "var(--text-2)" }}>💬 Chats</span>
            <span style={{ fontSize: ".7rem", color: "var(--teal)", fontWeight: 500 }}>
              🤝 Mentorship
            </span>
            <span style={{ fontSize: ".7rem", color: "var(--text-2)" }}>❤️ Donate</span>
            <span style={{ fontSize: ".7rem", color: "var(--text-2)" }}>📄 Records</span>
          </div>*/}

          {/* Profile row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 10
            }}
          >
            <ProfileAvatar
              src="https://randomuser.me/api/portraits/women/68.jpg"
              name="Adaeze Okafor"
              size={36}
            />
            <div style={{ flex: 1, minWidth: 120 }}>
              <div style={{ fontWeight: 600, fontSize: ".85rem" }}>Adaeze Okafor</div>
              <div style={{ fontSize: ".65rem", color: "var(--text-3)" }}>
                Class of 2022 · Product Designer
              </div>
            </div>
            <div
              style={{
                fontSize: ".65rem",
                background: "var(--green-soft)",
                padding: "4px 10px",
                borderRadius: 20,
                color: "var(--green)",
                whiteSpace: "nowrap"
              }}
            >
              ✓ Verified
            </div>
          </div>
        </div>

        {/* Scrollable feed */}
        <div
          style={{
            padding: "14px 16px",
            background: "var(--g1)",
            maxHeight: 320,
            overflowY: "auto"
          }}
        >
          {/* Post 1 - Mentorship */}
          <div
            style={{
              background: "var(--white)",
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
              border: "1px solid var(--border)"
            }}
          >
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <ProfileAvatar
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=32&h=32&fit=crop"
                name="Mentorship Exchange"
                size={32}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: ".75rem" }}>
                  Mentorship Exchange
                </div>
                <div style={{ fontSize: ".6rem", color: "var(--text-3)" }}>
                  2 hours ago
                </div>
              </div>
            </div>
            <div style={{ fontSize: ".75rem", marginBottom: 10, lineHeight: 1.4 }}>
              🎓 Looking for mentors in Tech! Current SS3 students need career guidance. Any
              alumni available for a 30-min chat?
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                fontSize: ".65rem",
                color: "var(--text-3)"
              }}
            >
              <span>❤️ 24 interested</span>
              <span>💬 8 responses</span>
              <span style={{ color: "var(--teal)" }}>🤝 Volunteer →</span>
            </div>
          </div>

          {/* Post 2 - Job Opportunity */}
          <div
            style={{
              background: "var(--white)",
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
              border: "1px solid var(--border)"
            }}
          >
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <ProfileAvatar
                src="https://randomuser.me/api/portraits/men/32.jpg"
                name="James D."
                size={32}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: ".75rem" }}>
                  James D. · Class of 2019
                </div>
                <div style={{ fontSize: ".6rem", color: "var(--text-3)" }}>
                  Software Engineer at Flutterwave
                </div>
              </div>
            </div>
            <div style={{ fontSize: ".75rem", marginBottom: 10 }}>
              🚀 Flutterwave is hiring! 3 entry-level backend roles. DM if interested or know
              someone from MyDemo.
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                fontSize: ".65rem",
                color: "var(--text-3)"
              }}
            >
              <span>❤️ 47 likes</span>
              <span>💬 12 comments</span>
              <span>📌 5 shares</span>
            </div>
          </div>

          {/* Post 3 - Donation Campaign */}
          <div
            style={{
              background: "var(--teal-soft)",
              borderRadius: 12,
              padding: 12,
              border: "1px solid var(--teal-light)"
            }}
          >
            <div
              style={{
                fontSize: ".65rem",
                textTransform: "uppercase",
                color: "var(--teal)",
                marginBottom: 6
              }}
            >
              ❤️ Annual Giving
            </div>
            <div style={{ fontSize: ".8rem", fontWeight: 500, marginBottom: 6 }}>
              Help build a new science lab!
            </div>
            <div style={{ fontSize: ".7rem", marginBottom: 8 }}>
              ₦12.5M raised of ₦20M goal · 62%
            </div>
            <div
              style={{
                background: "var(--white)",
                borderRadius: 20,
                height: 6,
                width: "100%",
                marginBottom: 8
              }}
            >
              <div
                style={{
                  background: "var(--teal)",
                  borderRadius: 20,
                  width: "62%",
                  height: 6
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: ".65rem",
                flexWrap: "wrap",
                gap: 8
              }}
            >
              <span>🤝 142 alumni donated</span>
              <span style={{ fontWeight: 600, color: "var(--teal)" }}>Donate →</span>
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div
          style={{
            padding: "10px 12px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            fontSize: ".65rem",
            color: "var(--text-3)"
          }}
        >
          <span style={{ color: "var(--blue)" }}>🏠 Feed</span>
          <span>👥 Network</span>
          <span>💬 Chats</span>
          <span>🤝 Mentorship</span>
          <span>❤️ Donate</span>
        </div>
      </div>
    </div>
  );
};

export default function Features() {
  return (
    <>
	  <section className="hero" style={{ padding: "88px 0 80px" }}>
	    <div className="wrap">
	      <div className="hero-content">
	        <span className="eyebrow-pill"><span className="dot" />Platform Overview</span>
	        <h1 style={{ fontSize: "clamp(2.4rem,5vw,4.2rem)", color: "#fff" }}>Built for how<br /><em>schools actually work</em></h1>
	        <p className="hero-sub">Every feature designed around the reality of K12 institutions—not retrofitted from consumer apps. Schools that used paper for years go fully digital in one term.</p>
	      </div>
	    </div>
	  </section>
	  
      <section className="section">
        <div className="wrap">
          <div className="feat-rows">
            {FEATURES.map((f, i) => (
              <div className="feat-row" key={i}>
                <div style={{ order: f.flip ? 1 : 0 }}>
                  <span className="feat-num">{f.num}</span>
                  <h2 className="feat-h">{f.title}</h2>
                  <p style={{ fontSize: "1.05rem", color: "var(--teal)", fontWeight: 500, marginBottom: 12 }}>{f.tagline}</p>
                  <p className="feat-body">{f.body}</p>
                  <ul className="feat-pts">
                    {f.pts.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                </div>
                <div style={{order: 1}}>{f.mockup}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="section-h white" style={{ maxWidth: 480, margin: "0 auto 16px" }}>See it working live</h2>
          <p className="section-p white" style={{ margin: "0 auto 36px" }}>Try the interactive demo or get early access for your school.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/demo"    className="btn btn-white btn-lg">Interactive demo →</Link>
            <Link to="/contact" className="btn btn-ghost  btn-lg">Get early access</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
