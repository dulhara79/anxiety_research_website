import { useEffect, useRef } from "react";

// Renders the official Cloudflare Turnstile challenge; backend validates the token.
export default function TurnstileField({ siteKey, onToken, resetCounter }) {
  const container = useRef(null);
  const widgetId = useRef(null);

  useEffect(() => {
    if (!siteKey) return;
    let active = true;
    const render = () => {
      if (!active || !container.current || !window.turnstile || widgetId.current !== null) return;
      widgetId.current = window.turnstile.render(container.current, {
        sitekey: siteKey,
        theme: "light",
        callback: (value) => { if (active) onToken(value); },
        "expired-callback": () => { if (active) onToken(""); },
        "error-callback": () => { if (active) onToken(""); },
      });
    };
    let script = document.getElementById("research-turnstile-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "research-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", render);
    render();
    return () => {
      active = false;
      script.removeEventListener("load", render);
      if (widgetId.current !== null && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey, onToken]);

  useEffect(() => {
    if (resetCounter && widgetId.current !== null && window.turnstile) {
      window.turnstile.reset(widgetId.current);
    }
  }, [resetCounter]);

  if (!siteKey) return null;
  return (
    <div className="contact-turnstile">
      <p className="contact-security-label">Security check</p>
      <div ref={container} />
    </div>
  );
}
