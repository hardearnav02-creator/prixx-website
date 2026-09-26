// src/data/projects.ts
// Centralized, editable hardware projects and combat robots dataset.
// Future robots and 3D models (.glb) can be registered here directly.

export interface Project {
  id: string;
  roman: string;
  name: string;
  code: string;
  category: string;
  weightClass: string;
  description: string;
  year: string;
  image?: string;
  video?: string;
  model3d?: string;
  team?: string[];
  achievements?: string[];
  accent: 'red' | 'blue' | 'amber';
  editorialLeft?: string;
  editorialRight?: string;
  specs: Array<{ label: string; value: string }>;
}

export const projects: Project[] = [
  {
    id: 'kaal-bahirav',
    roman: '(I)',
    name: 'KAAL BAHIRAV',
    code: 'KB-60',
    category: 'Kinetic Heavyweight Combat Robot',
    weightClass: '60 KG HEAVYWEIGHT',
    description: 'High-torque kinetic disc combat robot forged from CNC-milled Hardox 500 monocoque armor. Built for catastrophic weapon impact delivering 14.2 kJ of rotational kinetic energy in national heavyweight brackets.',
    year: '2025',
    model3d: '/models/your-model.stl',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    team: ['Sushant Barde', 'Sainath Biradar'],
    achievements: ['1st Prize Parul 60kg Robowar', '2nd Prize COEP MindSpark \'25'],
    accent: 'red',
    editorialLeft: 'FORGED IN 14-DAY WORKSHOP SPRINTS AT BAVDHAN.',
    editorialRight: '14.2 KJ ROTATIONAL IMPACT // HARDOX 500 MONOCOQUE CHASSIS.',
    specs: [
      { label: 'DISC WEAPON RPM', value: '11,000 RPM' },
      { label: 'KINETIC ENERGY', value: '14.2 kJ' },
      { label: 'ARMOR CHASSIS', value: 'Hardox 500 Monocoque' },
      { label: 'DRIVE MOTORS', value: 'Dual 48V Brushless' },
      { label: 'WEAPON MOTOR', value: '8.0 kW Outrunner' },
      { label: 'WEIGHT CLASS', value: '60.0 KG' }
    ]
  },
  {
    id: 'farzand',
    roman: '(II)',
    name: 'FARZAND',
    code: 'SR-15',
    category: 'Rapid Combat Drum Spinner',
    weightClass: '15 KG COMBAT BOT',
    description: 'Ultra-compact, low center of gravity asymmetric drum spinner built for high-speed arena maneuverability and crushing side-armor undercuts with aerospace 7075-T6 billet alloy.',
    year: '2025',
    model3d: '/models/farzand.glb',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    team: ['Sainath Biradar', 'Sushant Barde'],
    achievements: ['Hell In The Cell Finalist', 'WINGS 2026 Runner-Up'],
    accent: 'blue',
    editorialLeft: 'AGGRESSIVE VECTOR CONTROL AND UNDER-ARMOR PENETRATION.',
    editorialRight: 'PRECISION CNC BILLET MACHINED WITH 28 KM/H ARENA MOBILITY.',
    specs: [
      { label: 'WEAPON ROTOR', value: 'Asymmetric Drum' },
      { label: 'TOP SPRINT SPEED', value: '28 km/h' },
      { label: 'CHASSIS ALLOY', value: '7075-T6 Aerospace' },
      { label: 'GROUND CLEARANCE', value: '4.5 mm Razor Wedge' },
      { label: 'MATCH REACTION', value: '< 1.5 ms Direct RF' },
      { label: 'WEIGHT CLASS', value: '15.0 KG' }
    ]
  },
  {
    id: 'robocon-manipulator',
    roman: '(III)',
    name: 'ROBOCON CONTROLLER SYSTEM',
    code: 'RC-100',
    category: 'Precision Autonomous Manipulator',
    weightClass: 'NATIONAL ROBOCON SPEC',
    description: 'Sub-millimeter closed-loop precision positioning mechanism with custom high-current motor drivers and multi-threaded algorithm scheduling securing All India Rank 1.',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    team: ['Vedant Bodekar', 'Raj Mishra', 'Kulshresht Sirvi'],
    achievements: ['DD Robocon Stage 1 AIR-1 (100/100)', 'AIR-4 / AIR-8 National Finish'],
    accent: 'blue',
    editorialLeft: 'NATIONAL AIR-1 ALGORITHMIC PRECISION AND DETERMINISTIC CONTROL.',
    editorialRight: 'PERFECT 100/100 SCORE WITH HIGH-SPEED CAN-FD REALTIME ARCHITECTURE.',
    specs: [
      { label: 'STAGE 1 SCORE', value: '100 / 100 PERFECT' },
      { label: 'POSITION ERROR', value: '< 0.8 mm Closed-Loop' },
      { label: 'TELEMETRY BUS', value: 'CAN-FD + ROS 2' },
      { label: 'CONTROL LATENCY', value: '1.2 ms Deterministic' },
      { label: 'DRIVER RATING', value: '60A Dual H-Bridge' },
      { label: 'NATIONAL FINISH', value: 'AIR 1 · 4 · 8' }
    ]
  },
  {
    id: 'shikh-rakshak',
    roman: '(IV)',
    name: 'PROJECT SHIKH RAKSHAK',
    code: 'SR-DEF',
    category: 'Autonomous Defense Rover',
    weightClass: 'TACTICAL RECON CLASS',
    description: 'All-terrain surveillance and hazardous exploration rover engineered for ARAI-AMTIF national innovation showcase, featuring high-articulation rocker-bogie kinematics.',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=1200&q=80',
    team: ['Shreya Boga', 'Priti Suryawanshi'],
    achievements: ['ARAI-AMTIF Navigyan Expo Selected Booth'],
    accent: 'amber',
    editorialLeft: 'RUGGED DEFENSE RECONNAISSANCE FOR UNSTRUCTURED TERRAIN.',
    editorialRight: 'OFFICIAL ARAI-AMTIF NATIONAL DEFENSE EXPO EXHIBITION BOOTH.',
    specs: [
      { label: 'KINEMATICS', value: 'Rocker-Bogie 6-Wheel' },
      { label: 'ACTIVE RUNTIME', value: '4.5 Hours Continuous' },
      { label: 'STEP CLEARANCE', value: '220 mm Vertical Step' },
      { label: 'PAYLOAD GIMBAL', value: 'Modular Optical 3-Axis' },
      { label: 'TELEMETRY LINK', value: '2.4 GHz Encrypted RF' },
      { label: 'TERRAIN RATING', value: 'Grade-4 Rough Terrain' }
    ]
  },
  {
    id: 'autonomous-sumo',
    roman: '(V)',
    name: 'TECHNOTHON SUMO BOT',
    code: 'SM-01',
    category: 'Autonomous Sumo Combatant',
    weightClass: '3.0 KG AUTONOMOUS',
    description: 'Instantaneous reactive ring-edge detection and neodymium magnetic downforce chassis with high-torque custom reduction gearbox clinching tournament championship.',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
    team: ['Kulshresht Sirvi', 'Sharvari Mandale', 'Sainath Biradar'],
    achievements: ['Technothon 2K26 Sumo 1st Prize Champion'],
    accent: 'red',
    editorialLeft: 'SUB-MILLISECOND TACTICAL SENSING AND UNDEFEATED RING CLEARANCE.',
    editorialRight: 'HIGH-TORQUE PLANETARY GEARBOX WITH 180N MAGNETIC DOWNFORCE.',
    specs: [
      { label: 'DOWNFORCE PULL', value: '180 N Neodymium Rig' },
      { label: 'EDGE REACTION', value: '0.4 ms Optocoupled' },
      { label: 'GEAR RATIO', value: '30:1 All-Steel Planetary' },
      { label: 'TOURNAMENT RECORD', value: 'Undefeated 1st Place' },
      { label: 'CHASSIS PROFILE', value: 'Ground-Hugging Steel' },
      { label: 'WEIGHT CLASS', value: '3.0 KG Autonomous' }
    ]
  }
];
