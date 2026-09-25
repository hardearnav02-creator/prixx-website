// src/components/sections/ArenaSection.tsx
// CHAPTER 02 — ACHIEVEMENTS & ARENA CAMPAIGNS
// Visual Atmosphere: Dark Obsidian / Warm Amber & Luminous Accents, Frosted Glass Panels.
// Features the Serpentine Constellation & Staggered Spatial Cards layout from the reference designs.
// Inspired by The Obsidian Assembly, Mind Robotics & Third Way

import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SerpentineAchievementTimeline } from '../achievements/SerpentineAchievementTimeline.tsx';
import { siteContent } from '../../data/site.ts';

interface ArenaSectionProps {
  onNavigate: (pageId: string) => void;
}

export const ArenaSection = ({ onNavigate }: ArenaSectionProps) => {
  return (
    <div className="min-h-screen text-white pt-20 relative z-10 selection:bg-amber-500 selection:text-black">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO (TOP BREADCRUMB & METRICS OVERVIEW)                     */}
      {/* ========================================================================= */}
      <section className="py-8 px-4 sm:px-8 md:px-12 border-b border-white/10">
        <div className="max-w-[92rem] mx-auto space-y-6">
          {/* Top Breadcrumb & Return Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full glass-pill border border-amber-500/30 text-amber-300 font-bold uppercase tracking-wider text-[11px]">
                CHAPTER 02 // ACHIEVEMENTS
              </span>
              <span className="text-white/50 uppercase hidden sm:inline font-medium">
                THE CONSTELLATION TIMELINE
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

          {/* Frosted Glass Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 font-mono">
            {siteContent.metrics.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 sm:p-5 border border-white/10 hover:border-amber-500/30 hover:bg-white/[0.04] transition-all space-y-1.5"
              >
                <div
                  className="font-display font-black text-2xl sm:text-3xl leading-none text-amber-300"
                >
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[11px] text-white/50 uppercase font-medium">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SERPENTINE CONSTELLATION EXHIBITION (THE REFERENCE LAYOUT)             */}
      {/* ========================================================================= */}
      <section className="relative">
        <SerpentineAchievementTimeline onNavigate={onNavigate} />
      </section>

      {/* ========================================================================= */}
      {/* 3. CHAPTER EXIT TO OPERATIVES                                            */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-8 md:px-12 border-t border-white/10 font-mono">
        <div className="max-w-[92rem] mx-auto glass-panel p-6 sm:p-10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_45px_rgba(0,0,0,0.5)]">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              NEXT CHAPTER
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight leading-none text-gradient-silver">
              THE MEMBERS // SPECIALIZED OPERATIVES
            </div>
          </div>

          <button
            onClick={() => onNavigate('pilots')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-red-600 to-amber-600 text-black font-mono font-black text-xs uppercase flex items-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.6)] hover:scale-[1.02] transition-all"
          >
            <span>VIEW OPERATIVES</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </section>
    </div>
  );
};
