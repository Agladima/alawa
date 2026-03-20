import Image from "next/image";
import Reveal from "@/components/RevealWrapper";
import { ABOUT_DETAILS } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "120px 5vw",
        background: "var(--bg2)",
        position: "relative",
      }}
    >
      <div className="section-label">01 — About</div>

      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Image */}
        <Reveal>
          <div
            style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
            }}
          >
            {/* Corner decorations */}
            <div
              style={{
                position: "absolute",
                top: -12,
                left: -12,
                width: 40,
                height: 40,
                borderTop: "2px solid var(--gold)",
                borderLeft: "2px solid var(--gold)",
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -12,
                right: -12,
                width: 40,
                height: 40,
                borderBottom: "2px solid var(--gold)",
                borderRight: "2px solid var(--gold)",
                zIndex: 2,
              }}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                background:
                  "linear-gradient(to bottom, transparent 60%, var(--bg2))",
              }}
            />

            <div
              style={{
                width: "100%",
                height: "100%",
                background: "var(--surface)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 20,
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  zIndex: 1,
                }}
              />
              <Image
                src="/images/Pope.jpeg"
                alt="Portrait of Augustine Alawa"
                fill
                sizes="(max-width: 900px) 90vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Badge */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                zIndex: 2,
                background: "var(--gold)",
                color: "var(--bg)",
                fontFamily: "var(--font-syne)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                padding: "8px 16px",
              }}
            >
              Available for work
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={120}>
          <div
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-.03em",
              marginBottom: 40,
            }}
          >
            The engineer
            <br />
            <em
              style={{
                fontFamily: "var(--font-instrument)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--muted)",
              }}
            >
              behind the code.
            </em>
          </div>

          {[
            <>
              Hey — I&apos;m{" "}
              <strong style={{ color: "var(--text)", fontWeight: 400 }}>
                Augustine Alawa
              </strong>
              , a full-stack developer based in Calabar. Nigeria. I&apos;ve
              spent the last four years building web products that are as robust
              on the inside as they are beautiful on the outside.
            </>,
            <>
              My approach blends{" "}
              <strong style={{ color: "var(--text)", fontWeight: 400 }}>
                engineering rigor with product instinct
              </strong>
              . I don&apos;t just write features — I think in user flows,
              performance budgets, and maintainability. Whether I&apos;m shaping
              a React component or architecting a Node microservice, I bring the
              same level of care to every layer.
            </>,
            <>
              I thrive in collaborative environments and have a deep
              appreciation for teams that move fast{" "}
              <strong style={{ color: "var(--text)", fontWeight: 400 }}>
                without cutting corners
              </strong>
              . When I&apos;m not shipping code, you&apos;ll find me watching
              documentaries, reading about systems design, or tinkering with
              open-source tools.
            </>,
          ].map((text, i) => (
            <p
              key={i}
              style={{
                color: "var(--muted)",
                marginBottom: 20,
                fontSize: 13,
                lineHeight: 1.9,
              }}
            >
              {text}
            </p>
          ))}

          <div
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            {ABOUT_DETAILS.map(({ label, value }) => (
              <div
                key={label}
                style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 6,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 13, color: "var(--text)" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
