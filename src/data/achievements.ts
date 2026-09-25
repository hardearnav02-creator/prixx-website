// src/data/achievements.ts
// Centralized, editable achievements dataset.
// Adding a new tournament podium or ranking only requires adding an entry here.

export interface Achievement {
  id: string;
  number: string;
  year: string;
  period: string;
  title: string;
  competition: string;
  result: string;
  badge: string;
  badgeColor: '#FF3333' | '#3366FF' | '#000000';
  accent: 'red' | 'blue';
  category: 'all' | 'robowar' | 'robocon' | 'russia' | 'hackathon';
  robot?: string;
  teamMembers?: string[];
  description?: string;
  highlights: Array<{
    tag: string;
    desc: string;
    tagColor: '#FF3333' | '#3366FF' | '#FFFFFF';
  }>;
  image?: string;
  video?: string;
  model3d?: string;
  media?: Array<{
    type: 'image' | 'video';
    id: string;
    title: string;
    subtitle: string;
    badge: string;
    badgeColor: string;
  }>;
}

export const achievements: Achievement[] = [
  {
    id: 'parul-60kg-championship',
    number: '01',
    year: '2025',
    period: '2025 // TOURNAMENT ARCHIVE',
    title: '60KG ROBOWAR — 1ST PRIZE & CHAMPIONS',
    competition: 'Parul University National Techfest',
    result: '1ST PLACE CHAMPIONS',
    badge: '1ST PRIZE',
    badgeColor: '#FF3333',
    accent: 'red',
    category: 'robowar',
    robot: 'Kaal Bahirav (60kg Heavyweight)',
    teamMembers: ['Sushant Barde', 'Sainath Biradar'],
    description: 'Catastrophic combat dominance in the national 60kg Heavyweight category with monocoque Hardox chassis.',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      {
        tag: '1ST PLACE CHAMPION',
        desc: 'Parul University 60kg Robowar title with Kaal Bahirav weapon system.',
        tagColor: '#FF3333'
      },
      {
        tag: 'HELL IN THE CELL',
        desc: 'Undefeated knockout run in 60kg cage combat brackets.',
        tagColor: '#3366FF'
      },
      {
        tag: 'HARDOX 500 ARMOR',
        desc: 'Full-impact survivability after 5 consecutive heavyweight collisions.',
        tagColor: '#FFFFFF'
      }
    ],
    media: [
      {
        type: 'image',
        id: 'PARUL-01',
        title: '60KG KNOCKOUT FINAL',
        subtitle: 'Kaal Bahirav kinetic rotor delivering 14.2 kJ impact vs cage rival',
        badge: 'COMBAT MATCH',
        badgeColor: '#FF3333'
      },
      {
        type: 'image',
        id: 'PARUL-02',
        title: 'PODIUM CEREMONY // PARUL 60KG',
        subtitle: 'Sushant & Sainath with Kaal Bahirav championship trophy',
        badge: 'PODIUM',
        badgeColor: '#3366FF'
      }
    ]
  },
  {
    id: 'robocon-stage1-air1',
    number: '02',
    year: '2025',
    period: '2025 // ROBOCON NATIONALS',
    title: 'DD ROBOCON INDIA STAGE-1 — ALL INDIA RANK 1 (AIR-1)',
    competition: 'DD Robocon India National Championship',
    result: 'ALL INDIA RANK 1 (100/100)',
    badge: 'AIR 1 // 100/100',
    badgeColor: '#3366FF',
    accent: 'blue',
    category: 'robocon',
    robot: 'Prixx Robocon Precision Manipulator',
    teamMembers: ['Vedant Bodekar', 'Raj Biharilal Mishra', 'Kulshresht Sirvi'],
    description: 'Perfect 100/100 score in national algorithm, mechanical design, and electronic controller architecture.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      {
        tag: 'ALL INDIA RANK 1',
        desc: 'Ranked #1 across all engineering institutions nationwide in Stage 1.',
        tagColor: '#3366FF'
      },
      {
        tag: 'PERFECT 100/100',
        desc: 'Zero-fault technical evaluation for algorithm, chassis, and electronics.',
        tagColor: '#FF3333'
      },
      {
        tag: 'STAGE 2 / STAGE 3 ADVANCE',
        desc: 'Consecutive qualifications securing AIR-4 and AIR-8 national finishes.',
        tagColor: '#FFFFFF'
      }
    ],
    media: [
      {
        type: 'image',
        id: 'ROBOCON-01',
        title: 'ROBOCON AIR-1 SCORECARD',
        subtitle: 'Official DD Robocon Stage-1 100/100 certificate & controller schematics',
        badge: 'CERTIFICATE',
        badgeColor: '#3366FF'
      }
    ]
  },
  {
    id: 'coep-mindspark-robowar',
    number: '03',
    year: '2025',
    period: '2025 // COEP MINDSPARK',
    title: 'COEP MINDSPARK \'25 ROBOWAR — 2ND PRIZE PODIUM',
    competition: 'COEP Technological University MindSpark',
    result: '2ND PRIZE PODIUM',
    badge: '2ND PRIZE',
    badgeColor: '#FF3333',
    accent: 'red',
    category: 'robowar',
    robot: 'Kaal Bahirav (Combat Heavyweight)',
    teamMembers: ['Sushant Barde'],
    description: 'Secured 2nd place in high-tier technical combats at one of Maharashtra\'s most competitive robotics competitions.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      {
        tag: 'COEP MINDSPARK \'25',
        desc: 'Runner-up trophy in national combat robowar category.',
        tagColor: '#FF3333'
      },
      {
        tag: 'WEAPON ENDURANCE',
        desc: '11,000 RPM disc survived full 3-minute high-impact final bout.',
        tagColor: '#3366FF'
      }
    ],
    media: [
      {
        type: 'image',
        id: 'COEP-01',
        title: 'MINDSPARK \'25 COMBAT FINAL',
        subtitle: 'Kaal Bahirav pinned against combat barrier during semifinals',
        badge: 'COMBAT ACTION',
        badgeColor: '#FF3333'
      }
    ]
  },
  {
    id: 'russia-winter-university',
    number: '04',
    year: '2025',
    period: '2025 // INTERNATIONAL EXPEDITION',
    title: 'RUSSIA WINTER UNIVERSITY INTL EXPEDITION — 2ND & 4TH PRIZE',
    competition: 'Yaroslav the Wise Novgorod State Technical University (Russia)',
    result: '2ND PRIZE AR/VR & 4TH PRIZE HARDWARE',
    badge: 'INTERNATIONAL DIPLOMA',
    badgeColor: '#3366FF',
    accent: 'blue',
    category: 'russia',
    robot: 'International Robotics Teleoperation Module',
    teamMembers: ['Tanish Chogale', 'Kulshresht Sirvi', 'Vedant Bodekar', 'Raj Mishra', 'Shanir Patil', 'Piyush Labde'],
    description: 'International delegate honors representing India at Novgorod State University in AR/VR and hardware tracks.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      {
        tag: '2ND PRIZE AR/VR',
        desc: 'Awarded by Novgorod State Technical University jury in immersive tech.',
        tagColor: '#3366FF'
      },
      {
        tag: '4TH PRIZE HARDWARE',
        desc: 'Field tested modular electronics under sub-zero testing regimes.',
        tagColor: '#FF3333'
      },
      {
        tag: 'INTERNATIONAL EXPEDITION',
        desc: 'Prixx operatives deployed on official international technical mission.',
        tagColor: '#FFFFFF'
      }
    ],
    media: [
      {
        type: 'image',
        id: 'RUSSIA-01',
        title: 'NOVGOROD STATE TECHNICAL UNIVERSITY DIPLOMA',
        subtitle: 'Prixx delegates at international delegation stage in Veliky Novgorod',
        badge: 'EXPEDITION',
        badgeColor: '#3366FF'
      },
      {
        type: 'image',
        id: 'RUSSIA-02',
        title: 'AR/VR TELEOPERATION SYSTEM DEMO',
        subtitle: 'Low-latency robot control headset demonstrated to jury',
        badge: 'DEMO',
        badgeColor: '#FF3333'
      }
    ]
  },
  {
    id: 'technothon-sumo-soccer',
    number: '05',
    year: '2026',
    period: '2026 // TECHNOTHON 2K26',
    title: 'TECHNOTHON 2K26 — SUMO CHAMPION & ROBO-SOCCER 2ND PRIZE',
    competition: 'Technothon 2K26 Inter-Collegiate Engineering Games',
    result: '1ST PRIZE SUMO & 2ND PRIZE SOCCER',
    badge: '1ST & 2ND PRIZE',
    badgeColor: '#FF3333',
    accent: 'red',
    category: 'hackathon',
    robot: 'Autonomous Sumo Bot & Omni Soccer Striker',
    teamMembers: ['Kulshresht Sirvi', 'Sharvari Mandale', 'Sainath Biradar'],
    description: 'Double podium victory claiming 1st place in Autonomous Sumo and 2nd place in Dynamic Robo-Soccer.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      {
        tag: 'SUMO CHAMPION',
        desc: 'Autonomous high-torque push tactics cleared ring without single defeat.',
        tagColor: '#FF3333'
      },
      {
        tag: 'ROBO-SOCCER 2ND PRIZE',
        desc: 'Omnidirectional pneumatic kicker striker clinched tournament runner-up.',
        tagColor: '#3366FF'
      }
    ],
    media: [
      {
        type: 'image',
        id: 'TECH-01',
        title: 'TECHNOTHON 2K26 DOUBLE PODIUM',
        subtitle: 'Sumo gold & soccer silver trophies captured at award stage',
        badge: 'PODIUM',
        badgeColor: '#FF3333'
      }
    ]
  },
  {
    id: 'symbiosis-kurukshetra',
    number: '06',
    year: '2025',
    period: '2025 // SYMBIOSIS KURUKSHETRA',
    title: 'SYMBIOSIS KURUKSHETRA & GDG CLOUD MUMBAI 2.0',
    competition: 'Symbiosis Kurukshetra & Google Developer Group Cloud AI Hackathon',
    result: '2ND PRIZE (₹25,000 CASH PRIZE)',
    badge: '₹25,000 PRIZE',
    badgeColor: '#3366FF',
    accent: 'blue',
    category: 'hackathon',
    robot: 'Prixx.AI Edge Cluster',
    teamMembers: ['Shanir Patil', 'Kulshresht Sirvi', 'Vedant Bodekar', 'Raj Mishra'],
    description: 'Runner-up finish earning ₹25k cash prize alongside Google Cloud Community AI accolades.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      {
        tag: '₹25,000 CASH AWARD',
        desc: 'Symbiosis Kurukshetra 2nd Prize awarded for edge tactical systems.',
        tagColor: '#3366FF'
      },
      {
        tag: 'GDG CLOUD 2.0',
        desc: 'Team Prixx.AI recognized for high-throughput sensor telemetry ingestion.',
        tagColor: '#FF3333'
      }
    ],
    media: [
      {
        type: 'image',
        id: 'SYM-01',
        title: 'SYMBIOSIS ₹25K PRIZE CEREMONY',
        subtitle: 'Shanir, Kulshresht & team receiving Kurukshetra prize cheque',
        badge: 'CASH PRIZE',
        badgeColor: '#3366FF'
      }
    ]
  },
  {
    id: 'arai-amtif-shikh-rakshak',
    number: '07',
    year: '2025',
    period: '2025 // NATIONAL DEFENSE EXPO',
    title: 'ARAI-AMTIF NAVIGYAN EXPO — PROJECT "SHIKH RAKSHAK"',
    competition: 'Automotive Research Association of India (ARAI-AMTIF)',
    result: 'SELECTED OFFICIAL REPRESENTATIVE',
    badge: 'DEFENSE EXPO',
    badgeColor: '#000000',
    accent: 'red',
    category: 'hackathon',
    robot: 'Project Shikh Rakshak Autonomous Rover',
    teamMembers: ['Shreya Boga', 'Priti Suryawanshi'],
    description: 'Official representative booth showcase at ARAI-AMTIF Navigyan Expo for critical defense rover systems.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      {
        tag: 'DEFENSE EXPO REPRESENTATIVE',
        desc: 'Demonstrated tactical rover mobility to automotive and defense luminaries.',
        tagColor: '#FF3333'
      },
      {
        tag: 'AMTIF VALIDATION',
        desc: 'Validated structural integrity under uneven terrain test matrices.',
        tagColor: '#3366FF'
      }
    ],
    media: [
      {
        type: 'image',
        id: 'ARAI-01',
        title: 'PROJECT SHIKH RAKSHAK EXPO BOOTH',
        subtitle: 'Shreya & Priti presenting defense rover prototype at ARAI-AMTIF',
        badge: 'EXPO BOOTH',
        badgeColor: '#000000'
      }
    ]
  }
];

export const arenaCategories = [
  { id: 'all', label: 'ALL 7 CAMPAIGNS' },
  { id: 'robowar', label: '60KG ROBOWAR & CAGE' },
  { id: 'robocon', label: 'ROBOCON AIR 1-8' },
  { id: 'russia', label: 'RUSSIA INTERNATIONAL' },
  { id: 'hackathon', label: 'HACKATHONS & SUMO' }
];
