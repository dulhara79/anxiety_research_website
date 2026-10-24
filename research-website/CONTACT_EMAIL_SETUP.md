# Direct Contact Us email sending

The Contact Us form can send to a selected research team member without opening an email application. This implementation depends on server-side configuration and does not work on a static-only host.

## Hosting

Use Vercel with its Root Directory set to research-website. The Vite project contains a Vercel Function at api/contact.js. A GitHub Pages or other static-only deployment cannot run the /api/contact endpoint; it needs a separate backend.

## Setup in Vercel

1. Create a Resend account (https://resend.com/) and verify a sender domain. Verification is required before the project can deliver to all four researchers; the Resend testing domain cannot freely send to unrelated addresses.
2. Create a Resend API key with sending permission.
3. Create a free Cloudflare Turnstile widget (https://developers.cloudflare.com/turnstile/) for the actual production hostname and any desired preview hostname. Record its site key and secret.
4. Add the following environment variables in Vercel Project Settings, for both Production and Preview when appropriate:
   - RESEND_API_KEY = confidential Resend API key (server-side only).
   - CONTACT_FROM_EMAIL = a verified sender, such as Research Team <contact@your-verified-domain.example>.
   - TURNSTILE_SECRET_KEY = confidential Cloudflare Turnstile secret (server-side only).
   - VITE_TURNSTILE_SITE_KEY = public Cloudflare Turnstile site key (needed during Vite build).
   - CONTACT_ALLOWED_HOSTNAMES = recommended optional comma-separated hostname allowlist, e.g. research.example.org,research-preview.vercel.app (no protocols or paths).
5. Redeploy after configuring environment variables. Use the real Contact Us form to verify successful submission and actual inbox delivery for each team member.

Do not commit API keys or server secrets and do not prefix secret variable names with VITE_. The public widget site key alone may be prefixed with VITE_.

## Behaviour and security

The recipient is selected on the website, but the API checks it against the four email addresses in src/data/team.js. The visitor cannot submit arbitrary destination addresses. The server validates input fields and verifies the one-time Turnstile token with Cloudflare before calling Resend. Resend sends with the verified sender address and sets Reply-To to the visitor's address.

The browser displays success only when the sending provider accepts the request, not as a guarantee of eventual mailbox delivery. Failed submissions keep the draft in the form so the visitor can retry. Without a configured VITE_TURNSTILE_SITE_KEY, the form is visibly disabled rather than pretending to send.

For public deployment, configure request rate limits for /api/contact in the hosting firewall/WAF and monitor provider usage; Turnstile reduces automated submissions but does not replace rate limiting. Use appropriate data handling notices and remind visitors not to submit patient identifiers, clinical notes or other sensitive health information.

Local Vite development alone has no /api/contact handler. Use Vercel development or a deployed preview to exercise the sending endpoint. Run npm run build from the research-website directory to execute the existing checks.
