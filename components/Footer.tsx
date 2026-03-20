"use client";

export default function Footer() {
  const links = [
    { label: "Back to top ↑", href: "#hero" },
    { label: "Resume", href: "https://flowcv.com/resume/cd7u4n9slto3" },
    { label: "GitHub", href: "https://github.com/Agladima" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/agladima/" },
  ];

  return (
    <footer
      style={{
        padding: "40px 5vw",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--bg)",
      }}
    >
      <div
        style={{ fontSize: 11, letterSpacing: ".08em", color: "var(--muted)" }}
      >
        © 2025 Augustine Alawa. Crafted with care.
      </div>
      <div style={{ display: "flex", gap: 28 }}>
        {links.map(({ label, href }) => {
          const isExternal = href.startsWith("http");

          return (
            <a
              className="footer-link"
              key={label}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{
                fontSize: 11,
                letterSpacing: ".08em",
                color: "var(--muted)",
                transition: "color .2s",
              }}
            >
              {label}
            </a>
          );
        })}
      </div>
    </footer>
  );
}
