// src/components/ui/CustomCursor.tsx
// Minimal Luminous Ruby Dot Cursor
// Pure glowing dot tracking mouse coordinates without trailing line / ribbon geometry.

import React, { useEffect, useRef } from 'react';

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

    let targetX = width / 2;
    let targetY = height / 2;
    let currentX = width / 2;
    let currentY = height / 2;
    let hasMoved = false;
    let isVisible = false;
    let animId = 0;
    let isTabVisible = true;

    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isVisible = true;

      if (!hasMoved) {
        hasMoved = true;
        currentX = targetX;
        currentY = targetY;
      }

      wakeUp();
    };

    const onPointerLeave = () => {
      isVisible = false;
      wakeUp();
    };

    const onPointerEnter = () => {
      isVisible = true;
      wakeUp();
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

    const wakeUp = () => {
      if (!animId && isTabVisible) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const renderLoop = () => {
      animId = 0;
      if (!isTabVisible) return;

      ctx.clearRect(0, 0, width, height);

      if (hasMoved && isVisible) {
        // Fast & fluid interpolation for responsive dot tracking
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        currentX += dx * 0.45;
        currentY += dy * 0.45;

        // Draw outer luminous ruby glow
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220, 38, 38, 0.95)';
        ctx.shadowColor = 'rgba(220, 38, 38, 0.85)';
        ctx.shadowBlur = 6;
        ctx.fill();

        // Draw inner crisp core
        ctx.beginPath();
        ctx.arc(currentX, currentY, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.fill();

        // Keep rendering while mouse is active or moving
        const dist = Math.hypot(dx, dy);
        if (dist > 0.05 || isVisible) {
          animId = requestAnimationFrame(renderLoop);
        }
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('mouseleave', onPointerLeave);
    document.addEventListener('mouseenter', onPointerEnter);
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('mouseleave', onPointerLeave);
      document.removeEventListener('mouseenter', onPointerEnter);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-cursor-dot="hero"
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
