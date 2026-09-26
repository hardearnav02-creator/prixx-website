// src/components/team/SpatialTeamExhibition.tsx
// Spatial Team Exhibition Runway — Industrial Brutalist Crew Cards
// Crisp monospace typography, deep obsidian cards, and surgical ruby red laser accents.

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { TeamMember } from '../../data/team.ts';

interface SpatialTeamExhibitionProps {
  members: TeamMember[];
  onSelectMember: (member: TeamMember) => void;
}

export const SpatialTeamExhibition: React.FC<SpatialTeamExhibitionProps> = ({
  members,
  onSelectMember,
}) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  return (
    <div className="relative w-full overflow-hidden select-none py-4">
      {/* Horizontal Engineering Runway */}
      <div
        className="relative w-full overflow-x-auto pb-12 pt-4 no-scrollbar cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}
      >
        <div className="flex items-stretch gap-4 sm:gap-8 min-w-max px-2 sm:px-4">
          {members.map((member, index) => {
            const isHovered = activeHoverId === member.id;
            const isOdd = index % 2 === 1;

            return (
              <motion.div
                key={member.id}
                onMouseEnter={() => setActiveHoverId(member.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                onClick={() => onSelectMember(member)}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={`relative w-[280px] sm:w-[380px] md:w-[420px] flex flex-col justify-between p-5 sm:p-7 cursor-pointer transition-all duration-300 rounded-2xl ${
                  isOdd ? 'mt-4 sm:mt-10' : 'mt-0'
                } glass-panel border border-white/10 hover:border-red-600/50 hover:bg-white/[0.05]`}
                style={{
                  boxShadow: isHovered
                    ? '0 16px 45px rgba(0, 0, 0, 0.6), 0 0 20px rgba(220, 38, 38, 0.25)'
                    : '0 8px 32px rgba(0, 0, 0, 0.45)',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                }}
              >
                {/* Background Photo Watermark */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 rounded-2xl">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale contrast-125 scale-105 transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                </div>

                {/* Top Number & Role Bar */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-2xl sm:text-3xl text-red-500 leading-none">
                      #{member.number}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                      {member.shortRole || member.role}
                    </span>
                  </div>

                  <div className="font-mono text-[10px] text-white/50 font-bold uppercase tracking-wider hidden sm:block">
                    CREW // 25-26
                  </div>
                </div>

                {/* Crew Member Identity */}
                <div className="relative z-10 my-6 space-y-2">
                  <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight leading-[0.95] group-hover:text-red-500 transition-colors">
                    {member.name}
                  </h3>
                  <div className="font-mono text-xs font-bold text-red-400 uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#DC2626]" />
                    <span>{member.division}</span>
                  </div>
                  {member.description && (
                    <p className="font-sans text-xs text-white/70 leading-relaxed pt-2 line-clamp-2">
                      {member.description}
                    </p>
                  )}
                </div>

                {/* Engineering Credentials & Hardware Tags */}
                <div className="relative z-10 space-y-4 border-t border-white/10 pt-4">
                  <div className="space-y-1.5 font-mono text-xs">
                    {member.achievements.slice(0, 2).map((ach, aIdx) => (
                      <div
                        key={aIdx}
                        className="flex items-start gap-2 text-white/90 font-medium leading-tight"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-red-500" />
                        <span className="text-[11px] uppercase line-clamp-1">{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Projects Badges */}
                  {member.projects && member.projects.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {member.projects.map((proj, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2 py-0.5 rounded bg-white/[0.06] text-white/80 font-mono text-[10px] font-bold uppercase tracking-wider border border-white/10"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer Interaction Trigger */}
                  <div className="flex items-center justify-between font-mono text-xs font-bold pt-3 border-t border-white/10">
                    <span className="text-white/60 group-hover:text-red-500 uppercase text-[11px] transition-colors">
                      VIEW FULL DOSSIER
                    </span>
                    <div className="p-1.5 rounded-full bg-red-600 text-white shadow-[0_0_12px_#DC2626] group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
