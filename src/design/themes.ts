// src/design/themes.ts
// Section-level visual themes — each section adopts a liquid glass atmosphere.

export interface SectionTheme {
  id: string;
  background: string;
  foreground: string;
  accent: string;
  secondaryAccent: string;
  muted: string;
  border: string;
  surface: string;
  className: string;
}

export const themes: Record<string, SectionTheme> = {
  obsidian: {
    id: 'obsidian',
    background: '#030712',
    foreground: '#FFFFFF',
    accent: '#00F0FF',
    secondaryAccent: '#3B82F6',
    muted: 'rgba(255, 255, 255, 0.65)',
    border: 'rgba(255, 255, 255, 0.08)',
    surface: 'rgba(255, 255, 255, 0.03)',
    className: 'theme-obsidian',
  },
  ruby: {
    id: 'ruby',
    background: '#07030A',
    foreground: '#FFFFFF',
    accent: '#FF3366',
    secondaryAccent: '#00F0FF',
    muted: 'rgba(255, 255, 255, 0.65)',
    border: 'rgba(255, 51, 102, 0.15)',
    surface: 'rgba(255, 51, 102, 0.04)',
    className: 'theme-ruby',
  },
  electric: {
    id: 'electric',
    background: '#020617',
    foreground: '#FFFFFF',
    accent: '#3B82F6',
    secondaryAccent: '#00F0FF',
    muted: 'rgba(255, 255, 255, 0.65)',
    border: 'rgba(59, 130, 246, 0.15)',
    surface: 'rgba(59, 130, 246, 0.04)',
    className: 'theme-electric',
  },
};

export interface SectionConfig {
  id: string;
  theme: string;
  layout: 'editorial' | 'cinematic' | 'spatial' | 'horizontal' | 'vertical' | 'layered' | 'immersive' | 'minimal';
  motionIntensity: 'low' | 'medium' | 'high';
}

export const sectionConfigs: SectionConfig[] = [
  { id: 'home', theme: 'obsidian', layout: 'immersive', motionIntensity: 'high' },
  { id: 'arena', theme: 'electric', layout: 'cinematic', motionIntensity: 'high' },
  { id: 'pilots', theme: 'obsidian', layout: 'spatial', motionIntensity: 'medium' },
  { id: 'projects', theme: 'electric', layout: 'editorial', motionIntensity: 'medium' },
  { id: 'connect', theme: 'ruby', layout: 'minimal', motionIntensity: 'medium' },
];

export function getThemeForSection(sectionId: string): SectionTheme {
  const config = sectionConfigs.find((s) => s.id === sectionId);
  const themeKey = config?.theme || 'obsidian';
  return themes[themeKey] || themes.obsidian;
}
