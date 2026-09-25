// src/data/navigation.ts
// Centralized, editable navigation architecture and chapter matrix.

export interface NavItem {
  id: string;
  number: string;
  label: string;
  fullLabel: string;
  badge?: string;
  accent: 'red' | 'blue' | 'black';
  routeHash: string;
}

export const navigationItems: NavItem[] = [
  {
    id: 'home',
    number: '01',
    label: 'ENTRY',
    fullLabel: '01 // THE ENTRY',
    badge: 'HQ',
    accent: 'black',
    routeHash: '#home'
  },
  {
    id: 'arena',
    number: '02',
    label: 'ACHIEVEMENTS',
    fullLabel: '02 // ACHIEVEMENTS',
    badge: 'PODIUM LOGS',
    accent: 'red',
    routeHash: '#arena'
  },
  {
    id: 'pilots',
    number: '03',
    label: 'MEMBERS',
    fullLabel: '03 // MEMBERS',
    badge: 'VERIFIED',
    accent: 'blue',
    routeHash: '#pilots'
  },
  {
    id: 'projects',
    number: '04',
    label: 'PROJECTS',
    fullLabel: '04 // ROBOTICS LAB',
    badge: '60KG & HARDOX',
    accent: 'black',
    routeHash: '#projects'
  },
  {
    id: 'connect',
    number: '05',
    label: 'SIGNAL',
    fullLabel: '05 // THE SIGNAL',
    badge: 'TRANSMIT',
    accent: 'red',
    routeHash: '#connect'
  }
];
