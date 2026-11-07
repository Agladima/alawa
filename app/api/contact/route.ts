import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const MAX_LENGTHS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  subject: 160,
  message: 5000,
} as const;

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "augustineagladima@gmail.com";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Email service is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] || character
  );
}

export async function POST(request: Request) {
  try {
    let body: ContactPayload;

    try {
      body = (await request.json()) as ContactPayload;
    } catch {
      return NextResponse.json(
        { error: "Please send a valid contact form." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Please send a valid contact form." },
        { status: 400 }
      );
    }

    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please complete all fields before sending." },
        { status: 400 }
      );
    }

    if (
      firstName.length > MAX_LENGTHS.firstName ||
      lastName.length > MAX_LENGTHS.lastName ||
      email.length > MAX_LENGTHS.email ||
      subject.length > MAX_LENGTHS.subject ||
      message.length > MAX_LENGTHS.message
    ) {
      return NextResponse.json(
        { error: "Please shorten one or more fields and try again." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(subject)) {
      return NextResponse.json(
        { error: "Please provide a valid email and subject." },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await transporter.sendMail({
      from: `"Portfolio Contact" <${fromEmail}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Portfolio inquiry: ${subject}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>New portfolio inquiry</h2>
          <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    try {
      await transporter.sendMail({
        from: `"Augustine Alawa" <${fromEmail}>`,
        to: email,
        replyTo: CONTACT_TO_EMAIL,
        subject: "I received your message",
        text: [
          `Hi ${firstName},`,
          "",
          "Thanks for reaching out. I have received your message and will get back to you soon.",
          "",
          `Email received from: ${email}`,
          "",
          "Best,",
          "Augustine Alawa",
        ].join("\n"),
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
            <p>Hi ${safeFirstName},</p>
            <p>Thanks for reaching out. I have received your message and will get back to you soon.</p>
            <p><strong>Email received from:</strong> ${safeEmail}</p>
            <p>Best,<br />Augustine Alawa</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Contact acknowledgement delivery failed:", error);
    }

    return NextResponse.json({
      message: "Thanks for reaching out. Your message has been sent.",
    });
  } catch (error) {
    console.error("Contact form delivery failed:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }
}
