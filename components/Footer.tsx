"use client";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-color)",
        padding: "24px",
        textAlign: "center",
        background: "var(--bg-secondary)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
          <span style={{ color: "var(--accent-green)" }}>jeet</span>
          <span style={{ color: "var(--text-secondary)" }}>@</span>
          <span style={{ color: "var(--accent-cyan)" }}>portfolio</span>
          <span style={{ color: "var(--text-secondary)" }}>:~$ echo </span>
          <span style={{ color: "var(--accent-yellow)" }}>
            &quot;Built with Next.js & ❤️ &quot;
          </span>
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
          © {new Date().getFullYear()} Simranjeet Singh. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
