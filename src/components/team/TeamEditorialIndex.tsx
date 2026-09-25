// src/components/team/TeamEditorialIndex.tsx
// Monumental Typographic Roster Index in Liquid Glass
// Inspired by Mind Robotics & Third Way

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TeamMember } from '../../data/team.ts';

interface TeamEditorialIndexProps {
  members: TeamMember[];
  onSelectMember: (member: TeamMember) => void;
}

export const TeamEditorialIndex: React.FC<TeamEditorialIndexProps> = ({
  members,
  onSelectMember,
}) => {
  return (
    <div className="relative w-full font-mono select-none glass-panel p-4 sm:p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 border-b border-white/10 pb-3 text-xs font-bold uppercase text-white/50 px-3">
        <div className="col-span-2 sm:col-span-1 text-red-600">NO.</div>
        <div className="col-span-6 sm:col-span-4">OPERATIVE NAME</div>
        <div className="hidden sm:block sm:col-span-3">PRIMARY SPECIALTY</div>
        <div className="hidden md:block md:col-span-3">MAJOR CREDENTIAL</div>
        <div className="col-span-4 sm:col-span-4 md:col-span-1 text-right">DOSSIER</div>
      </div>

      {/* Roster Rows */}
      <div className="divide-y divide-white/5">
        {members.map((member) => {
          return (
            <div
              key={member.id}
              onClick={() => onSelectMember(member)}
              className="group grid grid-cols-12 gap-4 items-center py-4 sm:py-5 cursor-pointer rounded-xl hover:bg-white/[0.05] hover:border-red-600/30 transition-all px-3"
            >
              {/* Number */}
              <div className="col-span-2 sm:col-span-1 font-mono font-bold text-lg sm:text-xl text-red-600/70 group-hover:text-red-500 transition-colors">
                #{member.number}
              </div>

              {/* Name */}
              <div className="col-span-6 sm:col-span-4">
                <div className="font-display font-black text-lg sm:text-2xl uppercase tracking-tight group-hover:text-red-500 transition-colors leading-none">
                  {member.name}
                </div>
                <div className="text-[10px] text-white/50 uppercase font-bold sm:hidden mt-1">
                  {member.role}
                </div>
              </div>

              {/* Specialty / Role */}
              <div className="hidden sm:block sm:col-span-3 space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-600/10 border border-red-600/30 text-red-500 font-mono text-[10px] font-bold uppercase tracking-wider">
                  {member.shortRole || member.role}
                </span>
                <div className="text-[11px] text-white/60 font-medium uppercase">
                  {member.division}
                </div>
              </div>

              {/* Achievements summary */}
              <div className="hidden md:block md:col-span-3 text-xs font-medium uppercase text-white/80 group-hover:text-white line-clamp-1">
                {member.achievements[0] || 'Hardware & Systems Development'}
              </div>

              {/* Action */}
              <div className="col-span-4 sm:col-span-4 md:col-span-1 flex justify-end">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-white/80 group-hover:text-red-500">
                  <span className="hidden sm:inline text-[11px]">VIEW</span>
                  <div className="p-1 rounded-full bg-white/10 group-hover:bg-red-600 group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
