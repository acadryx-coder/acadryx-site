import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Footer from "../components/Footer.jsx";

const FEATURES = [
  { icon: "🏫", t: "Your Own School App",  b: "Every school gets a dedicated, branded web app. Students see your school, not us. You own the experience — we power the infrastructure." },
  { icon: "🔐", t: "Unified Identity",            b: "A student's account follows them from Pre-KG to Senior Secondary. Alumni keep access forever. Nothing is ever lost." },
  { icon: "📊", t: "Results Engine",              b: "Teachers enter scores. Acadryx calculates weighted totals. Admin clicks publish. Every report card is live in seconds." },
  { icon: "🏗️", t: "Modular by Design",            b: "Activate only what you need. Turn on CBT, Alumni, or Staff Management as you grow. Features can be hidden per school." },
  { icon: "🔒", t: "Permanent Records",           b: "Once a term closes, results are immutable and verifiable by any institution. Complete history, forever." },
  { icon: "⚡", t: "Minimal Friction",            b: "Code login by default. Schools that used paper for 40 years go fully digital in one term." },
];

const QUOTES = [
  {
    text: `The part everyone loves the most is how the system's result engine takes subject scores straight from a teacher's phone to a parent's phone as soon as it is entered. We are investing heavily into strengthening this layer.`,
    author: "ACADRYX CEO"
  },
  {
    text: "Simeon has been extremely demanding and pushing for the best. The app is a testimonial of sleepless nights of relentless work and we still do upgrades all the time.",
    author: "ACADRYX CTO"
  },
  {
  	text: `It's very easy to use. No digital literacy needed. For example, as a teacher entering scores, all you do is open your scores page for a particular subject and enter scores for all the students there. Even an old man with no phone can borrow a computer from the computer lab or a friend's phone for one day and easily enter his scores seamlessly. Go to school web-app, enter code, login, go to score entry, enter scores, save, Go home."`,
  	author: "..."
  },
];

