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
  spacing = 90,
  mouseRadius = 140,
  repelForce = 30,
  isStatic = false,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: NaN, y: NaN });
  const isIntersectingRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rect = canvas.getBoundingClientRect();
    const updateRect = () => {
      if (canvas) rect = canvas.getBoundingClientRect();
    };
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
      mousePosRef.current.x = e.clientX - rect.left;
      mousePosRef.current.y = e.clientY - rect.top;
      wakeUp();
    };

    const onMouseLeave = () => {
      mousePosRef.current.x = NaN;
      mousePosRef.current.y = NaN;
      wakeUp();
    };

    if (!isStatic) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    }

    const mouseRadiusSq = mouseRadius * mouseRadius;

    const tick = () => {
      if (!isIntersectingRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const curW = canvas.clientWidth;
      const curH = canvas.clientHeight;
      if (curW !== width || curH !== height) {
        width = curW;
        height = curH;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        updateRect();
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initGrid, 150);
      }

      ctx.clearRect(0, 0, width, height);

      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;
      const hasMouse = !isNaN(mx) && !isNaN(my);
      let maxVelocity = 0;

      // DeepSeek elastic spring physics pass
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        if (hasMouse) {
          const dx = pt.x - mx;
          const dy = pt.y - my;
          if (Math.abs(dx) < mouseRadius && Math.abs(dy) < mouseRadius) {
            const distSq = dx * dx + dy * dy;
            if (distSq < mouseRadiusSq && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              const force = (1.0 - dist / mouseRadius) * repelForce;
              pt.vx += (dx / dist) * force * 0.1;
              pt.vy += (dy / dist) * force * 0.1;
            }
          }
        }

        // Spring pull to rest position
        pt.vx = (pt.vx + 0.06 * (pt.restX - pt.x)) * 0.84;
        pt.vy = (pt.vy + 0.06 * (pt.restY - pt.y)) * 0.84;
        pt.x += pt.vx;
        pt.y += pt.vy;

        const vel = Math.abs(pt.vx) + Math.abs(pt.vy);
        if (vel > maxVelocity) {
          maxVelocity = vel;
        }
      }

      // Single batched draw for all grid line segments
      ctx.strokeStyle = `${lineColor} ${lineOpacity})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();

      // Horizontal segments with gaps near intersection points
      for (let r = 0; r < rows; r++) {
        const rowOffset = r * cols;
        for (let c = 0; c < cols - 1; c++) {
          const p1 = points[rowOffset + c];
          const p2 = points[rowOffset + c + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          if (distSq <= 400) continue;
          const dist = Math.sqrt(distSq);
          const nx = (dx / dist) * 10;
          const ny = (dy / dist) * 10;
          ctx.moveTo(p1.x + nx, p1.y + ny);
          ctx.lineTo(p2.x - nx, p2.y - ny);
        }
      }

      // Vertical segments with gaps near intersection points
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const p1 = points[r * cols + c];
          const p2 = points[(r + 1) * cols + c];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          if (distSq <= 400) continue;
          const dist = Math.sqrt(distSq);
          const nx = (dx / dist) * 10;
          const ny = (dy / dist) * 10;
          ctx.moveTo(p1.x + nx, p1.y + ny);
          ctx.lineTo(p2.x - nx, p2.y - ny);
        }
      }
      ctx.stroke();

      // Batch 1: Base cyber dots
      ctx.fillStyle = `${dotColor} ${dotOpacity})`;
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        ctx.fillRect(pt.x - 1.5, pt.y - 1.5, 3, 3);
      }

      // Batch 2: Expanding cyber dots near mouse hover
      if (hasMouse) {
        for (let i = 0; i < points.length; i++) {
          const pt = points[i];
          const dx = pt.x - mx;
          const dy = pt.y - my;
          if (Math.abs(dx) < mouseRadius && Math.abs(dy) < mouseRadius) {
            const distSq = dx * dx + dy * dy;
            if (distSq < mouseRadiusSq) {
              const prox = 1 - Math.sqrt(distSq) / mouseRadius;
              const halfSize = 1.5 + 2.5 * prox;
              ctx.fillStyle = `${dotColor} ${Math.min(1.0, dotOpacity + 0.65 * prox)})`;
              ctx.fillRect(pt.x - halfSize, pt.y - halfSize, halfSize * 2, halfSize * 2);
            }
          }
        }
      }

      // Sleep when physics has settled and mouse is away
      if (maxVelocity < 0.008 && !hasMouse) {
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
