import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import ProfileAvatar from "../components/ProfileAvatar";

const BASE_FEATURES = [
  {
    num: "01",
    title: "Identity & Access",
    tagline: "One identity. From admission to alumni.",
    body: "Every school gets its own branded web app. Every student gets a single profile that follows them from Pre-KG through graduation — never recreated, never lost. Schools generate access codes — no emails, no passwords. The right dashboard loads automatically for each role: Admin, Teacher, Student, Parent, Alumni.",
    pts: [
      "Five roles, one school—different views, same backbone",
      "Profile permanence across terms, years, and sections",
      "Alumni keep full access after graduation",
      "Your school. Your brand. Your own app."
    ],
    flip: false,
  },
  {
    num: "02",
    title: "Academic Structure & Timetable",
    tagline: "Your school. Your hierarchy. No vendor lock-in.",
    body: "Configure your school's exact hierarchy—Pre-KG to Senior Secondary. Manage subjects, arms, and grading scales. Use the Timetable Manager to build templates, assign them to arms, and edit them visually.",
    pts: [
      "School Structure (Classes, Arms, Sections)",
      "Subjects Manager (Section Subjects, Enrolment, Teacher Assignments)",
      "Grading & Assessments (Scales, Assessments, Freeze Config)",
      "Timetable Manager (Template Builder, Assign to Arms, Visual Editor)"
    ],
    flip: true,
  },
  {
    num: "03",
    title: "Comprehensive Admin Suite",
    tagline: "Powerful tools for school administrators.",
    body: "Acadryx provides dedicated managers for every person and process in your school. Manage staff, teachers, parents, students, and alumni with bulk creation and login code generation. Track attendance and handle term transitions.",
    pts: [
      "Staff & Teachers Manager (Create, Bulk, List, Login Codes, Config)",
      "Students & Parents Manager (Create, Bulk, List, Parent Links, Config)",
      "Attendance Manager (Open, Mark, Subject, Reports, Parent Notifications)",
      "System Manager (School Settings, Term Transition, Navigation Visibility)"
    ],
    flip: false,
  },
  {
    num: "04",
    title: "Results Engine & CBT",
    tagline: "What took weeks now takes one day.",
    body: "Teachers enter scores per assessment. Acadryx calculates weighted totals automatically. Admin reviews the class summary and clicks publish. Includes a built-in CBT Manager for secure digital exams.",
    pts: [
      "Bulk score entry for entire classes",
      "One-click publication for every report card",
      "CBT Manager (Question Banks, Pools, Exams, Enrollment, Results, Map Scores)",
      "Immutable archives—published results lock forever"
    ],
    mockup: <ResultsMockup />,
    flip: false,
  },
  {
    num: "05",
    title: "Role-Specific Portals",
    tagline: "The right tools, for the right people.",
    body: "Every role gets a dedicated dashboard with exactly what they need. Teachers get 'My Timetable' and 'Subject Attendance'. Students, Parents, and Alumni get their own Chat, Results, and Profile views.",
    pts: [
      "Teacher Portal: Dashboard, My Timetable, Scores, Class Attendance, Subject Attendance, CBT Manager, Chats, Profile",
      "Student Portal: Dashboard, Results, Chats, Profile",
      "Parent Portal: Dashboard, Results, Chats, Profile",
      "Alumni Portal: Dashboard, Network, Chats, Profile"
    ],
    flip: true,
  },
];

