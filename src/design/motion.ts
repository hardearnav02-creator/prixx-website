// src/design/motion.ts
// Centralized motion system — micro, medium, large animation presets.

import { tokens } from './tokens';

export const motionTokens = {
  // Micro interactions (hover, tap, cursor)
  micro: {
    duration: tokens.motion.fast,
    ease: tokens.motion.ease.out,
    spring: tokens.motion.ease.tactile,
  },

  // Medium interactions (reveals, transitions, cards)
  medium: {
    duration: tokens.motion.medium,
    ease: tokens.motion.ease.out,
    spring: tokens.motion.ease.spring,
  },

  // Large interactions (page transitions, camera moves, scene transforms)
  large: {
    duration: tokens.motion.slow,
    ease: tokens.motion.ease.inOut,
    spring: tokens.motion.ease.heavy,
  },

  // Cinematic full-screen transitions
  cinematic: {
    duration: tokens.motion.cinematic,
    ease: [0.16, 1, 0.3, 1] as const,
  },
} as const;

// Framer Motion variant factories
export const createEntranceVariants = (direction: 'up' | 'down' | 'left' | 'right' | 'scale' = 'up', delay = 0) => {
  const offsets = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    scale: { scale: 0.94, opacity: 0 },
  };

  const initial = direction === 'scale'
    ? offsets.scale
    : { opacity: 0, ...offsets[direction] };

  return {
    initial,
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: tokens.motion.medium,
        ease: tokens.motion.ease.out,
        delay,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: tokens.motion.fast },
    },
  };
};

export const createStaggerContainer = (staggerChildren = 0.08, delayChildren = 0.05) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
