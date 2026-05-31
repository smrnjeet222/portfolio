"use client";

import Image from "next/image";
import TerminalWindow from "./TerminalWindow";
import { useFadeUp } from "./useFadeUp";

const skillCategories = [
  {
    title: "AI Engineering",
    color: "var(--accent-purple)",
    skills: [
      "OpenAI", "Anthropic", "MCP", "RAG", "pgvector", "LangChain",
      "Agents", "Embeddings", "Evals", "Streaming", "Function Calling",
    ],
  },
  {
    title: "Product Frontend",
    color: "var(--accent-cyan)",
    skills: [
      "TypeScript", "React", "Next.js", "React Native", "Expo", "GraphQL",
      "TanStack", "Tailwind CSS", "shadcn/ui", "Zustand", "Playwright",
    ],
  },
  {
    title: "Backend & APIs",
    color: "var(--accent-green)",
    skills: [
      "Go", "Fiber", "gRPC", "Python", "FastAPI", "Node.js", "NestJS",
      "Fastify", "REST", "Drizzle", "WebSockets", "OpenTelemetry",
    ],
  },
  {
    title: "Data, Infra & Onchain",
    color: "var(--accent-yellow)",
    skills: [
      "PostgreSQL", "Redis", "Kafka", "ClickHouse", "AWS", "Docker",
      "Cloudflare", "Grafana", "Sentry", "Solidity", "EVM", "Subgraphs", "LayerZero",
    ],
  },
];

const bioParagraphs = [
  `Senior Software Engineer with 5+ years shipping production systems end-to-end —
product UI, backend services, data pipelines, AI tooling, and onchain protocols.
10+ products taken from 0→1, from solo founder builds to multi-engineer launches at scale.
Based in Delhi, India.`,
  `Currently building AI-powered marketplace tooling at Collect Shiny —
an MCP server + RAG search layer over a card inventory, with agent flows for buying and listing.
In parallel, own infra for the MON token ecosystem at Pixelmon Labs:
$30M+ presale, staking/vesting contracts, LayerZero cross-chain, and a Morpho-integrated lending product.`,
  `Previously Tech Lead at PopSocial (Dubai) — promoted within 5 months, led 4 engineers
through the launch of a SocialFi mobile app, NFT marketplace, and an in-house smart-wallet
auth layer (Phinx). Before that: shipped the first concentrated-liquidity AMM on Solana
(Cykura) and an NFT fantasy-sports product (Colexion).`,
  `ETHIndia 2022 prize winner (The Graph track). Open-source contributor to QuickSwap,
project-serum/swap-ui, and Polygon docs. Strong GitHub footprint across AI tooling,
developer infra, and product engineering.`,
];

export default function About() {
  const ref = useFadeUp();

  return (
    <section id="about" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div ref={ref} className="fade-up">
        <div className="section-heading">about_me.sh</div>

        <TerminalWindow filename="about_me.sh">
          <div className="prompt-line" style={{ marginBottom: "24px" }}>
            <span className="prompt-user">jeet</span>
            <span className="prompt-sep">@</span>
            <span className="prompt-host">portfolio</span>
            <span className="prompt-sep">:~$</span>
            <span className="prompt-dollar" />
            <span className="prompt-command">cat about.md</span>
          </div>

          {/* Outer 2-col: [photo card] | [bio + skills] */}
          <div
            style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "32px", alignItems: "start" }}
            className="about-outer-grid"
          >
            {/* ── Left: Profile photo card ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Photo */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid var(--border-color)",
                  background: "var(--bg-tertiary)",
                  boxShadow: "0 0 24px rgba(125,207,255,0.08)",
                }}
              >
                <Image
                  src="/simranjeet.jpg"
                  alt="Simranjeet Singh"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="220px"
                  priority
                />
              </div>

              {/* Name / title card */}
              <div
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--accent-cyan)", marginBottom: "2px" }}>
                  Simranjeet Singh
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--accent-green)", marginBottom: "8px" }}>
                  Senior Software Engineer
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {[
                    { icon: "📍", text: "Delhi, India" },
                    { icon: "🎓", text: "IPU · B.Tech CSE 2022" },
                    { icon: "💼", text: "MON Co. · Full-time" },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <span style={{ fontSize: "0.7rem" }}>{icon}</span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status badge */}
              <div
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderLeft: "3px solid var(--accent-green)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "var(--accent-green)",
                    animation: "blink 2s ease infinite",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "0.72rem", color: "var(--accent-green)" }}>
                  Open to opportunities
                </span>
              </div>
            </div>

            {/* ── Right: bio + skills ── */}
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent-cyan)", marginBottom: "4px" }}>
                # About Me
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
                # Senior Software Engineer · AI · Fullstack · Web3
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--accent-green)", marginBottom: "12px" }}>
                #!/bin/bash
              </div>

              {bioParagraphs.map((para, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "0.82rem",
                    marginBottom: "12px",
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                  }}
                >
                  {para}
                </p>
              ))}

              {/* Skills grid — 2 cols */}
              <div style={{ marginTop: "20px" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--accent-yellow)", marginBottom: "14px" }}>
                  $ ls skills/
                </div>
                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}
                  className="skills-grid"
                >
                  {skillCategories.map((cat) => (
                    <div key={cat.title}>
                      <div
                        style={{ fontSize: "0.78rem", color: cat.color, marginBottom: "8px", fontWeight: 600 }}
                      >
                        [{cat.title}]
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {cat.skills.map((skill) => (
                          <span key={skill} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-outer-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
