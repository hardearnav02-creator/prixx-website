// src/components/ui/MediaPlaceholder.tsx
// Liquid Glass Data-driven media component for images and videos.
// Displays high-resolution visuals with clean frosted badges and video playback support.
// Inspired by Mind Robotics & Boon Global

import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface MediaPlaceholderProps {
  type?: 'image' | 'video' | 'photo';
  id?: string;
  title: string;
  subtitle?: string;
  aspectRatio?: string;
  badge?: string;
  badgeColor?: string;
  src?: string;
  videoSrc?: string;
}

// Curated high quality dark-tech & robotics placeholder photography
const DEFAULT_PLACEHOLDERS: Record<string, string> = {
  'hero-video': 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1400&q=80',
  'testbench-video': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  'kaal-bahirav': 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
  'sairex': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  'robocon-manipulator': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  'shikh-rakshak': 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=1200&q=80',
  'autonomous-sumo': 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
  'PARUL-01': 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
  'PARUL-02': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  'ROBOCON-01': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  'COEP-01': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  'RUSSIA-01': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
  'RUSSIA-02': 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
  'TECH-01': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  'SYM-01': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  'ARAI-01': 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=1200&q=80',
  '01': 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1400&q=80',
  '03': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80';

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  type = 'image',
  id = '01',
  title,
  subtitle,
  aspectRatio = 'aspect-video',
  badge = 'MEDIA',
  badgeColor = '#DC2626',
  src,
  videoSrc,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isDirectVideo = (url?: string) =>
    url && (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg'));

  const activeVideoUrl = videoSrc || (isDirectVideo(src) ? src : undefined);

  const imageSrc =
    !imgError && src
      ? src
      : DEFAULT_PLACEHOLDERS[id] || DEFAULT_IMAGE;

  return (
    <div
      className={`relative w-full ${aspectRatio} bg-[#0a0a0a] text-white rounded-2xl select-none overflow-hidden group border border-white/10`}
    >
      {/* Background Image or Video */}
      {type === 'video' && activeVideoUrl && isPlaying ? (
        <video
          src={activeVideoUrl}
          autoPlay
          loop
          controls
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Dark Vignette Gradient Overlay */}
      {(!isPlaying || !activeVideoUrl) && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-[#0a0a0a]/50 pointer-events-none" />
      )}

      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 font-mono text-xs pointer-events-none">
        <span
          className="px-2.5 py-1 rounded-full text-black uppercase font-bold text-[10px] shadow-[0_0_12px_rgba(0,240,255,0.3)]"
          style={{ backgroundColor: badgeColor }}
        >
          {badge}
        </span>
      </div>

      {/* Center Play Button for Video Type */}
      {type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600 text-black hover:bg-white hover:scale-110 transition-all flex items-center justify-center cursor-pointer shadow-[0_0_25px_#DC2626]"
            aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Play className="w-5 h-5 stroke-[2.5] ml-0.5" />
            )}
          </button>
        </div>
      )}

      {/* Bottom Title & Description Overlay */}
      {(!isPlaying || !activeVideoUrl) && (
        <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1 pointer-events-none">
          <div className="font-display font-bold text-sm sm:text-base uppercase tracking-tight text-white line-clamp-1">
            {title}
          </div>
          {subtitle && (
            <div className="font-mono text-[11px] text-white/70 font-medium leading-snug line-clamp-1">
              {subtitle}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
