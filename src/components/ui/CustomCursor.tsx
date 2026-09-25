// src/components/ui/CustomCursor.tsx
// Minimal Brutalist Line Tracking Cursor
// Full-axis hairline tracking lines following the cursor position across the viewport.
// Zero extra reticles, dots, or badges — pure tracking lines.

import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const horizontalLineRef = useRef<HTMLDivElement | null>(null);
  const verticalLineRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Exclude touch devices completely
    if (typeof window === 'undefined' || 'ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const horizontalLine = horizontalLineRef.current;
    const verticalLine = verticalLineRef.current;
    const container = containerRef.current;
    if (!horizontalLine || !verticalLine || !container) return;

    let isVisible = false;
    let targetX = -100;
    let targetY = -100;
    let isHovered = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        container.style.opacity = '1';
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        isHovered = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], [data-cursor]')
        );
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      container.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      container.style.opacity = '1';
    };

    const updateLoop = () => {
      if (isVisible) {
        horizontalLine.style.transform = `translate3d(0, ${targetY}px, 0)`;
        verticalLine.style.transform = `translate3d(${targetX}px, 0, 0)`;

        if (isHovered) {
          horizontalLine.style.background =
            'linear-gradient(90deg, transparent 0%, rgba(220, 38, 38, 0.1) 20%, rgba(220, 38, 38, 0.6) 50%, rgba(220, 38, 38, 0.1) 80%, transparent 100%)';
          verticalLine.style.background =
            'linear-gradient(180deg, transparent 0%, rgba(220, 38, 38, 0.1) 20%, rgba(220, 38, 38, 0.6) 50%, rgba(220, 38, 38, 0.1) 80%, transparent 100%)';
        } else {
          horizontalLine.style.background =
            'linear-gradient(90deg, transparent 0%, rgba(220, 38, 38, 0.05) 30%, rgba(220, 38, 38, 0.35) 50%, rgba(220, 38, 38, 0.05) 70%, transparent 100%)';
          verticalLine.style.background =
            'linear-gradient(180deg, transparent 0%, rgba(220, 38, 38, 0.05) 30%, rgba(220, 38, 38, 0.35) 50%, rgba(220, 38, 38, 0.05) 70%, transparent 100%)';
        }
      }
      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9990] select-none transition-opacity duration-300 opacity-0"
    >
      {/* Horizontal tracking line following cursor Y */}
      <div
        ref={horizontalLineRef}
        className="absolute top-0 left-0 right-0 h-px will-change-transform"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(220, 38, 38, 0.05) 30%, rgba(220, 38, 38, 0.35) 50%, rgba(220, 38, 38, 0.05) 70%, transparent 100%)',
        }}
      />

      {/* Vertical tracking line following cursor X */}
      <div
        ref={verticalLineRef}
        className="absolute top-0 bottom-0 left-0 w-px will-change-transform"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(220, 38, 38, 0.05) 30%, rgba(220, 38, 38, 0.35) 50%, rgba(220, 38, 38, 0.05) 70%, transparent 100%)',
        }}
      />
    </div>
  );
};
