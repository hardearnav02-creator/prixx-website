// src/components/ui/CustomCursor.tsx
// Fluid String & Ribbon Cursor Trail Engine
// Inspired by the physics and rendering architecture of https://obsidianassembly.com
// Full-axis lines removed; renders an ultra-smooth, inertia-driven trailing line.

import React, { useEffect, useRef } from 'react';

interface TrailConfig {
  length: number;
  maxWidth: number;
  minWidth: number;
  colorBase: string; // "R, G, B"
  colorEnd: string; // "R, G, B"
  alphaBase: number;
  alphaEnd: number;
  damping: number;
  inertiaRetention: number;
  inertiaInfluence: number;
  inertiaStrength: number;
  speedInfluence: number;
  speedMax: number;
  speedSmoothing: number;
  blendMode: GlobalCompositeOperation;
}

const DEFAULT_CONFIG: TrailConfig = {
  length: 50,
  maxWidth: 2.0,
  minWidth: 0.5,
  colorBase: '220, 38, 38', // Prixx Dark Red / Ruby
  colorEnd: '153, 27, 27', // Crimson
  alphaBase: 0.9,
  alphaEnd: 0.0,
  damping: 0.55,
  inertiaRetention: 0.82,
  inertiaInfluence: 0.28,
  inertiaStrength: 0.025,
  speedInfluence: 0.8,
  speedMax: 650,
  speedSmoothing: 0.2,
  blendMode: 'source-over',
};

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Mobile & Touch Screen Check
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches ||
      window.innerWidth < 768
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    const config = DEFAULT_CONFIG;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    // 2. Trail Simulation Points
    const points: Point[] = Array.from({ length: config.length }, () => ({
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
    }));

    const leftBoundary: { x: number; y: number }[] = Array.from(
      { length: config.length },
      () => ({ x: 0, y: 0 })
    );
    const rightBoundary: { x: number; y: number }[] = Array.from(
      { length: config.length },
      () => ({ x: 0, y: 0 })
    );

    const target = { x: width / 2, y: height / 2 };
    let hasMoved = false;
    let lastX = width / 2;
    let lastY = height / 2;
    let lastTime = performance.now();
    let smoothedSpeedRatio = 0;
    let animId = 0;
    let isIdle = false;
    let idleFrames = 0;
    let isTabVisible = true;

    // Parse base and end colors
    const parseRGB = (str: string): [number, number, number] => {
      const parts = str.split(',').map((p) => parseInt(p.trim(), 10) || 0);
      return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
    };

    const [r1, g1, b1] = parseRGB(config.colorBase);
    const [r2, g2, b2] = parseRGB(config.colorEnd);

    // 3. Pointer Tracking
    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      const now = performance.now();
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        target.x = currentX;
        target.y = currentY;
        lastX = currentX;
        lastY = currentY;
        lastTime = now;
        points.forEach((p) => {
          p.x = currentX;
          p.y = currentY;
          p.vx = 0;
          p.vy = 0;
        });
        wakeUp();
        return;
      }

      const elapsed = Math.max(1, now - lastTime) / 1000;
      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const dist = Math.hypot(dx, dy);
      const instantSpeed = dist / elapsed;
      const speedFraction = Math.min(1, instantSpeed / config.speedMax);

      smoothedSpeedRatio += (speedFraction - smoothedSpeedRatio) * config.speedSmoothing;

      lastX = currentX;
      lastY = currentY;
      lastTime = now;
      target.x = currentX;
      target.y = currentY;

      wakeUp();
    };

    const wakeUp = () => {
      isIdle = false;
      idleFrames = 0;
      if (!animId && isTabVisible) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const onPointerLeave = () => {
      // Fade trail out softly
      smoothedSpeedRatio = 0;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        isTabVisible = false;
        if (animId) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
      } else {
        isTabVisible = true;
        wakeUp();
      }
    };

    // 4. Trail Physics & Render Loop
    const renderLoop = () => {
      animId = 0;
      if (!isTabVisible) return;

      ctx.clearRect(0, 0, width, height);

      if (!hasMoved) {
        animId = requestAnimationFrame(renderLoop);
        return;
      }

      const speedFactor = 1 + config.speedInfluence * smoothedSpeedRatio;
      const dt = 1;
      const leadDamping = (config.damping + 0.1) * dt;
      const headDx = (target.x - points[0].x) * leadDamping;
      const headDy = (target.y - points[0].y) * leadDamping;
      const inertiaInf = config.inertiaInfluence * speedFactor;
      const inertiaStr = config.inertiaStrength * speedFactor;

      // Update head point
      points[0].vx = points[0].vx * config.inertiaRetention + headDx * inertiaInf * dt;
      points[0].vy = points[0].vy * config.inertiaRetention + headDy * inertiaInf * dt;
      points[0].x += headDx + points[0].vx * inertiaStr * dt;
      points[0].y += headDy + points[0].vy * inertiaStr * dt;

      // Update following points
      let totalMotion = Math.hypot(headDx, headDy);
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const d = config.damping * dt;
        const sx = (prev.x - curr.x) * d;
        const sy = (prev.y - curr.y) * d;

        curr.vx = curr.vx * config.inertiaRetention + sx * config.inertiaInfluence * 2;
        curr.vy = curr.vy * config.inertiaRetention + sy * config.inertiaInfluence * 4;
        curr.x += sx + curr.vx * config.inertiaStrength * dt;
        curr.y += sy + curr.vy * config.inertiaStrength * dt;

        totalMotion += Math.hypot(sx, sy);
      }

      // Check if settled to save CPU
      if (totalMotion < 0.05) {
        idleFrames++;
        if (idleFrames > 60) {
          isIdle = true;
          return;
        }
      } else {
        idleFrames = 0;
      }

      // 5. Calculate Ribbon Geometry / Normals
      for (let i = 0; i < points.length; i++) {
        const t = i / (points.length - 1);
        const segmentWidth = (config.maxWidth * (1 - t) + config.minWidth * t) * speedFactor;
        const curr = points[i];
        const next = points[i + 1] || curr;
        const prev = points[i - 1] || curr;

        let nx = 0;
        let ny = 0;

        if (i === 0) {
          const dx = next.x - curr.x;
          const dy = next.y - curr.y;
          const lenSq = dx * dx + dy * dy;
          if (lenSq >= 1e-8) {
            const invLen = 1 / Math.sqrt(lenSq);
            nx = -dy * invLen;
            ny = dx * invLen;
          }
        } else if (i === points.length - 1) {
          const dx = curr.x - prev.x;
          const dy = curr.y - prev.y;
          const lenSq = dx * dx + dy * dy;
          if (lenSq >= 1e-8) {
            const invLen = 1 / Math.sqrt(lenSq);
            nx = -dy * invLen;
            ny = dx * invLen;
          }
        } else {
          const dx1 = curr.x - prev.x;
          const dy1 = curr.y - prev.y;
          const lenSq1 = dx1 * dx1 + dy1 * dy1;

          const dx2 = next.x - curr.x;
          const dy2 = next.y - curr.y;
          const lenSq2 = dx2 * dx2 + dy2 * dy2;

          let n1x = 0;
          let n1y = 0;
          let n2x = 0;
          let n2y = 0;

          if (lenSq1 >= 1e-8) {
            const inv = 1 / Math.sqrt(lenSq1);
            n1x = -dy1 * inv;
            n1y = dx1 * inv;
          }
          if (lenSq2 >= 1e-8) {
            const inv = 1 / Math.sqrt(lenSq2);
            n2x = -dy2 * inv;
            n2y = dx2 * inv;
          }

          nx = (n1x + n2x) / 2;
          ny = (n1y + n2y) / 2;
          const nLenSq = nx * nx + ny * ny;
          if (nLenSq >= 1e-8) {
            const inv = 1 / Math.sqrt(nLenSq);
            nx *= inv;
            ny *= inv;
          }
        }

        const halfWidth = segmentWidth / 2;
        leftBoundary[i].x = curr.x + nx * halfWidth;
        leftBoundary[i].y = curr.y + ny * halfWidth;
        rightBoundary[i].x = curr.x - nx * halfWidth;
        rightBoundary[i].y = curr.y - ny * halfWidth;
      }

      // 6. Draw Fluid Gradient Line Segments
      ctx.globalCompositeOperation = config.blendMode;
      const numSegments = points.length - 1;

      for (let i = 0; i < numSegments; i++) {
        const t1 = i / numSegments;
        const t2 = (i + 1) / numSegments;

        const segR1 = Math.round(r1 + (r2 - r1) * t1);
        const segG1 = Math.round(g1 + (g2 - g1) * t1);
        const segB1 = Math.round(b1 + (b2 - b1) * t1);
        const segA1 = config.alphaBase + (config.alphaEnd - config.alphaBase) * t1;

        const segR2 = Math.round(r1 + (r2 - r1) * t2);
        const segG2 = Math.round(g1 + (g2 - g1) * t2);
        const segB2 = Math.round(b1 + (b2 - b1) * t2);
        const segA2 = config.alphaBase + (config.alphaEnd - config.alphaBase) * t2;

        const p1 = points[i];
        const p2 = points[i + 1];
        const segDistSq = (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);

        ctx.beginPath();
        ctx.moveTo(leftBoundary[i].x, leftBoundary[i].y);
        ctx.lineTo(leftBoundary[i + 1].x, leftBoundary[i + 1].y);
        ctx.lineTo(rightBoundary[i + 1].x, rightBoundary[i + 1].y);
        ctx.lineTo(rightBoundary[i].x, rightBoundary[i].y);
        ctx.closePath();

        if (segDistSq > 0.25) {
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, `rgba(${segR1}, ${segG1}, ${segB1}, ${segA1})`);
          grad.addColorStop(1, `rgba(${segR2}, ${segG2}, ${segB2}, ${segA2})`);
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = `rgba(${segR1}, ${segG1}, ${segB1}, ${segA1})`;
        }

        ctx.fill();
      }

      // Draw subtle luminous head point at the cursor
      if (config.alphaBase > 0) {
        ctx.beginPath();
        ctx.arc(points[0].x, points[0].y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r1}, ${g1}, ${b1}, 0.95)`;
        ctx.shadowColor = `rgba(${r1}, ${g1}, ${b1}, 0.8)`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!isIdle) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', onVisibilityChange);

    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-cursor-trail="hero"
      className="fixed inset-0 pointer-events-none z-[9999] select-none bg-transparent"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        backgroundColor: 'transparent',
      }}
    />
  );
};
