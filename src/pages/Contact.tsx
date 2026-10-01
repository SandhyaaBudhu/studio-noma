import { useState } from "react";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
type Inquiry = {
  name: string;
  email: string;
  type: string;
  location: string;
  start: string;
  scope: string[];
  message: string;
};
const initial: Inquiry = {
  name: "",
  email: "",
  type: "",
  location: "",
  start: "",
  scope: [],
  message: "",
};
export default function Contact() {
  const [form, setForm] = useState<Inquiry>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  function update(name: keyof Inquiry, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (!form.type) next.type = "Choose a project type.";
    if (!form.location.trim()) next.location = "Where will your project be?";
    if (!form.start) next.start = "Select an expected start.";
    if (!form.scope.length) next.scope = "Select at least one service.";
    if (form.message.trim().length < 20)
      next.message = "Tell us a little more (at least 20 characters).";
    if (!consent) next.consent = "Please acknowledge the demo submission.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        document.getElementById(Object.keys(next)[0])?.focus(),
      );
      return;
    }
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const field = (
    id: keyof Inquiry,
    label: string,
    type = "text",
    placeholder = "",
  ) => (
    <div className={`form-field ${errors[id] ? "has-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        <span>*</span>
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={form[id] as string}
        placeholder={placeholder}
        autoComplete={id === "name" ? "name" : id === "email" ? "email" : "off"}
        onChange={(e) => update(id, e.target.value)}
        aria-required="true"
        aria-invalid={Boolean(errors[id])}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
      />
      {errors[id] && (
        <span className="field-error" id={`${id}-error`}>
          {errors[id]}
        </span>
      )}
    </div>
  );
  return (
    <div className="contact-page page-container">
      <div className="contact-heading">
        <span className="eyebrow">
          EVERY GOOD SPACE STARTS WITH A CONVERSATION.
        </span>
        <h1>
          What are you
          <br />
          <em>imagining?</em>
        </h1>
      </div>
      <div className="contact-grid">
        <aside className="contact-aside">
          <p>
            A home with more room for life.
            <br />A place to gather. A fresh perspective.
            <br />
            We’d love to hear your story.
          </p>
          <div>
            <span className="eyebrow">SAY HELLO</span>
            <a className="contact-email" href="mailto:hello@studionoma.example">
              hello@studionoma.example
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
            <span className="demo-note">Illustrative studio address</span>
          </div>
          <div>
            <span className="eyebrow">FIND OUR STUDIO</span>
            <p>
              Cape Town, South Africa
              <br />
              By appointment, in person or online.
            </p>
          </div>
          <div className="contact-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
            <i>
              GOOD THINGS
              <br />
              START HERE.
            </i>
            <ArrowUpRight aria-hidden="true" size={32} strokeWidth={1} />
          </div>
        </aside>
        <div className="contact-form-area">
          {sent ? (
            <div className="thank-you" role="status">
              <span className="thank-you-icon">
                <Check aria-hidden="true" size={28} />
              </span>
              <span className="eyebrow">A NEW BEGINNING</span>
              <h2>
                Thank you,
                <br />
                {form.name.split(" ")[0]}.
              </h2>
              <p>
                Your {form.type.toLowerCase()} project in {form.location} sounds
                like the start of something meaningful.
              </p>
              <div className="submission-details">
                <span>PROJECT OVERVIEW</span>
                <p>{form.scope.join(" + ")}</p>
                <p>Expected start: {form.start}</p>
              </div>
              <p className="demo-note">
                This is a portfolio demo. Your inquiry was validated locally; no
                message was sent and no personal information was stored.
              </p>
              <div className="thank-you-actions">
                <Link className="text-link" to="/projects">
                  Explore our work
                  <ArrowUpRight aria-hidden="true" size={18} />
                </Link>
                <button
                  className="text-link"
                  onClick={() => {
                    setSent(false);
                    setForm(initial);
                    setConsent(false);
                  }}
                >
                  Another idea?
                  <ArrowLeft aria-hidden="true" size={16} />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="form-heading">
                <h2>Tell us a little about your project.</h2>
                <span>* REQUIRED FIELDS</span>
              </div>
              <div className="form-row">
                {field("name", "Your name", "text", "Alex Smith")}
                {field("email", "Email address", "email", "alex@example.com")}
              </div>
              <div className="form-row">
                <div className={`form-field ${errors.type ? "has-error" : ""}`}>
                  <label htmlFor="type">
                    Project type<span>*</span>
                  </label>
                  <select
                    id="type"
                    value={form.type}
                    onChange={(e) => update("type", e.target.value)}
                    aria-required="true"
                    aria-invalid={Boolean(errors.type)}
                    aria-describedby={errors.type ? "type-error" : undefined}
                  >
                    <option value="">Select a project type</option>
                    {[
                      "Residential",
                      "Hospitality",
                      "Workplace",
                      "Retail",
                      "Something else",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  {errors.type && (
                    <span className="field-error" id="type-error">
                      {errors.type}
                    </span>
                  )}
                </div>
                {field("location", "Project location", "text", "City, country")}
              </div>
              <div className={`form-field ${errors.start ? "has-error" : ""}`}>
                <label htmlFor="start">
                  When would you like to start?<span>*</span>
                </label>
                <select
                  id="start"
                  value={form.start}
                  onChange={(e) => update("start", e.target.value)}
                  aria-required="true"
                  aria-invalid={Boolean(errors.start)}
                  aria-describedby={errors.start ? "start-error" : undefined}
                >
                  <option value="">Select a timeframe</option>
                  {[
                    "As soon as possible",
                    "Within 3 months",
                    "In 3–6 months",
                    "In 6–12 months",
                    "Just exploring",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {errors.start && (
                  <span className="field-error" id="start-error">
                    {errors.start}
                  </span>
                )}
              </div>
              <fieldset
                className="scope-field"
                aria-invalid={Boolean(errors.scope)}
                aria-describedby={errors.scope ? "scope-error" : undefined}
              >
                <legend>
                  How can we help? <span>*</span>
                </legend>
                <div>
                  {[
                    "Architecture",
                    "Interior design",
                    "Creative direction",
                  ].map((scope, i) => (
                    <label
                      key={scope}
                      className={form.scope.includes(scope) ? "checked" : ""}
                    >
                      <input
                        id={i === 0 ? "scope" : undefined}
                        type="checkbox"
                        checked={form.scope.includes(scope)}
                        onChange={() => {
                          setForm((prev) => ({
                            ...prev,
                            scope: prev.scope.includes(scope)
                              ? prev.scope.filter((s) => s !== scope)
                              : [...prev.scope, scope],
                          }));
                          setErrors((prev) => ({ ...prev, scope: "" }));
                        }}
                      />
                      <span className="custom-checkbox">
                        {form.scope.includes(scope) && (
                          <Check aria-hidden="true" size={12} />
                        )}
                      </span>
                      {scope}
                    </label>
                  ))}
                </div>
                {errors.scope && (
                  <span className="field-error" id="scope-error">
                    {errors.scope}
                  </span>
                )}
              </fieldset>
              <div
                className={`form-field ${errors.message ? "has-error" : ""}`}
              >
                <label htmlFor="message">
                  The story so far<span>*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  placeholder="Tell us about the place, the people, and the possibilities…"
                  onChange={(e) => update("message", e.target.value)}
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <span className="field-error" id="message-error">
                    {errors.message}
                  </span>
                )}
              </div>
              <div className="consent-area">
                <label>
                  <input
                    id="consent"
                    type="checkbox"
                    checked={consent}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={
                      errors.consent ? "consent-error" : undefined
                    }
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setErrors((prev) => ({ ...prev, consent: "" }));
                    }}
                  />
                  I understand this is a demo inquiry and no email will be sent.
                </label>
                {errors.consent && (
                  <span className="field-error" id="consent-error">
                    {errors.consent}
                  </span>
                )}
              </div>
              <button className="submit-button" type="submit">
                Let’s start a conversation
                <ArrowUpRight aria-hidden="true" size={21} />
              </button>
              <p className="form-footnote">
                A thoughtful space begins with a small step.
              </p>
            </form>
          )}
        </div>
      </div>
      <div className="contact-bottom">
        <span className="eyebrow">NOT SURE WHERE TO START?</span>
        <p>
          Have a look around. The right conversation often begins with a little
          inspiration.
        </p>
        <Link to="/projects" className="text-link">
          Explore our projects
          <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </div>
  );
}
