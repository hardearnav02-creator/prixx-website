// src/components/team/TeamCarousel.tsx
// Highly interactive, draggable team carousel with physics inertia, spring snapping, depth, and slight rotation.

import React, { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { ArrowLeft, ArrowRight, LayoutGrid, Sliders } from 'lucide-react';
import { TeamMember } from '../../data/team.ts';
import { TeamCard } from './TeamCard.tsx';

interface TeamCarouselProps {
  members: TeamMember[];
  onSelectMember: (member: TeamMember) => void;
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  members,
  onSelectMember
}) => {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const cardWidth = 360; // Base card width for calculations

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, members.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="space-y-8 font-mono select-none">
      {/* Carousel Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-black pb-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-black text-white font-black text-xs uppercase border-2 border-black">
            ROSTER VIEW // {viewMode.toUpperCase()}
          </span>
          <span className="text-xs font-bold text-black/70 uppercase">
            ACTIVE INDEX: {activeIndex + 1} OF {members.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle View Mode */}
          <button
            onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black hover:bg-black hover:text-white transition-colors border-2 border-black text-xs font-black uppercase cursor-pointer shadow-brutal-black"
          >
            {viewMode === 'carousel' ? (
              <>
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>GRID VIEW</span>
              </>
            ) : (
              <>
                <Sliders className="w-3.5 h-3.5" />
                <span>CAROUSEL VIEW</span>
              </>
            )}
          </button>

          {/* Carousel Arrows */}
          {viewMode === 'carousel' && (
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="p-2 bg-white text-black hover:bg-black hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors border-2 border-black cursor-pointer shadow-brutal-black"
                aria-label="Previous Operative"
              >
                <ArrowLeft className="w-4 h-4 stroke-[3]" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex === members.length - 1}
                className="p-2 bg-black text-white hover:bg-[#3366FF] disabled:opacity-30 disabled:pointer-events-none transition-colors border-2 border-black cursor-pointer shadow-brutal-black"
                aria-label="Next Operative"
              >
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Carousel Track vs Grid */}
      {viewMode === 'carousel' ? (
        <div
          ref={containerRef}
          className="relative w-full overflow-x-hidden py-6"
          data-cursor="DRAG"
          data-cursor-color="#3366FF"
        >
          <motion.div
            drag="x"
            dragConstraints={{
              left: -(members.length - 1) * (cardWidth + 24),
              right: 0
            }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 28 }}
            animate={{ x: -activeIndex * (cardWidth + 24) }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ x }}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
          >
            {members.map((member, idx) => (
              <CarouselItem
                key={member.id}
                member={member}
                index={idx}
                activeIndex={activeIndex}
                cardWidth={cardWidth}
                onSelect={onSelectMember}
                onFocusCard={() => setActiveIndex(idx)}
              />
            ))}
          </motion.div>
        </div>
      ) : (
        /* Full Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
          {members.map((member, idx) => (
            <TeamCard
              key={member.id}
              member={member}
              index={idx}
              onSelect={onSelectMember}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface CarouselItemProps {
  member: TeamMember;
  index: number;
  activeIndex: number;
  cardWidth: number;
  onSelect: (m: TeamMember) => void;
  onFocusCard: () => void;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  member,
  index,
  activeIndex,
  cardWidth,
  onSelect,
  onFocusCard
}) => {
  const isCurrent = index === activeIndex;
  const rotation = isCurrent ? 0 : index < activeIndex ? -2 : 2;

  return (
    <motion.div
      style={{
        width: cardWidth,
        flexShrink: 0
      }}
      animate={{
        scale: isCurrent ? 1 : 0.94,
        rotate: rotation,
        opacity: Math.abs(index - activeIndex) > 2 ? 0.4 : 1
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
      onClick={() => {
        if (!isCurrent) onFocusCard();
      }}
      className="transition-opacity duration-200"
    >
      <TeamCard
        member={member}
        index={index}
        onSelect={onSelect}
      />
    </motion.div>
  );
};
