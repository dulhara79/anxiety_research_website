import { team } from "../src/data/team.js";

const recipients = new Set(
  team.filter((person) => person.email).map((person) => person.email.toLowerCase())
);
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function respond(res, status, data) {
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(data);
}

// Runs as a Vercel Function. The email API key never reaches the browser.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return respond(res, 405, { error: "Method not allowed." });
  }
  if (!String(req.headers?.["content-type"] || "").includes("application/json")) {
    return respond(res, 415, { error: "Expected a JSON request." });
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, TURNSTILE_SECRET_KEY } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !TURNSTILE_SECRET_KEY) {
    return respond(res, 503, { error: "Direct contact is not configured yet. Please use the listed email addresses." });
  }

  const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
  if (Buffer.byteLength(raw, "utf8") > 10000) {
    return respond(res, 413, { error: "Your message is too long." });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return respond(res, 400, { error: "Invalid request." });
  }
  if (!body || Array.isArray(body) || typeof body !== "object") {
    return respond(res, 400, { error: "Invalid request." });
  }

  const value = (v) => typeof v === "string" ? v.trim() : "";
  const recipient = value(body.recipient).toLowerCase();
  const name = value(body.name);
  const email = value(body.email);
  const subject = value(body.subject);
  const message = value(body.message);
  const token = value(body.token);

  if (!recipients.has(recipient)) {
    return respond(res, 400, { error: "Choose a valid research team recipient." });
  }
  if (name.length < 2 || name.length > 120 ||
      email.length > 254 || !emailPattern.test(email) ||
      subject.length < 3 || subject.length > 150 ||
      message.length < 10 || message.length > 5000) {
    return respond(res, 400, { error: "Check your name, email address, subject and message, then try again." });
  }
  if (!token || token.length > 2048) {
    return respond(res, 400, { error: "Complete the security check before sending." });
  }

  try {
    const challenge = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!challenge.ok) throw new Error("Turnstile unavailable");
    const result = await challenge.json();
    if (!result.success) {
      return respond(res, 400, { error: "Security verification failed or expired. Please retry the check." });
    }
    const allowedHosts = (process.env.CONTACT_ALLOWED_HOSTNAMES || "")
      .split(",").map((host) => host.trim().toLowerCase()).filter(Boolean);
    if (allowedHosts.length && !allowedHosts.includes(String(result.hostname || "").toLowerCase())) {
      return respond(res, 403, { error: "Security verification failed." });
    }
  } catch {
    return respond(res, 502, { error: "Security verification is temporarily unavailable. Please try again." });
  }

  try {
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [recipient],
        reply_to: email,
        subject: "[R26-DS-012 Research] " + subject,
        text: "Research website enquiry\n\nFrom: " + name +
          "\nReply-to: " + email + "\n\nSubject: " + subject + "\n\n" + message,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!sent.ok) {
      console.error("Contact provider rejected request with HTTP status", sent.status);
      return respond(res, 502, { error: "The email service could not accept your message. Please try again." });
    }
    const result = await sent.json();
    if (!result.id) {
      return respond(res, 502, { error: "The email service did not confirm acceptance." });
    }
    return respond(res, 200, { ok: true });
  } catch {
    return respond(res, 502, { error: "The email service is temporarily unavailable. Please try again." });
  }
}
