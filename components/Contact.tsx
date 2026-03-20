"use client";

import { FormEvent, useState } from "react";
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
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFeedback(data.message || "Message sent successfully.");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now."
      );
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--surface)", border: "1px solid var(--border)",
    color: "var(--text)", fontFamily: "var(--font-dm-mono)", fontSize: 13,
    padding: "14px 16px", outline: "none", width: "100%",
    transition: "border-color .3s",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="First Name">
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="John"
            style={inputStyle}
            required
          />
        </Field>
        <Field label="Last Name">
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Doe"
            style={inputStyle}
            required
          />
        </Field>
      </div>
      <Field label="Email">
        <input
          className="form-input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@company.com"
          style={inputStyle}
          required
        />
      </Field>
      <Field label="Subject">
        <input
          className="form-input"
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Project inquiry"
          style={inputStyle}
          required
        />
      </Field>
      <Field label="Message">
        <textarea
          className="form-textarea form-input"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          style={{ ...inputStyle, height: 120, resize: "none" }}
          required
        />
      </Field>

      <button
        className={`form-submit${status === "success" ? " sent" : ""}`}
        type="submit"
        disabled={status === "loading"}
        style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          padding: "16px 36px",
          background: status === "success" ? "#2d6a4f" : "var(--gold)",
          color: status === "success" ? "#b7e4c7" : "var(--bg)",
          fontFamily: "var(--font-syne)", fontSize: 12, fontWeight: 700,
          letterSpacing: ".1em", textTransform: "uppercase", border: "none",
          cursor: "none", transition: "background .3s, transform .3s",
          alignSelf: "flex-start",
          opacity: status === "loading" ? 0.8 : 1,
        }}
      >
        {status === "loading"
          ? "Sending..."
          : status === "success"
            ? "✓ Message Sent"
            : "Send Message"}
        {status !== "success" && status !== "loading" && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {feedback ? (
        <p
          style={{
            color: status === "error" ? "#fca5a5" : "#b7e4c7",
            fontSize: 12,
            lineHeight: 1.7,
          }}
        >
          {feedback}
        </p>
      ) : null}
    </form>
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
