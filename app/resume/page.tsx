"use client";

import { Download, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  return (
    <div
      style={{
        height: "100vh",
        background: "var(--bg-primary)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Single card */}
      <div
        className="terminal-window"
        style={{ flex: 1, display: "flex", flexDirection: "column", boxShadow: "none" }}
      >
        {/* Titlebar */}
        <div className="terminal-titlebar">
          <span className="terminal-dot dot-red" />
          <span className="terminal-dot dot-yellow" />
          <span className="terminal-dot dot-green" />
          <span className="terminal-filename">resume.pdf</span>
        </div>

        {/* Action bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            padding: "12px 16px 12px",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "0.82rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              <ArrowLeft size={14} />
              cd ..
            </Link>
            <span style={{ color: "var(--border-color)" }}>|</span>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>
              <span style={{ color: "var(--accent-cyan)" }}>jeet</span>
              <span>@portfolio</span>
              <span style={{ color: "var(--text-secondary)" }}>:~$</span>
              <span style={{ color: "var(--accent-green)", marginLeft: "6px" }}>
                open simranjeet_resume.pdf
              </span>
            </span>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <a
              href="/simranjeet_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                border: "1px solid var(--border-color)",
                borderRadius: "6px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "0.8rem",
                background: "var(--bg-tertiary)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-cyan)";
                e.currentTarget.style.color = "var(--accent-cyan)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <ExternalLink size={12} />
              open
            </a>
            <a
              href="/simranjeet_resume.pdf"
              download
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                border: "1px solid var(--accent-green)",
                borderRadius: "6px",
                color: "var(--accent-green)",
                textDecoration: "none",
                fontSize: "0.8rem",
                background: "rgba(86, 211, 100, 0.08)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(86, 211, 100, 0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(86, 211, 100, 0.08)";
              }}
            >
              <Download size={12} />
              wget resume.pdf
            </a>
          </div>
        </div>

        {/* PDF */}
        <iframe
          src="/simranjeet_resume.pdf#navpanes=0&view=FitH"
          style={{ flex: 1, width: "100%", border: "none", display: "block" }}
          title="Simranjeet Singh Resume"
        />
      </div>
    </div>
  );
}
