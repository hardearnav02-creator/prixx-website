// src/components/team/TeamCard.tsx
// Pure data-driven member card consuming TeamMember interface.
// Never contains hardcoded person details.

import { motion } from 'framer-motion';
import { Camera, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { TeamMember } from '../../data/team.ts';
import { motionConfig } from '../../lib/animations.ts';

interface TeamCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
  index?: number;
  className?: string;
}

export const TeamCard = ({
  member,
  onSelect,
  className = ''
}: TeamCardProps) => {
  const tagColor = member.accent === 'red' ? '#FF3333' : '#3366FF';

  return (
    <motion.div
      whileHover={{
        y: -6,
        x: -2,
        boxShadow: motionConfig.shadows.blackXl
      }}
      whileTap={{
        y: 0,
        x: 0,
        boxShadow: motionConfig.shadows.blackMd
      }}
      transition={motionConfig.spring.tactile}
      onClick={() => onSelect(member)}
      className={`relative w-full rounded-none border-4 border-black p-6 flex flex-col justify-between cursor-pointer select-none overflow-hidden group bg-black text-white ${className}`}
      style={{ boxShadow: motionConfig.shadows.blackLg }}
      data-cursor="EXPAND"
      data-cursor-color={tagColor}
    >
      {/* Background Image Layer Behind Information */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20 group-hover:opacity-30 transition-opacity duration-200">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover grayscale contrast-125"
            onError={(e) => {
              // Hide broken image and allow fallback wireframe to render
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : null}

        {/* Tactical Blueprint HUD Wireframe Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-44 h-44 border border-dashed border-white/40 flex items-center justify-center">
            <Camera className="w-16 h-16 text-white/40 stroke-[1.2]" />
            <div className="absolute w-full h-[1px] bg-white/30" />
            <div className="absolute h-full w-[1px] bg-white/30" />
          </div>
        </div>

        <div className="absolute bottom-3 right-3 text-right font-mono text-[9px] uppercase tracking-wider text-white/80 max-w-[220px] leading-tight">
          <span className="block font-black text-[10px] text-white">
            [DOSSIER CAPTURE #{member.number}]
          </span>
          <span>{member.mediaPlaceholder || member.role}</span>
        </div>
      </div>

      {/* Foreground Content (Pure White typography over pitch black card) */}
      <div className="relative z-10 space-y-4">
        {/* Card Header: Number & Role Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-white/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-white text-black font-mono font-black text-xs border border-black">
              #{member.number}
            </span>
            <span
              className="px-3 py-1 text-white font-mono font-black text-xs uppercase border border-black"
              style={{ backgroundColor: tagColor }}
            >
              {member.shortRole || member.role}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/80 uppercase font-bold">
            <span className="w-2 h-2" style={{ backgroundColor: tagColor }} />
            <span>PRIXX // #{member.number}</span>
          </div>
        </div>

        {/* Member Name */}
        <div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight group-hover:text-[#3366FF] transition-colors leading-none">
            {member.name}
          </h3>
          <p className="font-mono text-xs text-white/70 uppercase font-bold mt-1">
            {member.division}
          </p>
        </div>

        {/* Primary Achievements List */}
        <div className="space-y-1.5 pt-2">
          {member.achievements.map((ach, aIdx) => (
            <div
              key={aIdx}
              className="flex items-start gap-2 font-mono text-xs text-white/90 leading-tight"
            >
              <ShieldCheck
                className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                style={{ color: tagColor }}
              />
              <span className="font-bold">{ach}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="relative z-10 pt-4 mt-6 border-t-2 border-white/20 flex items-center justify-between font-mono text-xs font-black">
        <span className="text-white/80 group-hover:text-white transition-colors">
          EXPAND DOSSIER
        </span>
        <div
          className="p-2 bg-white text-black group-hover:bg-[#3366FF] group-hover:text-white transition-colors border border-black"
          style={{ boxShadow: motionConfig.shadows.blackSm }}
        >
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    </motion.div>
  );
};
