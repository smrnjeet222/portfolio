"use client";

import { ExternalLink } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import { useFadeUp } from "./useFadeUp";

const impactStats = [
  { label: "MON Presale Deposits",        value: "$30M+", color: "var(--accent-cyan)" },
  { label: "AVAX Grant (Pixelmon)",        value: "$1M",   color: "var(--accent-green)" },
  { label: "Years Production Experience", value: "5+",    color: "var(--accent-yellow)" },
  { label: "Products / Systems Shipped",  value: "10+",   color: "var(--accent-orange)" },
  { label: "Blockchain build upon",        value: "8+",    color: "var(--accent-purple)" },
  { label: "Engineers Led",               value: "4",     color: "var(--accent-cyan)" },
];

const achievements = [
  // {
  //   icon: "🎯",
  //   title: "Proof-of-Activity Protocol → $1M AVAX Grant",
  //   sub: "Pixelmon · Avalanche Foundation · 2024",
  //   href: undefined as string | undefined,
  //   linkLabel: undefined as string | undefined,
  //   color: "var(--accent-green)",
  // },
  // {
  //   icon: "💰",
  //   title: "MON Token Launch — $30M+ in Deposits",
  //   sub: "Presale · Staking · Vesting · OFT · MON Co.",
  //   href: "https://www.monprotocol.ai/",
  //   linkLabel: "Visit Site",
  //   color: "var(--accent-cyan)",
  // },
  {
    icon: "🌊",
    title: "Cykura — 1st Concentrated Liquidity AMM on Solana",
    sub: "V1 Frontend from scratch · Cykura · 2021–2022",
    href: "https://github.com/cykura",
    linkLabel: "github",
    color: "var(--accent-purple)",
  },
  // {
  //   icon: "⚡",
  //   title: "LexiumVault — ERC7540 Async RWA Vault",
  //   sub: "ERC4626 / ERC7540 / ERC7575 · MON Co.",
  //   href: undefined as string | undefined,
  //   linkLabel: undefined as string | undefined,
  //   color: "var(--accent-orange)",
  // },
  {
    icon: "🚀",
    title: "Tech Lead @ PopSocial — Promoted in 5 Months",
    sub: "Led 4 Engineers · SocialFi · ENS + NFT Marketplace",
    href: undefined as string | undefined,
    linkLabel: undefined as string | undefined,
    color: "var(--accent-cyan)",
  },
  {
    icon: "🏆",
    title: "ETHIndia Winner — The Graph Ecosystem Track",
    sub: "ETH Global · 2022",
    href: "https://ethglobal.com/showcase/grid1-503sy",
    linkLabel: "View Project",
    color: "var(--accent-yellow)",
  },
];

export default function Achievements() {
  const ref = useFadeUp();

  return (
    <section id="achievements" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div ref={ref} className="fade-up">
        <div className="section-heading">cat achievements.json</div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
          className="achievements-grid"
        >
          {/* Column 1: Impact Stats */}
          <TerminalWindow filename="stats.json">
            <div className="prompt-line" style={{ marginBottom: "16px" }}>
              <span className="prompt-user">jeet</span>
              <span className="prompt-sep">@</span>
              <span className="prompt-host">portfolio</span>
              <span className="prompt-sep">:~$</span>
              <span className="prompt-dollar" />
              <span className="prompt-command">cat stats.json</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {impactStats.map(({ label, value, color }) => (
                <div
                  key={label}
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                    {label}
                  </span>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </TerminalWindow>

          {/* Column 2: GitHub Activity */}
          <TerminalWindow filename="github_activity.sh">
            <div className="prompt-line" style={{ marginBottom: "16px" }}>
              <span className="prompt-user">jeet</span>
              <span className="prompt-sep">@</span>
              <span className="prompt-host">portfolio</span>
              <span className="prompt-sep">:~$</span>
              <span className="prompt-dollar" />
              <span className="prompt-command">open git_stats</span>
            </div>

            <a
              href="https://github.com/smrnjeet222"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ marginBottom: "16px", width: "100%", justifyContent: "center", fontSize: "0.78rem" }}
            >
              <ExternalLink size={12} />
              View GitHub →
            </a>

            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                marginBottom: "16px",
                overflow: "hidden",
                height: "100px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ghchart.rshah.org/822300/smrnjeet222"
                alt="GitHub Contribution Graph"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "100% 0%",
                  display: "block",
                  filter: "invert(1) saturate(1.2) brightness(0.85)",
                  mixBlendMode: "screen",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { label: "Active Since",  value: "2019",       color: "var(--accent-green)" },
                { label: "Top Language",  value: "TypeScript", color: "var(--accent-cyan)" },
                { label: "Commits",       value: "5,000+",     color: "var(--accent-yellow)" },
                { label: "Pull Requests", value: "180+",       color: "var(--accent-purple)" },
                { label: "Repositories",  value: "40+",        color: "var(--accent-orange)" },
                { label: "Code Reviews",  value: "300+",       color: "var(--accent-cyan)" },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "6px",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color }}>{value}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>{label}</div>
                </div>
              ))}
            </div>
          </TerminalWindow>

          {/* Column 3: Achievements */}
          <TerminalWindow filename="achievements.json">
            <div className="prompt-line" style={{ marginBottom: "16px" }}>
              <span className="prompt-user">jeet</span>
              <span className="prompt-sep">@</span>
              <span className="prompt-host">portfolio</span>
              <span className="prompt-sep">:~$</span>
              <span className="prompt-dollar" />
              <span className="prompt-command">ls achievements/</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {achievements.map((a, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    padding: "12px",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = a.color)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)")
                  }
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ fontSize: "1rem", flexShrink: 0 }}>{a.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-primary)",
                          fontWeight: 600,
                          marginBottom: "2px",
                        }}
                      >
                        {a.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--text-secondary)",
                          marginBottom: a.href ? "6px" : "0",
                        }}
                      >
                        {a.sub}
                      </div>
                      {a.href && (
                        <a
                          href={a.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "0.68rem",
                            color: a.color,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          <ExternalLink size={10} />
                          {a.linkLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TerminalWindow>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .achievements-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .achievements-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
