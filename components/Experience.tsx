import Reveal from "@/components/RevealWrapper";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "120px 5vw", background: "var(--bg2)" }}>
      <div className="section-label">03 — Experience</div>

      <Reveal>
        <div style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-.03em", marginBottom: 64 }}>
          Where I&apos;ve<br />
          <em style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontWeight: 400, color: "var(--muted)" }}>done the work.</em>
        </div>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={exp.role} delay={i * 80}>
            <div
              className="exp-item"
              style={{
                display: "grid", gridTemplateColumns: "160px 1fr",
                gap: "0 60px", padding: "48px 0",
                borderBottom: "1px solid var(--border)",
                borderTop: i === 0 ? "1px solid var(--border)" : undefined,
                position: "relative",
              }}
            >
              {/* Hover background */}
              <div style={{
                content: "", position: "absolute", left: 0, top: 0, bottom: 0,
                width: 0, background: "linear-gradient(to right, rgba(201,168,76,.05), transparent)",
                transition: "width .4s",
              }} className="exp-item-hoverbg" />

              {/* Meta */}
              <div style={{ paddingTop: 4 }}>
                <div style={{ fontSize: 11, letterSpacing: ".1em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 8 }}>{exp.period}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{exp.company}</div>
                <div style={{ display: "inline-block", marginTop: 10, fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", padding: "4px 10px", border: "1px solid var(--border)", color: "var(--muted)" }}>
                  {exp.badge}
                </div>
              </div>

              {/* Content */}
              <div>
                <div style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, letterSpacing: "-.02em", marginBottom: 16 }}>
                  {exp.role}
                </div>
                <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.9, marginBottom: 20, maxWidth: 600 }}>{exp.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {exp.techs.map((t) => (
                    <span key={t} style={{ fontSize: 10, letterSpacing: ".08em", color: "var(--gold)", border: "1px solid rgba(201,168,76,.3)", padding: "3px 10px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
