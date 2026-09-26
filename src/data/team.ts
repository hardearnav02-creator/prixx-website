// src/data/team.ts
// Centralized, editable team dataset containing verified core operatives and dedicated junior members.
// Members added to juniorMembers will EXCLUSIVELY appear in the "JUNIOR MEMBERS" category tab.

export interface TeamMember {
  id: string;
  number: string;
  name: string;
  role: string;
  shortRole?: string;
  description?: string;
  achievements: string[];
  image?: string;
  mediaPlaceholder?: string;
  accent: 'red' | 'blue';
  featured?: boolean;
  projects?: string[];
  tags?: string[];
  division:
    | 'Combat & Hardware'
    | 'AI & Software'
    | 'Strategy & Flight'
    | 'Project Leads'
    | 'Junior Innovation'
    | 'Russia Delegates'
    | 'Junior Members';
  isJunior?: boolean;
}

// =========================================================================
// 1. CORE OPERATIVES (14 Approved Members)
// =========================================================================
export const coreTeamMembers: TeamMember[] = [
  {
    id: 'sushant-barde',
    number: '01',
    name: 'Sushant Barde',
    role: 'Combat Engineering & Driver',
    shortRole: 'Driver & Combat Lead',
    description: 'Lead combat pilot specializing in 60kg Heavyweight arena battles and high-kinetic weapon integration.',
    achievements: [
      '1st Prize Parul 60kg Robowar',
      '2nd Prize COEP MindSpark \'25 with robot "Kaal Bahirav"'
    ],
    accent: 'red',
    featured: true,
    projects: ['Kaal Bahirav 60kg', 'Kinetic Hardox Weapon Disc'],
    tags: ['60kg Robowar', 'Pilot', 'Hardox Welds', 'MindSpark \'25'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Sushant action shot with Kaal Bahirav',
    division: 'Combat & Hardware'
  },
  {
    id: 'sainath-biradar',
    number: '02',
    name: 'Sainath Biradar',
    role: 'Team Leader & Combat Specialist',
    shortRole: 'Team Leader & Combat',
    description: 'Founding team lead overseeing arena strategy, combat engineering, and national tournament campaigns.',
    achievements: [
      '1st Prize Parul 60kg ("Hell In The Cell")',
      '2nd Prize WINGS 2026 Robo Soccer',
      'Combat Bot "SaiRex"'
    ],
    accent: 'blue',
    featured: true,
    projects: ['SaiRex Combat Bot', 'Hell In The Cell 60kg'],
    tags: ['Team Lead', 'Parul 60kg Champion', 'SaiRex', 'Robo Soccer'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Sainath with 60kg robot or SaiRex',
    division: 'Combat & Hardware'
  },
  {
    id: 'kulshresht-sirvi',
    number: '03',
    name: 'Kulshresht Sirvi',
    role: 'Strategy & Pilot',
    shortRole: 'Strategy & Pilot',
    description: 'International delegate and competitive autonomous sumo combat driver across national championships.',
    achievements: [
      'Russia Winter Univ Delegate',
      'GDG AI Hackathon 2.0',
      'Techfest 2025',
      'Technothon 2K26 Sumo Champion',
      'Symbiosis Runner-Up (₹25k)'
    ],
    accent: 'red',
    featured: true,
    projects: ['Technothon Autonomous Sumo Bot', 'Russia Expedition Module'],
    tags: ['Russia Delegate', 'Sumo Champion', 'Techfest 2025', 'Symbiosis Runner-Up'],
    image: '/assets/team/kullu.png',
    mediaPlaceholder: 'Kulshresht with Sumo robot or giant cheque',
    division: 'Strategy & Flight'
  },
  {
    id: 'vedant-bodekar',
    number: '04',
    name: 'Vedant Bodekar',
    role: 'AI & Software Lead',
    shortRole: 'AI & Software Lead',
    description: 'Architect behind Prixx.AI embedded inference pipelines, cloud telemetry, and autonomous combat targeting.',
    achievements: [
      'Team Prixx.AI Lead at GDG Cloud Mumbai 2.0',
      'Russia Winter Univ Delegate',
      'PVPIT Internal Hackathons Winner Lead'
    ],
    accent: 'blue',
    featured: true,
    projects: ['Prixx.AI Edge Inference', 'GDG Cloud Mumbai Pipeline'],
    tags: ['Prixx.AI Lead', 'GDG Cloud', 'Russia Delegate', 'PVPIT Winner'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Vedant presenting or coding at hackathon',
    division: 'AI & Software'
  },
  {
    id: 'raj-biharilal-mishra',
    number: '05',
    name: 'Raj Biharilal Mishra',
    role: 'Electronics & Cloud Systems',
    shortRole: 'Electronics & Cloud',
    description: 'Hardware electronics engineer designing high-amperage speed controllers, telemetry PCBs, and cloud interfaces.',
    achievements: [
      'GDG Cloud Community Days 2025',
      'GDG AI Hackathon 2.0',
      'Russia Winter University Innovation Delegate'
    ],
    accent: 'red',
    projects: ['Telemetry ESC Architecture', 'Cloud Dashboard'],
    tags: ['GDG Cloud 2025', 'GDG AI 2.0', 'Russia Delegate', 'Power Systems'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Raj at Google Developer Group event',
    division: 'AI & Software'
  },
  {
    id: 'shanir-dileep-patil',
    number: '06',
    name: 'Shanir Dileep Patil',
    role: 'Analytics & Strategy',
    shortRole: 'Analytics & Strategy',
    description: 'Tactical analyst orchestrating tournament bracket modeling, arena combat analytics, and agritech systems.',
    achievements: [
      'Russia Winter University Delegate',
      'Symbiosis Kurukshetra 2nd Prize (₹25k)',
      'InnovataYou 3.0 Agritech Hackathon'
    ],
    accent: 'blue',
    projects: ['Kurukshetra Combat Strategy', 'Agritech Sensor Suite'],
    tags: ['Russia Delegate', 'Kurukshetra 2nd Prize', 'InnovataYou 3.0', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Shanir at Kurukshetra or InnovataYou',
    division: 'Strategy & Flight'
  },
  {
    id: 'tanish-chogale',
    number: '07',
    name: 'Tanish Chogale',
    role: 'Russia Delegate',
    shortRole: 'International Delegate',
    description: 'International delegate and hardware innovator awarded honors at Yaroslav the Wise Novgorod State Technical University.',
    achievements: [
      'Yaroslav the Wise Novgorod State Technical University',
      '2nd Prize AR/VR',
      '4th Prize Hardware'
    ],
    accent: 'red',
    projects: ['AR/VR Robotics Teleoperation', 'Novgorod Hardware Rig'],
    tags: ['Russia Univ Diploma', '2nd Prize AR/VR', '4th Prize Hardware', 'Global Fellow'],
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Tanish with certificates in Russia',
    division: 'Russia Delegates'
  },
  {
    id: 'piyush-labde',
    number: '08',
    name: 'Piyush Labde',
    role: 'Data Science',
    shortRole: 'Data Science',
    description: 'Data engineer modeling weapon velocity dissipation, collision dynamics, and telemetry streams.',
    achievements: [
      'Russia Winter University Innovation Program Delegate',
      'PVPIT Internal Hackathon Award Winner'
    ],
    accent: 'blue',
    projects: ['Crash Dynamics Telemetry', 'PVPIT Hackathon Core'],
    tags: ['Russia Innovation', 'PVPIT Winner', 'Data Science', 'Telemetry'],
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Piyush at PVPIT or in Russia',
    division: 'AI & Software'
  },
  {
    id: 'mayank-mahajan',
    number: '09',
    name: 'Mayank Mahajan',
    role: 'Junior Sub-Team Lead',
    shortRole: 'Sub-Team Lead',
    description: 'Embedded automation engineer leading the junior robotics fabrication cell and prototype integration.',
    achievements: [
      'PVPIT Internal Hackathons Junior Division Winner',
      'Embedded automation development'
    ],
    accent: 'red',
    projects: ['Embedded Automation Controller', 'PVPIT Junior Prototype'],
    tags: ['Junior Division Winner', 'Embedded Systems', 'Automation', 'PVPIT Lab'],
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Mayank working on embedded hardware',
    division: 'Junior Innovation'
  },
  {
    id: 'shreya-boga',
    number: '10',
    name: 'Shreya Boga',
    role: 'Project Lead',
    shortRole: 'Project Lead',
    description: 'Project lead representing Prixx at national defense and automotive expos for Project Shikh Rakshak.',
    achievements: [
      'ARAI-AMTIF Navigyan Expo representative for Project "Shikh Rakshak"'
    ],
    accent: 'blue',
    projects: ['Project Shikh Rakshak', 'ARAI-AMTIF Navigyan Expo'],
    tags: ['Project Lead', 'ARAI-AMTIF Expo', 'Shikh Rakshak', 'Defense Mobility'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Shreya presenting at expo booth',
    division: 'Project Leads'
  },
  {
    id: 'priti-suryawanshi',
    number: '11',
    name: 'Priti Suryawanshi',
    role: 'Project Lead',
    shortRole: 'Project Lead',
    description: 'Automotive systems co-lead driving structural engineering and field deployments for Project Shikh Rakshak.',
    achievements: [
      'ARAI-AMTIF Navigyan Expo representative for Project "Shikh Rakshak"'
    ],
    accent: 'red',
    projects: ['Project Shikh Rakshak Chassis', 'AMTIF Automotive Rig'],
    tags: ['Project Lead', 'ARAI-AMTIF Expo', 'Shikh Rakshak', 'Structural Design'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Priti presenting at expo booth',
    division: 'Project Leads'
  },
  {
    id: 'sharvari-mandale',
    number: '12',
    name: 'Sharvari Mandale',
    role: 'Robotics Specialist',
    shortRole: 'Robotics Specialist',
    description: 'Specialist in high-maneuverability omnidirectional drive systems and dynamic soccer robotics.',
    achievements: [
      'Technothon 2K26 Robo-Soccer',
      '2nd Prize Podium Finish'
    ],
    accent: 'blue',
    projects: ['Omni-Drive Soccer Bot', 'Technothon 2K26 Striker'],
    tags: ['Robo-Soccer 2nd Prize', 'Technothon 2K26', 'Omni Drivetrain', 'Agile Control'],
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Sharvari with Robo-Soccer bot',
    division: 'Combat & Hardware'
  },
  {
    id: 'viraj-nivelkar',
    number: '13',
    name: 'Viraj Nivelkar',
    role: 'Junior Innovation Team',
    shortRole: 'Robotics & Automation',
    description: 'Rapid mechanical fabrication specialist supporting CNC machining, laser profiling, and test assemblies.',
    achievements: [
      'PVPIT Internal Hackathon Awardee',
      'Rapid prototyping'
    ],
    accent: 'red',
    projects: ['Chassis Rapid Prototyping', 'PVPIT Fabrication Rig'],
    tags: ['PVPIT Awardee', 'Rapid Prototyping', 'CNC Machining', 'Fabrication'],
    image: '/assets/team/viraj-nivelkar.png',
    mediaPlaceholder: 'Viraj prototyping at hackathon',
    division: 'Junior Innovation'
  },
  {
    id: 'arpit-darji',
    number: '14',
    name: 'Arpit Darji',
    role: 'Junior Innovation Team',
    shortRole: 'Systems QA & Testing',
    description: 'Hardware test engineer executing stress testing, telemetry logging, and pre-match bench checkouts.',
    achievements: [
      'PVPIT Internal Hackathon Awardee',
      'System testing'
    ],
    accent: 'blue',
    projects: ['Weapon Bench Test Rig', 'Stress Validation Unit'],
    tags: ['PVPIT Awardee', 'System Testing', 'Bench Validation', 'Telemetry QA'],
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Arpit testing systems at hackathon',
    division: 'Junior Innovation'
  },
  {
    id: 'shweta-shirsat',
    number: '15',
    name: 'Shweta Shirsat',
    role: 'Autonomous Systems & AI Lead',
    shortRole: 'Autonomous & AI Lead',
    description: 'Senior robotics lead directing autonomous computer vision architectures, embedded intelligence pipelines, and multi-disciplinary research.',
    achievements: [
      'Ambassador for IIT Techfest 26-27',
      'Selected in Avishkar 2025 & College Representation',
      'Smart India Hackathon (SIH 2025 & SIH 2026)',
      '10 Days Innovation Challenge Senior Lead',
      'Hands-on Robotics & AI Project Lead'
    ],
    accent: 'blue',
    featured: true,
    projects: ['Autonomous Vision Telemetry', 'AI Embedded Pipeline', 'IIT Techfest Delegation'],
    tags: ['Senior Member', 'ENTC', 'Computer Vision', 'Autonomous Robotics', 'IIT Techfest', 'SIH 2026', 'Avishkar'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Shweta Shirsat leading robotics project',
    division: 'AI & Software'
  },
  {
    id: 'sanika-joshi',
    number: '16',
    name: 'Sanika Joshi',
    role: 'Senior Guide · Automation & Hardware',
    shortRole: 'Senior Guide · Automation',
    description: 'Senior engineering mentor and guide specializing in robotics automation, structural hardware architectures, and project guidance.',
    achievements: [
      'Senior Guide — Automation & Hardware Architectures',
      'Computer Engineering (CE) Department Leadership',
      'Autonomous Systems & Hardware Integration'
    ],
    accent: 'red',
    featured: true,
    projects: ['Automation Control Systems', 'Hardware Integration Rig'],
    tags: ['Senior Guide', 'CE', 'Automation', 'Hardware', 'Mentorship'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Sanika Joshi in engineering laboratory',
    division: 'Combat & Hardware'
  },
  {
    id: 'mahek-varma',
    number: '17',
    name: 'Mahek Varma',
    role: 'Senior Guide · Automation & Hardware',
    shortRole: 'Senior Guide · Hardware',
    description: 'Senior technical mentor and guide focusing on embedded hardware integration, automated workflows, and data systems.',
    achievements: [
      'Senior Guide — Automation & Hardware Development',
      'Computer Science & Data Science (CSDS) Lead',
      'Advanced Automation & Embedded Protocols'
    ],
    accent: 'blue',
    featured: true,
    projects: ['Industrial Automation Hub', 'Data & Hardware Pipelines'],
    tags: ['Senior Guide', 'CSDS', 'Automation', 'Hardware', 'Mentorship'],
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Mahek Varma mentoring robotics hardware',
    division: 'Combat & Hardware'
  }
];

// =========================================================================
// 2. JUNIOR MEMBERS DATASET (EXCLUSIVELY DISPLAYED IN "JUNIOR MEMBERS" TAB)
// Add all junior members here. They will ONLY show under the JUNIOR MEMBERS category.
// =========================================================================
export const juniorMembers: TeamMember[] = [
  {
    id: 'arnav-harde',
    number: '01',
    name: 'Arnav Harde',
    role: 'Software Development & Robotics',
    shortRole: 'Robotics & Software',
    description: 'Lead developer and junior engineer focusing on full-stack exhibition architecture, embedded systems, and robotics telemetry.',
    achievements: [
      'Smart India Hackathon (SIH) 2026',
      'Prixx Digital Platform Architecture'
    ],
    accent: 'red',
    featured: true,
    projects: ['Prixx Brutalist Platform', 'Junior Combat Testbed'],
    tags: ['Software Lead', 'CAD Modeling', 'Web Engineering', 'Telemetry'],
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Arnav Harde in engineering lab',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'nidhi-mishra',
    number: '02',
    name: 'Nidhi Mishra',
    role: 'Dashboard Development & R&D',
    shortRole: 'Dashboard & R&D',
    description: 'CSEDS engineer specializing in telemetry dashboard development, data analytics, and research prototyping.',
    achievements: [
      'Smart India Hackathon (SIH) 2K26',
      'Telemetry Dashboard & Systems R&D'
    ],
    accent: 'blue',
    featured: false,
    projects: ['Telemetry Dashboard Rig', 'Data Visualization System'],
    tags: ['CSEDS', 'Dashboard Dev', 'R&D', 'SIH 2K26', 'Data Science'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Nidhi Mishra in engineering lab',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'aman-narkhede',
    number: '03',
    name: 'Aman Narkhede',
    role: 'CAD Designer & Mechanical Hardware',
    shortRole: 'CAD & Hardware',
    description: 'Mechanical engineering specialist designing rigid chassis geometry, weapon mounts, and mechanical hardware assemblies.',
    achievements: [
      'Smart India Hackathon (SIH)',
      'Technothon 2K25 Competitor'
    ],
    accent: 'blue',
    featured: false,
    projects: ['Chassis CAD Modeling', 'Mechanical Hardware Assemblies'],
    tags: ['Mechanical', 'CAD Designer', 'Hardware', 'SIH', 'Technothon 2K25'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Aman Narkhede with CAD design',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'parth-sontakke',
    number: '04',
    name: 'Parth Sontakke',
    role: 'Structural Assembly & Hardware R&D',
    shortRole: 'Assembly & R&D',
    description: 'Mechanical engineer specializing in structural combat assemblies, electronics integration, and advanced robotics research.',
    achievements: [
      '2nd Rank Holder — Ulectro MPSTME',
      'AISSMS National Hackathon Competitor'
    ],
    accent: 'red',
    featured: false,
    projects: ['Structural Assembly Rigs', 'Electronics Integration'],
    tags: ['Mechanical', 'Ulectro 2nd Rank', 'AISSMS Hackathon', 'Hardware R&D'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Parth Sontakke in assembly lab',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'swara-haralkar',
    number: '05',
    name: 'Swara Haralkar',
    role: 'Electronics R&D & Embedded Software',
    shortRole: 'Electronics & R&D',
    description: 'ENTC engineer working across electronic component characterization, circuit integration, and embedded firmware research.',
    achievements: [
      'Electronic Components & Circuit R&D',
      'Hardware & Embedded Software Integration'
    ],
    accent: 'blue',
    featured: false,
    projects: ['Electronic Component Testbed', 'Firmware Subsystems'],
    tags: ['ENTC', 'Hardware & Software', 'Electronic Components', 'R&D'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Swara Haralkar at electronics bench',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'janhavi-lekurwale',
    number: '06',
    name: 'Janhavi Lekurwale',
    role: 'Hardware Components & Systems R&D',
    shortRole: 'Hardware & R&D',
    description: 'ENTC hardware engineer specializing in power routing, component testing, and rapid research iterations.',
    achievements: [
      'SIH Hardware & Systems Development',
      '10 Days Innovation Challenge Lead'
    ],
    accent: 'red',
    featured: false,
    projects: ['Component Testing Rig', 'SIH Hardware Module'],
    tags: ['ENTC', 'Hardware', 'Components R&D', 'SIH', '10 Days Challenge'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Janhavi Lekurwale working on hardware',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'satyam-mandekar',
    number: '07',
    name: 'Satyam Mandekar',
    role: 'AI, Robotics & Embedded Systems Lead',
    shortRole: 'AI & Embedded Lead',
    description: 'Computer engineer and technical lead architecting autonomous algorithms, embedded microcontrollers, and web systems.',
    achievements: [
      'Technical Lead — Smart India Hackathon (SIH) 2K26',
      '3rd Rank in Avishkar 2K26'
    ],
    accent: 'blue',
    featured: true,
    projects: ['SIH Autonomous System', 'Avishkar Research Platform'],
    tags: ['Computer Engg', 'SIH Tech Lead', 'Avishkar 3rd Rank', 'AI & Robotics', 'Embedded'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Satyam Mandekar presenting research',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'pratiksha-bhanavase',
    number: '08',
    name: 'Pratiksha Bhanavase',
    role: 'Electronic Components & Hardware R&D',
    shortRole: 'Hardware & Software',
    description: 'ENTC engineer developing robust electronic circuits, power distributions, and hardware-software telemetry links.',
    achievements: [
      'Electronic Component Optimization',
      'Hardware & Software Subsystem Development'
    ],
    accent: 'red',
    featured: false,
    projects: ['Circuit Testing Bench', 'Telemetry Interface Rig'],
    tags: ['ENTC', 'Hardware + Software', 'Electronics', 'R&D'],
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Pratiksha Bhanavase at testbench',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'balaji-gurav',
    number: '09',
    name: 'Balaji Gurav',
    role: 'Hardware & Software Engineering',
    shortRole: 'Hardware & Software',
    description: 'Computer Science engineer developing omain hardware logic.',
    achievements: [
      '3rd Place — Smart India Hackathon (SIH)',
      'Hardware & Software Subsystem Integration'
    ],
    accent: 'blue',
    featured: false,
    projects: ['SIH Subsystem Rig', 'Embedded Logic Controller'],
    tags: ['CS', 'Hardware + Software', 'SIH 3rd Place', 'Firmware'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Balaji Gurav in lab',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'shubham-panchal',
    number: '10',
    name: 'Shubham Panchal',
    role: 'Web Development & Embedded Systems',
    shortRole: 'Web & Embedded',
    description: 'Computer Science & Data Science specialist architecting telemetry web dashboards and microcontroller integrations.',
    achievements: [
      'Smart India Hackathon (SIH) 2K26',
      'Avishkar 2K26 Research Competitor'
    ],
    accent: 'red',
    featured: false,
    projects: ['Telemetry Web Dashboard', 'Embedded Sensor Integration'],
    tags: ['CSDS', 'Web Development', 'Embedded Systems', 'SIH 2K26', 'Avishkar 2K26'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Shubham Panchal with embedded systems',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'disha-shetty',
    number: '11',
    name: 'Disha Shetty',
    role: 'CAD Design & Mechanical Hardware R&D',
    shortRole: 'CAD & Hardware R&D',
    description: 'Mechanical engineering recruit specializing in high-precision CAD modeling, hardware prototyping, and structural R&D.',
    achievements: [
      'Smart India Hackathon (SIH) 2K26',
      'Avishkar 2K26 Research Competitor'
    ],
    accent: 'red',
    featured: false,
    projects: ['Chassis CAD Modeling', 'Mechanical Hardware R&D'],
    tags: ['Mechanical', 'CAD Design', 'Hardware', 'R&D', 'SIH 2K26', 'Avishkar 2K26'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Disha Shetty with CAD model',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'bhakti-mantri',
    number: '12',
    name: 'Bhakti Mantri',
    role: 'Hardware & Embedded Software Engineering',
    shortRole: 'Hardware & Software',
    description: 'ENTC engineer developing robust circuit designs, sensor telemetry, and hardware integration pipelines.',
    achievements: [
      'Smart India Hackathon (SIH) 2K26',
      'Hardware & Firmware R&D Deployment'
    ],
    accent: 'blue',
    featured: false,
    projects: ['Telemetry Interface Rig', 'Electronic Subsystem R&D'],
    tags: ['ENTC', 'Hardware & Software', 'R&D', 'SIH 2K26'],
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Bhakti Mantri at hardware bench',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'vrujuta-sawant',
    number: '13',
    name: 'Vrujuta Sawant',
    role: 'UI/UX Interface & Software R&D',
    shortRole: 'UI/UX & Software',
    description: 'Computer Science & Data Science specialist designing mission control interfaces, telemetry HUDs, and software research modules.',
    achievements: [
      'Smart India Hackathon (SIH) 2K26',
      'Telemetry User Interface & Systems R&D'
    ],
    accent: 'red',
    featured: false,
    projects: ['Mission Control Interface', 'Telemetry Dashboard'],
    tags: ['CSDS', 'UI/UX', 'Software R&D', 'SIH 2K26'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Vrujuta Sawant designing interface',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'meghraj-mhetre',
    number: '14',
    name: 'Meghraj Mhetre',
    role: 'Embedded Systems & Bot Design Specialist',
    shortRole: 'Embedded & Design',
    description: 'ENTC engineer focusing on custom robotics chassis design, embedded microcontroller firmware, and full-stack web integration.',
    achievements: [
      'Smart India Hackathon (SIH) Selected',
      'Autonomous Combat Bot Design & Hardware'
    ],
    accent: 'blue',
    featured: false,
    projects: ['Custom Robot Chassis Design', 'Embedded Microcontroller Rig'],
    tags: ['ENTC', 'Embedded', 'Bot Design', 'Web Dev', 'Hardware + Software', 'SIH Selected'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Meghraj Mhetre designing combat bot',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'vanshika-shaily',
    number: '15',
    name: 'Vanshika Shaily',
    role: 'Software Development & Computer Vision',
    shortRole: 'Software & Vision',
    description: 'Computer engineering researcher specializing in computer vision pipelines, component integration, and tactical technical presentations.',
    achievements: [
      'Smart India Hackathon (SIH) 2K26',
      'Computer Vision & Hardware Component Integration'
    ],
    accent: 'red',
    featured: false,
    projects: ['Computer Vision Module', 'Tactical Research Presentation'],
    tags: ['Computer Engg', 'Software Dev', 'Computer Vision', 'Component Integration', 'SIH 2K26'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Vanshika Shaily in software lab',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'om-shirsat',
    number: '16',
    name: 'Om Shirsat',
    role: 'AI Research, Software & Hardware',
    shortRole: 'AI & Hardware Research',
    description: 'ENTC specialist developing prompt pipelines, dataset curation architectures, and integrated hardware-software research.',
    achievements: [
      'Smart India Hackathon (SIH 2K26) — Dataset Curation & Research',
      'AI Prompting & Hardware Integration'
    ],
    accent: 'red',
    featured: false,
    projects: ['SIH Dataset Curation Pipeline', 'AI Embedded Research Rig'],
    tags: ['ENTC', 'AI Prompting', 'Research', 'Software + Hardware', 'SIH 2K26'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Om Shirsat working on AI research',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'krishna-dhote',
    number: '17',
    name: 'Krishna Dhote',
    role: 'R&D, CAD Design & Hardware Integration',
    shortRole: 'CAD & Hardware R&D',
    description: 'ENTC engineer specializing in CAD mechanical modeling, structural prototyping, and embedded hardware integration.',
    achievements: [
      'Smart India Hackathon (SIH 2K26) — Hardware Integration',
      'Mechanical CAD Modeling & Systems R&D'
    ],
    accent: 'blue',
    featured: false,
    projects: ['SIH Hardware Integration', 'CAD Structural Prototyping'],
    tags: ['ENTC', 'R&D', 'CAD Design', 'Hardware Integration', 'SIH 2K26'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Krishna Dhote with CAD hardware',
    division: 'Junior Members',
    isJunior: true,
  },
  {
    id: 'vedika-todkar',
    number: '18',
    name: 'Vedika Todkar',
    role: 'Frontend Development & Dashboard UI',
    shortRole: 'Frontend & UI Design',
    description: 'Computer Science & Data Science specialist architecting frontend interfaces, telemetry dashboards, and presentation systems.',
    achievements: [
      'Smart India Hackathon (SIH) 2K26',
      'Dashboard UI Design & Presentation Systems'
    ],
    accent: 'red',
    featured: false,
    projects: ['Dashboard UI Architecture', 'Technical Presentation Rig'],
    tags: ['CSEDS', 'Frontend Dev', 'Dashboard UI', 'Presentation', 'SIH 2K26'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    mediaPlaceholder: 'Vedika Todkar presenting dashboard UI',
    division: 'Junior Members',
    isJunior: true,
  }
];

// Combined dataset for components
export const teamMembers: TeamMember[] = [
  ...coreTeamMembers,
  ...juniorMembers
];
