"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import TerminalWindow from "./TerminalWindow";

interface Project {
  filename: string;
  title: string;
  readme: string;
  tags: string[];
  stack: string[];
  github: string;
  demo?: string;
  featured?: boolean;
  highlights?: string[];
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card">
      <TerminalWindow filename={project.filename} className="project-terminal">
        {/* Title row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "12px",
          }}
        >
          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--accent-cyan)" }}>
            {project.title}
          </div>
          {project.featured && (
            <span
              style={{
                fontSize: "0.68rem",
                color: "var(--accent-yellow)",
                background: "rgba(227,179,65,0.1)",
                border: "1px solid rgba(227,179,65,0.3)",
                borderRadius: "4px",
                padding: "2px 7px",
                flexShrink: 0,
              }}
            >
              ⭐ FEATURED
            </span>
          )}
        </div>

        {/* cat README.md */}
        <div className="comment" style={{ fontSize: "0.72rem", marginBottom: "4px" }}>
          $ cat README.md
        </div>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-primary)",
            lineHeight: 1.6,
            marginBottom: "14px",
          }}
        >
          {project.readme}
        </p>

        {/* ls tags/ */}
        <div className="comment" style={{ fontSize: "0.72rem", marginBottom: "6px" }}>
          $ ls tags/
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* file --mime-type */}
        <div className="comment" style={{ fontSize: "0.72rem", marginBottom: "6px" }}>
          $ file --mime-type *
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
          {project.stack.map((s) => (
            <span
              key={s}
              style={{
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "0.72rem",
                background: "rgba(125,207,255,0.08)",
                border: "1px solid rgba(125,207,255,0.2)",
                color: "var(--accent-cyan)",
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div style={{ marginBottom: "14px" }}>
            {project.highlights.map((h) => (
              <div
                key={h}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  paddingLeft: "12px",
                  borderLeft: "2px solid var(--border-color)",
                  marginBottom: "4px",
                  lineHeight: 1.5,
                }}
              >
                • {h}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ marginTop: "auto" }}>
          <div className="comment" style={{ fontSize: "0.72rem", marginBottom: "8px" }}>
            $ ./run_commands.sh
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "0.78rem", padding: "6px 14px" }}
            >
              <GithubIcon size={12} />
              git clone
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: "0.78rem", padding: "6px 14px" }}
              >
                <ExternalLink size={12} />
                ./demo
              </a>
            )}
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
