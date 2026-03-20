import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
};

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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
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

    const transporter = getTransporter();
    const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;

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
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return NextResponse.json({
      message: "Thanks for reaching out. Your message has been sent.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to send your message right now.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
