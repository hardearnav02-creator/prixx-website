// src/components/ui/AmbientBackground.tsx
// Luminous floating liquid glass gradients & tech grid mesh.
// Optimized for mobile: lightweight static glow on phones, full physics on desktop.
// Color Proportions: Black 40%, Dark Red 30%, White 20%, Blue 10%
// Inspired by Boon Global, Mind Robotics & Third Way

import { motion } from 'framer-motion';
import { ConstellationBonds } from './ConstellationBonds.tsx';

export const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070709]">
      {/* 1. Dark Red Atmospheric Glow Orbs (Desktop Animated / Mobile Static Lightweight) */}
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -70, 50, 0],
          scale: [1, 1.25, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden md:block absolute -top-[20%] -right-[15%] w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] rounded-full bg-radial from-[#DC2626]/20 via-[#991B1B]/10 to-transparent blur-[120px] will-change-transform"
      />

      <motion.div
        animate={{
          x: [0, -60, 70, 0],
          y: [0, 50, -40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="hidden md:block absolute -bottom-[18%] -left-[12%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-radial from-[#991B1B]/18 via-[#7F1D1D]/6 to-transparent blur-[110px] will-change-transform"
      />

      {/* Lightweight static ambient orbs for Mobile (Zero JS animation overhead) */}
      <div className="md:hidden absolute -top-[10%] -right-[20%] w-[80vw] h-[80vw] rounded-full bg-radial from-[#DC2626]/18 via-[#991B1B]/8 to-transparent blur-[60px]" />
      <div className="md:hidden absolute -bottom-[10%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-radial from-[#991B1B]/15 via-[#7F1D1D]/5 to-transparent blur-[50px]" />

      {/* 2. Dark Red Tech Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-15 md:opacity-20" />

      {/* 3. Antigravity-Inspired Off-White Constellation & Bonds Layer (Desktop Only) */}
      <ConstellationBonds />

      {/* 4. Deep Black Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#070709]/40 to-[#070709]/80" />

      {/* 5. Edge Highlight Borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
};
