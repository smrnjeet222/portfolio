"use client";

import TerminalWindow from "./TerminalWindow";
import { useFadeUp } from "./useFadeUp";

const experiences = [
  {
    date: "Dec 2023 – Present",
    category: "Work",
    title: "Senior Software Engineer @ MON Co. / Pixelmon Labs (Remote, Singapore)",
    description:
      "Built MON token lifecycle end-to-end: presale contracts, backend orchestration, vesting/staking, launchpool campaigns, and cross-chain expansion via LayerZero/OFT. Architected Collect Shiny card marketplace with Seaport/OpenSea integration, AI-assisted inventory automation (MCP + RAG), and Morpho vault lending/borrowing dApps. Designed LexiumVault for RWA tokenization using ERC4626/ERC7540/ERC7575 async vault architecture.",
    tags: ["Next.js", "NestJS", "Solidity", "Ponder", "Morpho", "ethers.js", "PostgreSQL", "Redis", "AWS", "thirdweb"],
  },
  {
    date: "Jan 2023 – Dec 2023",
    category: "Work",
    title: "Senior Frontend Developer → Tech Lead @ PopSocial (Remote, Dubai)",
    description:
      "Built React Native SocialFi mobile product — profile, onboarding, and content feeds for Web2 users entering Web3. Promoted to lead Web3 + frontend efforts within 5 months, managing 4 engineers. Drove migration from third-party auth to in-house smart wallet/auth layer (Phinx). Integrated ENS-style identity, NFT contracts, marketplace, and walletconnect across EVM-compatible chains.",
    tags: ["React Native", "React", "TypeScript", "Solidity", "ethers.js", "Zustand", "React Query", "Subgraphs"],
  },
  {
    date: "Jul 2022 – Dec 2022",
    category: "Work",
    title: "Full Stack Developer @ Colexion (Delhi, India)",
    description:
      "Built Web2-to-Web3 bridge layers for NFT-enabled fantasy sports gameplay, implemented marketplace features (orders, bids, auctions) with Solidity + subgraph indexing, and moved backend persistence toward PostgreSQL + Sequelize.",
    tags: ["React", "TypeScript", "Node.js", "Solidity", "ethers.js", "The Graph", "PostgreSQL", "Tailwind"],
  },
  {
    date: "Jul 2021 – Jun 2022",
    category: "Work",
    title: "Full Stack Developer @ Cykura / Cyclos (Remote, India)",
    description:
      "Built V1 frontend from scratch for CycloSwap — concentrated liquidity AMM on Solana. Implemented wallet connection, swap/LP/position flows, and indexer-backed TVL/volume analytics APIs. Operated in high-ambiguity environment with immature early Solana tooling.",
    tags: ["React", "TypeScript", "Solana", "Rust", "Hasura", "Firebase", "Serum"],
  },
  {
    date: "2018 – 2022",
    category: "Education",
    title: "B.Tech CSE @ Guru Gobind Singh Indraprastha University (IPU) · CGPA 8.6",
    description:
      "Computer Science & Engineering degree from Delhi. Coursework: Data Structures (C/C++), Algorithms, DBMS, Operating Systems, Computer Networks, OOP. Additional: Python automation, Unity/Blender game development, early ML/data analysis exposure.",
    tags: ["C/C++", "Python", "DSA", "DBMS", "OS", "Networks", "Unity", "Blender"],
  },
];

const categoryColors: Record<string, string> = {
  Work: "var(--accent-green)",
  Project: "var(--accent-cyan)",
  Education: "var(--accent-purple)",
};

export default function Experiences() {
  const ref = useFadeUp();

  return (
    <section id="experiences" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div ref={ref} className="fade-up">
        <div className="section-heading">experiences.json</div>

        <TerminalWindow filename="experiences.json">
          <div className="prompt-line" style={{ marginBottom: "24px" }}>
            <span className="prompt-user">jeet</span>
            <span className="prompt-sep">@</span>
            <span className="prompt-host">portfolio</span>
            <span className="prompt-sep">:~$</span>
            <span className="prompt-dollar" />
            <span className="prompt-command">cat experiences.json</span>
          </div>

          <div style={{ position: "relative", paddingLeft: "40px" }}>
            <div className="timeline-line" />
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {experiences.map((exp, i) => {
                const color = categoryColors[exp.category] || "var(--accent-cyan)";
                return (
                  <div key={i} style={{ position: "relative" }}>
                    <div
                      className="timeline-dot"
                      style={{ position: "absolute", left: "-28px", top: "6px", background: color }}
                    />
                    <div
                      style={{
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "16px",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.borderColor = color)
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)")
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "8px",
                          flexWrap: "wrap",
                          gap: "8px",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px" }}>
                          <span
                            style={{
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              color,
                              background: `${color}18`,
                              border: `1px solid ${color}33`,
                            }}
                          >
                            {exp.category}
                          </span>
                          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                            {exp.title}
                          </span>
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                          {exp.date}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.65,
                          marginBottom: "12px",
                        }}
                      >
                        {exp.description}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {exp.tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
