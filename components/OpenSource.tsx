"use client";

import { ExternalLink } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import { useFadeUp } from "./useFadeUp";

type Contribution = {
  title: string;
  url: string;
  date: string;
  source: string;
  description: string;
  points?: string[];
  tags: string[];
};

const contributions: Contribution[] = [
  {
    title: "QuickSwap / interface-v2",
    url: "https://github.com/QuickSwap/interface-v2/pulls?q=is%3Apr+author%3Asmrnjeet222",
    date: "2022-2023",
    source: "GitHub PRs",
    description:
      "DEX frontend contributions across Polygon DeFi interface work, with UI and interaction improvements for swap, liquidity, and portfolio surfaces.",
    points: [
      "Contributed to QuickSwap's V2 DEX interface in the Polygon ecosystem.",
      "Worked on frontend improvements around swap, liquidity, and portfolio interaction surfaces.",
      "Adapted production DeFi UI patterns for clearer user flows and protocol interactions.",
    ],
    tags: ["open-source", "defi", "dex", "polygon"],
  },
  {
    title: "project-serum / swap-ui",
    url: "https://github.com/project-serum/swap-ui/pulls?q=is%3Apr+author%3Asmrnjeet222",
    date: "2021",
    source: "GitHub PRs",
    description:
      "Swap UI contributions in the Solana ecosystem during early DeFi tooling work connected to Cykura and CycloSwap.",
    points: [
      "Contributed to Project Serum's swap UI during early Solana DeFi ecosystem development.",
      "Worked with Serum/orderbook-aware DeFi flows and wallet-driven transaction UX.",
      "Applied Solana swap UI patterns back into Cykura and CycloSwap product work.",
    ],
    tags: ["open-source", "solana", "defi", "serum"],
  },
  {
    title: "cykura / webapp-v2",
    url: "https://github.com/cykura/webapp-v2",
    date: "2021",
    source: "GitHub Repo",
    description:
      "Public repository for concentrated-liquidity AMM work on Solana, including CycloSwap-era frontend, DeFi, and supporting infrastructure.",
    points: [
      "Built major parts of the CycloSwap V1 frontend from scratch.",
      "Implemented Solana wallet connection, swap, LP deposit, liquidity management, and position-centric UX.",
      "Built indexer-backed APIs and read models for TVL, volume, and position analytics.",
    ],
    tags: ["open-source", "amm", "solana", "defi"],
  },
];

export default function OpenSource() {
  const ref = useFadeUp();

  return (
    <section id="open-source" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div ref={ref} className="fade-up">
        <div className="section-heading">ls open_source/</div>

        <TerminalWindow filename="open_source.md">
          <div className="prompt-line" style={{ marginBottom: "24px" }}>
            <span className="prompt-user">jeet</span>
            <span className="prompt-sep">@</span>
            <span className="prompt-host">portfolio</span>
            <span className="prompt-sep">:~$</span>
            <span className="prompt-dollar" />
            <span className="prompt-command">
              cat open_source.md &nbsp;
              <span style={{ color: "var(--text-secondary)" }}>
                # {contributions.length} public signals · github.com/smrnjeet222
              </span>
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {contributions.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    padding: "16px",
                    transition: "border-color 0.2s, background 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-cyan)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(125,207,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-tertiary)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: 700,
                        color: "var(--accent-cyan)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.title}
                    </span>
                    <ExternalLink
                      size={13}
                      style={{ color: "var(--text-secondary)", flexShrink: 0, marginTop: "2px" }}
                    />
                  </div>

                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                      marginBottom: item.points ? "6px" : "12px",
                    }}
                  >
                    {item.description}
                  </p>

                  {item.points && (
                    <ul
                      style={{
                        margin: "0 0 12px",
                        paddingLeft: "20px",
                        color: "var(--text-secondary)",
                        fontSize: "0.78rem",
                        lineHeight: 1.6,
                        listStyleType: "disc",
                        listStylePosition: "outside",
                      }}
                    >
                      {item.points.map((point) => (
                        <li key={point} style={{ paddingLeft: "2px" }}>{point}</li>
                      ))}
                    </ul>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {item.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "0.72rem",
                        color: "var(--text-secondary)",
                        flexShrink: 0,
                      }}
                    >
                      <span>{item.date}</span>
                      <span style={{ color: "var(--border-color)" }}>·</span>
                      <span>{item.source}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <a
              href="https://github.com/smrnjeet222"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: "inline-flex" }}
            >
              <ExternalLink size={14} />
              open github.com/smrnjeet222
            </a>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
