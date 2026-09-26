// src/components/achievements/SerpentineAchievementTimeline.tsx
// Serpentine Constellation & Staggered Spatial Cards Exhibition for Achievements
// Winding spline wave with concentric circled number badges,
// staggered floating translucent cards, and faint watermark numerals.
// Details appear ONLY on "VIEW DETAILS" click (opens modal).
// Inspired by The Obsidian Assembly & Mind Robotics

import React, { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { achievements, Achievement } from '../../data/achievements.ts';
import { AchievementDossierModal } from './AchievementDossierModal.tsx';
import { ScrollRouteBot } from './ScrollRouteBot.tsx';

interface SerpentineAchievementTimelineProps {
  onNavigate?: (pageId: string) => void;
}

// Stagger positions for alternating left/right placement on the spline path
const cardPositions: Array<{
  justify: string;
  padding: string;
}> = [
  { justify: 'justify-end',    padding: 'lg:pr-16' },   // 1 — right
  { justify: 'justify-start',  padding: 'lg:pl-8' },    // 2 — left
  { justify: 'justify-end',    padding: 'lg:pr-8' },    // 3 — right
  { justify: 'justify-start',  padding: 'lg:pl-16' },   // 4 — left
  { justify: 'justify-end',    padding: 'lg:pr-12' },   // 5 — right
  { justify: 'justify-start',  padding: 'lg:pl-8' },    // 6 — left
  { justify: 'justify-center', padding: '' },            // 7 — center
];

export const SerpentineAchievementTimeline: React.FC<SerpentineAchievementTimelineProps> = ({
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalAchievement, setActiveModalAchievement] = useState<Achievement | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeStationInfo, setActiveStationInfo] = useState<{ index: number; isCollided: boolean }>({
    index: -1,
    isCollided: false,
  });
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  const filteredAchievements = useMemo(() => {
    return selectedCategory === 'all'
      ? achievements
      : achievements.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="relative w-full text-white select-none overflow-hidden pb-16">
      {/* ================================================================= */}
      {/* 0. TACTICAL TOPOGRAPHIC BACKGROUND                                */}
      {/* ================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px]" />

        <svg
          className="absolute w-full h-full opacity-25"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 2000"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="topoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C5A880" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#DC2626" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M-100,200 C300,100 600,400 1100,250 C1300,180 1500,320 1600,200" fill="none" stroke="url(#topoGradient)" strokeWidth="1" strokeDasharray="4 6" />
          <path d="M-50,550 C200,420 700,680 1050,490 C1250,380 1450,520 1600,460" fill="none" stroke="url(#topoGradient)" strokeWidth="0.8" />
          <path d="M-100,950 C350,800 650,1100 1200,920 C1400,840 1550,980 1600,920" fill="none" stroke="url(#topoGradient)" strokeWidth="1" strokeDasharray="6 8" />
          <path d="M-50,1400 C400,1250 800,1550 1150,1380 C1350,1280 1500,1420 1600,1360" fill="none" stroke="url(#topoGradient)" strokeWidth="0.8" />
          <circle cx="240" cy="480" r="140" fill="none" stroke="#C5A880" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 4" />
          <circle cx="1200" cy="1050" r="180" fill="none" stroke="#DC2626" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="3 6" />
        </svg>

        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[140px]" />
        <div className="absolute top-[55%] right-[15%] w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[160px]" />
      </div>

      {/* ================================================================= */}
      {/* 1. TOP HEADER & PILL SWITCHER                                     */}
      {/* ================================================================= */}
      <div className="relative z-10 max-w-[92rem] mx-auto px-4 sm:px-8 pt-8 pb-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Brand Title */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="font-display font-black text-2xl sm:text-3xl tracking-tight uppercase text-white">
                PRIXX ACHIEVEMENTS
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                PODIUM LOGS
              </span>
            </div>
            <div className="font-mono text-xs text-white/50 tracking-wider uppercase">
              2025 // 2026 ARCHIVE · ALL SEVEN CAMPAIGNS VERIFIED
            </div>
          </div>

          {/* Segmented Pill Toggle */}
          <div className="flex flex-col items-center">
            <div className="glass-pill p-1.5 border border-white/15 bg-black/60 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-wrap items-center gap-1">
              {[
                { id: 'all', label: 'ALL 7 PODIUMS' },
                { id: 'robowar', label: '60KG ROBOWAR' },
                { id: 'robocon', label: 'ROBOCON AIR-1' },
                { id: 'russia', label: 'RUSSIA INTL' },
                { id: 'hackathon', label: 'SUMO & AI' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#222226] text-white shadow-md border border-white/20'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Diamond Accent */}
            <div className="pt-2 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber-300/80">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate && onNavigate('pilots')}
              className="px-6 py-2.5 rounded-full glass-pill border border-white/15 text-white/90 hover:text-white hover:border-amber-500/40 hover:bg-white/[0.08] transition-all font-mono text-xs font-bold uppercase cursor-pointer"
            >
              DEPLOYED MEMBERS
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. SPLINE WAVE & STAGGERED SPATIAL CARDS                          */}
      {/* ================================================================= */}
      <div
        ref={cardsContainerRef}
        className="relative z-10 max-w-[92rem] mx-auto px-4 sm:px-8 py-4"
      >
        {/* Interactive Scroll-Following Route Spline & Dynamic Temporary Point (Behind cards at z-[5]) */}
        <ScrollRouteBot
          containerRef={cardsContainerRef}
          totalCards={filteredAchievements.length}
          onActiveCardChange={(index, isCollided) => {
            setActiveStationInfo({ index, isCollided });
          }}
        />

        {/* Card Grid — Front Layer (relative z-20), above route spline & bot */}
        <div className="relative z-20 space-y-6 sm:space-y-8">
          {filteredAchievements.map((achievement) => {
            // Use the original index in the full array for consistent positioning
            const originalIdx = achievements.findIndex((a) => a.id === achievement.id);
            const pos = cardPositions[originalIdx] || cardPositions[0];
            const isCollided =
              activeStationInfo.isCollided && activeStationInfo.index === originalIdx;

            return (
              <div
                key={achievement.id}
                className={`flex ${pos.justify} ${pos.padding}`}
              >
                <AchievementSpatialCard
                  achievement={achievement}
                  stepNumber={achievement.number}
                  watermark={achievement.number}
                  isHovered={hoveredCardId === achievement.id}
                  isCollided={isCollided}
                  onMouseEnter={() => setHoveredCardId(achievement.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onViewDetails={() => setActiveModalAchievement(achievement)}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Indicator */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 font-mono text-xs relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center font-display font-bold text-amber-300">
              {filteredAchievements.length}
            </div>
            <span className="font-bold text-white uppercase tracking-widest">
              {filteredAchievements.length} PODIUM CAMPAIGNS // VERIFIED
            </span>
          </div>

          <div className="flex items-center gap-3 text-white/60 uppercase">
            <span>NEXT: MEMBERS</span>
            <button
              onClick={() => onNavigate && onNavigate('pilots')}
              className="p-2 rounded-full glass-pill border border-white/20 text-white hover:border-amber-400 hover:text-amber-300 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. DOSSIER MODAL (DETAILS ONLY APPEAR ON "VIEW DETAILS" CLICK)     */}
      {/* ================================================================= */}
      <AchievementDossierModal
        achievement={activeModalAchievement}
        onClose={() => setActiveModalAchievement(null)}
      />
    </div>
  );
};

/* ======================================================================= */
/* SPATIAL CARD — Clicking the card is NOT an action. Only "VIEW DETAILS"  */
/* button triggers the modal.                                              */
/* ======================================================================= */

interface AchievementSpatialCardProps {
  achievement: Achievement;
  stepNumber: string;
  watermark?: string;
  isHovered: boolean;
  isCollided?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onViewDetails: () => void;
}

const AchievementSpatialCard: React.FC<AchievementSpatialCardProps> = ({
  achievement,
  stepNumber,
  watermark,
  isHovered,
  isCollided = false,
  onMouseEnter,
  onMouseLeave,
  onViewDetails,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative w-full max-w-[560px] rounded-[28px] p-6 sm:p-8 transition-all duration-300 border ${
        isCollided
          ? 'bg-[#181926]/95 border-amber-400 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.5),0_0_80px_rgba(220,38,38,0.25)] ring-2 ring-amber-400/60 -translate-y-1.5 scale-[1.015]'
          : isHovered
          ? 'bg-[#16171d]/90 border-amber-500/50 shadow-[0_16px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.2)] -translate-y-1'
          : 'bg-[#111217]/85 backdrop-blur-2xl border-white/[0.12] shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
      }`}
    >
      {/* Dynamic Collision Energy Aura */}
      {isCollided && (
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-amber-500/15 via-red-500/10 to-transparent pointer-events-none -z-10 animate-pulse" />
      )}

      {/* Giant Faint Watermark Numeral */}
      {watermark && (
        <div className="absolute right-6 bottom-4 pointer-events-none select-none font-display font-black text-7xl sm:text-8xl text-white/[0.04] leading-none z-0">
          {watermark}
        </div>
      )}

      {/* Top Row: Badge + Circled Number */}
      <div className="relative z-10 flex items-start justify-between gap-3 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-black font-mono font-black text-[10px] sm:text-xs uppercase tracking-wider"
            style={{ backgroundColor: achievement.badgeColor }}
          >
            {achievement.badge}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 font-mono text-[10px] text-white/70 font-bold uppercase">
            {achievement.year}
          </span>
        </div>

        {/* Concentric circled step badge */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full border p-0.5 flex items-center justify-center transition-all ${
              isCollided
                ? 'border-amber-400 scale-110 shadow-[0_0_20px_#F59E0B]'
                : 'border-amber-300/30'
            }`}
          >
            <div
              className={`w-full h-full rounded-full border flex items-center justify-center font-display font-bold text-base sm:text-lg transition-all ${
                isCollided
                  ? 'border-amber-400 bg-amber-400/30 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'border-amber-400/50 bg-amber-400/10 text-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
              }`}
            >
              {stepNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 space-y-2.5 my-1">
        <h3
          className={`font-display font-black text-lg sm:text-xl md:text-2xl uppercase tracking-tight leading-[1.08] transition-colors ${
            isCollided ? 'text-amber-200' : 'text-white'
          }`}
        >
          {achievement.title}
        </h3>
        <p className="font-sans text-sm text-white/75 leading-relaxed font-normal line-clamp-2">
          {achievement.description || achievement.highlights[0]?.desc}
        </p>
      </div>

      {/* Footer: Competition + VIEW DETAILS button (ONLY this triggers details) */}
      <div className="relative z-10 pt-4 mt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-white/55 min-w-0">
          <ShieldCheck
            className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
              isCollided ? 'text-amber-300 animate-pulse' : 'text-amber-400'
            }`}
          />
          <span className="text-[11px] uppercase truncate">
            {achievement.competition}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          className="flex items-center gap-1.5 font-bold text-amber-300 hover:text-white transition-colors text-[11px] uppercase cursor-pointer px-3 py-1.5 rounded-full hover:bg-white/10"
        >
          <span>VIEW DETAILS</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </motion.div>
  );
};

