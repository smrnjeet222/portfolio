"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { CalendarDays, Mail, Phone, Copy, Check, ExternalLink, Send, Loader } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./SocialIcons";
import TerminalWindow from "./TerminalWindow";
import { useFadeUp } from "./useFadeUp";

const EMAIL = "smrnjeet.dev@gmail.com";
const EJS_SVC = "service_ssnouv4";
const EJS_TPL = "template_bransag";
const EJS_KEY = "v3f94cITaPgycX-08";

type FormState = "idle" | "sending" | "success" | "error";

const SOCIAL = [
  {
    Icon: GithubIcon,
    label: "GitHub",
    handle: "github.com/smrnjeet222",
    href: "https://github.com/smrnjeet222",
    color: "var(--text-primary)",
  },
  {
    Icon: LinkedinIcon,
    label: "LinkedIn",
    handle: "linkedin.com/in/smrnjeet222",
    href: "https://www.linkedin.com/in/smrnjeet222/",
    color: "var(--text-primary)",
  },
  {
    Icon: XIcon,
    label: "X / Twitter",
    handle: "@smrnjeet_22",
    href: "https://twitter.com/smrnjeet_22",
    color: "var(--text-primary)",
  },
  {
    Icon: Send,
    label: "Telegram",
    handle: "@smrnjeet_22",
    href: "https://t.me/smrnjeet_22",
    color: "var(--text-primary)",
  },
  {
    Icon: CalendarDays,
    label: "Book Call",
    handle: "cal.com/jeet22",
    href: "https://cal.com/jeet22",
    color: "var(--text-primary)",
  },
];

