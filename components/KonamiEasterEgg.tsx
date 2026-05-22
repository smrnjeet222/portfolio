"use client";

import { useEffect, useState, useRef } from "react";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

const GLITCH_CHARS = "!@#$%^&*<>?/|\\[]{}~;:ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const rand = (arr: string) => arr[Math.floor(Math.random() * arr.length)];

function useGlitchText(text: string, active: boolean) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickRef = useRef(0);

  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    tickRef.current = 0;
    rafRef.current = setInterval(() => {
      tickRef.current++;
      if (tickRef.current > 18) {
        setDisplay(text);
        if (rafRef.current) clearInterval(rafRef.current);
        return;
      }
      // Gradually reveal the real text while glitching
      const reveal = Math.floor((tickRef.current / 18) * text.length);
      setDisplay(
        text
          .split("")
          .map((ch, i) =>
            i < reveal ? ch : ch === " " ? " " : rand(GLITCH_CHARS)
          )
          .join("")
      );
    }, 60);
    return () => { if (rafRef.current) clearInterval(rafRef.current); };
  }, [active, text]);

  return display;
}

const MATRIX_CHARS = "アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [closing, setClosing] = useState(false);
  const seqRef = useRef<string[]>([]);
  const columns = useRef<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const title1 = useGlitchText("[ SYSTEM OVERRIDE ]", active);
  const title2 = useGlitchText("ACCESS GRANTED", active);

  const close = () => {
    setClosing(true);
    setTimeout(() => { setActive(false); setClosing(false); }, 400);
  };

  /* Konami listener */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active) { close(); return; }
      seqRef.current = [...seqRef.current, e.key].slice(-10);
      if (seqRef.current.join(",") === KONAMI.join(",")) {
        seqRef.current = [];
        setActive(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  /* Auto-close after 6s */
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(close, 6000);
    return () => clearTimeout(t);
  }, [active]);

  /* Matrix rain */
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const colW = 18;
    const cols = Math.floor(W / colW);
    columns.current = Array.from({ length: cols }, () => Math.random() * H);

    const draw = () => {
      ctx.fillStyle = "rgba(13,17,23,0.12)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `13px 'JetBrains Mono', monospace`;

      columns.current.forEach((y, i) => {
        const ch = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * colW;
        // head char: bright cyan
        ctx.fillStyle = "rgba(125,207,255,0.9)";
        ctx.fillText(ch, x, y);
        // trail char: dim green
        ctx.fillStyle = "rgba(86,211,100,0.25)";
        ctx.fillText(
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
          x, y - colW
        );
        columns.current[i] = y > H + Math.random() * 120 ? 0 : y + colW;
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  if (!active) return null;

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99998,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.92)",
        animation: closing ? "none" : "fadeUp 0.25s ease",
        opacity: closing ? 0 : 1,
        transition: closing ? "opacity 0.35s ease" : "none",
        gap: "20px",
      }}
    >
      {/* matrix canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.55,
        }}
      />

      {/* center card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          padding: "40px 60px",
          border: "1px solid rgba(125,207,255,0.3)",
          borderRadius: "4px",
          background: "rgba(13,17,23,0.85)",
          boxShadow: "0 0 60px rgba(125,207,255,0.15), 0 0 120px rgba(125,207,255,0.05)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* top line */}
        <div style={{ fontSize: "0.7rem", color: "var(--accent-green)", letterSpacing: "0.3em", fontWeight: 700 }}>
          ■ ■ ■ &nbsp; CLASSIFIED &nbsp; ■ ■ ■
        </div>

        {/* main glitch title */}
        <div
          style={{
            fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
            fontWeight: 800,
            color: "var(--accent-cyan)",
            letterSpacing: "0.12em",
            textShadow: "0 0 30px rgba(125,207,255,0.8), 2px 0 var(--accent-red), -2px 0 var(--accent-green)",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
          }}
          className="konami-glitch"
        >
          {title1}
        </div>

        {/* sub title */}
        <div
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
            fontWeight: 700,
            color: "var(--accent-green)",
            letterSpacing: "0.25em",
            textShadow: "0 0 15px rgba(86,211,100,0.7)",
          }}
        >
          {title2}
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)",
          }}
        />

        {/* info lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", fontSize: "0.75rem" }}>
          {[
            { label: "OPERATOR", value: "Simranjeet Singh" },
            { label: "CLEARANCE", value: "LEVEL 5 — WEB3 / FULLSTACK" },
            { label: "LOCATION", value: "Delhi, India" },
            { label: "MISSION", value: "Build. Ship. Repeat." },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", gap: "16px" }}>
              <span style={{ color: "var(--text-secondary)", letterSpacing: "0.1em", minWidth: "80px" }}>{label}</span>
              <span style={{ color: "var(--accent-cyan)" }}>: {value}</span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", marginTop: "4px", letterSpacing: "0.1em" }}>
          PRESS ANY KEY OR CLICK TO DISMISS
        </div>
      </div>

      <style>{`
        @keyframes rgb-shift {
          0%,100% { text-shadow: 0 0 30px rgba(125,207,255,0.8), 2px 0 var(--accent-red), -2px 0 var(--accent-green); }
          25%      { text-shadow: 0 0 30px rgba(125,207,255,0.8), -3px 0 var(--accent-red),  3px 0 var(--accent-green); }
          50%      { text-shadow: 0 0 40px rgba(125,207,255,1),    0px 2px var(--accent-red),  0px -2px var(--accent-green); }
          75%      { text-shadow: 0 0 20px rgba(125,207,255,0.6),  3px 0 var(--accent-red), -3px 0 var(--accent-green); }
        }
        .konami-glitch { animation: rgb-shift 0.4s ease infinite; }
      `}</style>
    </div>
  );
}
