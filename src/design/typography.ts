// src/design/typography.ts
// Typography presets and scale definitions for the editorial system.

import { tokens } from './tokens';

export const typography = {
  // Monumental editorial displays
  heroDisplay: {
    fontFamily: tokens.type.display.family,
    fontWeight: tokens.type.display.weight,
    fontSize: tokens.size.hero,
    lineHeight: tokens.type.display.lineHeight,
    letterSpacing: tokens.type.display.letterSpacing,
    textTransform: 'uppercase' as const,
  },

  // Large section headlines
  sectionHeading: {
    fontFamily: tokens.type.heading.family,
    fontWeight: tokens.type.heading.weight,
    fontSize: 'clamp(2.5rem, 7vw, 6rem)',
    lineHeight: tokens.type.heading.lineHeight,
    letterSpacing: tokens.type.heading.letterSpacing,
    textTransform: 'uppercase' as const,
  },

  // Architectural year / numbering displays
  architecturalNumber: {
    fontFamily: tokens.type.display.family,
    fontWeight: 900,
    fontSize: 'clamp(5rem, 15vw, 12rem)',
    lineHeight: 0.82,
    letterSpacing: '-0.05em',
    textTransform: 'uppercase' as const,
  },

  // Editorial lead paragraph
  editorialLead: {
    fontFamily: tokens.type.mono.family,
    fontWeight: 700,
    fontSize: 'clamp(0.875rem, 1.5vw, 1.25rem)',
    lineHeight: 1.5,
    letterSpacing: '-0.01em',
  },

  // Technical metadata label
  technicalLabel: {
    fontFamily: tokens.type.mono.family,
    fontWeight: 800,
    fontSize: tokens.size.xs,
    lineHeight: tokens.type.caption.lineHeight,
    letterSpacing: tokens.type.caption.letterSpacing,
    textTransform: 'uppercase' as const,
  },

  // Data value display
  dataValue: {
    fontFamily: tokens.type.display.family,
    fontWeight: 900,
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    lineHeight: 1,
    letterSpacing: '-0.03em',
  },
} as const;
