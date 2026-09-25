// src/components/sections/ProjectsSection.tsx
// CHAPTER 04 — HARDWARE & ROBOTICS LAB (THE OBSIDIAN ASSEMBLY 3D STACKED CARDS)
// Visual Atmosphere: Dark Obsidian / Warm Amber & Luminous Accents, Frosted Glass Panels.
// Features the Pinned 3D Stacked Cards Deck & Flanked Editorial Exhibition Layout.
// Inspired by The Obsidian Assembly, Mind Robotics & Third Way

import { ArrowRight, ArrowLeft } from 'lucide-react';
import { StackedProjectExhibition } from '../projects/StackedProjectExhibition.tsx';
import { projects } from '../../data/projects.ts';

interface ProjectsSectionProps {
  onNavigate: (pageId: string) => void;
}

export const ProjectsSection = ({ onNavigate }: ProjectsSectionProps) => {
  return (
    <div className="min-h-screen text-white pt-20 relative z-10 selection:bg-amber-500 selection:text-black">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC TOP HERO (BREADCRUMB & LAB IDENTITY)                         */}
      {/* ========================================================================= */}
      <section className="py-8 px-4 sm:px-8 md:px-12 border-b border-white/10">
        <div className="max-w-[92rem] mx-auto space-y-6">
          {/* Top Breadcrumb & Return Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full glass-pill border border-amber-500/30 text-amber-300 font-bold uppercase tracking-wider text-[11px]">
                CHAPTER 04 // THE LAB
              </span>
              <span className="text-white/50 uppercase hidden sm:inline font-medium">
                PINNED 3D HARDWARE EXHIBITION
              </span>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-white/10 text-white hover:border-amber-500/40 hover:bg-white/10 transition-all cursor-pointer text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO ENTRY</span>
            </button>
          </div>

          {/* Headline & Overview */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[0.9] select-none text-gradient-silver">
                THE OBJECTS
              </h1>
              <div className="font-mono text-xs text-white/50 tracking-wider uppercase">
                {projects.length} DEPLOYED SYSTEMS · 60KG KINETIC HARDOX // 15KG DRUM // AIR-1 ROBOCON // DEFENSE ROVER
              </div>
            </div>

            <div className="font-mono text-xs text-amber-300/80 uppercase font-bold px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
              IMAGINE POSSIBLE // OBJECTS ARCHIVE
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE OBSIDIAN ASSEMBLY PINNED 3D STACKED CARDS EXHIBITION               */}
      {/* ========================================================================= */}
      <section className="relative">
        <StackedProjectExhibition onNavigate={onNavigate} />
      </section>

      {/* ========================================================================= */}
      {/* 3. CHAPTER EXIT TO THE SIGNAL                                             */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-8 md:px-12 border-t border-white/10 font-mono">
        <div className="max-w-[92rem] mx-auto glass-panel p-6 sm:p-10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_45px_rgba(0,0,0,0.5)]">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              NEXT CHAPTER
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight leading-none text-gradient-silver">
              THE SIGNAL // CONNECT
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('pilots')}
              className="px-6 py-3.5 rounded-full glass-pill border border-white/15 text-white font-mono font-bold text-xs uppercase hover:border-amber-400 hover:text-amber-300 hover:bg-white/10 transition-all cursor-pointer"
            >
              <span>OPERATIVES</span>
            </button>
            <button
              onClick={() => onNavigate('connect')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-red-600 to-amber-600 text-black font-mono font-black text-xs uppercase hover:scale-[1.02] transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.6)]"
            >
              <span>OPEN SIGNAL</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
