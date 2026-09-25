// src/components/sections/EntrySection.tsx
// CHAPTER 01 — THE ENTRY (LIQUID GLASS / ADVANCED ROBOTICS EXPERIENCE)
// Visual Atmosphere: Dark Obsidian (#0a0a0a), Luminous Cyan/Blue Glows, Frosted Glass Panels.
// Inspired by Mind Robotics & Boon Global

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Disc3, ArrowUpRight, Activity } from 'lucide-react';
import { siteContent } from '../../data/site.ts';
import { MediaPlaceholder } from '../ui/MediaPlaceholder.tsx';
import { SceneFallback } from '../3d/SceneFallback.tsx';

const RobotScene = lazy(() =>
  import('../3d/RobotScene.tsx').then((module) => ({ default: module.RobotScene }))
);

interface EntrySectionProps {
  onNavigate: (pageId: string) => void;
}

export const EntrySection = ({ onNavigate }: EntrySectionProps) => {
  return (
    <div className="min-h-screen text-white pt-20 relative z-10 selection:bg-red-600 selection:text-black">
      {/* ========================================================================= */}
      {/* 1. HERO COMPOSITION (LIQUID GLASS & SLEEK MODERN TYPOGRAPHY)              */}
      {/* ========================================================================= */}
      <section className="relative min-h-[85vh] flex flex-col justify-between py-12 px-4 sm:px-8 md:px-12">
        <div className="max-w-[90rem] mx-auto w-full space-y-8">
          {/* Top Status & Telemetry Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs"
          >
            <div className="flex items-center gap-3 glass-pill px-4 py-1.5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_#DC2626] animate-pulse" />
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                CHAPTER 01 // ABOUT US 
              </span>
              <span className="text-white/30">|</span>
              <span className="text-white/70 uppercase">
                {siteContent.brand.hqLocation}
              </span>
            </div>

            <div className="flex items-center gap-3 glass-pill px-4 py-1.5 border border-white/10">
              <Activity className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[11px] text-white/70 uppercase font-bold">
                SYSTEM STATUS:
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                {siteContent.hero.systemStatus}
              </span>
            </div>
          </motion.div>

          {/* Refined Modern Hero Headline */}
          <div className="space-y-3 pt-2">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] uppercase select-none text-gradient-silver"
            >
              {siteContent.hero.title}
              <br />
              <span className="text-gradient-ruby">
                {siteContent.hero.subtitle}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs sm:text-sm md:text-base font-semibold text-red-500/90 tracking-widest lowercase flex items-center gap-1.5"
            >
              <span>/</span>
              <span>{siteContent.hero.edition}</span>
            </motion.div>
          </div>

          {/* Description & Primary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-6 border-t border-white/10"
          >
            <div className="lg:col-span-7 space-y-4">
              <p className="font-sans font-medium text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
                {siteContent.hero.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs font-bold uppercase">
                {siteContent.hero.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full glass-pill border border-white/10 text-white/80 hover:border-red-600/40 hover:text-red-500 transition-colors"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
              <button
                onClick={() => onNavigate('arena')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-mono font-black text-xs uppercase flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_45px_rgba(220,38,38,0.6)] hover:scale-[1.02] transition-all"
              >
                <span>{siteContent.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => onNavigate('pilots')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-pill border border-white/15 text-white hover:border-red-600/50 hover:bg-white/10 font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>VIEW MEMBERS</span>
                <ArrowUpRight className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 2. 3D ROBOT VIEWPORT (LIQUID FROSTED GLASS CAD CONTAINER)                  */}
        {/* ========================================================================= */}
        <div className="max-w-[90rem] mx-auto w-full mt-12 space-y-3 relative z-10">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_#DC2626]" />
              <span className="text-white/90 font-bold uppercase tracking-wider">
                SARKHEL 110 KG CAD VIEWPORT
              </span>
            </div>
            <span className="text-white/50 uppercase hidden sm:inline text-[11px]">
              INTERACTIVE 3D VIEWPORT
            </span>
          </div>

          <div className="glass-panel p-2 sm:p-4 border border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.6)]">
            <Suspense fallback={<SceneFallback />}>
              <RobotScene />
            </Suspense>
          </div>
        </div>

        {/* Video B-Roll Feed Strip */}
        <div className="max-w-[90rem] mx-auto w-full mt-10 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <Disc3 className="w-3.5 h-3.5 text-red-600 animate-spin" />
              <span className="text-white/90 font-bold uppercase tracking-wider">
                COMPETITION HIGHLIGHTS
              </span>
            </div>
            <span className="text-white/50 uppercase text-[11px]">MATCH REEL</span>
          </div>

          <div className="glass-panel p-2 border border-white/10 overflow-hidden">
            <MediaPlaceholder
              type="video"
              id="hero-video"
              title={siteContent.hero.bRollTitle}
              subtitle={siteContent.hero.bRollSubtitle}
              aspectRatio="aspect-[21/9] sm:aspect-[21/8]"
              badge="HIGHLIGHTS REEL"
              badgeColor="#DC2626"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HARDWARE TELEMETRY (FROSTED GLASS METRIC TILES)                         */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-8 md:px-12 border-t border-white/10">
        <div className="max-w-[90rem] mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4 font-mono">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
                ENGINEERING TELEMETRY
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl uppercase tracking-tight text-white">
                HARDENED SPECIFICATIONS
              </h2>
            </div>
            <span className="text-xs text-white/50 font-bold uppercase">
              CNC HARDOX 500 MONOCOQUE RIG
            </span>
          </div>

          {/* Liquid Glass Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
            {siteContent.hardwareTelemetry.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 border border-white/10 hover:border-red-600/40 hover:bg-white/[0.05] transition-all space-y-2"
              >
                <div className="text-xs font-bold uppercase text-white/50 tracking-wider">
                  {item.label}
                </div>
                <div
                  className="font-display font-black text-3xl sm:text-4xl uppercase leading-none"
                  style={{
                    color: item.accent === 'red' ? '#FF3366' : item.accent === 'blue' ? '#DC2626' : '#FFFFFF',
                  }}
                >
                  {item.value}
                </div>
                <div className="text-xs font-medium text-white/70">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CHAPTER PORTALS (FROSTED LIQUID GLASS SLIDE TILES)                     */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-8 md:px-12 border-t border-white/10">
        <div className="max-w-[90rem] mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <span className="px-3 py-1 rounded-full glass-pill border border-red-600/30 text-red-600 font-mono font-bold text-xs uppercase tracking-wider inline-block mb-3">
                NAVIGATION
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl uppercase tracking-tight text-white leading-none">
                SELECT DESTINATION
              </h2>
            </div>
            <p className="font-mono text-xs sm:text-sm text-white/60 max-w-md font-medium uppercase leading-relaxed">
              EXPLORE COMPETITION ARCHIVES, THE VERIFIED OPERATIVES, HARDWARE LAB ROBOTICS, OR BAVDHAN LAB TRANSMISSIONS.
            </p>
          </div>

          {/* 4 Chapter Portals in Liquid Glass Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* PORTAL 02: ACHIEVEMENTS */}
            <div
              onClick={() => onNavigate('arena')}
              className="group cursor-pointer glass-panel p-6 border border-white/10 hover:border-red-600/50 hover:bg-white/[0.05] transition-all space-y-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded-full bg-red-600/30 text-red-500 border border-red-600/30 font-bold uppercase text-[11px]">
                  CHAPTER 02
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-red-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-white group-hover:text-red-500 transition-colors leading-none">
                ACHIEVEMENTS
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                60kg Heavyweight championship wins at Parul, IIT Bombay &amp; COEP finishes, and Russia tournament logs.
              </p>
              <div className="font-mono text-xs font-bold uppercase text-red-600 flex items-center gap-1.5 pt-2">
                <span>ENTER ACHIEVEMENTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* PORTAL 03: MEMBERS */}
            <div
              onClick={() => onNavigate('pilots')}
              className="group cursor-pointer glass-panel p-6 border border-white/10 hover:border-red-500/50 hover:bg-white/[0.05] transition-all space-y-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded-full bg-rose-600/30 text-rose-300 border border-rose-400/30 font-bold uppercase text-[11px]">
                  CHAPTER 03
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-rose-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-white group-hover:text-rose-300 transition-colors leading-none">
                MEMBERS
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                Explore the verified operatives with spatial depth, combat drivers, AI architects, and Russia delegates.
              </p>
              <div className="font-mono text-xs font-bold uppercase text-rose-400 flex items-center gap-1.5 pt-2">
                <span>EXPLORE MEMBERS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* PORTAL 04: ROBOTICS LAB */}
            <div
              onClick={() => onNavigate('projects')}
              className="group cursor-pointer glass-panel p-6 border border-white/10 hover:border-red-600/50 hover:bg-white/[0.05] transition-all space-y-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-400/30 font-bold uppercase text-[11px]">
                  CHAPTER 04
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-red-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-white group-hover:text-red-500 transition-colors leading-none">
                THE LAB
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                5 deployed combat machines and autonomous systems: Kaal Bahirav 60kg, SaiRex, Robocon, and Shikh Rakshak.
              </p>
              <div className="font-mono text-xs font-bold uppercase text-red-600 flex items-center gap-1.5 pt-2">
                <span>VIEW MACHINES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* PORTAL 05: THE SIGNAL */}
            <div
              onClick={() => onNavigate('connect')}
              className="group cursor-pointer glass-panel p-6 border border-white/10 hover:border-rose-400/50 hover:bg-white/[0.05] transition-all space-y-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded-full bg-red-600/30 text-red-300 border border-red-400/30 font-bold uppercase text-[11px]">
                  CHAPTER 05
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-rose-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-white group-hover:text-rose-300 transition-colors leading-none">
                THE SIGNAL
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                PVPIT Bavdhan campus coordinates, official communications, chassis partnerships, and testbench telemetry.
              </p>
              <div className="font-mono text-xs font-bold uppercase text-rose-400 flex items-center gap-1.5 pt-2">
                <span>OPEN SIGNAL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};