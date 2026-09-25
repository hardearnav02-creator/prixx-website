// src/lib/animations.ts
// Central motion configuration and physics constants.
// Do not scatter random animation values throughout components.

export const motionConfig = {
  duration: {
    instant: 0.15,
    fast: 0.25,
    medium: 0.5,
    slow: 0.9,
    cinematic: 1.4
  },
  ease: {
    // Brutalist snappy easing (hard acceleration, sharp deceleration, zero mush)
    brutal: [0.22, 1, 0.36, 1],
    sharp: [0.16, 1, 0.3, 1],
    anticipate: [0.38, 0.005, 0.215, 1],
    linear: [0, 0, 1, 1]
  },
  spring: {
    tactile: {
      type: 'spring',
      stiffness: 450,
      damping: 28,
      mass: 0.8
    },
    heavy: {
      type: 'spring',
      stiffness: 280,
      damping: 22,
      mass: 1.4
    },
    bouncy: {
      type: 'spring',
      stiffness: 350,
      damping: 18,
      mass: 0.9
    },
    drag: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
      mass: 0.6
    }
  },
  // Hard offset brutalist shadow presets (NO blur, NO glow)
  shadows: {
    blackSm: '2px 2px 0px 0px #000000',
    blackMd: '4px 4px 0px 0px #000000',
    blackLg: '6px 6px 0px 0px #000000',
    blackXl: '8px 8px 0px 0px #000000',
    whiteSm: '2px 2px 0px 0px #FFFFFF',
    whiteMd: '4px 4px 0px 0px #FFFFFF',
    whiteLg: '6px 6px 0px 0px #FFFFFF',
    redMd: '4px 4px 0px 0px #FF3333',
    blueMd: '4px 4px 0px 0px #3366FF'
  }
} as const;
