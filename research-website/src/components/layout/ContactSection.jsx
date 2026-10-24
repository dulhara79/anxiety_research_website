import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Building2, Github, GraduationCap, Mail } from "lucide-react";
import Reveal from "../ui/Reveal";
import TurnstileField from "../ui/TurnstileField";
import { site } from "../../data/site";
import { supervisors, team } from "../../data/team";

// Only Contact Us contains the full directory and composer.
// Home and About Us use a focused invitation so existing team cards are not repeated.
export default function ContactSection({ id = "contact", variant = "full" }) {
  const [recipient, setRecipient] = useState(team[0].email);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [token, setToken] = useState("");
  const [resetChallenge, setResetChallenge] = useState(0);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const isConfigured = Boolean(import.meta.env.VITE_TURNSTILE_SITE_KEY);

  const submitEmail = async (event) => {
    event.preventDefault();
    if (busy || !isConfigured) return;
    if (!token) {
      setFeedback({ type: "error", text: "Complete the security check before sending." });
      return;
    }
    setBusy(true);
    setFeedback({ type: "", text: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient, name: name.trim(), email: email.trim(),
          subject: subject.trim(), message: message.trim(), token,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not send the message. Try again later.");
      setFeedback({ type: "success", text: "Your message was accepted for sending. Thank you for contacting the team." });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setFeedback({ type: "error", text: error instanceof Error ? error.message : "Something went wrong. Try again." });
    } finally {
      setBusy(false);
      setToken("");
      setResetChallenge((value) => value + 1);
    }
  };

  if (variant !== "full") {
    const about = variant === "team";
    return (
      <section className="section section--tight section--dark contact-cta" id={id} aria-labelledby={id + "-title"}>
        <div className="shell contact-cta-layout">
          <Reveal>
            <p className="eyebrow">Contact the project</p>
            <h2 className="display" id={id + "-title"}>
              {about ? "Continue the conversation." : "Questions about the research?"}
            </h2>
            <p className="lead">
              {about
                ? "For academic enquiries and research collaboration, use our dedicated contact page."
                : "Connect with the researchers or raise a technical question through the right channel."}
            </p>
          </Reveal>
          <Reveal className="contact-cta-actions" delay={0.08}>
            <Link className="button button--paper" to="/contact">
              Contact us <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className="button button--ghost" href={site.issues} target="_blank" rel="noopener noreferrer">
              Open a GitHub issue <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section section--dark contact-hub" id={id} aria-labelledby={id + "-title"}>
        <div className="shell">
          <Reveal className="contact-hub-heading">
            <p className="eyebrow">How to reach us</p>
            <h2 className="display" id={id + "-title"}>Choose the right channel.</h2>
            <p className="lead">
              Research questions, technical feedback and academic enquiries have different
              starting points. Choose the option that fits your message.
            </p>
          </Reveal>
          <div className="contact-route-grid">
            <Reveal as="article" className="contact-route">
              <div className="contact-route-icon"><Github size={24} aria-hidden="true" /></div>
              <p className="contact-route-kicker">01 / Technical enquiries</p>
              <h3 className="serif-title">Code, methods &amp; results</h3>
              <p>For reproducibility, implementation questions and issues with research components, use the project repository.</p>
              <div className="button-row">
                <a className="button button--paper" href={site.issues} target="_blank" rel="noopener noreferrer">
                  Open an issue <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <a className="contact-route-link" href={site.repository} target="_blank" rel="noopener noreferrer">
                  View repository <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
            <Reveal as="article" className="contact-route" delay={0.08}>
              <div className="contact-route-icon"><GraduationCap size={24} aria-hidden="true" /></div>
              <p className="contact-route-kicker">02 / Academic enquiries</p>
              <h3 className="serif-title">Research &amp; collaboration</h3>
              <p>Reach the research team for project questions, or find supervisors through their institutional profiles.</p>
              <div className="button-row">
                <a className="button button--paper" href="#contact-compose">
                  Message the team <Mail size={17} aria-hidden="true" />
                </a>
                <Link className="contact-route-link" to="/team">
                  Meet the researchers <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="contact-affiliation">
            <Building2 size={23} aria-hidden="true" />
            <div>
              <strong>{site.institution}</strong>
              <span>{site.department} · {site.campus}</span>
            </div>
            <a href={site.institutionUrl} target="_blank" rel="noopener noreferrer">
              Institution website <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section contact-directory" aria-labelledby="contact-directory-title">
        <div className="shell">
          <Reveal className="contact-directory-heading">
            <p className="eyebrow">People &amp; supervision</p>
            <h2 className="display" id="contact-directory-title">Connect with the people behind the work.</h2>
            <p className="lead">The research team and supervisors, organised by responsibility.</p>
          </Reveal>
          <div className="contact-directory-grid">
            <Reveal className="contact-directory-panel">
              <h3 className="serif-title">Research team</h3>
              <p>Questions about individual components and implementation.</p>
              <ul className="contact-person-list">
                {team.map((person) => (
                  <li className="contact-person-row" key={person.id}>
                    <div className="contact-person-info">
                      <strong>{person.name}</strong>
                      <span>{person.component} · {person.role}</span>
                      {person.email && <a href={"mailto:" + person.email}>{person.email}</a>}
                    </div>
                    <a className="contact-person-action" href={person.github} target="_blank" rel="noopener noreferrer" aria-label={person.name + " on GitHub (opens in a new tab)"}>
                      <Github size={17} aria-hidden="true" /> GitHub
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="contact-directory-panel" delay={0.08}>
              <h3 className="serif-title">Academic &amp; clinical supervision</h3>
              <p>Official institutional profiles for academic correspondence.</p>
              <ul className="contact-person-list">
                {supervisors.map((person) => (
                  <li className="contact-person-row" key={person.name}>
                    <div className="contact-person-info">
                      <strong>{person.name}</strong>
                      <span>{person.role} · {person.affiliation}</span>
                    </div>
                    <a className="contact-person-action" href={person.profile} target="_blank" rel="noopener noreferrer" aria-label={person.name + " institutional profile (opens in a new tab)"}>
                      Profile <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--paper2 contact-compose" id="contact-compose" aria-labelledby="contact-compose-title">
        <div className="shell contact-compose-grid">
          <Reveal>
            <p className="eyebrow">Write to the team</p>
            <h2 className="display" id="contact-compose-title">Send a message.</h2>
            <p className="lead">
              Select a team member and send your message directly from this website, without opening an email app.
            </p>
            <p className="contact-form-explainer">
              When you press Send message, your enquiry is transmitted to our email delivery provider. Do not include sensitive patient information.
            </p>
            <p className="contact-note">
              Research information only, not clinical advice. In a crisis, contact local emergency services or a mental-health helpline.
            </p>
          </Reveal>
          <Reveal as="form" className="contact-form" onSubmit={submitEmail} delay={0.08}>
            <div className="contact-form-fields">
              <label className="contact-form-wide">
                Recipient
                <select value={recipient} onChange={(event) => setRecipient(event.target.value)} required>
                  {team.filter((person) => person.email).map((person) => (
                    <option key={person.id} value={person.email}>{person.name} · {person.component}</option>
                  ))}
                </select>
              </label>
              <label>
                Your name
                <input type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required />
              </label>
              <label>
                Your email
                <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>
              <label className="contact-form-wide">
                Subject
                <input type="text" value={subject} onChange={(event) => setSubject(event.target.value)} required />
              </label>
              <label className="contact-form-wide">
                Message
                <textarea rows={5} value={message} onChange={(event) => setMessage(event.target.value)} required />
              </label>
            </div>
            <TurnstileField siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY} onToken={setToken} resetCounter={resetChallenge} />
            {!isConfigured && (
              <p className="contact-feedback contact-feedback--error" role="alert">
                Direct email sending is not configured yet. Use the listed email addresses until it is enabled.
              </p>
            )}
            {feedback.text && (
              <p className={"contact-feedback contact-feedback--" + feedback.type} role={feedback.type === "error" ? "alert" : "status"} aria-live="polite">
                {feedback.text}
              </p>
            )}
            <button type="submit" className="button button--ink" disabled={busy || !isConfigured || !token}>
              {busy ? "Sending…" : "Send message"} <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
