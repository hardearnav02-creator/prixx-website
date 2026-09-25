// src/components/ui/AmbientBackground.tsx
// Luminous floating liquid glass gradients & tech grid mesh.
// Color Proportions: Black 40%, Dark Red 30%, White 20%, Blue 10%
// Inspired by Boon Global, Mind Robotics & Third Way

import { motion } from 'framer-motion';
import { ConstellationBonds } from './ConstellationBonds.tsx';

export const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070709]">
      {/* 1. Dark Red Atmospheric Glow Orbs (Deep Background Layer) */}
      <motion.div
        animate={{
          x: [0, 100, -80, 0],
          y: [0, -90, 70, 0],
          scale: [1, 1.4, 0.85, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[20%] -right-[15%] w-[65vw] h-[65vw] max-w-[1000px] max-h-[1000px] rounded-full bg-radial from-[#DC2626]/20 via-[#991B1B]/10 to-transparent blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -70, 90, 0],
          y: [0, 60, -50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="absolute -bottom-[18%] -left-[12%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full bg-radial from-[#991B1B]/18 via-[#7F1D1D]/6 to-transparent blur-[130px]"
      />

      {/* 2. Dark Red Tech Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-20" />

      {/* 3. Antigravity-Inspired Off-White Constellation & Bonds Layer */}
      <ConstellationBonds />

      {/* 4. Deep Black Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#070709]/40 to-[#070709]/80" />

      {/* 5. Edge Highlight Borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
};
