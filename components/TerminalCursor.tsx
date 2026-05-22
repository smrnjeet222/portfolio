"use client";

import { useEffect, useRef, useCallback } from "react";

type CursorMode = "default" | "pointer" | "text";

export default function TerminalCursor() {
  const barRef   = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const modeRef  = useRef<CursorMode>("default");

  // Use refs for position so we never re-render
  const pos     = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const rafId   = useRef<number>(0);

  const applyMode = useCallback((mode: CursorMode) => {
    if (modeRef.current === mode) return;
    modeRef.current = mode;
    const bar   = barRef.current;
    const trail = trailRef.current;
    if (!bar || !trail) return;

    if (mode === "text") {
      // I-beam: thin tall bar
      bar.style.width  = "2px";
      bar.style.height = "18px";
      bar.style.borderRadius = "1px";
      bar.style.background = "var(--accent-cyan)";
      bar.style.transform = "translate(-1px, -9px)";
      bar.style.boxShadow = "0 0 6px rgba(125,207,255,0.7)";
      trail.style.opacity = "0";
    } else if (mode === "pointer") {
      // Small filled dot
      bar.style.width  = "8px";
      bar.style.height = "8px";
      bar.style.borderRadius = "50%";
      bar.style.background = "var(--accent-cyan)";
      bar.style.transform = "translate(-4px, -4px)";
      bar.style.boxShadow = "0 0 10px rgba(125,207,255,0.8)";
      trail.style.opacity = "0.35";
      trail.style.width  = "28px";
      trail.style.height = "28px";
    } else {
      // Default: blinking block underscore
      bar.style.width  = "10px";
      bar.style.height = "16px";
      bar.style.borderRadius = "1px";
      bar.style.background = "rgba(125,207,255,0.85)";
      bar.style.transform = "translate(-2px, -14px)";
      bar.style.boxShadow = "0 0 8px rgba(125,207,255,0.4)";
      trail.style.opacity = "0.15";
      trail.style.width  = "22px";
      trail.style.height = "22px";
    }
  }, []);

  useEffect(() => {
    const bar   = barRef.current;
    const trail = trailRef.current;
    if (!bar || !trail) return;

    // Animate trail with lerp each frame
    const tick = () => {
      const dx = pos.current.x - trailPos.current.x;
      const dy = pos.current.y - trailPos.current.y;
      trailPos.current.x += dx * 0.12;
      trailPos.current.y += dy * 0.12;
      trail.style.left = trailPos.current.x + "px";
      trail.style.top  = trailPos.current.y + "px";
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      bar.style.left = e.clientX + "px";
      bar.style.top  = e.clientY + "px";

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || el.closest("input") || el.closest("textarea")) {
        applyMode("text");
      } else if (
        tag === "A" || tag === "BUTTON" ||
        el.closest("a") || el.closest("button")
      ) {
        applyMode("pointer");
      } else {
        applyMode("default");
      }
    };

    const onDown = () => {
      bar.style.opacity = "0.4";
      bar.style.transform = bar.style.transform.replace(/scale\([^)]+\)/, "") + " scale(0.8)";
    };
    const onUp = () => {
      bar.style.opacity = "1";
      applyMode(modeRef.current); // restore transform
    };

    const onLeave = () => { bar.style.opacity = "0"; trail.style.opacity = "0"; };
    const onEnter = () => { bar.style.opacity = "1"; applyMode(modeRef.current); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [applyMode]);

  return (
    <>
      {/* Lagging glow trail */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99997,
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(125,207,255,0.25) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          opacity: 0.15,
          transition: "opacity 0.2s, width 0.15s, height 0.15s",
          top: 0,
          left: 0,
        }}
      />

      {/* Main cursor bar */}
      <div
        ref={barRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99999,
          width: "10px",
          height: "16px",
          borderRadius: "1px",
          background: "rgba(125,207,255,0.85)",
          transform: "translate(-2px, -14px)",
          boxShadow: "0 0 8px rgba(125,207,255,0.4)",
          animation: "cursor-blink 1s step-end infinite",
          transition: "width 0.12s, height 0.12s, border-radius 0.12s, background 0.12s, box-shadow 0.12s",
          top: 0,
          left: "-100px",
        }}
      />
    </>
  );
}
