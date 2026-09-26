// src/components/team/TeamDossierModal.tsx
// Bespoke Engineering Dossier Modal for Team Members
// Industrial brutalist layout with high contrast monospace data and authentic workshop records.

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Cpu, Zap, ShieldCheck } from 'lucide-react';
import { TeamMember } from '../../data/team.ts';

interface TeamDossierModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export const TeamDossierModal: React.FC<TeamDossierModalProps> = ({ member, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (member) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [member, onClose]);

  if (!member) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl select-none">
        {/* Dismiss Backdrop */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel p-6 sm:p-10 font-mono space-y-8 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(220,38,38,0.1)] bg-[#0d0d10]"
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-red-600/20 border border-red-600/40 text-red-400 font-bold text-xs uppercase tracking-wider">
                MEMBER #{member.number}
              </span>
              <span className="px-3 py-1 rounded-full glass-pill border border-white/15 text-white/90 font-bold text-xs uppercase tracking-wider">
                {member.role}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full glass-pill border border-white/10 text-white hover:border-red-600 hover:text-red-500 transition-colors cursor-pointer"
              aria-label="Close Dossier"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Grid Layout: Photo Frame & Identity Dossier */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Portrait Viewport */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-[3/4] bg-[#050505] rounded-2xl border border-white/15 overflow-hidden shadow-lg">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale contrast-125"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}

                <div className="absolute bottom-3 left-3 right-3 glass-panel p-2.5 text-center border border-white/20 font-mono text-[11px] uppercase font-bold text-white/90 shadow-md">
                  {member.mediaPlaceholder || `PORTRAIT // ${member.name.toUpperCase()}`}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/60 font-bold uppercase px-1">
                <span>PVPIT BAVDHAN</span>
                <span className="text-red-400 flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#DC2626] animate-pulse" />
                  ACTIVE CREW
                </span>
              </div>
            </div>

            {/* Right: Technical Dossier Details */}
            <div className="md:col-span-7 space-y-6">
              {/* Name & Division */}
              <div className="space-y-2 border-b border-white/10 pb-4">
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-none">
                  {member.name}
                </h2>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-red-500 font-bold uppercase tracking-wider">
                    DIVISION:
                  </span>
                  <span className="text-white/90 font-bold uppercase">{member.division}</span>
                </div>
                {member.description && (
                  <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed pt-2">
                    {member.description}
                  </p>
                )}
              </div>

              {/* Verified Achievements */}
              <div className="space-y-3 font-mono">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-red-500">
                  <Trophy className="w-4 h-4 text-red-500" />
                  <span>VERIFIED COMPETITION &amp; PODIUM LOGS</span>
                </div>
                <div className="space-y-2">
                  {member.achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-medium text-xs uppercase flex items-center justify-between hover:border-red-600/40 transition-colors"
                    >
                      <span className="max-w-[90%]">{ach}</span>
                      <Zap className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware & Projects */}
              {member.projects && member.projects.length > 0 && (
                <div className="space-y-3 pt-2 font-mono">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-red-500">
                    <Cpu className="w-4 h-4 text-red-500" />
                    <span>ENGINEERED ROBOTS &amp; SUBSYSTEMS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.projects.map((proj, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-3 py-1 rounded-full glass-pill text-white/90 border border-white/15 text-xs font-bold uppercase tracking-wider hover:border-red-500 transition-colors"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-white/60">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span className="font-medium">PRIXX ROBOTICS OFFICIAL ENGINEERING RECORD</span>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-red-600 text-white font-bold uppercase hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all cursor-pointer"
            >
              DISMISS DOSSIER [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
