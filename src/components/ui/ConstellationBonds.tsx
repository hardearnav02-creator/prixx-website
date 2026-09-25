// src/components/ui/ConstellationBonds.tsx
// Interactive Spotlight Dot Grid Matrix (Call of Code style).
// Evenly spaced independent off-white dots with NO connecting lines.
// Dynamically scales, brightens, and subtly pushes away as the cursor glides across.
// High-performance Canvas 2D 60FPS render loop with spring physics.
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId: number;
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

    const GRID_SPACING = 30; // Clean distance between grid dots

    // Initialize regular dot grid across the entire viewport
    const initGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

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
            baseAlpha: 0.0, // Hidden by default (not everywhere)
            currentAlpha: 0.0,
          });
        }
      }

      dots = newDots;
    };

    initGrid();

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    // 60FPS Physics & Render Loop
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // Smooth mouse position interpolation (lerp)
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.22;
        mouse.y += (mouse.targetY - mouse.y) * 0.22;
      } else {
        mouse.x = -2000;
        mouse.y = -2000;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const dotCount = dots.length;

      // Single-pass update & draw for maximum 60FPS performance
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
          // Smooth non-linear curve for organic spotlight falloff
          const easeInfluence = Math.pow(influence, 1.6);

          // Subtle magnetic deflection (max ~6px)
          const pushForce = easeInfluence * 6.5;
          pushX = (dx / dist) * pushForce;
          pushY = (dy / dist) * pushForce;
        }

        // Target position = origin + slight cursor push
        const targetX = dot.originX + pushX;
        const targetY = dot.originY + pushY;

        // Spring physics return to anchor
        const springK = 0.18;
        const damping = 0.80;

        const ax = (targetX - dot.x) * springK;
        const ay = (targetY - dot.y) * springK;

        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Dynamic radius scaling on hover (1.0px -> 3.2px)
        const targetRadius = dot.baseRadius + influence * 2.2;
        dot.currentRadius += (targetRadius - dot.currentRadius) * 0.22;

        // Dynamic alpha: 0 everywhere, only illuminates around cursor (spotlight reveal)
        const targetAlpha = influence > 0.01 ? Math.pow(influence, 1.3) * 0.95 : 0;
        dot.currentAlpha += (targetAlpha - dot.currentAlpha) * 0.22;

        // Only render dots that are actively illuminated by the cursor
        if (dot.currentAlpha > 0.015) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 38, 38, ${dot.currentAlpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      ctx.restore();
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[2] block w-full h-full"
    />
  );
};
