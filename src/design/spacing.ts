// src/design/spacing.ts
// Spacing system tokens and layout utilities.

import { tokens } from './tokens';

export const spacing = {
  // Container max-widths
  container: {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[90rem]',
    full: 'w-full',
  },

  // Section padding presets
  sectionPadding: {
    hero: 'pt-20 pb-16 px-4 sm:px-8 md:px-12',
    standard: 'py-20 sm:py-28 px-4 sm:px-8 md:px-12',
    compact: 'py-12 sm:py-16 px-4 sm:px-8 md:px-12',
    cinematic: 'py-24 sm:py-36 px-4 sm:px-8 md:px-12',
  },

  // Grid gap presets
  gap: {
    tight: 'gap-3 sm:gap-4',
    default: 'gap-6 sm:gap-8',
    wide: 'gap-8 sm:gap-12',
    loose: 'gap-12 sm:gap-16',
  },

  tokens: tokens.space,
} as const;
