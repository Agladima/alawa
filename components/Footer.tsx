"use client";

export default function Footer() {
  const links = [
    { label: "Back to top ↑", href: "#hero" },
    { label: "Resume",        href: "#" },
    { label: "GitHub",        href: "#" },
    { label: "LinkedIn",      href: "#" },
  ];

  return (
    <footer style={{
      padding: "40px 5vw",
      borderTop: "1px solid var(--border)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "var(--bg)",
    }}>
      <div style={{ fontSize: 11, letterSpacing: ".08em", color: "var(--muted)" }}>
        © 2025 Alawa Augustine. Crafted with care.
      </div>
      <div style={{ display: "flex", gap: 28 }}>
        {links.map(({ label, href }) => (
          <a
            className="footer-link"
            key={label}
            href={href}
            style={{ fontSize: 11, letterSpacing: ".08em", color: "var(--muted)", transition: "color .2s" }}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
