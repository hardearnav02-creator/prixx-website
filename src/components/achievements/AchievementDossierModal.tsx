// src/components/achievements/AchievementDossierModal.tsx
// Luxury frosted glass dossier modal for in-depth achievement inspection.
// Rendered via React Portal directly into document.body to bypass transformed parent contexts.
// Pops up centered on current viewport with heavy backdrop blur (background completely blurred,
// only the dossier card is crisp).
// Inspired by Mind Robotics & Third Way

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Camera, Trophy, Calendar, Users, Cpu } from 'lucide-react';
import { Achievement } from '../../data/achievements.ts';
import { MediaPlaceholder } from '../ui/MediaPlaceholder.tsx';

interface AchievementDossierModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementDossierModal: React.FC<AchievementDossierModalProps> = ({
  achievement,
  onClose,
}) => {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock background scroll while modal is active
  useEffect(() => {
    if (!achievement) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [achievement]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {achievement && (
        <div
          key="dossier-portal"
          className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none overflow-hidden"
          data-lenis-prevent
        >
          {/* Backdrop — Deep obsidian with heavy 32px blur so the background is completely blurred */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 cursor-pointer backdrop-blur-2xl"
            style={{
              WebkitBackdropFilter: 'blur(32px)',
              backdropFilter: 'blur(32px)',
            }}
          />

          {/* Modal Container — Centered in current viewport, crisp & scrollable */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[86vh] overflow-y-auto overscroll-contain rounded-[32px] bg-[#0c0d12]/98 border border-white/20 p-6 sm:p-10 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_80px_rgba(220,38,38,0.2)] text-white z-10 space-y-8"
            data-lenis-prevent
          >
            {/* Top Bar with Number & Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-red-500/40 bg-red-500/10 flex items-center justify-center font-display font-black text-xl text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                  {achievement.number}
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-red-500 uppercase tracking-widest">
                    CAMPAIGN LOG // {achievement.year}
                  </span>
                  <div className="font-mono text-xs text-white/60 uppercase">
                    {achievement.competition}
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full glass-pill border border-white/15 text-white/70 hover:text-white hover:border-red-500/50 hover:bg-white/10 transition-all cursor-pointer"
                aria-label="Close Dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Badge */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-black font-mono font-bold text-xs uppercase tracking-wider shadow-sm"
                  style={{ backgroundColor: achievement.badgeColor }}
                >
                  <Trophy className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                  {achievement.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 font-mono text-xs text-white/80 font-bold uppercase">
                  <Calendar className="w-3.5 h-3.5 inline mr-1 -mt-0.5 text-red-400" />
                  {achievement.year}
                </span>
                {achievement.robot && (
                  <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 font-mono text-xs text-red-400 font-bold uppercase">
                    <Cpu className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                    {achievement.robot}
                  </span>
                )}
              </div>

              <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                {achievement.title}
              </h2>

              {achievement.description && (
                <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed pt-2">
                  {achievement.description}
                </p>
              )}
            </div>

            {/* Technical Highlights */}
            {achievement.highlights && achievement.highlights.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="font-mono text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  TECHNICAL HIGHLIGHTS &amp; PODIUM METRICS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievement.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 hover:border-red-500/30 transition-all"
                    >
                      <div
                        className="font-mono font-bold text-xs uppercase"
                        style={{ color: item.tagColor }}
                      >
                        {item.tag}
                      </div>
                      <p className="font-sans text-xs text-white/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deployed Operatives */}
            {achievement.teamMembers && achievement.teamMembers.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="font-mono text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-4 h-4 text-red-500" />
                  DEPLOYED OPERATIVES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {achievement.teamMembers.map((tm, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white font-mono text-xs font-medium uppercase"
                    >
                      {tm}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media Assets Showcase */}
            {achievement.media && achievement.media.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-white/70 uppercase">
                  <Camera className="w-4 h-4 text-red-500" />
                  <span>OFFICIAL VERIFIED MEDIA</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievement.media.map((med, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden border border-white/10">
                      <MediaPlaceholder
                        type={med.type}
                        id={med.id}
                        title={med.title}
                        subtitle={med.subtitle}
                        aspectRatio="aspect-video"
                        badge={med.badge}
                        badgeColor={med.badgeColor}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Action */}
            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs uppercase cursor-pointer transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
