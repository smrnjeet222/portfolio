"use client";

import { ExternalLink } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { GithubIcon } from "./SocialIcons";
import { useFadeUp } from "./useFadeUp";

const projects = [
  {
    filename: "oxbin.sh",
    title: "oxbin — Onchain Pastebin",
    readme: "Terminal-based decentralized pastebin and file-sharing app built at ETHGlobal New Delhi 2025. Focused on CLI-first UX for publishing and retrieving content through an onchain storage flow.",
    tags: ["featured", "hackathon", "onchain", "cli"],
    stack: ["Go", "Sui", "CLI", "Onchain Storage"],
    github: "https://github.com/smrnjeet222/oxbin",
    demo: "https://ethglobal.com/showcase/oxbin-wpmec",
    featured: true,
    highlights: [
      "Built for ETHGlobal New Delhi 2025",
      "CLI-style decentralized pastebin and file sharing",
      "Go service flow with Sui-backed onchain persistence",
    ],
  },
  {
    filename: "safu_pass.sh",
    title: "SAFU PASS — Onchain Password Manager",
    readme: "Hackathon-built onchain password manager using a React frontend, Solidity contracts, and subgraph indexing for user-facing encrypted credential flows.",
    tags: ["hackathon", "security", "subgraph", "web3"],
    stack: ["React", "Solidity", "Subgraph", "ethers.js"],
    github: "https://github.com/smrnjeet222/web3pass-ui",
    demo: "https://devfolio.co/projects/safu-passs-fa82",
    highlights: [
      "Built at ETHIndia 2023",
      "Onchain password-manager concept",
      "Indexed contract state into a frontend-friendly read model",
    ],
  },
  {
    filename: "grid1.sh",
    title: "Grid1 — Forkable NFT Builder",
    readme: "Forkable NFT collection builder deployed on Polygon mainnet. Built for ETHIndia 2022 and won The Graph ecosystem track prize.",
    tags: ["hackathon", "winner", "nft", "polygon"],
    stack: ["React", "Solidity", "Subgraph", "Polygon"],
    github: "https://github.com/smrnjeet222/PokeTrade",
    demo: "https://devfolio.co/projects/grid-47d5",
    highlights: [
      "ETHIndia 2022 The Graph ecosystem prize winner",
      "Forkable NFT collection builder deployed on Polygon mainnet",
      "Used subgraphs to power indexed NFT collection state",
    ],
  },
];

export default function Projects() {
  const ref = useFadeUp();

  return (
    <section id="projects" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div ref={ref} className="fade-up">
        <div className="section-heading">ls projects/</div>

        <div className="prompt-line" style={{ marginBottom: "28px" }}>
          <span className="prompt-user">jeet</span>
          <span className="prompt-sep">@</span>
          <span className="prompt-host">portfolio</span>
          <span className="prompt-sep">:~$</span>
          <span className="prompt-dollar" />
          <span className="prompt-command">
            ls projects/
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gridAutoRows: "1fr",
            alignItems: "stretch",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.filename} project={project} />
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <a
            href="https://github.com/smrnjeet222"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: "inline-flex" }}
          >
            <GithubIcon size={14} />
            git clone --all-projects → github.com/smrnjeet222
          </a>
        </div>
      </div>
    </section>
  );
}
