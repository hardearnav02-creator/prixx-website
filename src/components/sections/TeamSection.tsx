// src/components/sections/TeamSection.tsx
// CHAPTER 03 — THE MEMBERS (LIQUID GLASS OPERATIVE EXHIBITION)
// Visual Atmosphere: Dark Obsidian (#0a0a0a), Frosted Glass Panels, Luminous Cyan & Rose Accents.
// Inspired by Mind Robotics & Boon Global

import { useState, useMemo } from 'react';
import { Search, ArrowRight, ArrowLeft, Sliders, List } from 'lucide-react';
import { teamMembers, TeamMember } from '../../data/team.ts';
import { SpatialTeamExhibition } from '../team/SpatialTeamExhibition.tsx';
import { TeamEditorialIndex } from '../team/TeamEditorialIndex.tsx';
import { TeamDossierModal } from '../team/TeamDossierModal.tsx';

const DIVISIONS = [
  {
    id: 'all',
    label: 'ALL OPERATIVES',
    filterFn: (p: TeamMember) => !p.isJunior && p.division !== 'Junior Members',
  },
  {
    id: 'combat',
    label: 'COMBAT & HARDWARE',
    filterFn: (p: TeamMember) => p.division === 'Combat & Hardware' && !p.isJunior,
  },
  {
    id: 'software',
    label: 'AI & SOFTWARE',
    filterFn: (p: TeamMember) => p.division === 'AI & Software' && !p.isJunior,
  },
  {
    id: 'strategy',
    label: 'STRATEGY & FLIGHT',
    filterFn: (p: TeamMember) => p.division === 'Strategy & Flight' && !p.isJunior,
  },
  {
    id: 'leads',
    label: 'PROJECT LEADS',
    filterFn: (p: TeamMember) => p.division === 'Project Leads' && !p.isJunior,
  },
  {
    id: 'junior',
    label: 'JUNIOR INNOVATION',
    filterFn: (p: TeamMember) => p.division === 'Junior Innovation' && !p.isJunior,
  },
  {
    id: 'russia',
    label: 'RUSSIA DELEGATES',
    filterFn: (p: TeamMember) =>
      (p.division === 'Russia Delegates' || p.tags?.some((t) => t.toLowerCase().includes('russia'))) &&
      !p.isJunior &&
      p.division !== 'Junior Members',
  },
  {
    id: 'junior-members',
    label: 'JUNIOR MEMBERS',
    filterFn: (p: TeamMember) => p.isJunior === true || p.division === 'Junior Members',
  },
];

interface TeamSectionProps {
  onNavigate: (pageId: string) => void;
}

