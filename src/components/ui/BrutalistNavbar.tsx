// src/components/ui/BrutalistNavbar.tsx
// Fixed Brutalist Navigation Bar consuming centralized navigation.ts and site.ts
// Architectural layout with adaptive accents and responsive drawer.

import { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { navigationItems } from '../../data/navigation.ts';
import { siteContent } from '../../data/site.ts';

interface BrutalistNavbarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

export const BrutalistNavbar = ({
  currentPage,
  onNavigate,
}: BrutalistNavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black select-none font-mono">
      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 md:px-16 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group cursor-pointer text-left"
          aria-label="Return to Entry chapter"
        >
          <div className="w-9 h-9 bg-black text-white flex items-center justify-center font-display font-black text-base border-2 border-black group-hover:bg-[#FF3333] transition-colors shadow-brutal-black">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-tighter text-black uppercase leading-none">
              {siteContent.brand.name}
            </span>
            <span className="text-[10px] text-black/70 font-black uppercase tracking-widest">
              EDITION {siteContent.brand.edition} // 2026
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navigationItems.map((item) => {
            const isActive = currentPage === item.id;
            const activeBg =
              item.accent === 'red'
                ? 'bg-[#FF3333] text-white'
                : item.accent === 'blue'
                ? 'bg-[#3366FF] text-white'
                : 'bg-black text-white';

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 font-black text-xs uppercase border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? `${activeBg} border-black shadow-brutal-black -translate-y-0.5`
                    : 'bg-white text-black border-transparent hover:border-black hover:bg-black hover:text-white'
                }`}
              >
                <span>{item.number}</span>
                <span>{item.label}</span>
                {item.badge && isActive && (
                  <span className="ml-1 text-[9px] px-1 py-0.2 bg-white text-black font-black">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Status indicator & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-black text-white text-xs font-black uppercase border-2 border-black">
            <Terminal className="w-3.5 h-3.5 text-[#FF3333]" />
            <span>PVPIT LAB // ONLINE</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-black text-white hover:bg-[#FF3333] transition-colors border-2 border-black cursor-pointer shadow-brutal-black"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t-4 border-black p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = currentPage === item.id;
            const activeBg =
              item.accent === 'red'
                ? 'bg-[#FF3333] text-white'
                : item.accent === 'blue'
                ? 'bg-[#3366FF] text-white'
                : 'bg-black text-white';

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full py-3 px-4 font-black text-sm uppercase text-left border-2 border-black flex items-center justify-between cursor-pointer ${
                  isActive ? activeBg : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
                style={{ boxShadow: '3px 3px 0px 0px #000000' }}
              >
                <div className="flex items-center gap-2">
                  <span>{item.number}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs px-2 py-0.5 bg-black text-white border border-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
