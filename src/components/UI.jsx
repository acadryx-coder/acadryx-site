// COMPONENTS: Shared UI

export function Btn({ children, href, to, variant = "primary", size = "md", style: extra = {}, onClick }) {
  const base = {
    display: "inline-block", borderRadius: 40, fontWeight: 600,
    fontSize: size === "lg" ? "1.1rem" : "0.95rem",
    padding: size === "lg" ? "0.9rem 2.2rem" : "0.75rem 1.8rem",
    cursor: "pointer", border: "none", transition: "transform 0.2s, box-shadow 0.2s",
    textDecoration: "none", textAlign: "center",
    ...extra,
  };
  const variants = {
    primary: { background: "var(--primary)", color: "white" },
    secondary: { background: "transparent", border: "1px solid var(--border-light)", color: "var(--primary)" },
    white: { background: "white", color: "var(--primary)" },
  };
  const style = { ...base, ...variants[variant] };

  if (href) return <a href={href} style={style}>{children}</a>;

  return (
    <button onClick={onClick} style={style}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      {children}
    </button>
  );
}

export function FeatureCard({ icon, title, description }) {
  return (
    <div style={{
      background: "var(--card-white)", padding: "2rem 1.8rem",
      borderRadius: 24, border: "1px solid var(--border-light)",
      transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(11,41,190,0.05)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--border-light)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {icon && <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>}
      <h3 style={{ fontSize: "1.3rem", marginBottom: "0.8rem", textAlign: "left", color: "var(--primary)" }}>{title}</h3>
      <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: 0, textAlign: "left", marginLeft: 0 }}>{description}</p>
    </div>
  );
}

export function SectionHeader({ children, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <h2>{children}</h2>
      {sub && <p style={{ fontSize: "1.1rem", color: "var(--text-soft)" }}>{sub}</p>}
    </div>
  );
}

export function VersionBadge({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      padding: "0.5rem 1rem", background: "rgba(11,41,190,0.05)",
      borderRadius: 40, fontSize: "0.9rem", fontWeight: 500,
      color: "var(--primary)", border: "1px solid rgba(11,41,190,0.1)",
      marginBottom: "2rem",
    }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulse 3s infinite", display: "inline-block" }} />
      {children}
    </div>
  );
}

export function CTABanner({ title, sub, children }) {
  return (
    <div style={{
      background: "var(--primary)", color: "white",
      padding: "4rem 2.5rem", borderRadius: 40,
      textAlign: "center", margin: "5rem 0 3rem",
    }}>
      <h2 style={{ color: "white", marginBottom: "1.5rem" }}>{title}</h2>
      {sub && <p style={{ color: "rgba(255,255,255,0.9)", marginBottom: "2rem", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>{sub}</p>}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}
