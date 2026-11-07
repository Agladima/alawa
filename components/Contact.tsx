"use client";

import { FormEvent, useState } from "react";
import Reveal from "@/components/RevealWrapper";
import { CONTACT_CHANNELS } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 5vw",
        background: "var(--bg2)",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="contact-inner"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 100,
          alignItems: "start",
        }}
      >
        <div>
          <div className="section-label">05 - Contact</div>

          <Reveal>
            <div
              className="heading-text"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-.03em",
              }}
            >
              Let&apos;s build
              <br />
              something
              <br />
              <em
                style={{
                  fontFamily: "var(--font-instrument)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--muted)",
                }}
              >
                great.
              </em>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.9, marginTop: 28 }}>
              Whether you have a project in mind, a full-time role, or just want to say hello - my inbox is always open.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div
              style={{
                marginTop: 52,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {CONTACT_CHANNELS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${label}`}
                  title={`Open ${label}`}
                  className="contact-channel"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    transition: "color .2s, border-color .2s, transform .3s",
                  }}
                >
                  <ContactIcon label={label} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function ContactIcon({ label }: { label: string }) {
  if (label === "Email") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "GitHub") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.21.65-.46v-1.67c-2.65.58-3.21-1.28-3.21-1.28-.44-1.13-1.08-1.43-1.08-1.43-.87-.6.07-.59.07-.59.96.07 1.47.99 1.47.99.86 1.47 2.26 1.05 2.81.8.09-.62.34-1.05.61-1.29-2.12-.24-4.35-1.06-4.35-4.71 0-1.04.37-1.89.98-2.56-.1-.24-.43-1.21.09-2.52 0 0 .8-.26 2.62.98a9.1 9.1 0 0 1 4.77 0c1.82-1.24 2.62-.98 2.62-.98.52 1.31.19 2.28.09 2.52.61.67.98 1.52.98 2.56 0 3.66-2.23 4.47-4.36 4.7.35.31.65.91.65 1.84v2.74c0 .25.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.2 3.5A1.7 1.7 0 1 1 5.2 6.9a1.7 1.7 0 0 1 0-3.4ZM3.7 8.3h3v10.2h-3V8.3Zm4.8 0h2.9v1.4h.04c.4-.76 1.38-1.55 2.84-1.55 3.03 0 3.59 1.99 3.59 4.57v5.77h-3v-5.12c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.32-1.96 2.7v5.21h-3V8.3Z" />
    </svg>
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);

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
        error instanceof DOMException && error.name === "AbortError"
          ? "The request timed out. Please try again."
          : error instanceof Error
          ? error.message
          : "Unable to send your message right now."
      );
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    fontFamily: "var(--font-dm-mono)",
    fontSize: 13,
    padding: "14px 16px",
    outline: "none",
    width: "100%",
    transition: "border-color .3s",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="contact-name-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
            maxLength={80}
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
            maxLength={80}
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
          maxLength={254}
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
          maxLength={160}
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
          maxLength={5000}
        />
      </Field>

      <button
        className={`form-submit${status === "success" ? " sent" : ""}`}
        type="submit"
        disabled={status === "loading"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 36px",
          background: status === "success" ? "var(--surface)" : "var(--gold2)",
          color: "var(--bg)",
          fontFamily: "var(--font-syne)",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          border: "none",
          cursor: "pointer",
          transition: "background .3s, transform .3s",
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
          role="status"
          aria-live="polite"
          style={{
            color: status === "error" ? "var(--text)" : "var(--muted)",
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
