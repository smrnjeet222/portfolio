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
    filename: "nextflow.sh",
    title: "NextFlow — AI Workflow DAG Engine",
    readme: "Full-stack, real-time DAG-based AI workflow builder. Drag-and-drop canvas editor with concurrent graph execution and durable background runs that survive serverless timeouts.",
    tags: ["ai", "fullstack", "dag", "realtime"],
    stack: ["Next.js 16", "React 19", "React Flow", "Zustand", "Trigger.dev", "Prisma", "Neon"],
    github: "https://github.com/smrnjeet222/nextflow",
    demo: "https://nextflow.jeet22.xyz/sign-in",
    highlights: [
      "Canvas DAG editor: minimap, 50-state undo/redo, autosave, type-validated connections",
      "Concurrent execution via topological sort + per-node promise graph",
      "Durable Trigger.dev v4 runs with realtime status streaming",
      "Gemini API with multi-model fallbacks, multimodal inputs, FFmpeg image ops",
    ],
  },
  {
    filename: "grok_wiki.sh",
    title: "Grok-Wiki Viewer — Local-First Wiki Reader",
    readme: "Local-first, browser-based reader that turns Grok-Wiki JSON artifacts into a navigable wiki with Mermaid diagrams — offline, no account, no telemetry.",
    tags: ["devtools", "local-first", "open-source", "docs"],
    stack: ["React 19", "TanStack Router", "TanStack Query", "Bun", "Vite 6", "Mermaid"],
    github: "https://github.com/smrnjeet222/grok-wiki-viewer",
    demo: "https://grok-wiki-viewer.vercel.app",
    highlights: [
      "Two zero-config load paths: client-side parse + IndexedDB cache, or Bun server disk discovery",
      "Zoomable Mermaid rendering, paged/continuous reading modes, on-page TOC",
      "Fully client-side exports: Markdown, llms.txt, Obsidian vault ZIP, print/PDF",
      "Ships as static SPA, static + remote API, or self-hosted Docker image",
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
