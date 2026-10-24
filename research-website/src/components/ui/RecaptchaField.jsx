import { useEffect, useRef } from "react";

// EmailJS supports reCAPTCHA v2; require verification in EmailJS template Settings.
// The site key is public; the reCAPTCHA secret must never be shipped with React.
export default function RecaptchaField({ siteKey, onToken, resetCounter }) {
  const containerRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!siteKey) return;
    let mounted = true;
    const handleReady = () => {
      if (!mounted || !containerRef.current || !window.grecaptcha?.render || widgetRef.current !== null) return;
      widgetRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        callback: (value) => { if (mounted) onToken(value); },
        "expired-callback": () => { if (mounted) onToken(""); },
        "error-callback": () => { if (mounted) onToken(""); },
      });
    };

    let script = document.getElementById("research-recaptcha-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "research-recaptcha-script";
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
    }
    script.addEventListener("load", handleReady);
    if (!script.isConnected) document.head.appendChild(script);
    handleReady();

    return () => {
      mounted = false;
      script.removeEventListener("load", handleReady);
      if (containerRef.current) containerRef.current.replaceChildren();
      widgetRef.current = null;
    };
  }, [siteKey, onToken]);

  useEffect(() => {
    if (resetCounter > 0 && widgetRef.current !== null && window.grecaptcha?.reset) {
      window.grecaptcha.reset(widgetRef.current);
    }
  }, [resetCounter]);

  if (!siteKey) return null;
  return (
    <div className="contact-turnstile">
      <p className="contact-security-label">Security verification</p>
      <div ref={containerRef} />
    </div>
  );
}
