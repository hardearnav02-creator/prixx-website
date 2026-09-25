// src/data/media.ts
// Centralized media registry with graceful fallback rendering.
// When actual high-res images, 60fps clips, or .glb 3D files are added to public/media/,
// link them here or directly in team.ts / achievements.ts / projects.ts.

export interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'model3d';
  src?: string;
  fallbackPlaceholder: string;
  title: string;
  subtitle: string;
  aspectRatio?: string;
  badge?: string;
  badgeColor?: string;
}

export const mediaRegistry: Record<string, MediaAsset> = {
  heroVideo: {
    id: 'hero-video',
    type: 'video',
    src: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1400&q=80',
    fallbackPlaceholder: 'MATCH COMBAT FOOTAGE',
    title: 'COMPETITION REEL 2025-26',
    subtitle: '60kg Heavyweight, 15kg Farzand, and 8kg Kaal Bahirav championship highlights',
    aspectRatio: 'aspect-[21/9]',
    badge: 'HIGHLIGHTS REEL',
    badgeColor: '#3366FF'
  },
  testbenchVideo: {
    id: 'testbench-video',
    type: 'video',
    src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    fallbackPlaceholder: 'WEAPON ROTOR TESTBENCH',
    title: 'WEAPON ROTOR TESTBENCH',
    subtitle: 'Kinetic weapon spinup and telemetry validation',
    aspectRatio: 'aspect-video',
    badge: 'TESTBENCH',
    badgeColor: '#3366FF'
  },
  defaultRobotModel: {
    id: 'default-robot-model',
    type: 'model3d',
    src: '/models/your-model.stl',
    fallbackPlaceholder: '60KG COMBAT BOT',
    title: 'KAAL BAHIRAV 60KG',
    subtitle: 'High-torque kinetic disc combat robot with Hardox 500 armor',
    badge: '3D MODEL',
    badgeColor: '#FF3333'
  }
};
