import { NextResponse } from "next/server";
import { bookingDepartments, bookingTimes } from "@/content/departments";
import { isEmail, normaliseMobile } from "@/lib/validate";

/**
 * Appointment requests → email (Resend or Formspree) + optional WhatsApp webhook.
 * Configure via env vars; see .env.example. With nothing configured the
 * request is logged server-side and still acknowledged, so the site works in
 * preview environments.
 */

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (clip(body.company, 200)) return NextResponse.json({ ok: true });

  const mobile = normaliseMobile(clip(body.mobile, 20));
  const email = clip(body.email, 200);
  const department = clip(body.department, 80);
  const time = clip(body.time, 40);
  const data = {
    name: clip(body.name, 120),
    mobile,
    email,
    department: bookingDepartments.includes(department) ? department : "",
    date: /^\d{4}-\d{2}-\d{2}$/.test(clip(body.date, 10)) ? clip(body.date, 10) : "",
    time: bookingTimes.includes(time) ? time : "Anytime",
    message: clip(body.message, 3000),
    consent: body.consent === "yes",
    source: clip(body.source, 200),
  };

  const errors: string[] = [];
  if (!data.name) errors.push("name");
  if (!data.mobile) errors.push("mobile");
  if (email && !isEmail(email)) errors.push("email");
  if (!data.message) errors.push("message");
  if (!data.consent) errors.push("consent");
  if (errors.length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const subject = `Appointment request: ${data.name}${data.department ? ` – ${data.department}` : ""}`;
  const lines = [
    `Name: ${data.name}`,
    `Mobile: +91 ${data.mobile}`,
    `Email: ${data.email || "—"}`,
    `Department: ${data.department || "—"}`,
    `Preferred date: ${data.date || "—"}`,
    `Preferred time: ${data.time}`,
    `Page: ${data.source || "—"}`,
    "",
    "Message:",
    data.message,
  ];
  const text = lines.join("\n");

  const tasks: Promise<unknown>[] = [];

  if (process.env.RESEND_API_KEY) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.APPOINTMENT_EMAIL_FROM ?? "KK Hospital Website <onboarding@resend.dev>",
          to: (process.env.APPOINTMENT_EMAIL_TO ?? "kkhospital18@gmail.com").split(",").map((s) => s.trim()),
          reply_to: data.email || undefined,
          subject,
          text,
        }),
      }).then((r) => {
        if (!r.ok) throw new Error(`Resend ${r.status}`);
      }),
    );
  } else if (process.env.FORMSPREE_ENDPOINT) {
    tasks.push(
      fetch(process.env.FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ _subject: subject, ...data, mobile: `+91 ${data.mobile}` }),
      }).then((r) => {
        if (!r.ok) throw new Error(`Formspree ${r.status}`);
      }),
    );
  }

  if (process.env.WHATSAPP_WEBHOOK_URL) {
    // Placeholder integration: POSTs a plain JSON payload for a WhatsApp relay to forward.
    tasks.push(
      fetch(process.env.WHATSAPP_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "appointment_request", text: `${subject}\n${text}`, data }),
      }).catch((e) => console.error("[appointment] WhatsApp webhook failed", e)),
    );
  }

  if (!tasks.length) {
    console.info("[appointment] No delivery configured; request received:\n" + text);
    return NextResponse.json({ ok: true });
  }

  try {
    await Promise.all(tasks);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[appointment] delivery failed", e);
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }
}
