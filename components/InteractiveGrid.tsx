"use client";

import { useEffect, useRef } from "react";

export interface InteractiveGridProps {
  lineColor?: string;
  dotColor?: string;
  lineOpacity?: number;
  dotOpacity?: number;
  spacing?: number;
  mouseRadius?: number;
  repelForce?: number;
  isStatic?: boolean;
}

interface GridPoint {
  restX: number;
  restY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function InteractiveGrid({
  lineColor = "rgba(125, 207, 255,",
  dotColor = "rgba(125, 207, 255,",
  lineOpacity = 0.07,
  dotOpacity = 0.16,
  spacing = 88,
  mouseRadius = 120,
  repelForce = 16,
  isStatic = false,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const rawMouseRef = useRef<{ clientX: number; clientY: number }>({ clientX: -9999, clientY: -9999 });
  const cachedRectRef = useRef<{ left: number; top: number; width: number; height: number }>({
    left: 0,
    top: 0,
    width: 1,
    height: 1,
  });
  const isIntersectingRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cache bounding rect on scroll/resize (never in mousemove)
    const updateRect = () => {
      const r = canvas.getBoundingClientRect();
      cachedRectRef.current = {
        left: r.left,
        top: r.top,
        width: r.width || 1,
        height: r.height || 1,
      };
    };
    updateRect();
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: GridPoint[] = [];
    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let isSleeping = false;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const initGrid = () => {
      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      const startX = (width - (cols - 1) * spacing) / 2;
      const startY = (height - (rows - 1) * spacing) / 2;

      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const rx = startX + c * spacing;
          const ry = startY + r * spacing;
          points.push({
            restX: rx,
            restY: ry,
            x: rx,
            y: ry,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initGrid();

    const wakeUp = () => {
      if (isSleeping) {
        isSleeping = false;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isStatic) return;
      rawMouseRef.current.clientX = e.clientX;
      rawMouseRef.current.clientY = e.clientY;
      wakeUp();
    };

    const onMouseLeave = () => {
      rawMouseRef.current.clientX = -9999;
      rawMouseRef.current.clientY = -9999;
      wakeUp();
    };

    if (!isStatic) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    }

    let lastFrameTime = 0;
    const minFrameInterval = 1000 / 30; // 30 FPS physics update is light and buttery smooth

    const tick = (now: number) => {
      if (!isIntersectingRef.current || now - lastFrameTime < minFrameInterval) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      lastFrameTime = now - ((now - lastFrameTime) % minFrameInterval);

      const curW = canvas.clientWidth;
      const curH = canvas.clientHeight;
      if (curW !== width || curH !== height) {
        width = curW;
        height = curH;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initGrid, 120);
      }

      ctx.clearRect(0, 0, width, height);

      const rect = cachedRectRef.current;
      const raw = rawMouseRef.current;
      const hasMouse = !isTouch && raw.clientX > -9000;
      const mx = hasMouse ? raw.clientX - rect.left : NaN;
      const my = hasMouse ? raw.clientY - rect.top : NaN;

      let maxVelocity = 0;
      const hoveredIndices: { idx: number; proximity: number }[] = [];

      // Fast physics pass
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        if (hasMouse) {
          const dx = pt.x - mx;
          const dy = pt.y - my;
          // Fast bounding box pre-filter before Math.sqrt
          if (Math.abs(dx) < mouseRadius && Math.abs(dy) < mouseRadius) {
            const distSq = dx * dx + dy * dy;
            const radSq = mouseRadius * mouseRadius;
            if (distSq < radSq && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              const force = (1.0 - dist / mouseRadius) * repelForce;
              const nx = dx / dist;
              const ny = dy / dist;
              pt.vx += nx * force * 0.08;
              pt.vy += ny * force * 0.08;
              hoveredIndices.push({ idx: i, proximity: 1.0 - dist / mouseRadius });
            }
          }
        }

        // Spring restitution
        pt.vx = (pt.vx + 0.05 * (pt.restX - pt.x)) * 0.85;
        pt.vy = (pt.vy + 0.05 * (pt.restY - pt.y)) * 0.85;
        pt.x += pt.vx;
        pt.y += pt.vy;

        const vel = Math.abs(pt.vx) + Math.abs(pt.vy);
        if (vel > maxVelocity) {
          maxVelocity = vel;
        }
      }

      // Draw all line segments in ONE batched path (silky smooth, anti-aliased)
      ctx.strokeStyle = `${lineColor} ${lineOpacity})`;
      ctx.lineWidth = 0.8;
      ctx.lineCap = "round";
      ctx.beginPath();

      // Horizontal segments
      for (let r = 0; r < rows; r++) {
        const rowOffset = r * cols;
        for (let c = 0; c < cols - 1; c++) {
          const p1 = points[rowOffset + c];
          const p2 = points[rowOffset + c + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 20) continue;
          const nx = (dx / dist) * 10;
          const ny = (dy / dist) * 10;
          ctx.moveTo(p1.x + nx, p1.y + ny);
          ctx.lineTo(p2.x - nx, p2.y - ny);
        }
      }

      // Vertical segments
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const p1 = points[r * cols + c];
          const p2 = points[(r + 1) * cols + c];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 20) continue;
          const nx = (dx / dist) * 10;
          const ny = (dy / dist) * 10;
          ctx.moveTo(p1.x + nx, p1.y + ny);
          ctx.lineTo(p2.x - nx, p2.y - ny);
        }
      }
      ctx.stroke();

      // Draw base dots as smooth anti-aliased circles
      ctx.fillStyle = `${dotColor} ${dotOpacity})`;
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        ctx.moveTo(pt.x + 1.5, pt.y);
        ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
      }
      ctx.fill();

      // Draw hovered / expanding dots with smooth circular glow (only ~3-6 points)
      if (hoveredIndices.length > 0) {
        for (let k = 0; k < hoveredIndices.length; k++) {
          const { idx, proximity } = hoveredIndices[k];
          const pt = points[idx];
          const radius = 1.5 + 2.4 * proximity;
          ctx.fillStyle = `${dotColor} ${dotOpacity + 0.45 * proximity})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Sleep loop if almost completely still and mouse is away
      if (maxVelocity < 0.01 && !hasMouse) {
        isSleeping = true;
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          wakeUp();
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      observer.disconnect();
    };
  }, [lineColor, dotColor, lineOpacity, dotOpacity, spacing, mouseRadius, repelForce, isStatic]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
        display: "block",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
}
