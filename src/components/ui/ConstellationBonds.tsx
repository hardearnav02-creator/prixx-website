// src/components/ui/ConstellationBonds.tsx
// Interactive Spotlight Dot Grid Matrix (Call of Code style).
// Evenly spaced independent off-white dots with NO connecting lines.
// Dynamically scales, brightens, and subtly pushes away as the cursor glides across.
// High-performance Canvas 2D render loop with adaptive sleep when idle.
// Automatically disabled on mobile/touch screens to save 100% GPU/battery.
// Inspired by Call of Code (callofcode.in) & Linear.

import { useEffect, useRef } from 'react';

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  currentRadius: number;
  baseAlpha: number;
  currentAlpha: number;
}

export const ConstellationBonds = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Mobile Performance Bypass: Do not run canvas physics on mobile/touch screens
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024));

    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId: number = 0;
    let isRunning = false;
    let dots: Dot[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      active: false,
      radius: 170, // Cursor influence radius
    };

    const GRID_SPACING = 36; // Optimized distance between grid dots

    // Initialize regular dot grid across the entire viewport
    const initGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const cols = Math.ceil(width / GRID_SPACING) + 1;
      const rows = Math.ceil(height / GRID_SPACING) + 1;

      const offsetX = (width - (cols - 1) * GRID_SPACING) / 2;
      const offsetY = (height - (rows - 1) * GRID_SPACING) / 2;

      const newDots: Dot[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * GRID_SPACING;
          const y = offsetY + r * GRID_SPACING;

          newDots.push({
            originX: x,
            originY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            baseRadius: 1.0,
            currentRadius: 1.0,
            baseAlpha: 0.0,
            currentAlpha: 0.0,
          });
        }
      }

      dots = newDots;
    };

    initGrid();

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
      startLoop();
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    const handleResize = () => {
      initGrid();
      startLoop();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Physics & Render Loop with Sleep Mode
    const animate = () => {
      let hasActiveAnimation = false;

      // Smooth mouse position interpolation (lerp)
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.22;
        mouse.y += (mouse.targetY - mouse.y) * 0.22;
        hasActiveAnimation = true;
      } else {
        mouse.x = -2000;
        mouse.y = -2000;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const dotCount = dots.length;

      // Single-pass update & draw for maximum performance
      for (let i = 0; i < dotCount; i++) {
        const dot = dots[i];

        const dx = dot.originX - mouse.x;
        const dy = dot.originY - mouse.y;
        const distSq = dx * dx + dy * dy;
        const mouseRadiusSq = mouse.radius * mouse.radius;

        let influence = 0;
        let pushX = 0;
        let pushY = 0;

        if (mouse.active && distSq < mouseRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          influence = 1 - dist / mouse.radius;
          const easeInfluence = Math.pow(influence, 1.6);

          const pushForce = easeInfluence * 6.5;
          pushX = (dx / dist) * pushForce;
          pushY = (dy / dist) * pushForce;
        }

        const targetX = dot.originX + pushX;
        const targetY = dot.originY + pushY;

        const springK = 0.18;
        const damping = 0.80;

        const ax = (targetX - dot.x) * springK;
        const ay = (targetY - dot.y) * springK;

        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;

        dot.x += dot.vx;
        dot.y += dot.vy;

        const targetRadius = dot.baseRadius + influence * 2.2;
        dot.currentRadius += (targetRadius - dot.currentRadius) * 0.22;

        const targetAlpha = influence > 0.01 ? Math.pow(influence, 1.3) * 0.95 : 0;
        dot.currentAlpha += (targetAlpha - dot.currentAlpha) * 0.22;

        if (dot.currentAlpha > 0.015) {
          hasActiveAnimation = true;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 38, 38, ${dot.currentAlpha.toFixed(3)})`;
          ctx.fill();
        } else if (Math.abs(dot.x - dot.originX) > 0.1 || Math.abs(dot.y - dot.originY) > 0.1) {
          hasActiveAnimation = true;
        }
      }

      ctx.restore();

      // Only continue loop if mouse is active or dots are still moving/fading
      if (hasActiveAnimation || mouse.active) {
        rafId = requestAnimationFrame(animate);
      } else {
        isRunning = false;
      }
    };

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[2] hidden md:block w-full h-full"
    />
  );
};
