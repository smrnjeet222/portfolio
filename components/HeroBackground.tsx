"use client";

import { useEffect, useState } from "react";
import LiquidCanvas from "./LiquidCanvas";
import InteractiveGrid from "./InteractiveGrid";

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setReady(true), 40);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) {
    return (
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
        style={{ background: "#0d1117" }}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
      style={{
        background: "#0d1117",
        opacity: ready ? 1 : 0,
        transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* 1. Dynamic WebGL2 Liquid Canvas Layer with expanded, ultra-gradual fade */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          opacity: 0.70,
          mask: "linear-gradient(to bottom, #000 0%, #000 40%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0.08) 95%, transparent 100%)",
          WebkitMask: "linear-gradient(to bottom, #000 0%, #000 40%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0.08) 95%, transparent 100%)",
        }}
      >
        <LiquidCanvas
          params={{
            colors: ["#0d1117", "#0b1b2d", "#12385b", "#9ec5e8", "#0d1117"],
            glowColors: ["#d0e6fa", "#5ba3dc", "#0f2642"],
            speed: 16,
            scale: 1.75,
            distortion: 16,
            distortBoost: 1.1,
            swirl: 18,
            swirlBoost: 0.45,
            bloomThreshold: 0.65,
            bloomRange: 0.18,
            bloomStrength: 0.08,
            vignette: 0.42,
            decay: 0.93,
            mouseRadius: 0.08,
            mouseStrength: 1.0,
            mouseSmoothing: 0.12,
            mouseVelocity: 0.18,
            glowIntensity: 0.10,
          }}
        />
      </div>

      {/* 2. Spring Physics Interactive Grid Layer with expanded, ultra-gradual fade */}
      <div
        className="absolute inset-0 z-[1] hidden md:block overflow-hidden"
        style={{
          opacity: 0.85,
          mask: "linear-gradient(to bottom, #000 0%, #000 42%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.58) 72%, rgba(0,0,0,0.28) 86%, rgba(0,0,0,0.06) 96%, transparent 100%)",
          WebkitMask: "linear-gradient(to bottom, #000 0%, #000 42%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.58) 72%, rgba(0,0,0,0.28) 86%, rgba(0,0,0,0.06) 96%, transparent 100%)",
        }}
      >
        <InteractiveGrid
          lineColor="rgba(125, 207, 255,"
          dotColor="rgba(125, 207, 255,"
          lineOpacity={0.045}
          dotOpacity={0.11}
          spacing={92}
          mouseRadius={110}
          repelForce={10}
        />
      </div>
    </div>
  );
}
