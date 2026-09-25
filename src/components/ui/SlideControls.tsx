// src/components/ui/SlideControls.tsx
// Multi-slide deck indicators & navigation controls
// Inspired by Third Way & Boon Global

import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { navigationItems } from '../../data/navigation.ts';

interface SlideControlsProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

export const SlideControls: React.FC<SlideControlsProps> = ({
  currentPage,
  onNavigate,
}) => {
  const currentIndex = navigationItems.findIndex((item) => item.id === currentPage);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(navigationItems[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < navigationItems.length - 1) {
      onNavigate(navigationItems[currentIndex + 1].id);
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-4 pointer-events-auto select-none">
      {/* Slide Up Button */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        aria-label="Previous Chapter Slide"
        className={`p-2 rounded-full glass-pill border border-white/10 text-white/70 transition-all cursor-pointer ${
          currentIndex === 0
            ? 'opacity-30 cursor-not-allowed'
            : 'hover:text-red-600 hover:border-red-600/40 hover:bg-white/10'
        }`}
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      {/* Slide Dots with Floating Tooltips */}
      <div className="glass-panel p-2 flex flex-col items-center gap-3 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {navigationItems.map((item) => {
          const isActive = item.id === currentPage;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group relative flex items-center justify-center p-1.5 cursor-pointer"
              aria-label={`Jump to slide ${item.number}: ${item.label}`}
            >
              {/* Dot Graphic */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2.5 h-6 bg-gradient-to-b from-red-600 to-blue-500 shadow-[0_0_12px_#DC2626]'
                    : 'w-2 h-2 bg-white/30 group-hover:bg-white/70 group-hover:scale-125'
                }`}
              />

              {/* Side Floating Tooltip */}
              <div className="absolute right-8 px-3 py-1 rounded-md glass-panel border border-white/15 text-white text-[11px] font-mono font-bold uppercase whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl">
                <span className="text-red-600 mr-1.5">{item.number}</span>
                {item.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Slide Down Button */}
      <button
        onClick={handleNext}
        disabled={currentIndex === navigationItems.length - 1}
        aria-label="Next Chapter Slide"
        className={`p-2 rounded-full glass-pill border border-white/10 text-white/70 transition-all cursor-pointer ${
          currentIndex === navigationItems.length - 1
            ? 'opacity-30 cursor-not-allowed'
            : 'hover:text-red-600 hover:border-red-600/40 hover:bg-white/10'
        }`}
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
};
