// src/design/tokens.ts
// Centralized design tokens — all visual values flow from here.
// Color Palette: Black, Dark Red, White, and Blue

export const tokens = {
  color: {
    white: '#FFFFFF',
    black: '#000000',
    darkBg: '#030712',
    darkSurface: '#0B1120',
    electricBlue: '#2563EB',
    deepBlue: '#1E40AF',
    neonRuby: '#DC2626',
    crimson: '#991B1B',
    emeraldGlow: '#10B981',
    glassBg: 'rgba(255, 255, 255, 0.03)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
    glassBorderHover: 'rgba(255, 255, 255, 0.22)',
    grey: {
      50: '#F8F8F8',
      100: '#F0F0F0',
      200: '#E0E0E0',
      300: '#C0C0C0',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
  },

  space: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
    '6xl': '12rem',  // 192px
  },

  type: {
    display: {
      family: "'Space Grotesk', sans-serif",
      weight: 900,
      lineHeight: 0.9,
      letterSpacing: '-0.04em',
    },
    heading: {
      family: "'Space Grotesk', sans-serif",
      weight: 800,
      lineHeight: 0.95,
      letterSpacing: '-0.03em',
    },
    body: {
      family: "'Space Grotesk', -apple-system, sans-serif",
      weight: 400,
      lineHeight: 1.6,
      letterSpacing: '0em',
    },
    mono: {
      family: "'JetBrains Mono', monospace",
      weight: 700,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
    },
  },

  size: {
    xs: '0.625rem',   // 10px
    sm: '0.75rem',     // 12px
    base: '0.875rem',  // 14px
    md: '1rem',        // 16px
    lg: '1.25rem',     // 20px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    '3xl': '2.5rem',   // 40px
    '4xl': '3.5rem',   // 56px
    '5xl': '5rem',     // 80px
    '6xl': '7rem',     // 112px
    '7xl': '9rem',     // 144px
    hero: 'clamp(3.5rem, 9vw, 10rem)',
  },

  motion: {
    instant: 0.15,
    fast: 0.3,
    medium: 0.5,
    slow: 0.8,
    cinematic: 1.2,
    ease: {
      out: [0.16, 1, 0.3, 1] as const,
      inOut: [0.65, 0, 0.35, 1] as const,
      smooth: [0.25, 0.1, 0.25, 1] as const,
      spring: { type: 'spring' as const, stiffness: 350, damping: 28, mass: 0.8 },
      fluid: { type: 'spring' as const, stiffness: 220, damping: 24, mass: 1 },
    },
  },

  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1.25rem',
    xl: '1.75rem',
    full: '9999px',
  },
} as const;