export default function Home({ selectedCountry }) {
  const countryCode = selectedCountry?.code || "NG"
  
  const [currentQuote, setCurrentQuote] = useState(0);
  const [direction, setDirection]       = useState("next"); // "next" | "prev"
  const [animKey, setAnimKey]           = useState(0);      // increment to re-trigger CSS anim
  const [touchStart, setTouchStart]     = useState(0);
  const [touchEnd, setTouchEnd]         = useState(0);
  const [hintVisible, setHintVisible]   = useState(true);   // swipe hint fades after first use
  const hintTimer = useRef(null);

  // Hide swipe hint after 4 s or after first real swipe
  useEffect(() => {
    hintTimer.current = setTimeout(() => setHintVisible(false), 4000);
    return () => clearTimeout(hintTimer.current);
  }, []);

  const dismissHint = () => {
    clearTimeout(hintTimer.current);
    setHintVisible(false);
  };

  const goTo = (index, dir) => {
    setDirection(dir);
    setAnimKey(k => k + 1);
    setCurrentQuote(index);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      dismissHint();
      goTo((currentQuote + 1) % QUOTES.length, "next");
    }
    if (touchStart - touchEnd < -50) {
      dismissHint();
      goTo((currentQuote - 1 + QUOTES.length) % QUOTES.length, "prev");
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

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
              <Link to="/login" className="btn btn-white btn-lg">Get Started →</Link>
              <Link to="/demo"    className="btn btn-ghost btn-lg">See the demo</Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE CAROUSEL */}
      <style>{`
        @keyframes quoteSlideNext {
          from { opacity: 0; transform: translateX(36px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes quoteSlidePrev {
          from { opacity: 0; transform: translateX(-36px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes swipeFloat {
          0%   { transform: translateX(0px);   opacity: 0.4; }
          50%  { transform: translateX(-12px); opacity: 0.75; }
          100% { transform: translateX(0px);   opacity: 0.4; }
        }
        .quote-slide-next { animation: quoteSlideNext 0.35s cubic-bezier(0.25,0.46,0.45,0.94) both; }
        .quote-slide-prev { animation: quoteSlidePrev 0.35s cubic-bezier(0.25,0.46,0.45,0.94) both; }
        .swipe-hint-icon  { animation: swipeFloat 1.5s ease-in-out infinite; }
        .swipe-hint-wrap  { transition: opacity 0.7s ease; }
        .quote-dot        { width:8px; height:8px; border-radius:50%; border:none; padding:0; cursor:pointer; transition: all 0.3s ease; }
        .quote-dot.active { width:20px; border-radius:4px; }
      `}</style>

      <section style={{
        background: "var(--off)",
        borderBottom: "1px solid var(--border)",
        padding: "52px 0",
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="wrap">
          <div
            style={{
              maxWidth: 680,
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
              cursor: "grab",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Quote — re-keyed on every change to retrigger CSS animation */}
            <div
              key={animKey}
              className={direction === "next" ? "quote-slide-next" : "quote-slide-prev"}
            >
              <div style={{
                fontSize: "3.5rem",
                lineHeight: 0.7,
                color: "var(--border)",
                fontFamily: "Georgia, serif",
                marginBottom: "16px",
                userSelect: "none",
              }}>
               ''
              </div>

              <p style={{
                fontSize: "1.15rem",
                fontWeight: 500,
                color: "var(--text-2)",
                lineHeight: 1.75,
                letterSpacing: "-0.01em",
                margin: "0 0 18px",
              }}>
                {QUOTES[currentQuote].text}
              </p>

              <div style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                — {QUOTES[currentQuote].author}
              </div>
            </div>

            {/* Dot indicators — active dot stretches into a pill */}
            <div style={{ display:"flex", justifyContent:"center", gap:"7px", marginTop:"28px" }}>
              {QUOTES.map((_, index) => (
                <button
                  key={index}
                  className={`quote-dot${currentQuote === index ? " active" : ""}`}
                  onClick={() => { dismissHint(); goTo(index, index >= currentQuote ? "next" : "prev"); }}
                  style={{
                    background: currentQuote === index ? "var(--teal)" : "var(--border)",
                    opacity: currentQuote === index ? 1 : 0.45,
                  }}
                  aria-label={`Go to quote ${index + 1}`}
                />
              ))}
            </div>

            {/* Swipe hint — animated, no button, fades after 4s or first swipe */}
            <div
              className="swipe-hint-wrap"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                marginTop: "20px",
                opacity: hintVisible ? 1 : 0,
                pointerEvents: "none",
                height: "24px",
              }}
            >
              <svg className="swipe-hint-icon" width="14" height="14" viewBox="0 0 16 16" fill="none"
                style={{ color: "var(--text-3)", animationDirection:"reverse", animationDelay:"0.1s" }}>
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg className="swipe-hint-icon" width="22" height="22" viewBox="0 0 24 24" fill="none"
                style={{ color: "var(--text-3)" }}>
                <path d="M9 11V6.5a1.5 1.5 0 0 1 3 0V11m0-4.5V5a1.5 1.5 0 0 1 3 0v5.5m0-3a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6v-2a1.5 1.5 0 0 1 3 0"
                  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize:"10px", fontWeight:600, color:"var(--text-3)", letterSpacing:"0.06em", textTransform:"uppercase" }}>
                swipe
              </span>
              <svg className="swipe-hint-icon" width="14" height="14" viewBox="0 0 16 16" fill="none"
                style={{ color: "var(--text-3)", animationDelay:"0.1s" }}>
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
              { value: "Free",  label: "For schools under 200 students" },
              { value: "Custom",  label: "Pricing for larger institutions" },
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
            <h2 className="section-h" style={{ maxWidth: 480 }}>{"Get everything today's Edtech offers... plus more."}</h2>
            <p className="section-p">All five portals are included. Add only the tools your school needs. Free for small schools, custom for large.</p>
          </div>

          <div className="pricing-wrap">
            <div className="price-grid">
              {/* CORE — YOUR SCHOOL APP */}
              <div className="price-col dark">
                <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 14 }}>
                  Starter — Free
                </div>
                <div className="price-tag" style={{ color: "#fff" }}>
                  ₦0
                </div>
                <div className="price-note" style={{ color: "rgba(255,255,255,.5)" }}>
                  For schools up to 200 students
                </div>
                <ul className="price-list">
                  <li>🏫 Branded School App (your-school.acadryx.com)</li>
                  <li>📊 Results Engine & Report Cards</li>
                  <li>👨‍👩‍👧 Parent Portal</li>
                  <li>👩‍🏫 Teacher Portal</li>
                  <li>⚙️ Admin Portal</li>
                  <li>🎓 Alumni Portal (Permanent Access)</li>
                </ul>
                <Link to="/contact" className="btn btn-white" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>Start Free →</Link>
              </div>

              {/* FEATURE MARKETPLACE */}
              <div className="price-col light">
                <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 14 }}>
                  Pro — Custom Pricing
                </div>
                <div className="price-tag" style={{ color: "var(--blue)" }}>Let's Talk</div>
                <div className="price-note" style={{ color: "var(--text-3)" }}>
                  For schools with 1,000+ students or multiple campuses
                </div>
                <ul className="price-list">
                  <li>⚡ Unlimited Students & Staff</li>
                  <li>🏢 Multi-Campus Support</li>
                  <li>🤖 AI Migration Assistance</li>
                  <li>📈 Advanced Reporting & Analytics</li>
                  <li>🔧 Dedicated Onboarding & Training</li>
                  <li>💎 Priority Support</li>
                </ul>
                <Link to="/contact" className="btn btn-outline" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>Request Pricing →</Link>
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