export default function Contact() {
  const ref = useFadeUp();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  // Initialize EmailJS once on mount
  useEffect(() => {
    emailjs.init({ publicKey: EJS_KEY });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "required";
    if (!form.email.trim()) e.email = "required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "invalid email";
    if (!form.message.trim()) e.message = "required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFormState("sending");
    try {
      const response = await emailjs.send(
        EJS_SVC,
        EJS_TPL,
        {
          from_name: form.name,
          from_email: form.email,
          name: form.name,
          email: form.email,
          subject: form.subject || "(no subject)",
          message: form.message,
          time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        },
      );
      console.log("EmailJS success:", response.status, response.text);
      setFormState("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      const ejs = err as { status?: number; text?: string };
      console.error("EmailJS error:", ejs.status, ejs.text, JSON.stringify(err));
      setFormState("error");
    }
  };

  return (
    <section
      id="contact"
      style={{ padding: "80px 24px 120px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div ref={ref} className="fade-up">
        <div className="section-heading">contact.sh</div>

        <TerminalWindow filename="contact.sh">
          <div className="prompt-line" style={{ marginBottom: "24px" }}>
            <span className="prompt-user">jeet</span>
            <span className="prompt-sep">@</span>
            <span className="prompt-host">portfolio</span>
            <span className="prompt-sep">:~$</span>
            <span className="prompt-dollar" />
            <span className="prompt-command">./contact.sh --interactive</span>
          </div>

          {/* ── Row 1: info cards + form ── */}
          <div
            className="contact-top"
            style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "28px", marginBottom: "28px" }}
          >
            {/* Left: contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div className="comment" style={{ marginBottom: "4px" }}>
                # Get in touch
              </div>

              {/* Email */}
              <div
                style={{
                  background: "var(--bg-tertiary)", border: "1px solid var(--border-color)",
                  borderRadius: "8px", padding: "12px 14px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Mail size={13} style={{ color: "var(--accent-cyan)" }} />
                  <div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>Email</div>
                    <a
                      href={`mailto:${EMAIL}`}
                      style={{ fontSize: "0.8rem", color: "var(--text-primary)", textDecoration: "none" }}
                    >
                      {EMAIL}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: copied ? "var(--accent-green)" : "var(--text-secondary)",
                    transition: "color 0.2s", display: "flex", alignItems: "center",
                  }}
                  aria-label="Copy email"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>

              {/* Phone */}
              <div
                style={{
                  background: "var(--bg-tertiary)", border: "1px solid var(--border-color)",
                  borderRadius: "8px", padding: "12px 14px",
                  display: "flex", alignItems: "center", gap: "10px",
                }}
              >
                <Phone size={13} style={{ color: "var(--accent-green)" }} />
                <div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>Phone</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-primary)" }}>@smrnjeet_22 (Telegram)</div>
                </div>
              </div>

              {/* Book a call */}
              <a
                href="https://cal.com/jeet22"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "var(--bg-tertiary)", border: "1px solid var(--border-color)",
                  borderRadius: "8px", padding: "12px 14px",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px",
                  textDecoration: "none", transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-cyan)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(125,207,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                  (e.currentTarget as HTMLElement).style.background = "var(--bg-tertiary)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CalendarDays size={13} style={{ color: "var(--accent-cyan)" }} />
                  <div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>Book a call</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-primary)" }}>cal.com/jeet22</div>
                  </div>
                </div>
                <ExternalLink size={12} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
              </a>

              {/* Availability */}
              <div
                style={{
                  padding: "12px 14px", background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)", borderRadius: "8px",
                  borderLeft: "3px solid var(--accent-green)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                  <div
                    style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: "var(--accent-green)", animation: "blink 2s ease infinite",
                    }}
                  />
                  <span style={{ fontSize: "0.78rem", color: "var(--accent-green)", fontWeight: 600 }}>
                    Available for opportunities
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                  Open to full-time roles &amp; collaborations
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <div style={{ fontSize: "0.78rem", color: "var(--accent-yellow)", marginBottom: "12px" }}>
                $ ./send-message.sh
              </div>

              {formState === "success" ? (
                <div
                  style={{
                    background: "var(--bg-tertiary)", border: "1px solid var(--accent-green)",
                    borderRadius: "8px", padding: "24px",
                  }}
                >
                  <div style={{ fontSize: "0.82rem", color: "var(--accent-green)", marginBottom: "8px", fontWeight: 700 }}>
                    ✓ Message sent successfully
                  </div>
                  <div className="comment" style={{ marginBottom: "16px" }}>
                    # I&apos;ll get back to you as soon as possible
                  </div>
                  <div style={{ fontFamily: "inherit", fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    <span style={{ color: "var(--accent-green)" }}>jeet</span>
                    <span style={{ color: "var(--accent-green)" }}>@portfolio:~$ </span>
                    <span style={{ color: "var(--text-primary)" }}>echo &quot;Thanks for reaching out!&quot;</span>
                    <br />
                    <span style={{ color: "var(--accent-cyan)" }}>Thanks for reaching out!</span>
                  </div>
                  <button
                    onClick={() => setFormState("idle")}
                    style={{
                      marginTop: "16px", background: "none",
                      border: "1px solid var(--border-color)", borderRadius: "6px",
                      padding: "6px 14px", fontSize: "0.75rem", color: "var(--text-secondary)",
                      cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-cyan)";
                      (e.currentTarget as HTMLElement).style.color = "var(--accent-cyan)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    }}
                  >
                    $ send --new
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <FormField
                      prompt="from_name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      error={errors.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                      onFocus={() => setErrors((e) => ({ ...e, name: undefined }))}
                    />
                    <FormField
                      prompt="from_email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      error={errors.email}
                      onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                      onFocus={() => setErrors((e) => ({ ...e, email: undefined }))}
                    />
                    <FormField
                      prompt="subject"
                      type="text"
                      placeholder="What's this about? (optional)"
                      value={form.subject}
                      onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                    />

                    {/* Message textarea */}
                    <div>
                      <div
                        style={{
                          display: "flex", alignItems: "flex-start", gap: "8px",
                          background: "var(--bg-primary)",
                          border: `1px solid ${errors.message ? "var(--accent-red)" : "var(--border-color)"}`,
                          borderRadius: "6px", padding: "10px 12px", transition: "border-color 0.2s",
                        }}
                        onFocusCapture={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-cyan)";
                          setErrors((er) => ({ ...er, message: undefined }));
                        }}
                        onBlurCapture={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor =
                            errors.message ? "var(--accent-red)" : "var(--border-color)";
                        }}
                      >
                        <span style={{ fontSize: "0.78rem", color: "var(--accent-green)", flexShrink: 0, paddingTop: "1px" }}>
                          &gt; message:
                        </span>
                        <textarea
                          placeholder="Your message..."
                          rows={3}
                          value={form.message}
                          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                          style={{
                            flex: 1, background: "none", border: "none", outline: "none",
                            color: "var(--text-primary)", fontFamily: "inherit",
                            fontSize: "0.82rem", resize: "vertical", lineHeight: 1.6,
                          }}
                        />
                      </div>
                      {errors.message && (
                        <div style={{ fontSize: "0.68rem", color: "var(--accent-red)", marginTop: "3px", paddingLeft: "4px" }}>
                          # error: message {errors.message}
                        </div>
                      )}
                    </div>

                    {formState === "error" && (
                      <div
                        style={{
                          padding: "10px 14px", background: "rgba(248,81,73,0.08)",
                          border: "1px solid var(--accent-red)", borderRadius: "6px",
                          fontSize: "0.78rem", color: "var(--accent-red)",
                        }}
                      >
                        ✗ Error: Failed to send. Check your connection and try again.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      style={{
                        marginTop: "2px", width: "100%",
                        background: formState === "sending" ? "rgba(125,207,255,0.05)" : "rgba(125,207,255,0.1)",
                        border: "1px solid var(--accent-cyan)", color: "var(--accent-cyan)",
                        borderRadius: "6px", padding: "10px 20px", fontFamily: "inherit",
                        fontSize: "0.85rem", cursor: formState === "sending" ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        transition: "background 0.2s, box-shadow 0.2s",
                        opacity: formState === "sending" ? 0.7 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (formState !== "sending") {
                          (e.currentTarget as HTMLElement).style.background = "rgba(125,207,255,0.2)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(125,207,255,0.2)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(125,207,255,0.1)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {formState === "sending" ? (
                        <><Loader size={14} style={{ animation: "spin 1s linear infinite" }} />Sending...</>
                      ) : (
                        <><Send size={14} />$ send-message --execute</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ── Row 2: social links (full width) ── */}
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "20px" }}>
            <div style={{ fontSize: "0.78rem", color: "var(--accent-yellow)", marginBottom: "12px" }}>
              $ ls social/
            </div>
            <div className="social-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
              {SOCIAL.map(({ Icon, label, handle, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "var(--bg-tertiary)", border: "1px solid var(--border-color)",
                    borderRadius: "8px", padding: "12px",
                    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px",
                    textDecoration: "none", transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = color;
                    (e.currentTarget as HTMLElement).style.background = `${color}10`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-tertiary)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                    <Icon size={14} style={{ color }} />
                    <ExternalLink size={10} style={{ color: "var(--text-secondary)" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "140px" }}>
                      {handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </TerminalWindow>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-top { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .social-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .social-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

function FormField({
  prompt, type, placeholder, value, error, onChange, onFocus,
}: {
  prompt: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onFocus?: () => void;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "var(--bg-primary)",
          border: `1px solid ${error ? "var(--accent-red)" : "var(--border-color)"}`,
          borderRadius: "6px", padding: "9px 12px", transition: "border-color 0.2s",
        }}
        onFocusCapture={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-cyan)";
          onFocus?.();
        }}
        onBlurCapture={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            error ? "var(--accent-red)" : "var(--border-color)";
        }}
      >
        <span style={{ fontSize: "0.78rem", color: "var(--accent-green)", flexShrink: 0, whiteSpace: "nowrap" }}>
          &gt; {prompt}:
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            color: "var(--text-primary)", fontFamily: "inherit", fontSize: "0.82rem",
          }}
        />
      </div>
      {error && (
        <div style={{ fontSize: "0.68rem", color: "var(--accent-red)", marginTop: "3px", paddingLeft: "4px" }}>
          # error: {prompt} {error}
        </div>
      )}
    </div>
  );
}
