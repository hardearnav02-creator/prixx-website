// src/components/3d/InteractionLayer.tsx
// Liquid Glass Interactive HUD and control overlay for the 3D WebGL Robotics Viewport.
// Inspired by Mind Robotics

import React from 'react';
import { Disc3, RotateCcw, Zap, Compass } from 'lucide-react';

interface InteractionLayerProps {
  telemetry: {
    yaw: number;
    pitch: number;
    rpm: number;
  };
  weaponSpeedPreset: 'idle' | 'medium' | 'max';
  onSpeedPresetChange: (speed: 'idle' | 'medium' | 'max') => void;
  onResetView: () => void;
  isInteracting: boolean;
}

export const InteractionLayer: React.FC<InteractionLayerProps> = ({
  telemetry,
  weaponSpeedPreset,
  onSpeedPresetChange,
  onResetView,
}) => {
  return (
    <>
      {/* Overlay Top Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none font-mono text-xs select-none">
        <div className="flex items-center gap-2 glass-pill px-3 py-1.5 border border-white/15 bg-black/60">
          <Disc3 className="w-3.5 h-3.5 text-red-600 animate-spin" />
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">
            KAAL BAHIRAV 60KG
          </span>
        </div>

        <div className="flex items-center gap-2 glass-pill px-3 py-1.5 border border-white/15 bg-black/60 font-bold uppercase text-[11px] text-white/90">
          <Compass className="w-3.5 h-3.5 text-red-600" />
          <span>YAW: {telemetry.yaw}&deg;</span>
          <span className="text-white/30">|</span>
          <span>PITCH: {telemetry.pitch}&deg;</span>
        </div>
      </div>
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetView}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill border border-white/15 bg-black/60 text-white/90 font-bold uppercase hover:border -red-600 hover:text-red-500 transition-all cursor-pointer text-xs"
            title="Reset 3D camera orientation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESET VIEW</span>
          </button>
        </div>
    </>
  );
};
