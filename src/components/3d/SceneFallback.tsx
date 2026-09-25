// src/components/3d/SceneFallback.tsx
import React from 'react';
import { Disc3, ShieldAlert, Cpu } from 'lucide-react';

interface SceneFallbackProps {
  title?: string;
  subtitle?: string;
  error?: string;
}

export const SceneFallback: React.FC<SceneFallbackProps> = ({
  title = 'KAAL BAHIRAV 60KG WEAPON MESH',
  subtitle = 'High-torque kinetic disc combat robot with Hardox 500 armor',
  error
}) => {
  return (
    <div className="w-full h-full min-h-[360px] bg-[#000000] text-white border-4 border-black p-8 flex flex-col justify-between font-mono select-none relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-white pb-3">
        <div className="flex items-center gap-2">
          {error ? (
            <ShieldAlert className="w-4 h-4 text-[#FF3333]" />
          ) : (
            <Disc3 className="w-4 h-4 text-[#3366FF] animate-spin" />
          )}
          <span className="text-xs font-black uppercase text-white">
            {error ? '3D TELEMETRY DEGRADED // 2D CAD SCHEMATIC' : 'CAD BLUEPRINT RENDER // PROCEDURAL MODEL'}
          </span>
        </div>
        <span className="text-[10px] bg-[#FF3333] text-white px-2 py-0.5 font-black uppercase border border-white">
          HARDOX 500 // 60KG
        </span>
      </div>

      {/* Center Wireframe CAD Graphic */}
      <div className="relative z-10 my-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="relative w-48 h-48 border-2 border-dashed border-white/60 flex items-center justify-center">
          <Cpu className="w-20 h-20 text-white/50 stroke-[1.2]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-36 h-36 border border-white/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div className="absolute top-2 left-2 text-[9px] text-white/70">Z-AXIS // 0.00</div>
          <div className="absolute bottom-2 right-2 text-[9px] text-white/70">11,000 RPM</div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-black uppercase font-display tracking-tight text-white">
            {title}
          </h3>
          <p className="text-xs text-white/80 max-w-md mx-auto mt-1 font-bold">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Technical Coordinates */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t-2 border-white/40 text-[10px] text-white/80">
        <div>CHASSIS: <span className="text-white font-black">CNC MONOCOQUE</span></div>
        <div>WEAPON: <span className="text-[#FF3333] font-black">14.2 kJ ROTOR</span></div>
        <div>DRIVE: <span className="text-[#3366FF] font-black">4WD BRUSHLESS</span></div>
        <div>STATUS: <span className="text-white font-black">BENCH READY</span></div>
      </div>
    </div>
  );
};
