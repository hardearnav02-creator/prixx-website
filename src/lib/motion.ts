// src/lib/motion.ts
// Reusable motion variants for framer-motion adhering to liquid glassmorphism & spatial robotics.
// Inspired by Boon Global, Mind Robotics, and Third Way

export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    filter: 'blur(6px)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const glassHoverLift = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    transition: { type: 'spring', stiffness: 350, damping: 25 },
  },
  hover: {
    y: -6,
    scale: 1.015,
    boxShadow: '0 16px 45px 0 rgba(0, 240, 255, 0.2), 0 0 25px rgba(59, 130, 246, 0.25)',
    transition: { type: 'spring', stiffness: 350, damping: 25 },
  },
  tap: {
    y: 0,
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.05) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const revealUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
