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

      {/* Overlay Bottom Controls: Kinetic RPM Selector & Reset View */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto font-mono text-xs select-none">
        {/* Kinetic RPM Selector */}
        <div className="flex items-center gap-1.5 glass-pill p-1 border border-white/15 bg-black/60">
          <span className="text-white/60 font-bold text-[10px] px-2 uppercase hidden sm:inline">
            ROTATION:
          </span>
          <button
            onClick={() => onSpeedPresetChange('idle')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all cursor-pointer ${
              weaponSpeedPreset === 'idle'
                ? 'bg-red-600 text-black shadow-[0_0_12px_#DC2626]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            IDLE (850)
          </button>
          <button
            onClick={() => onSpeedPresetChange('medium')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all cursor-pointer ${
              weaponSpeedPreset === 'medium'
                ? 'bg-red-600 text-white shadow-[0_0_12px_#3B82F6]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            MED (6K)
          </button>
          <button
            onClick={() => onSpeedPresetChange('max')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all cursor-pointer ${
              weaponSpeedPreset === 'max'
                ? 'bg-rose-500 text-white shadow-[0_0_15px_#FF3366]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            MAX (11K RPM)
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetView}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill border border-white/15 bg-black/60 text-white/90 font-bold uppercase hover:border-red-600 hover:text-red-500 transition-all cursor-pointer text-xs"
            title="Reset 3D camera orientation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESET VIEW</span>
          </button>

          <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-black font-bold uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] text-xs">
            <Zap className="w-3.5 h-3.5" />
            <span>{telemetry.rpm} RPM</span>
          </div>
        </div>
      </div>
    </>
  );
};
