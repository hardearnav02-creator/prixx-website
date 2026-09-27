// src/App.tsx
// Prixx Robotics — Liquid Glass Digital Experience & Robotics Exhibition
// Multi-slide spatial navigation, Ambient background, Minimal navigation, and Slide controls
// Color Proportions: Black 40%, Dark Red 30%, White 20%, Blue 10%
// Inspired by Boon Global, Mind Robotics, and Third Way

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MinimalNavigation } from './components/ui/MinimalNavigation.tsx';
import { CinematicPreloader } from './components/ui/CinematicPreloader.tsx';
import { CustomCursor } from './components/ui/CustomCursor.tsx';
import { AmbientBackground } from './components/ui/AmbientBackground.tsx';
import { SlideControls } from './components/ui/SlideControls.tsx';
import { SmoothScrollProvider } from './components/ui/SmoothScrollProvider.tsx';
import { EntrySection } from './components/sections/EntrySection.tsx';
import { ArenaSection } from './components/sections/ArenaSection.tsx';
import { TeamSection } from './components/sections/TeamSection.tsx';
import { ProjectsSection } from './components/sections/ProjectsSection.tsx';
import { SignalSection } from './components/sections/SignalSection.tsx';
import { navigationItems } from './data/navigation.ts';
import { pageTransitionVariants } from './lib/motion.ts';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showPreloader, setShowPreloader] = useState(true);

  // URL Hash synchronization for direct linking (#home, #arena, #pilots, #projects, #connect)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'arena', 'pilots', 'projects', 'connect'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (pageId: string) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation for multi-slide experience (1-5 keys, Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs/textareas or when a modal is active
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT' ||
        document.body.style.overflow === 'hidden'
      ) {
        return;
      }

      const currentIndex = navigationItems.findIndex((item) => item.id === currentPage);

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < navigationItems.length - 1) {
          navigateTo(navigationItems[currentIndex + 1].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          navigateTo(navigationItems[currentIndex - 1].id);
        }
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const targetIndex = parseInt(e.key, 10) - 1;
        if (targetIndex >= 0 && targetIndex < navigationItems.length) {
          navigateTo(navigationItems[targetIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <SmoothScrollProvider>
      {/* 0. Cinematic Soundless Preloader */}
      {showPreloader && (
        <CinematicPreloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* 1. Precision Cybernetic Cursor */}
      <CustomCursor />

      {/* 2. Floating Ambient Mesh Gradients & Particle Glows */}
      <AmbientBackground />

      <div className="min-h-screen bg-transparent text-white font-sans antialiased selection:bg-red-600 selection:text-white relative z-10">
        {/* 3. Floating Liquid Glass Navigation Bar */}
        <MinimalNavigation
          currentPage={currentPage}
          onNavigate={navigateTo}
        />

        {/* 4. Multi-Slide Deck Indicators & Controls */}
        <SlideControls
          currentPage={currentPage}
          onNavigate={navigateTo}
        />

        {/* 5. Exhibition Chapter Slides with Blur-to-Focus Transitions */}
        <main className="w-full relative z-10">
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <motion.div
                key="home"
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <EntrySection onNavigate={navigateTo} />
              </motion.div>
            )}

            {currentPage === 'arena' && (
              <motion.div
                key="arena"
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ArenaSection onNavigate={navigateTo} />
              </motion.div>
            )}

            {currentPage === 'pilots' && (
              <motion.div
                key="pilots"
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <TeamSection onNavigate={navigateTo} />
              </motion.div>
            )}

            {currentPage === 'projects' && (
              <motion.div
                key="projects"
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ProjectsSection onNavigate={navigateTo} />
              </motion.div>
            )}

            {currentPage === 'connect' && (
              <motion.div
                key="connect"
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <SignalSection onNavigate={navigateTo} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
