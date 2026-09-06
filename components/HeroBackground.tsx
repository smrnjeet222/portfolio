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
          opacity: 0.84,
          mask: "linear-gradient(to bottom, #000 0%, #000 45%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.30) 88%, transparent 100%)",
          WebkitMask: "linear-gradient(to bottom, #000 0%, #000 45%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.30) 88%, transparent 100%)",
        }}
      >
        <LiquidCanvas
          params={{
            colors: ["#0d1117", "#0e325c", "#1d6cb5", "#c2e4fc", "#081629"],
            glowColors: ["#d9f0ff", "#38bdf8", "#12519e"],
            speed: 24,
            scale: 1.77,
            distortion: 18,
            distortBoost: 2.0,
            swirl: 20,
            swirlBoost: 0.8,
            bloomThreshold: 0.58,
            bloomRange: 0.18,
            bloomStrength: 0.32,
            vignette: 0.36,
            decay: 0.925,
            mouseRadius: 0.09,
            mouseStrength: 1.7,
            mouseSmoothing: 0.1,
            mouseVelocity: 0.2,
            glowIntensity: 0.24,
          }}
        />
      </div>

      {/* 2. Spring Physics Interactive Grid Layer with expanded, ultra-gradual fade */}
      <div
        className="absolute inset-0 z-[1] hidden md:block overflow-hidden"
        style={{
          opacity: 0.85,
          mask: "linear-gradient(to bottom, #000 0%, #000 45%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.30) 88%, transparent 100%)",
          WebkitMask: "linear-gradient(to bottom, #000 0%, #000 45%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.30) 88%, transparent 100%)",
        }}
      >
        <InteractiveGrid
          lineColor="rgba(135, 212, 255,"
          dotColor="rgba(200, 238, 255,"
          lineOpacity={0.085}
          dotOpacity={0.22}
          spacing={90}
          mouseRadius={140}
          repelForce={30}
        />
      </div>

      {/* 3. Dark contrast overlay to eliminate glare and keep background deep & readable */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13, 17, 23, 0.22) 0%, rgba(13, 17, 23, 0.15) 35%, rgba(13, 17, 23, 0.48) 70%, rgba(13, 17, 23, 0.88) 100%), radial-gradient(circle at 50% 35%, transparent 35%, rgba(13, 17, 23, 0.35) 100%)",
        }}
      />
    </div>
  );
}
