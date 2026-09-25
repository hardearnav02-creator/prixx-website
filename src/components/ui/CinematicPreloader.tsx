// src/components/ui/CinematicPreloader.tsx
// Cinematic soundless opening sequence for Prixx Robotics.
// Inspired by Boon Global & Mind Robotics

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicPreloaderProps {
  onComplete: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    // Skip preloader entirely on mobile to save 2.6s load time
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase(1), 300);   // Letter assembly
    const t2 = setTimeout(() => setPhase(2), 1000);  // Pulse tagline
    const t3 = setTimeout(() => setPhase(3), 1800);  // Monumental reveal
    const t4 = setTimeout(() => {
      setPhase(4);
      onComplete();
    }, 2600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] text-white flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none cursor-pointer"
          onClick={onComplete}
        >
          {/* Ambient Glow in preloader */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-blue-700/15 rounded-full blur-[130px] pointer-events-none" />

          {/* Top Status */}
          <div className="flex items-center justify-between font-mono text-xs text-white/50 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              className="flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#DC2626]" />
              <span className="text-red-600 font-bold">PRIXX // EXHIBITION PRELUDE</span>
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              className="text-[10px] tracking-widest uppercase font-bold text-white/40"
            >
              [CLICK ANYWHERE OR PRESS ESC TO SKIP]
            </motion.span>
          </div>

          {/* Central Typography Assembly */}
          <div className="max-w-5xl mx-auto w-full space-y-6 text-center sm:text-left relative z-10">
            {phase === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-sm sm:text-base tracking-[0.6em] text-red-600 font-bold"
              >
                P · R · I · X · X
              </motion.div>
            )}

            {phase === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-2"
              >
                <div className="font-mono text-xs text-red-600 uppercase tracking-widest font-bold">
                  // 11,000 RPM · HARDOX 500 · OPERATIVES
                </div>
                <div className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
                  MACHINES HAVE WEIGHT.
                </div>
              </motion.div>
            )}

            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-white uppercase text-gradient-silver">
                  PRIXX <br />
                  <span className="text-gradient-ruby">ROBOTICS</span>
                </h1>
                <div className="font-mono text-sm sm:text-base font-bold text-red-600 tracking-widest uppercase">
                  EDITION 25—26 // PUNE, INDIA
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom telemetry line */}
          <div className="flex items-center justify-between font-mono text-[10px] text-white/40 border-t border-white/10 pt-4 relative z-10">
            <span>BAVDHAN CAMPUS HQ</span>
            <span className="text-red-600/70">INITIALIZING LIQUID GLASS ENGINE...</span>
            <span>2026 ARCHIVE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
