"use client";

import Reveal from "@/components/RevealWrapper";
import { PROJECTS } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "120px 5vw", background: "var(--bg)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
        <div>
          <div className="section-label">04 — Projects</div>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-.03em" }}>
            Selected<br />
            <em style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontWeight: 400, color: "var(--muted)" }}>work.</em>
          </div>
        </div>
        <a
          className="view-all"
          href="#"
          style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", display: "flex", alignItems: "center", gap: 8, transition: "color .2s" }}
        >
          All projects
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Grid */}
      <div
        className="projects-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)" }}
      >
        {PROJECTS.map((project, i) => (
          <Reveal key={project.title} delay={i * 70} className={project.featured ? "proj-card-featured" : ""} style={{ gridColumn: project.featured ? "span 2" : undefined }}>
            <ProjectCard {...project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  featured, num, icon, title, desc, stack, href,
}: {
  featured: boolean; num: string; icon: string; title: string;
  desc: string; stack: string[]; href: string;
}) {
  return (
    <div
      className="proj-card"
      style={{ background: "var(--bg2)", overflow: "hidden", position: "relative", transition: "background .3s" }}
    >
      {/* Image */}
      <div style={{
        aspectRatio: featured ? "21/9" : "16/9",
        background: "var(--surface)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", position: "relative",
      }}>
        <div
          className="proj-img-inner"
          style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-syne)", fontSize: 64, fontWeight: 800,
            color: "var(--border)", transition: "transform .6s",
            position: "relative",
          }}
        >
          {/* Grid pattern */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          {icon}
        </div>

        {/* Overlay */}
        <div
          className="proj-overlay"
          style={{
            position: "absolute", inset: 0,
            background: "rgba(12,12,12,.8)",
            opacity: 0, transition: "opacity .3s",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <a
            className="proj-overlay-link"
            href={href}
            style={{
              border: "1px solid var(--gold)", color: "var(--gold)",
              fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase",
              padding: "12px 28px", transition: "background .3s, color .3s",
            }}
          >
            View Project →
          </a>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 28 }}>
        <div style={{ fontSize: 10, letterSpacing: ".15em", color: "var(--muted)", marginBottom: 10 }}>{num}</div>
        <div style={{ fontFamily: "var(--font-syne)", fontSize: 18, fontWeight: 700, letterSpacing: "-.01em", marginBottom: 10 }}>{title}</div>
        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>{desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {stack.map((t) => (
            <span key={t} style={{ fontSize: 10, letterSpacing: ".06em", padding: "3px 8px", background: "var(--surface)", color: "var(--muted)" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
