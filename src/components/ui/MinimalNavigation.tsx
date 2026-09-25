// src/components/ui/MinimalNavigation.tsx
// Liquid Glass Floating Navigation Bar with Slide Switchers
// Inspired by Mind Robotics & Boon Global

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Disc3, Layers } from 'lucide-react';
import { navigationItems } from '../../data/navigation.ts';
import { siteContent } from '../../data/site.ts';

interface MinimalNavigationProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

export const MinimalNavigation: React.FC<MinimalNavigationProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Recede navigation on fast scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSelectPage = (pageId: string) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  const activeIndex = navigationItems.findIndex((item) => item.id === currentPage);

  return (
    <>
      {/* Floating Liquid Glass Navigation Bar */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible || isOpen ? 0 : -90 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 py-4 pointer-events-none font-sans text-xs select-none"
      >
        <div className="max-w-[90rem] mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Mark with glowing dot */}
          <button
            onClick={() => handleSelectPage('home')}
            className="flex items-center gap-3 cursor-pointer group glass-pill px-4 py-2 border border-white/10 hover:border-red-600/40 hover:bg-white/[0.08] transition-all"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] shadow-[0_0_12px_#DC2626]" />
              <span className="absolute w-4 h-4 rounded-full bg-[#DC2626]/30 animate-ping" />
            </div>
            <div className="flex items-baseline gap-1.5 font-display font-black tracking-wider text-sm text-white">
              <span>PRIXX</span>
              <span className="text-[10px] text-red-600/80 font-mono">25-26</span>
            </div>
          </button>

          {/* Center Liquid Glass Chapter Switcher (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 glass-pill p-1.5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {navigationItems.map((item) => {
              const isActive = item.id === currentPage;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectPage(item.id)}
                  className={`relative px-4 py-2 rounded-full font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-red-600/60 to-red-800/60 border border-red-600/50 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="text-[10px] text-red-600/90">{item.number}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill-glow"
                      className="absolute inset-0 rounded-full bg-red-600/10 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Controls & Directory Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 glass-pill border border-white/10 hover:border-red-600/40 text-white font-mono font-bold text-xs uppercase cursor-pointer hover:bg-white/[0.08] transition-all"
              aria-label="Toggle Exhibition Index"
            >
              {isOpen ? (
                <>
                  <span>CLOSE</span>
                  <X className="w-3.5 h-3.5 text-red-600" />
                </>
              ) : (
                <>
                  <Layers className="w-3.5 h-3.5 text-red-600" />
                  <span className="hidden sm:inline">CHAPTERS</span>
                  <span className="text-[10px] text-white/50">[{activeIndex + 1}/5]</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Frosted Liquid Glass Index Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(30px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/92 text-white flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto select-none pt-28"
          >
            {/* Ambient Backlight inside menu */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-blue-700/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Index Content */}
            <div className="max-w-[90rem] mx-auto w-full space-y-12 relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
                <span className="text-red-600 font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#DC2626]" />
                  EXHIBITION CHAPTER INDEX
                </span>
                <span className="text-white/50 uppercase">
                  SELECT DESTINATION SLIDE
                </span>
              </div>

              {/* Huge Chapter Navigation Links */}
              <div className="space-y-4 sm:space-y-6">
                {navigationItems.map((item, idx) => {
                  const isSelected = currentPage === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06, duration: 0.35 }}
                      onClick={() => handleSelectPage(item.id)}
                      className={`group flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-7 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/[0.06] border-red-600/50 shadow-[0_0_35px_rgba(0,240,255,0.15)]'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-baseline gap-4 sm:gap-8">
                        <span className="font-mono font-bold text-2xl sm:text-4xl text-red-600/60 group-hover:text-red-600 transition-colors">
                          {item.number}
                        </span>
                        <div>
                          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight group-hover:text-red-500 transition-colors leading-none">
                            {item.label}
                          </h2>
                          <div className="font-mono text-xs text-white/50 uppercase mt-1">
                            {item.fullLabel}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-3 sm:pt-0 font-mono text-xs sm:text-sm font-bold text-white/70 group-hover:text-white">
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px]">
                          {item.badge}
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-red-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="max-w-[90rem] mx-auto w-full pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/60 relative z-10">
              <div className="flex items-center gap-2">
                <Disc3 className="w-3.5 h-3.5 animate-spin text-red-600" />
                <span>{siteContent.brand.name} · {siteContent.brand.hqLocation}</span>
              </div>
              <div>PRESS ESC OR SELECT ANY CHAPTER TO RESUME</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
