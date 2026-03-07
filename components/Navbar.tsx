"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5vw", height: "72px",
        borderBottom: "none",
        transition: "background .4s",
        ...(scrolled
          ? { background: "rgba(12,12,12,.85)", backdropFilter: "blur(20px)" }
          : {}),
      }}
    >
      {/* Logo */}
      <div style={{ fontFamily: "var(--font-syne)", fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", display: "flex", alignItems: "center", gap: 10 }}>
        <span className="pulse-dot" />
        Alawa<span style={{ color: "var(--gold)" }}>.</span>Augustine
      </div>

      {/* Links */}
      <ul className="nav-links-list" style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              className="nav-link"
              href={href}
              style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", transition: "color .2s", position: "relative" }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        className="nav-cta"
        href="#contact"
        style={{
          fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase",
          padding: "10px 22px", border: "1px solid var(--gold)", color: "var(--gold)",
          transition: "background .3s, color .3s",
        }}
      >
        Hire Me
      </a>
    </nav>
  );
}
