// src/design/index.ts
// Barrel export for the centralized design system.

export { tokens } from './tokens';
export { themes, sectionConfigs, getThemeForSection, getSectionConfig } from './themes';
export type { SectionTheme, SectionConfig } from './themes';
export { typography } from './typography';
export { motionTokens, createEntranceVariants, createStaggerContainer } from './motion';
export { spacing } from './spacing';
