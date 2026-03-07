"use client";

import { STATS } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 5vw 8vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          opacity: 0.35,
        }}
      />

      {/* Year tag */}
      <div
        className="anim-fade-up-year"
        style={{
          position: "absolute",
          top: 100,
          right: "5vw",
          fontSize: 11,
          letterSpacing: ".15em",
          textTransform: "uppercase",
          color: "var(--muted)",
          writingMode: "vertical-rl",
        }}
      >
        © 2026
      </div>

      {/* Scroll line */}
      <div
        className="anim-scroll-line"
        style={{
          position: "absolute",
          bottom: 0,
          left: "calc(5vw + 2px)",
          width: 1,
          height: 80,
          background: "linear-gradient(to bottom, transparent, var(--gold))",
        }}
      />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
        {/* Tag */}
        <div
          className="anim-fade-up-1"
          style={{
            fontSize: 11,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              display: "block",
              width: 40,
              height: 1,
              background: "var(--gold)",
            }}
          />
          Full-Stack Developer
        </div>

        {/* H1 */}
        <h1
          className="anim-fade-up-2"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(52px, 8vw, 110px)",
            fontWeight: 800,
            lineHeight: 0.93,
            letterSpacing: "-.04em",
          }}
        >
          Building
          <br />
          <em
            style={{
              fontFamily: "var(--font-instrument)",
              fontStyle: "italic",
              color: "var(--gold)",
              fontWeight: 400,
            }}
          >
            digital
          </em>
          <br />
          products
          <br />
          that matter.
        </h1>

        {/* Subheading */}
        <p
          className="anim-fade-up-3"
          style={{
            marginTop: 36,
            maxWidth: 480,
            fontSize: 13,
            lineHeight: 1.9,
            color: "var(--muted)",
          }}
        >
          I craft end-to-end web experiences — from elegant UIs to resilient
          backends — with precision, performance, and purpose.
        </p>

        {/* Actions */}
        <div
          className="anim-fade-up-4"
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            marginTop: 48,
          }}
        >
          <a
            className="btn-primary"
            href="#projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 32px",
              background: "var(--gold)",
              color: "var(--bg)",
              fontFamily: "var(--font-syne)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              transition: "background .3s, transform .3s",
            }}
          >
            View Work
            <ArrowIcon />
          </a>
          <a
            className="btn-secondary"
            href="#contact"
            style={{
              fontSize: 11,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "color .2s",
            }}
          >
            Let&apos;s talk <ArrowIcon />
          </a>
        </div>

        {/* Stats */}
        <div
          className="hero-stats anim-fade-up-5"
          style={{
            display: "flex",
            gap: 48,
            marginTop: 72,
            paddingTop: 40,
            borderTop: "1px solid var(--border)",
          }}
        >
          {STATS.map(({ num, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: 36,
                  fontWeight: 800,
                  color: "var(--gold)",
                  letterSpacing: "-.03em",
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginTop: 6,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M2 7h10M7 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
