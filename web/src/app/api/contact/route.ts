import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const toEmail = process.env.CONTACT_TO_EMAIL || "info@tmsestates.com";
const fromEmail =
  process.env.CONTACT_FROM_EMAIL || "TMS Estates <noreply@tmsgroupeu.com>";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown) {
  return String(value || "").trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  if (!resend) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured yet." },
      { status: 500 },
    );
  }

  const payload = await req.json().catch(() => null);
  if (!payload) {
    return NextResponse.json(
      { ok: false, error: "Please complete the form and try again." },
      { status: 400 },
    );
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const inquiry = clean(payload.inquiry) || "General enquiry";
  const message = clean(payload.message);
  const source = clean(payload.source) || "Website contact form";

  if (!name) {
    return NextResponse.json(
      { ok: false, field: "name", error: "Please add your name." },
      { status: 400 },
    );
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { ok: false, field: "email", error: "Please add a valid email address." },
      { status: 400 },
    );
  }

  if (!message) {
    return NextResponse.json(
      { ok: false, field: "message", error: "Please add a short message." },
      { status: 400 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeInquiry = escapeHtml(inquiry);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeSource = escapeHtml(source);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject: `TMS Estates enquiry: ${inquiry}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #242124; line-height: 1.6; max-width: 680px;">
        <div style="background:#242124; color:#F5F0E8; padding:22px 24px;">
          <p style="margin:0; color:#C2A139; font-size:11px; letter-spacing:2px; text-transform:uppercase;">${safeSource}</p>
          <h1 style="margin:10px 0 0; font-size:24px;">New TMS Estates Enquiry</h1>
        </div>

        <div style="border:1px solid #e7e0d4; border-top:0; padding:24px;">
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Inquiry type:</strong> ${safeInquiry}</p>

          <hr style="border:none; border-top:1px solid #e7e0d4; margin:22px 0;" />

          <p style="margin-bottom:8px;"><strong>Message:</strong></p>
          <div style="background:#f7f3eb; padding:16px 18px;">${safeMessage}</div>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Contact email error:", error);
    return NextResponse.json(
      { ok: false, error: "We could not send the message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
