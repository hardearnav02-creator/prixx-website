// src/components/sections/ProjectsSection.tsx
// CHAPTER 04 — HARDWARE & ROBOTICS LAB (3D STACKED BLUEPRINT CARDS)
// Visual Atmosphere: Dark Obsidian (#0a0a0a), Crisp Monospace Telemetry, Ruby & Metallic Accents.

import { ArrowRight, ArrowLeft } from 'lucide-react';
import { StackedProjectExhibition } from '../projects/StackedProjectExhibition.tsx';
import { projects } from '../../data/projects.ts';

interface ProjectsSectionProps {
  onNavigate: (pageId: string) => void;
}

export const ProjectsSection = ({ onNavigate }: ProjectsSectionProps) => {
  return (
    <div className="min-h-screen text-white pt-20 relative z-10 selection:bg-red-600 selection:text-black">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC TOP HERO (BREADCRUMB & LAB IDENTITY)                         */}
      {/* ========================================================================= */}
      <section className="py-8 px-4 sm:px-8 md:px-12 border-b border-white/10">
        <div className="max-w-[92rem] mx-auto space-y-6">
          {/* Top Breadcrumb & Return Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full glass-pill border border-red-600/30 text-red-500 font-bold uppercase tracking-wider text-[11px]">
                CHAPTER 04 // THE LAB &amp; MACHINES
              </span>
              <span className="text-white/50 uppercase hidden sm:inline font-medium">
                INTERACTIVE 3D BLUEPRINT EXHIBITION
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

          {/* Headline & Overview */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[0.9] select-none text-white">
                THE MACHINES
              </h1>
              <div className="font-mono text-xs text-red-500 font-bold tracking-wider uppercase">
                {projects.length} DEPLOYED SYSTEMS · 60KG HARDOX // 15KG BILLET DRUM // AIR-1 ROBOCON // TACTICAL ROVER // SUMO
              </div>
            </div>

            <div className="font-mono text-xs text-white/70 uppercase font-bold px-3 py-1 rounded-full border border-white/15 bg-white/[0.05]">
              PRIXX ROBOTICS // HARDWARE BLUEPRINTS
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PINNED 3D STACKED CARDS BLUEPRINT EXHIBITION                          */}
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
            <div className="text-xs font-bold text-red-500 uppercase tracking-widest">
              NEXT CHAPTER
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight leading-none text-white">
              05 // THE SIGNAL &amp; INQUIRY
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('pilots')}
              className="px-6 py-3.5 rounded-full glass-pill border border-white/15 text-white font-mono font-bold text-xs uppercase hover:border-red-500 hover:text-red-400 hover:bg-white/10 transition-all cursor-pointer"
            >
              <span>THE CREW</span>
            </button>
            <button
              onClick={() => onNavigate('connect')}
              className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-mono font-black text-xs uppercase hover:scale-[1.02] transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_25px_rgba(220,38,38,0.4)]"
            >
              <span>TRANSMIT INQUIRY</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
