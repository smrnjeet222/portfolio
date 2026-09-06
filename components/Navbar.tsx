"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./SocialIcons";

const navItems = [
  { label: "cd home", terminal: "cd home", href: "#hero" },
  { label: "cat about.md", terminal: "cat about.md", href: "#about" },
  { label: "ls experiences/", terminal: "ls experiences/", href: "#experiences" },
  { label: "ls projects/", terminal: "ls projects/", href: "#projects" },
  { label: "cat achievements.json", terminal: "cat achievements.json", href: "#achievements" },
  { label: "ls open_source/", terminal: "ls open_source/", href: "#open-source" },
  { label: "mail contact", terminal: "mail contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Delayed start and extended travel: only begins fading after 200px, gently completing around 460px
          const startScroll = 200;
          const endScroll = 460;
          const raw = Math.min(1, Math.max(0, (window.scrollY - startScroll) / (endScroll - startScroll)));
          const p = raw * raw * (3 - 2 * raw); // smoothstep curve
          setScrollProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const progress = menuOpen ? 1 : scrollProgress;

  return (
    <nav
      className="navbar"
      style={{
        background: `rgba(13, 17, 23, ${(progress * 0.72).toFixed(3)})`,
        backdropFilter: progress > 0.02 ? `blur(${(progress * 16).toFixed(1)}px)` : "none",
        WebkitBackdropFilter: progress > 0.02 ? `blur(${(progress * 16).toFixed(1)}px)` : "none",
        borderBottom: `1px solid rgba(48, 54, 61, ${(progress * 0.6).toFixed(3)})`,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
          style={{
            color: "var(--accent-green)",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "var(--accent-cyan)" }}>jeet</span>
          <span style={{ color: "var(--text-secondary)" }}>@</span>
          <span style={{ color: "var(--accent-green)" }}>portfolio</span>
          <span style={{ color: "var(--text-secondary)" }}>:~$</span>
        </a>

        {/* Desktop nav */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            opacity: progress,
            pointerEvents: progress > 0.6 ? "auto" : "none",
            transform: `translateY(${((1 - progress) * -8).toFixed(1)}px)`,
            transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "0.72rem",
                  textDecoration: "none",
                  color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                  background: isActive ? "rgba(125,207,255,0.08)" : "transparent",
                  border: isActive ? "1px solid rgba(125,207,255,0.2)" : "1px solid transparent",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.color = "var(--text-secondary)";
                  }
                }}
              >
                {item.terminal}
              </a>
            );
          })}
        </div>

        {/* Social icons + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="social-icons" style={{ display: "flex", gap: "8px" }}>
            {[
              { Icon: GithubIcon, href: "https://github.com/smrnjeet222", label: "GitHub" },
              { Icon: LinkedinIcon, href: "https://www.linkedin.com/in/smrnjeet222/", label: "LinkedIn" },
              { Icon: XIcon, href: "https://twitter.com/smrnjeet_22", label: "X / Twitter" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--accent-cyan)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
                }
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "4px",
              display: "none",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(13, 17, 23, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(48, 54, 61, 0.6)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
              style={{
                padding: "10px 12px",
                borderRadius: "6px",
                fontSize: "0.875rem",
                textDecoration: "none",
                color: "var(--text-secondary)",
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-color)",
              }}
            >
              <span style={{ color: "var(--terminal-prompt)" }}>$ </span>
              {item.terminal}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 1180px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (max-width: 640px) {
          .social-icons { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