export const TeamSection = ({ onNavigate }: TeamSectionProps) => {
  const [selectedPilot, setSelectedPilot] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [viewFormat, setViewFormat] = useState<'spatial' | 'editorial'>('spatial');

  const filteredPilots = useMemo(() => {
    return teamMembers.filter((pilot) => {
      const currentDivision = DIVISIONS.find((d) => d.id === divisionFilter);
      const matchesDivision =
        divisionFilter === 'all' ||
        (currentDivision?.filterFn && currentDivision.filterFn(pilot));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        pilot.name.toLowerCase().includes(query) ||
        pilot.role.toLowerCase().includes(query) ||
        pilot.division.toLowerCase().includes(query) ||
        pilot.achievements.some((a) => a.toLowerCase().includes(query)) ||
        (pilot.tags && pilot.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesDivision && matchesSearch;
    });
  }, [divisionFilter, searchQuery]);

  return (
    <div className="min-h-screen text-white pt-20 relative z-10 selection:bg-red-600 selection:text-black">
      {/* ========================================================================= */}
      {/* 1. EDITORIAL HEADER & SEARCH CONTROLS                                     */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-8 md:px-12 border-b border-white/10">
        <div className="max-w-[90rem] mx-auto space-y-8">
          {/* Top Breadcrumb Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full glass-pill border border-red-600/30 text-red-500 font-bold uppercase tracking-wider text-[11px]">
                CHAPTER 03 // PERSONNEL ARCHIVE
              </span>
              <span className="text-white/50 uppercase hidden sm:inline font-medium">
                VERIFIED BUILDERS &amp; PILOTS
              </span>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-white/10 text-white hover:border-red-600/40 hover:bg-white/10 transition-all cursor-pointer text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO ENTRY</span>
            </button>
          </div>

          {/* Refined Headline Composition */}
          <div className="space-y-3">
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.9] select-none text-gradient-silver">
              THE MEMBERS
            </h1>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs sm:text-sm text-red-600 font-bold uppercase">
              <span>SPECIALIZED OPERATIVES</span>
              <span className="text-white/30">|</span>
              <span>COMBAT PILOTS // AI SCIENTISTS // CNC FABRICATORS // RUSSIA DELEGATES</span>
            </div>
          </div>

          {/* Search, Division Badges, and Format Toggle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-4 border-t border-white/10 font-mono">
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH BY NAME OR SKILL..."
                className="w-full pl-11 pr-14 py-2.5 glass-input text-xs font-mono font-bold uppercase placeholder:text-white/40 focus:border-red-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-black bg-red-600 hover:bg-red-600 px-2 py-0.5 rounded cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Division Filters & View Toggle */}
            <div className="lg:col-span-8 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {DIVISIONS.map((div) => {
                  const isSelected = divisionFilter === div.id;
                  return (
                    <button
                      key={div.id}
                      onClick={() => setDivisionFilter(div.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-red-600 to-red-800 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] border border-red-600'
                          : 'glass-pill border border-white/10 text-white/70 hover:text-white hover:border-white/25'
                      }`}
                    >
                      {div.label}
                    </button>
                  );
                })}
              </div>

              {/* View Format Switcher */}
              <div className="flex items-center gap-1 glass-pill p-1 border border-white/10">
                <button
                  onClick={() => setViewFormat('spatial')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase cursor-pointer transition-colors ${
                    viewFormat === 'spatial'
                      ? 'bg-red-600 text-black shadow-[0_0_12px_#DC2626]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3 h-3" />
                  <span>SPATIAL</span>
                </button>
                <button
                  onClick={() => setViewFormat('editorial')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase cursor-pointer transition-colors ${
                    viewFormat === 'editorial'
                      ? 'bg-red-600 text-black shadow-[0_0_12px_#DC2626]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <List className="w-3 h-3" />
                  <span>ROSTER</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EXHIBITION RUNWAY / ROSTER INDEX                                       */}
      {/* ========================================================================= */}
      <section className="py-10 px-4 sm:px-8 md:px-12 min-h-[55vh]">
        <div className="max-w-[90rem] mx-auto space-y-8">
          {/* Status Counter */}
          <div className="flex items-center justify-between font-mono text-xs font-bold uppercase text-white/60 border-b border-white/10 pb-3">
            <span>
              SHOWING {filteredPilots.length}{' '}
              {divisionFilter === 'junior-members' ? 'JUNIOR MEMBERS' : 'VERIFIED OPERATIVES'}
            </span>
            <span className="hidden sm:inline text-red-600/80">
              {viewFormat === 'spatial'
                ? 'CLICK ANY OPERATIVE TO VIEW FULL DOSSIER'
                : 'SELECT ROW TO VIEW TECHNICAL SPECIFICATIONS'}
            </span>
          </div>

          {filteredPilots.length === 0 ? (
            <div className="py-24 text-center glass-panel p-8 font-mono space-y-4 border border-white/10">
              <div className="text-lg font-bold uppercase">
                NO OPERATIVES FOUND FOR "{searchQuery}"
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDivisionFilter('all');
                }}
                className="px-6 py-2.5 rounded-full bg-red-600 text-black font-bold text-xs uppercase cursor-pointer hover:bg-red-600"
              >
                RESET FILTERS
              </button>
            </div>
          ) : viewFormat === 'spatial' ? (
            <SpatialTeamExhibition
              members={filteredPilots}
              onSelectMember={(pilot) => setSelectedPilot(pilot)}
            />
          ) : (
            <TeamEditorialIndex
              members={filteredPilots}
              onSelectMember={(pilot) => setSelectedPilot(pilot)}
            />
          )}
        </div>
      </section>

      {/* Expanded Liquid Glass Dossier Modal */}
      <TeamDossierModal
        member={selectedPilot}
        onClose={() => setSelectedPilot(null)}
      />

      {/* ========================================================================= */}
      {/* 3. CHAPTER EXIT TO THE LAB                                                */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-8 md:px-12 border-t border-white/10 font-mono">
        <div className="max-w-[90rem] mx-auto glass-panel p-6 sm:p-10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_45px_rgba(0,0,0,0.5)]">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-red-600 uppercase">
              NEXT CHAPTER
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight leading-none text-gradient-silver">
              THE LAB // 5 SYSTEMS
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('arena')}
              className="px-6 py-3.5 rounded-full glass-pill border border-white/15 text-white font-mono font-bold text-xs uppercase hover:border-red-600 hover:bg-white/10 transition-all cursor-pointer"
            >
              <span>ACHIEVEMENTS</span>
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-blue-700 to-red-800 text-black font-mono font-black text-xs uppercase hover:scale-[1.02] transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(0,240,255,0.4)]"
            >
              <span>ENTER THE LAB</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
