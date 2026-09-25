// src/components/projects/StackedProjectExhibition.tsx
// Pinned 3D Stacked Cards & Flanked Editorial Exhibition for Projects/Hardware.
// Inspired by The Obsidian Assembly & Mind Robotics
// Features: Central 3D stacked cards deck, circular counter, side-by-side editorial & telemetry data.
// STRICT ISOLATION: Scrolling on the central image deck ONLY changes project cards and never scrolls the webpage.
// Scrolling anywhere else on the page scrolls the webpage normally.
// Enhanced with long luxury easing transitions (0.75s).

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronUp, ChevronDown, ArrowUpRight, Cpu, Users } from 'lucide-react';
import { projects } from '../../data/projects.ts';

interface StackedProjectExhibitionProps {
  onNavigate?: (pageId: string) => void;
}

export const StackedProjectExhibition: React.FC<StackedProjectExhibitionProps> = ({
  onNavigate: _onNavigate,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDeckHovered, setIsDeckHovered] = useState(false);
  const imageDeckRef = useRef<HTMLDivElement | null>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

  const totalProjects = projects.length;
  const currentProject = projects[activeIdx];

  const goToNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const goToPrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  const goToIndex = (idx: number) => {
    if (idx >= 0 && idx < totalProjects) {
      setActiveIdx(idx);
    }
  };

  // Wheel listener attached strictly to imageDeckRef
  useEffect(() => {
    const deck = imageDeckRef.current;
    if (!deck) return;

    const handleWheel = (e: WheelEvent) => {
      // 1. Unconditionally stop bubbling and prevent page scroll on the image deck
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const now = Date.now();
      // 2. Luxurious pacing cooldown between transitions (520ms)
      if (now - lastScrollTimeRef.current < 520) return;

      // Delta threshold to ignore accidental micro-movements
      if (Math.abs(e.deltaY) < 15) return;

      if (e.deltaY > 0) {
        // Scroll DOWN -> Next project image
        lastScrollTimeRef.current = now;
        goToNext();
      } else if (e.deltaY < 0) {
        // Scroll UP -> Previous project image
        lastScrollTimeRef.current = now;
        goToPrev();
      }
    };

    // Use capture: true and passive: false to intercept before any other scroll handler
    deck.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    return () => {
      deck.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [goToNext, goToPrev]);

  // Touch Swipe strictly on image deck for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent page scroll when touch starts on the image deck
    e.stopPropagation();
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent page scroll while finger is moving on the image deck
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartYRef.current - touchEndY;
    const now = Date.now();

    if (now - lastScrollTimeRef.current < 450) return;

    // Vertical swipe threshold: 50px minimum to change card
    if (deltaY > 50) {
      lastScrollTimeRef.current = now;
      goToNext();
    } else if (deltaY < -50) {
      lastScrollTimeRef.current = now;
      goToPrev();
    }
  };

  // Keyboard navigation when image deck is hovered
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDeckHovered) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDeckHovered, goToNext, goToPrev]);

  const accentColor =
    currentProject.accent === 'red'
      ? '#EF4444'
      : currentProject.accent === 'blue'
      ? '#3B82F6'
      : '#F59E0B';

  return (
    <div className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between py-6 px-4 sm:px-8 md:px-12 select-none overflow-hidden">
      {/* ================================================================= */}
      {/* 0. SUBTLE ORBITAL BACKGROUND (THE OBSIDIAN ASSEMBLY STYLE)        */}
      {/* ================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px]" />

        <svg
          className="absolute w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="orbitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C5A880" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#EF4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <ellipse cx="720" cy="450" rx="600" ry="340" fill="none" stroke="url(#orbitalGradient)" strokeWidth="1" strokeDasharray="6 8" />
          <ellipse cx="720" cy="450" rx="420" ry="240" fill="none" stroke="#C5A880" strokeWidth="0.75" strokeOpacity="0.3" />
          <ellipse cx="720" cy="450" rx="220" ry="120" fill="none" stroke="#EF4444" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="3 6" />
        </svg>

        <div className="absolute top-[20%] left-[15%] w-[450px] h-[450px] bg-red-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[150px]" />
      </div>

      {/* ================================================================= */}
      {/* 1. TOP SELECTOR PILL STRIP                                        */}
      {/* ================================================================= */}
      <div className="relative z-10 max-w-[92rem] mx-auto w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {projects.map((proj, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={proj.id}
                onClick={() => goToIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                  isActive
                    ? 'bg-[#222226] text-white shadow-md border border-amber-400/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    : 'text-white/60 hover:text-white glass-pill border border-white/10 hover:border-white/25'
                }`}
              >
                <span className="text-[10px] text-amber-300/80">{proj.roman}</span>
                <span>{proj.name}</span>
              </button>
            );
          })}
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-2 text-white/70">
          <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest hidden sm:inline">
            SCROLL IMAGE TO STEP
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={goToPrev}
              className="p-2 rounded-full glass-pill border border-white/15 text-white hover:border-amber-400 hover:text-amber-300 transition-all cursor-pointer"
              aria-label="Previous Project"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full glass-pill border border-white/15 text-white hover:border-amber-400 hover:text-amber-300 transition-all cursor-pointer"
              aria-label="Next Project"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. THE MAIN STAGE: LEFT CONTEXT | CENTER 3D STACK | RIGHT SPECS   */}
      {/* ================================================================= */}
      <div className="relative z-10 max-w-[92rem] mx-auto w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* ------------------------------------------------------------- */}
          {/* LEFT COLUMN: Context & Narrative                              */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-5 order-2 lg:order-1 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${currentProject.id}`}
                initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {/* Editorial Top Headline */}
                <div className="font-mono text-[11px] sm:text-xs text-amber-300/80 font-bold uppercase tracking-wider">
                  {currentProject.editorialLeft || 'THESE MACHINES ARE FORMED WITHIN THE COMBAT ARENA.'}
                </div>

                {/* Roman Numeral & Title */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center lg:justify-start gap-2.5">
                    <span className="font-display font-black text-2xl sm:text-3xl text-amber-300">
                      {currentProject.roman}
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
                      {currentProject.name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/80 font-bold uppercase text-[10px]">
                      {currentProject.code}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full font-bold uppercase text-black text-[10px]"
                      style={{ backgroundColor: accentColor }}
                    >
                      {currentProject.weightClass}
                    </span>
                    <span className="text-white/50 text-[10px] font-bold uppercase">
                      YEAR {currentProject.year}
                    </span>
                  </div>
                </div>

                {/* Narrative Description */}
                <p className="font-sans text-sm text-white/80 leading-relaxed max-w-md mx-auto lg:mx-0">
                  {currentProject.description}
                </p>

                {/* Deployed Operatives */}
                {currentProject.team && currentProject.team.length > 0 && (
                  <div className="pt-2 space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-center lg:justify-start gap-1.5 text-white/50 text-[11px] uppercase font-bold">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>DEPLOYED OPERATIVES:</span>
                    </div>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
                      {currentProject.team.map((member, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-2.5 py-1 rounded-full bg-white/[0.05] text-white/90 font-medium uppercase text-[11px] border border-white/10"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CENTER COLUMN: 3D Stacked Cards Deck (SCROLL CAPTURE TARGET)  */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
            <div
              ref={imageDeckRef}
              onMouseEnter={() => setIsDeckHovered(true)}
              onMouseLeave={() => setIsDeckHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              data-lenis-prevent
              data-cursor="SCROLL"
              className="relative w-[300px] sm:w-[350px] md:w-[380px] h-[460px] sm:h-[520px] flex items-center justify-center cursor-ns-resize group select-none"
              style={{ touchAction: 'none' }}
            >
              {/* Circular Counter Badge Floating alongside Deck */}
              <div className="absolute -top-3 right-0 sm:-right-4 z-40">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-amber-300/40 p-0.5 flex items-center justify-center bg-black/85 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  <div className="w-full h-full rounded-full border border-amber-400/60 bg-amber-400/10 flex items-center justify-center font-display font-bold text-xs sm:text-sm text-amber-200">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeIdx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activeIdx + 1} / {totalProjects}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Hover indicator cue on image deck */}
              <div className="absolute -bottom-3 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/90 border border-amber-400/50 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider shadow-xl backdrop-blur-md">
                  ↕ SCROLL IMAGE TO SWITCH
                </span>
              </div>

              {/* Stacked Cards Deck Layering with Luxury 0.75s Easing Transitions */}
              {projects.map((proj, idx) => {
                const offset = idx - activeIdx;
                const isActive = idx === activeIdx;
                const isPast = offset < 0;
                const isFuture = offset > 0;

                // 3D Stacking Transform Values
                let yVal = 0;
                let scaleVal = 1;
                let opacityVal = 1;
                let zIndexVal = 30;
                let rotateVal = 0;

                if (isActive) {
                  yVal = 0;
                  scaleVal = 1;
                  opacityVal = 1;
                  zIndexVal = 30;
                  rotateVal = 0;
                } else if (isPast) {
                  // Stacked above/behind
                  yVal = -52 + offset * 14;
                  scaleVal = Math.max(0.88 + offset * 0.04, 0.78);
                  opacityVal = Math.max(0.25 + offset * 0.1, 0.08);
                  zIndexVal = 10 + offset;
                  rotateVal = -2;
                } else if (isFuture) {
                  // Stacked below/behind
                  yVal = 46 + offset * 14;
                  scaleVal = Math.max(0.92 - offset * 0.04, 0.8);
                  opacityVal = Math.max(0.4 - offset * 0.12, 0.08);
                  zIndexVal = 20 - offset;
                  rotateVal = 1.6;
                }

                // Hide cards too far in stack
                if (Math.abs(offset) > 2) {
                  opacityVal = 0;
                }

                return (
                  <motion.div
                    key={proj.id}
                    animate={{
                      y: yVal,
                      scale: scaleVal,
                      opacity: opacityVal,
                      rotateZ: rotateVal,
                    }}
                    transition={{
                      duration: 0.75,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => goToIndex(idx)}
                    style={{ zIndex: zIndexVal }}
                    className={`absolute inset-0 rounded-[28px] overflow-hidden border cursor-pointer ${
                      isActive
                        ? 'border-amber-400/50 shadow-[0_20px_55px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.25)]'
                        : 'border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.7)] pointer-events-auto'
                    }`}
                  >
                    {/* Dark Glass Background & Robot Visual */}
                    <div className="relative w-full h-full bg-[#111217]">
                      {proj.image ? (
                        <motion.img
                          src={proj.image}
                          alt={proj.name}
                          animate={{
                            scale: isActive ? 1.0 : 1.06,
                          }}
                          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full h-full object-cover object-center filter contrast-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#1c1d24] to-[#0c0d12]">
                          <Cpu className="w-16 h-16 text-white/20" />
                        </div>
                      )}

                      {/* Dark Cinematic Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-85" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                      {/* Top Roman Numeral on Card */}
                      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 font-mono text-xs">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 font-bold uppercase tracking-wider shadow-sm">
                          {proj.roman} {proj.code}
                        </span>
                        <span className="text-[11px] font-bold uppercase text-white/70">
                          {proj.weightClass}
                        </span>
                      </div>

                      {/* Bottom Title on Card */}
                      <div className="absolute bottom-5 left-5 right-5 z-10 space-y-1">
                        <div className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight leading-tight drop-shadow-md">
                          {proj.name}
                        </div>
                        <div className="font-mono text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                          {proj.category}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT COLUMN: Specifications & Action                         */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-5 order-3 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${currentProject.id}`}
                initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {/* Editorial Top Headline */}
                <div className="font-mono text-[11px] sm:text-xs text-amber-300/80 font-bold uppercase tracking-wider">
                  {currentProject.editorialRight || 'EACH SYSTEM IS SHAPED BY MATERIAL, KINETIC ENERGY, AND CIRCUMSTANCE.'}
                </div>

                {/* Technical Specifications Grid */}
                <div className="space-y-2 font-mono">
                  <div className="text-[11px] font-bold uppercase text-white/50 tracking-wider flex items-center justify-center lg:justify-start gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-amber-400" />
                    <span>TELEMETRY SPECIFICATIONS</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {currentProject.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/30 transition-all space-y-1 text-left"
                      >
                        <div className="text-[9px] font-bold uppercase text-white/50 tracking-wider">
                          {spec.label}
                        </div>
                        <div className="font-display font-bold text-xs sm:text-sm uppercase text-white truncate">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Achievements List */}
                {currentProject.achievements && currentProject.achievements.length > 0 && (
                  <div className="space-y-1.5 pt-1 font-mono text-xs">
                    <div className="text-[11px] font-bold uppercase text-amber-300/80 flex items-center justify-center lg:justify-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>VERIFIED PODIUMS &amp; CREDENTIALS:</span>
                    </div>
                    {currentProject.achievements.map((ach, aIdx) => (
                      <div
                        key={aIdx}
                        className="flex items-center justify-center lg:justify-start gap-2 text-white/85 text-xs font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action CTA Button */}
                <div className="pt-2 flex justify-center lg:justify-start">
                  <button
                    onClick={() => {
                      const nextIndex = (activeIdx + 1) % totalProjects;
                      goToIndex(nextIndex);
                    }}
                    className="px-6 py-2.5 rounded-full glass-pill border border-amber-400/40 text-amber-200 hover:text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  >
                    <span>EXPLORE OBJECTS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. BOTTOM INDICATOR STRIP                                         */}
      {/* ================================================================= */}
      <div className="relative z-10 max-w-[92rem] mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/60">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border border-amber-400/40 flex items-center justify-center font-display font-bold text-amber-300 text-xs">
            {activeIdx + 1}
          </div>
          <span className="font-bold text-white uppercase tracking-widest text-[11px]">
            PROJECT {activeIdx + 1} OF {totalProjects} // {currentProject.name}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] uppercase">
          <span>HOVER IMAGE &amp; SCROLL TO STEP</span>
          <span className="text-white/30">•</span>
          <span className="text-amber-300/80">IMAGINE POSSIBLE</span>
        </div>
      </div>
    </div>
  );
};
