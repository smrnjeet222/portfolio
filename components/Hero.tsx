"use client";

import { useState, useEffect } from "react";
import { Download, ChevronRight } from "lucide-react";
import TerminalWindow from "./TerminalWindow";

const fullCommand = "jeet@portfolio:~$ whoami";

const PROMPT_SEGMENTS = [
  { text: "jeet",      color: "var(--accent-cyan)" },
  { text: "@",         color: "var(--text-secondary)" },
  { text: "portfolio", color: "var(--accent-green)" },
  { text: ":~$",       color: "var(--text-secondary)" },
  { text: " whoami",   color: "var(--text-primary)" },
];

function ColoredPrompt({ typed, showCursor }: { typed: string; showCursor: boolean }) {
  let remaining = typed;
  const parts: React.ReactNode[] = [];
  for (const seg of PROMPT_SEGMENTS) {
    if (!remaining) break;
    const slice = remaining.slice(0, seg.text.length);
    parts.push(<span key={seg.text} style={{ color: seg.color }}>{slice}</span>);
    remaining = remaining.slice(seg.text.length);
    if (slice.length < seg.text.length) break;
  }
  return (
    <span style={{ fontFamily: "inherit", fontSize: "0.9rem" }}>
      {parts}
      {showCursor && <span className="cursor-blink" style={{ color: "var(--accent-cyan)" }}>█</span>}
    </span>
  );
}

const specializations = [
  "Full-Stack Development (React, Next.js, React Native)",
  "Backend APIs (Go, Node.js, NestJS)",
  "Smart Contracts (Solidity, EVM, Solana/Anchor)",
  "DeFi Protocols (AMM, Uniswap, NFTs, Morpho, RWA)",
  "Event-Driven Systems (Subgraphs, Ponder, Kafka)",
  "Cloud & DevOps (AWS, Docker, CI/CD)",
  "AI-Assisted Automation (MCP, RAG, LLM pipelines)",
  "Web3 Auth & Wallets (thirdweb, Account Abstraction, Pimlico)",
];

const techStack = [
  "TypeScript", "React", "Next.js", "React Native", "Node.js", "Go",
  "Solidity", "PostgreSQL", "Redis", "AWS", "Docker",
];

const stats = [
  "5+ yrs · 10+ products. shipped across Web2 & Web3",
  "Tech Lead @ PopSocial — 4 engineers · SocialFi w/ ENS & NFTs",
  "Proof-of-Activity Protocol → $1M AVAX grant for Pixelmon",
  "MON ecosystem: $30M presale · staking · vesting · + OFT",
  "ETHIndia 2022 Winner — The Graph ecosystem prize",
  "Morpho vaults lending/borrowing dApp for MON ecosystem",
  "LexiumVault: ERC7540 async litigation RWA vault",
];

const featuredProjects = [
  "Collect Shiny — card marketplace + AI inventory (MCP + RAG)",
  "CycloSwap — 1st concentrated liquidity AMM on Solana",
  "MonID — unified auth & smart wallet identity layer",
];

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [visibleSpecs, setVisibleSpecs] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullCommand.length) {
        setTyped(fullCommand.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowOutput(true);
          setTimeout(() => {
            setShowSpecs(true);
          }, 400);
        }, 300);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showSpecs) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < specializations.length) {
        setVisibleSpecs((v) => v + 1);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [showSpecs]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px 24px 60px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          width: "100%",
          alignItems: "start",
        }}
        className="hero-grid"
      >
        {/* Left: Main terminal */}
        <div>
          <TerminalWindow filename="portfolio.sh">
            {/* Typing prompt */}
            <div style={{ marginBottom: "16px" }}>
              <ColoredPrompt typed={typed} showCursor={!showOutput} />
            </div>

            {showOutput && (
              <div style={{ animation: "fadeUp 0.4s ease forwards" }}>
                {/* Name + title */}
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "var(--accent-cyan)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.2,
                    }}
                  >
                    Simranjeet Singh
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "var(--accent-green)",
                      marginTop: "4px",
                    }}
                  >
                    Senior Software Engineer · Web3 / Fullstack
                  </div>
                </div>

                {/* Specializations */}
                {showSpecs && (
                  <div>
                    <div className="comment" style={{ marginBottom: "8px" }}>
                      # Specializing in:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {specializations.slice(0, visibleSpecs).map((s, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            animation: "fadeUp 0.3s ease forwards",
                          }}
                        >
                          <ChevronRight
                            size={12}
                            style={{ color: "var(--accent-green)", flexShrink: 0 }}
                          />
                          <span style={{ color: "var(--text-primary)", fontSize: "0.85rem" }}>
                            {s}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech stack */}
                {visibleSpecs === specializations.length && (
                  <div style={{ marginTop: "24px", animation: "fadeUp 0.4s ease forwards" }}>
                    <div className="comment" style={{ marginBottom: "10px" }}>
                      $ ls -la tech_stack/
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {techStack.map((tech) => (
                        <span key={tech} className="skill-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA buttons */}
                {visibleSpecs === specializations.length && (
                  <div
                    style={{
                      marginTop: "28px",
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                      animation: "fadeUp 0.5s ease forwards",
                    }}
                  >
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="btn-primary"
                    >
                      <ChevronRight size={14} style={{ marginLeft: "-8px" }}/>
                      ./contact_me
                    </a>
                    <a
                      href="/simranjeet_resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <Download size={14} />
                      wget resume.pdf
                    </a>
                  </div>
                )}
              </div>
            )}
          </TerminalWindow>
        </div>

        {/* Right: Info card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TerminalWindow filename="smrnjeet@distro">
            <div className="prompt-line">
              <span className="prompt-user">jeet</span>
              <span className="prompt-sep">@</span>
              <span className="prompt-host">portfolio</span>
              <span className="prompt-sep">:~$</span>
              <span className="prompt-dollar" />
              <span className="prompt-command">cat impact.md</span>
            </div>

            <div style={{ marginBottom: "16px" }}>
              {stats.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    marginBottom: "6px",
                    fontSize: "0.82rem",
                    color: "var(--text-primary)",
                  }}
                >
                  <span style={{ color: "var(--accent-green)", flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid var(--border-color)",
                paddingTop: "12px",
                marginTop: "4px",
              }}
            >
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--accent-yellow)",
                  marginBottom: "8px",
                }}
              >
                📝 Featured Projects
              </div>
              {featuredProjects.map((p) => (
                <div
                  key={p}
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    marginBottom: "4px",
                    paddingLeft: "8px",
                    borderLeft: "2px solid var(--border-color)",
                  }}
                >
                  • {p}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "12px", fontSize: "0.78rem", color: "var(--accent-cyan)" }}>
              jeet22.xyz
            </div>
          </TerminalWindow>

          {/* Quick stat badges */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { label: "Years Experience", value: "5+" },
              { label: "Products Shipped", value: "10+" },
              { label: "ETHIndia", value: "Winner" },
              { label: "Blockchains", value: "8+" },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent-cyan)" }}>
                  {value}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
