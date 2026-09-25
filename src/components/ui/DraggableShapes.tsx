// src/components/ui/DraggableShapes.tsx
// Physical, tactile solid red (#FF3333), blue (#3366FF), and black mechanical geometric shapes
// with Framer Motion spring physics, momentum, drag elasticity, and cursor interactivity.

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const DraggableShapes = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none"
      aria-hidden="true"
    >
      {/* Object 1: Solid Vibrant Red Circle ("14.2 kJ") */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.28}
        dragTransition={{ bounceStiffness: 450, bounceDamping: 25 }}
        whileHover={{ scale: 1.08 }}
        whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
        initial={{ x: '72vw', y: '8vh', rotate: 12 }}
        animate={{
          y: ['8vh', '12vh', '8vh'],
          rotate: [12, -8, 12],
          transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="absolute pointer-events-auto w-24 h-24 sm:w-32 sm:h-32 bg-[#FF3333] text-white border-4 border-black rounded-full flex flex-col items-center justify-center font-mono font-black text-center cursor-grab select-none shadow-brutal-black z-20"
        data-cursor="GRAB"
        data-cursor-color="#FF3333"
      >
        <span className="text-base sm:text-xl font-display leading-none">14.2 kJ</span>
        <span className="text-[9px] uppercase tracking-tighter text-white/90">KINETIC ROTOR</span>
      </motion.div>

      {/* Object 2: Solid Electric Blue Box ("HARDOX 500") */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.28}
        dragTransition={{ bounceStiffness: 450, bounceDamping: 25 }}
        whileHover={{ scale: 1.08 }}
        whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
        initial={{ x: '84vw', y: '42vh', rotate: -15 }}
        animate={{
          y: ['42vh', '38vh', '42vh'],
          rotate: [-15, 10, -15],
          transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="absolute pointer-events-auto w-28 h-28 sm:w-36 sm:h-36 bg-[#3366FF] text-white border-4 border-black flex flex-col items-center justify-center p-3 font-mono font-black text-center cursor-grab select-none shadow-brutal-black z-20"
        data-cursor="GRAB"
        data-cursor-color="#3366FF"
      >
        <span className="text-sm sm:text-base font-display uppercase leading-tight">HARDOX 500</span>
        <span className="text-[8px] sm:text-[9px] uppercase tracking-tighter text-white/90 mt-1">ARMOR MONOCOQUE</span>
      </motion.div>

      {/* Object 3: Black Mechanical Block ("60KG CLASS") */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.28}
        dragTransition={{ bounceStiffness: 450, bounceDamping: 25 }}
        whileHover={{ scale: 1.08 }}
        whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
        initial={{ x: '5vw', y: '16vh', rotate: -6 }}
        animate={{
          y: ['16vh', '20vh', '16vh'],
          rotate: [-6, 6, -6],
          transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="absolute pointer-events-auto w-24 h-24 sm:w-28 sm:h-28 bg-black text-white border-4 border-black flex flex-col items-center justify-center p-2 font-mono font-black text-center cursor-grab select-none shadow-brutal-black z-20"
        data-cursor="GRAB"
        data-cursor-color="#000000"
      >
        <span className="text-xs text-[#FF3333] uppercase">CLASS</span>
        <span className="text-lg font-display uppercase">60 KG</span>
        <span className="text-[8px] text-white/70 uppercase">HEAVYWEIGHT</span>
      </motion.div>

      {/* Object 4: Solid Vibrant Red Pill ("11,000 RPM") */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.28}
        dragTransition={{ bounceStiffness: 450, bounceDamping: 25 }}
        whileHover={{ scale: 1.08 }}
        whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
        initial={{ x: '8vw', y: '68vh', rotate: -8 }}
        animate={{
          y: ['68vh', '72vh', '68vh'],
          rotate: [-8, 6, -8],
          transition: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="absolute pointer-events-auto px-5 py-2.5 sm:px-6 sm:py-3 bg-[#FF3333] text-white border-4 border-black rounded-full flex items-center gap-2 font-mono font-black text-center cursor-grab select-none shadow-brutal-black z-20"
        data-cursor="GRAB"
        data-cursor-color="#FF3333"
      >
        <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
        <span className="text-xs sm:text-sm uppercase tracking-wider">11,000 RPM WEAPON</span>
      </motion.div>

      {/* Object 5: Numbered Tag Marker ("[NO. 01]") */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.28}
        dragTransition={{ bounceStiffness: 450, bounceDamping: 25 }}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
        initial={{ x: '88vw', y: '75vh', rotate: 18 }}
        animate={{
          y: ['75vh', '71vh', '75vh'],
          rotate: [18, 8, 18],
          transition: { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="absolute pointer-events-auto px-3.5 py-1.5 bg-white text-black border-4 border-black font-mono font-black text-xs uppercase cursor-grab select-none shadow-brutal-black z-20"
        data-cursor="GRAB"
        data-cursor-color="#3366FF"
      >
        <span className="text-[#3366FF]">[NO. 01]</span> PRIXX CAD
      </motion.div>
    </div>
  );
};
