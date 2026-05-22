"use client";

import { useEffect, useRef } from "react";

export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? (el.scrollTop / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 9998,
        background: "rgba(48,54,61,0.4)",
      }}
    >
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "0%",
          background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green))",
          boxShadow: "0 0 10px rgba(125,207,255,0.8), 0 0 20px rgba(125,207,255,0.4)",
          borderRadius: "0 2px 2px 0",
          transition: "width 0.08s linear",
        }}
      />
    </div>
  );
}
