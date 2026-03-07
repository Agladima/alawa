import Reveal from "@/components/RevealWrapper";
import { SKILLS } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "120px 5vw", background: "var(--bg)" }}>
      <div className="section-label">02 — Expertise</div>

      <div
        className="skills-layout"
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80 }}
      >
        <Reveal>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-.03em", marginBottom: 32 }}>
            Tools &amp;<br />
            <em style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontWeight: 400, color: "var(--muted)" }}>technologies.</em>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.9 }}>
            A curated set of technologies I use to build production-grade applications. I chose depth over breadth — knowing a few tools deeply beats skimming many.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)" }}>
            {SKILLS.map((skill) => (
              <SkillCard key={skill.title} {...skill} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SkillCard({ icon, title, tags }: { icon: string; title: string; tags: string[] }) {
  return (
    <div
      className="skill-card"
      style={{
        background: "var(--bg2)", padding: "32px 28px",
        transition: "background .3s", position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        content: "", position: "absolute", bottom: 0, left: 0,
        height: 2, width: 0, background: "var(--gold)", transition: "width .4s",
      }}
        className="skill-card-bar"
      />
      <div style={{
        fontSize: 22, marginBottom: 16, width: 44, height: 44,
        border: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <div style={{ fontFamily: "var(--font-syne)", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map((tag) => (
          <span
            key={tag}
            className="skill-tag"
            style={{
              fontSize: 10, letterSpacing: ".08em",
              padding: "4px 10px", border: "1px solid var(--border)",
              color: "var(--muted)", transition: "border-color .2s, color .2s",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