// Country-specific academic structures
const getAcademicStructure = (countryCode) => {
  const structures = {
    NG: { description: "Start with sensible defaults—Primary, Junior Secondary, Senior Secondary. Rename anything. Restructure anytime. It's your school.", sections: [{ name: "Senior Secondary", arms: ["SS1A","SS1B","SS1C","SS2A","SS2B","SS3A"] }, { name: "Junior Secondary", arms: ["JSS1A","JSS1B","JSS2A","JSS3A"] }, { name: "Primary", arms: ["Primary 1","Primary 2","Primary 3","Primary 4","Primary 5","Primary 6"] }] },
    GH: { description: "Start with sensible defaults—Primary, Junior High School, Senior High School. Rename anything. Restructure anytime.", sections: [{ name: "Senior High School", arms: ["SHS 1","SHS 2","SHS 3"] }, { name: "Junior High School", arms: ["JHS 1","JHS 2","JHS 3"] }, { name: "Primary", arms: ["P1","P2","P3","P4","P5","P6"] }] },
    KE: { description: "Start with sensible defaults—Pre-Primary, Primary (CBC), Junior Secondary. Rename anything. Restructure anytime.", sections: [{ name: "Senior Secondary", arms: ["Grade 10","Grade 11","Grade 12"] }, { name: "Junior Secondary", arms: ["Grade 7","Grade 8","Grade 9"] }, { name: "Primary", arms: ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"] }] },
    ZA: { description: "Start with sensible defaults—Foundation Phase, Intermediate Phase, Senior Phase. Rename anything. Restructure anytime.", sections: [{ name: "FET Phase", arms: ["Grade 10","Grade 11","Grade 12"] }, { name: "Senior Phase", arms: ["Grade 7","Grade 8","Grade 9"] }, { name: "Intermediate Phase", arms: ["Grade 4","Grade 5","Grade 6"] }, { name: "Foundation Phase", arms: ["Grade R","Grade 1","Grade 2","Grade 3"] }] },
  };
  return structures[countryCode] || structures.NG;
};

// Mockup components
function StructureMockup({ sections }) {
  return (
    <div className="mockup">
      <div className="mockup-bar"><span className="dot-r"/><span className="dot-y"/><span className="dot-g"/></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sections.map(({ name, arms }) => (
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

function AlumniMockup() {
  return (
    <div className="mockup" style={{ maxWidth: "100%", overflow: "hidden" }}>
      <div className="mockup-bar"><span className="dot-r" /><span className="dot-y" /><span className="dot-g" /></div>
      <div style={{ background: "var(--white)", borderRadius: 12, border: "1px solid var(--border)", overflow: "hidden", width: "100%" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontWeight: 700, color: "var(--blue)", fontSize: ".9rem", marginBottom: 12 }}>{"MyDemo Int'l Alumni"}</div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
            <ProfileAvatar src="https://randomuser.me/api/portraits/women/68.jpg" name="Adaeze Okafor" size={36} />
            <div style={{ flex: 1, minWidth: 120 }}>
              <div style={{ fontWeight: 600, fontSize: ".85rem" }}>Adaeze Okafor</div>
              <div style={{ fontSize: ".65rem", color: "var(--text-3)" }}>Class of 2022 · Product Designer</div>
            </div>
            <div style={{ fontSize: ".65rem", background: "var(--green-soft)", padding: "4px 10px", borderRadius: 20, color: "var(--green)", whiteSpace: "nowrap" }}>✓ Verified</div>
          </div>
        </div>
        <div style={{ padding: "14px 16px", background: "var(--g1)", maxHeight: 320, overflowY: "auto" }}>
          <div style={{ background: "var(--white)", borderRadius: 12, padding: 12, marginBottom: 12, border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <ProfileAvatar src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=32&h=32&fit=crop" name="Mentorship Exchange" size={32} />
              <div>
                <div style={{ fontWeight: 600, fontSize: ".75rem" }}>Mentorship Exchange</div>
                <div style={{ fontSize: ".6rem", color: "var(--text-3)" }}>2 hours ago</div>
              </div>
            </div>
            <div style={{ fontSize: ".75rem", marginBottom: 10, lineHeight: 1.4 }}>🎓 Looking for mentors in Tech! Current SS3 students need career guidance. Any alumni available for a 30-min chat?</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: ".65rem", color: "var(--text-3)" }}>
              <span>❤️ 24 interested</span>
              <span>💬 8 responses</span>
              <span style={{ color: "var(--teal)" }}>🤝 Volunteer →</span>
            </div>
          </div>
          <div style={{ background: "var(--teal-soft)", borderRadius: 12, padding: 12, border: "1px solid var(--teal-light)" }}>
            <div style={{ fontSize: ".65rem", textTransform: "uppercase", color: "var(--teal)", marginBottom: 6 }}>❤️ Annual Giving</div>
            <div style={{ fontSize: ".8rem", fontWeight: 500, marginBottom: 6 }}>Help build a new science lab!</div>
            <div style={{ fontSize: ".7rem", marginBottom: 8 }}>₦12.5M raised of ₦20M goal · 62%</div>
            <div style={{ background: "var(--white)", borderRadius: 20, height: 6, width: "100%", marginBottom: 8 }}>
              <div style={{ background: "var(--teal)", borderRadius: 20, width: "62%", height: 6 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".65rem", flexWrap: "wrap", gap: 8 }}>
              <span>🤝 142 alumni donated</span>
              <span style={{ fontWeight: 600, color: "var(--teal)" }}>Donate →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Features({ selectedCountry }) {
  const countryCode = selectedCountry?.code || "NG";
  const academicStructure = getAcademicStructure(countryCode);
  
  const FEATURES = BASE_FEATURES.map(feature => {
    if (feature.title === "Academic Structure & Timetable") {
      return {
        ...feature,
        body: academicStructure.description,
        mockup: <StructureMockup sections={academicStructure.sections} />
      };
    }
    return feature;
  });

  return (
    <>
      <section className="hero" style={{ padding: "88px 0 80px" }}>
        <div className="wrap">
          <div className="hero-content">
            <span className="eyebrow-pill"><span className="dot" />Platform Overview</span>
            <h1 style={{ fontSize: "clamp(2.4rem,5vw,4.2rem)", color: "#fff" }}>Built for how<br /><em>schools actually work</em></h1>
            <p className="hero-sub">Every feature designed around the reality of K12 institutions—not retrofitted from consumer apps.</p>
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
                <div style={{ order: 1 }}>{f.mockup}</div>
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
            <Link to="/demo" className="btn btn-white btn-lg">Interactive demo →</Link>
            <Link to="/contact" className="btn btn-ghost btn-lg">Get early access</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
