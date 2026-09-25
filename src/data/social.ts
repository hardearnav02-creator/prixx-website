// src/data/social.ts
// Centralized, editable contact points, social channels, and HQ coordinates.

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  detail: string;
  category: 'direct' | 'social' | 'campus';
  isExternal: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'email',
    label: 'EMAIL: ARNAV@PRIXXROBOTICS.COM',
    url: 'mailto:arnav@prixxrobotics.com',
    detail: 'Official Inquiries & Sponsorships',
    category: 'direct',
    isExternal: false
  },
  {
    id: 'phone',
    label: 'PHONE: +91 (PVPIT-HQ)',
    url: 'tel:+919876543210',
    detail: 'PVPIT Robotics Lab Direct Line',
    category: 'direct',
    isExternal: false
  },
  {
    id: 'campus',
    label: 'CAMPUS: BAVDHAN, PUNE',
    url: 'https://maps.google.com/?q=PVPIT+Bavdhan+Pune',
    detail: 'PVPIT Campus Innovation Workshop',
    category: 'campus',
    isExternal: true
  },
  {
    id: 'instagram',
    label: 'INSTAGRAM: @PRIXXROBOTICS',
    url: 'https://instagram.com/prixxrobotics',
    detail: 'Behind-The-Scenes Machining & Welds',
    category: 'social',
    isExternal: true
  },
  {
    id: 'youtube',
    label: 'YOUTUBE: MATCH REELS',
    url: 'https://youtube.com/@prixxrobotics',
    detail: 'Match Highlights & Testing',
    category: 'social',
    isExternal: true
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN: PRIXX-PVPIT',
    url: 'https://linkedin.com/company/prixx-robotics',
    detail: 'Engineering Publications & Delegations',
    category: 'social',
    isExternal: true
  }
];
