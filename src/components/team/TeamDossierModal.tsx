// src/components/team/TeamDossierModal.tsx
// Liquid Glass Tactical Dossier Modal for Team Members

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Cpu, Zap, Camera, ShieldCheck } from 'lucide-react';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#0a0a0a]/85 backdrop-blur-2xl select-none">
        {/* Dismiss Backdrop */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel p-6 sm:p-10 font-mono space-y-8 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.15)] bg-[#0A0F1D]/90"
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-red-500 font-bold text-xs">
                OPERATIVE #{member.number}
              </span>
              <span className="px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-white font-bold text-xs uppercase tracking-wider">
                {member.role}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full glass-pill border border-white/10 text-white hover:border-red-600 hover:text-red-600 transition-colors cursor-pointer"
              aria-label="Close Dossier"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Grid Layout: Photo Frame & Identity Dossier */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Tactical Portrait Viewport */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-[3/4] bg-[#0a0a0a] rounded-2xl border border-white/15 overflow-hidden shadow-lg">
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

                {/* Wireframe Tactical Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-44 h-44 border border-dashed border-white/20 flex items-center justify-center rounded-full">
                    <Camera className="w-10 h-10 text-white/20" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 glass-panel p-2 text-center border border-white/20 font-mono text-[10px] uppercase font-bold text-white/90">
                  {member.mediaPlaceholder || `FIELD CAPTURE // ${member.name.toUpperCase()}`}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/60 font-bold uppercase px-1">
                <span>CLEARANCE: LEVEL 5</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Right: Technical Dossier Details */}
            <div className="md:col-span-7 space-y-6">
              {/* Name & Division */}
              <div className="space-y-2 border-b border-white/10 pb-4">
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-none text-gradient-silver">
                  {member.name}
                </h2>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-rose-400 font-bold uppercase tracking-wider">
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
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-red-600">
                  <Trophy className="w-4 h-4 text-red-600" />
                  <span>VERIFIED COMPETITION &amp; PODIUM LOGS</span>
                </div>
                <div className="space-y-2">
                  {member.achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-medium text-xs uppercase flex items-center justify-between"
                    >
                      <span className="max-w-[90%]">{ach}</span>
                      <Zap className="w-4 h-4 flex-shrink-0 text-red-600" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware & Projects */}
              {member.projects && member.projects.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-red-600">
                    <Cpu className="w-4 h-4 text-red-600" />
                    <span>DEPLOYED HARDWARE &amp; ARCHITECTURES</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.projects.map((proj, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/15 text-xs font-bold uppercase tracking-wider"
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
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-white/60">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span className="font-medium">PRIXX ROBOTICS OFFICIAL OPERATIVE DOSSIER</span>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-red-600 text-black font-bold uppercase hover:bg-red-600 transition-colors cursor-pointer"
            >
              DISMISS DOSSIER [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
