"use client";

import { useState } from "react";
import Reveal from "@/components/RevealWrapper";
import { CONTACT_CHANNELS } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 5vw", background: "var(--bg2)",
        minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center",
      }}
    >
      <div
        className="contact-inner"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}
      >
        {/* Left */}
        <div>
          <div className="section-label">05 — Contact</div>

          <Reveal>
            <div style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-.03em" }}>
              Let&apos;s build<br />something<br />
              <em style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontWeight: 400, color: "var(--muted)" }}>great.</em>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.9, marginTop: 28 }}>
              Whether you have a project in mind, a full-time role, or just want to say hello — my inbox is always open.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div style={{ marginTop: 52, display: "flex", flexDirection: "column" }}>
              {CONTACT_CHANNELS.map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="contact-channel"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "20px 0", borderBottom: "1px solid var(--border)",
                    transition: "padding-left .3s",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>{label}</div>
                    <div className="channel-value" style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 600, transition: "color .2s" }}>{value}</div>
                  </div>
                  <svg className="channel-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: "var(--muted)", transition: "color .2s, transform .3s" }}>
                    <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: Form */}
        <Reveal delay={200}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--surface)", border: "1px solid var(--border)",
    color: "var(--text)", fontFamily: "var(--font-dm-mono)", fontSize: 13,
    padding: "14px 16px", outline: "none", width: "100%",
    transition: "border-color .3s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="First Name"><input className="form-input" type="text" placeholder="John" style={inputStyle} /></Field>
        <Field label="Last Name"><input  className="form-input" type="text" placeholder="Doe"  style={inputStyle} /></Field>
      </div>
      <Field label="Email">
        <input className="form-input" type="email" placeholder="john@company.com" style={inputStyle} />
      </Field>
      <Field label="Subject">
        <input className="form-input" type="text" placeholder="Project inquiry" style={inputStyle} />
      </Field>
      <Field label="Message">
        <textarea
          className="form-textarea form-input"
          placeholder="Tell me about your project..."
          style={{ ...inputStyle, height: 120, resize: "none" }}
        />
      </Field>

      <button
        className={`form-submit${sent ? " sent" : ""}`}
        onClick={handleSubmit}
        style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          padding: "16px 36px",
          background: sent ? "#2d6a4f" : "var(--gold)",
          color: sent ? "#b7e4c7" : "var(--bg)",
          fontFamily: "var(--font-syne)", fontSize: 12, fontWeight: 700,
          letterSpacing: ".1em", textTransform: "uppercase", border: "none",
          cursor: "none", transition: "background .3s, transform .3s",
          alignSelf: "flex-start",
        }}
      >
        {sent ? "✓ Message Sent" : "Send Message"}
        {!sent && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</label>
      {children}
    </div>
  );
}
