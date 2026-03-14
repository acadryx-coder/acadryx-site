import Footer from "../components/Footer.jsx";

// The interactive mockup lives as a standalone HTML file at /demo.html
// This page wraps it in an iframe so it fits the React layout

export default function Demo() {
  return (
    <div className="container" style={{ paddingTop: "3rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--primary)", marginBottom: "1rem", letterSpacing: "-0.02em" }}>Interactive Demo</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-soft)", maxWidth: 600, margin: "0 auto" }}>
          Click through all five portals — Student, Teacher, Parent, Admin, Alumni. Use the role switcher at the top.
        </p>
      </div>

      <div style={{
        background: "#1a1a2e",
        borderRadius: 32,
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2rem",
        minHeight: 600,
      }}>
        <iframe
          src="/demo.html"
          style={{ width: "100%", maxWidth: 900, height: 900, border: "none", borderRadius: 16 }}
          title="Acadryx Interactive Demo"
        />
      </div>

      <p style={{ textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "3rem" }}>
        This is a UI prototype. Real data loads from Supabase in production.
      </p>

      <Footer />
    </div>
  );
}
