// src/components/ui/CustomCursor.tsx
// Precision Cybernetic Line Tracking & Crosshair Cursor
// Full-axis hairline tracking lines + tactical open crosshair reticle with spring physics.
// Color Proportions: Dark Red 30% (#DC2626 / #7F1D1D), Black 40%, White 20%, Blue 10%
// Inspired by Mind Robotics & Call of Code.

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<{
    text: string;
    isHovered: boolean;
    isDragging: boolean;
  }>({
    text: '',
    isHovered: false,
    isDragging: false,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice] = useState(() =>
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );

  useEffect(() => {
    if (isTouchDevice) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorState({
          text,
          isHovered: true,
          isDragging: text === 'DRAG' || text === 'GRAB',
        });
      } else {
        const isClickable = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"]')
        );
        setCursorState({
          text: '',
          isHovered: isClickable,
          isDragging: false,
        });
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* 1. HORIZONTAL FULL-AXIS LINE TRACKER */}
      <motion.div
        className="fixed pointer-events-none z-[9990] left-0 right-0 h-px select-none"
        style={{
          background: cursorState.isHovered
            ? 'linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.05) 20%, rgba(220,38,38,0.45) 50%, rgba(220,38,38,0.05) 80%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 25%, rgba(220,38,38,0.25) 50%, rgba(255,255,255,0.03) 75%, transparent 100%)',
        }}
        animate={{
          y: mousePosition.y,
        }}
        transition={{
          type: 'spring',
          damping: 45,
          stiffness: 950,
          mass: 0.05,
        }}
      />

      {/* 2. VERTICAL FULL-AXIS LINE TRACKER */}
      <motion.div
        className="fixed pointer-events-none z-[9990] top-0 bottom-0 w-px select-none"
        style={{
          background: cursorState.isHovered
            ? 'linear-gradient(180deg, transparent 0%, rgba(220,38,38,0.05) 20%, rgba(220,38,38,0.45) 50%, rgba(220,38,38,0.05) 80%, transparent 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 25%, rgba(220,38,38,0.25) 50%, rgba(255,255,255,0.03) 75%, transparent 100%)',
        }}
        animate={{
          x: mousePosition.x,
        }}
        transition={{
          type: 'spring',
          damping: 45,
          stiffness: 950,
          mass: 0.05,
        }}
      />

      {/* 3. CENTER TACTICAL LINE CROSSHAIR RETICLE */}
      <motion.div
        className="fixed pointer-events-none z-[9999] top-0 left-0 -translate-x-1/2 -translate-y-1/2 select-none flex items-center justify-center"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: cursorState.isHovered ? 1.25 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 600,
          mass: 0.1,
        }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Top Line Tick */}
          <motion.div
            className={`absolute top-0 w-px transition-colors duration-150 ${
              cursorState.isHovered ? 'bg-red-500 shadow-[0_0_8px_#DC2626]' : 'bg-red-500/80'
            }`}
            animate={{
              height: cursorState.isHovered ? 8 : 6,
              y: cursorState.isHovered ? -3 : 0,
            }}
          />

          {/* Bottom Line Tick */}
          <motion.div
            className={`absolute bottom-0 w-px transition-colors duration-150 ${
              cursorState.isHovered ? 'bg-red-500 shadow-[0_0_8px_#DC2626]' : 'bg-red-500/80'
            }`}
            animate={{
              height: cursorState.isHovered ? 8 : 6,
              y: cursorState.isHovered ? 3 : 0,
            }}
          />

          {/* Left Line Tick */}
          <motion.div
            className={`absolute left-0 h-px transition-colors duration-150 ${
              cursorState.isHovered ? 'bg-red-500 shadow-[0_0_8px_#DC2626]' : 'bg-red-500/80'
            }`}
            animate={{
              width: cursorState.isHovered ? 8 : 6,
              x: cursorState.isHovered ? -3 : 0,
            }}
          />

          {/* Right Line Tick */}
          <motion.div
            className={`absolute right-0 h-px transition-colors duration-150 ${
              cursorState.isHovered ? 'bg-red-500 shadow-[0_0_8px_#DC2626]' : 'bg-red-500/80'
            }`}
            animate={{
              width: cursorState.isHovered ? 8 : 6,
              x: cursorState.isHovered ? 3 : 0,
            }}
          />

          {/* Center Precision Dot */}
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
              cursorState.isHovered
                ? 'bg-white shadow-[0_0_12px_#FFFFFF] scale-125'
                : 'bg-red-600 shadow-[0_0_10px_#DC2626]'
            }`}
          />
        </div>

        {/* Tactical Text Badge on hover */}
        {cursorState.text && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10, y: 10 }}
            animate={{ opacity: 1, scale: 1, x: 24, y: 18 }}
            className="absolute left-0 top-0 px-2.5 py-1 text-[10px] font-mono font-bold text-white glass-pill border border-red-500/50 bg-black/90 tracking-wider uppercase whitespace-nowrap shadow-[0_4px_16px_rgba(220,38,38,0.4)]"
          >
            {cursorState.text}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};
