// src/data/site.ts
// Centralized, editable site configuration and editorial copy.
// Modify this file to update branding, hero typography, descriptions, and CTA labels without touching components.

export interface SiteContent {
  brand: {
    name: string;
    edition: string;
    tagline: string;
    hqLocation: string;
    establishedYear: string;
  };
  hero: {
    title: string;
    subtitle: string;
    edition: string;
    description: string;
    systemStatus: string;
    ctaPrimary: string;
    ctaSecondary: string;
    bRollTitle: string;
    bRollSubtitle: string;
    tags: Array<{
      label: string;
      accent: 'black' | 'red' | 'blue';
    }>;
  };
  metrics: Array<{
    value: string;
    label: string;
    sub: string;
    accent: 'red' | 'blue' | 'black';
  }>;
  hardwareTelemetry: Array<{
    label: string;
    value: string;
    detail: string;
    accent: 'red' | 'blue' | 'black';
  }>;
  signal: {
    eyebrow: string;
    headline: string;
    subtext: string;
    terminalTitle: string;
    terminalPort: string;
    responseGuarantee: string;
  };
  colophon: {
    copyright: string;
    principles: string;
  };
}

export const siteContent: SiteContent = {
  brand: {
    name: 'PRIXX ROBOTICS',
    edition: 'STRANGER THAN FRICTION',
    tagline: 'COMBAT ROBOTICS EXHIBITION & ENGINEERING LAB',
    hqLocation: 'PVPIT BAVDHAN, PUNE, INDIA',
    establishedYear: '2025'
  },
  hero: {
    title: 'PRIXX',
    subtitle: 'ROBOTICS',
    edition: 'stranger than friction',
    description:
      'WE ENGINEER SOLID HARDWARE FOR CATASTROPHIC COMBAT DESTRUCTION. FROM 1.5 KG INTERNATIONAL COMBAT IN RUSSIA TO 60 KG HEAVYWEIGHT MONSTERS AND 100/100 ROBOCON CONTROLLERS.',
    systemStatus: 'OPERATIONAL',
    ctaPrimary: 'ENTER THE ACHIEVEMENTS',
    ctaSecondary: 'VIEW MEMBERS',
    bRollTitle: 'COMBAT HIGHLIGHTS REEL',
    bRollSubtitle: 'Full-width highlights of 60kg Heavyweight, 15kg Farzand, and 8kg Kaal Bahirav impacts',
    tags: [
      { label: 'PVPIT BAVDHAN PUNE', accent: 'black' },
      { label: '24+ EVENTS // 18+ PODIUMS', accent: 'red' },
      { label: 'AIR 1 ROBOCON STAGE-1 (100/100)', accent: 'blue' }
    ]
  },
  metrics: [
    { value: '18+', label: 'COMPETITION PODIUMS', sub: 'STATE & NATIONAL', accent: 'red' },
    { value: 'AIR 1', label: 'ROBOCON STAGE-1', sub: 'PERFECT 100/100', accent: 'blue' },
    { value: '60 KG', label: 'HEAVYWEIGHT BOT', sub: 'PARUL 1ST PRIZE', accent: 'red' },
    { value: 'RUSSIA', label: 'INTL EXPEDITION', sub: 'NOVGOROD STATE UNIV', accent: 'blue' }
  ],
  hardwareTelemetry: [
    { label: 'WEAPON KINETIC ENERGY', value: '14.2 kJ', detail: '60KG Hardox Disc Rotor', accent: 'red' },
    { label: 'TIP VELOCITY', value: '240 MPH', detail: '11,000 RPM Tool Steel Tooth', accent: 'blue' },
    { label: 'CONTROL LATENCY', value: '< 4.2 ms', detail: 'Direct RF Telemetry Link', accent: 'black' },
    { label: 'ARMOR GRADE', value: 'HARDOX 500', detail: 'CNC Monocoque Chassis', accent: 'red' }
  ],
  signal: {
    eyebrow: 'CHAPTER 05 // CONNECT',
    headline: 'STRONGER THAN FRICTION',
    subtext: 'PVPIT Bavdhan campus coordinates, communication channels, sponsor inquiries, and kinetic hardware testbench.',
    terminalTitle: 'INQUIRY TERMINAL',
    terminalPort: 'ACTIVE',
    responseGuarantee: 'Prixx Robotics leadership will respond within 24 hours.'
  },
  colophon: {
    copyright: '© 2025–2026 PRIXX ROBOTICS · PVPIT BAVDHAN, PUNE. ALL RIGHTS RESERVED.',
    principles: 'CREATED BY - ARNAV HARDE'
  }
};
