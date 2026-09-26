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
    fullLabel: '01 // WORKSHOP ARCHIVE',
    badge: 'HQ BAVDHAN',
    accent: 'black',
    routeHash: '#home'
  },
  {
    id: 'arena',
    number: '02',
    label: 'ACHIEVEMENTS',
    fullLabel: '02 // ARENA & PODIUMS',
    badge: '18+ PODIUMS',
    accent: 'red',
    routeHash: '#arena'
  },
  {
    id: 'pilots',
    number: '03',
    label: 'CREW',
    fullLabel: '03 // ENGINEERS & MENTORS',
    badge: '14 CORE + MENTORS',
    accent: 'blue',
    routeHash: '#pilots'
  },
  {
    id: 'projects',
    number: '04',
    label: 'MACHINES',
    fullLabel: '04 // BATTLEBOTS & LAB',
    badge: '60KG HARDOX // AIR-1',
    accent: 'black',
    routeHash: '#projects'
  },
  {
    id: 'connect',
    number: '05',
    label: 'SIGNAL',
    fullLabel: '05 // CONTACT & INQUIRY',
    badge: 'TRANSMIT',
    accent: 'red',
    routeHash: '#connect'
  }
];
