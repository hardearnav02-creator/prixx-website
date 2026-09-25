// src/components/sections/SignalSection.tsx
// CHAPTER 05 — THE SIGNAL / TRANSMISSION HQ (LIQUID GLASS EXPERIENCE)
// Visual Atmosphere: Dark Obsidian with Neon Ruby & Cyan Glows, Frosted Glass Terminal Console.
// Narrative conclusion: "BUILD. BATTLE. REPEAT."
// Inspired by Mind Robotics & Boon Global

import { useState, FormEvent } from 'react';
import { ArrowUp, ArrowLeft, Disc3, Send, CheckCircle2, Terminal } from 'lucide-react';
import { siteContent } from '../../data/site.ts';
import { socialLinks } from '../../data/social.ts';
import { MediaPlaceholder } from '../ui/MediaPlaceholder.tsx';

interface SignalSectionProps {
  onNavigate: (pageId: string) => void;
}

export const SignalSection = ({ onNavigate }: SignalSectionProps) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Sponsorship',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const directLinks = socialLinks.filter(
    (s) => s.category === 'direct' || s.category === 'campus'
  );
  const socialChannels = socialLinks.filter((s) => s.category === 'social');

  return (
    <div className="min-h-screen text-white pt-20 relative z-10 selection:bg-rose-500 selection:text-white flex flex-col justify-between">
      <div className="max-w-[90rem] mx-auto w-full px-4 sm:px-8 md:px-12 py-12 space-y-10">
        {/* ========================================================================= */}
        {/* 1. TOP TRANSMISSION BAR                                                   */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs font-bold uppercase">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px]">
              CHAPTER 05 // THE SIGNAL
            </span>
            <span className="hidden sm:inline font-medium text-white/70">
              {siteContent.brand.name} · {siteContent.brand.hqLocation}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-white/10 text-white hover:border-red-600 hover:bg-white/10 transition-all cursor-pointer text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ENTRY</span>
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-white/10 text-white hover:border-rose-400 hover:bg-white/10 transition-all cursor-pointer text-xs"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. REFINED SCALE TYPOGRAPHY: "BUILD. BATTLE. REPEAT."                     */}
        {/* ========================================================================= */}
        <div className="py-2 space-y-3">
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight uppercase select-none text-gradient-ruby">
            BUILD. <br />
            BATTLE. <br />
            REPEAT.
          </h1>
          <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white/60 max-w-xl pt-1">
            PVPIT BAVDHAN CAMPUS // HARDWARE TESTBENCH // SPONSOR &amp; RECRUITMENT INQUIRIES
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3. TRANSMISSION LINKS & INQUIRY CONSOLE                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-white/10 font-mono">
          {/* Left Column: Direct Links & Video Feed */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Communications */}
              <div className="glass-panel p-5 border border-white/10 space-y-3">
                <span className="text-xs font-bold text-rose-400 uppercase block tracking-wider">
                  COMMUNICATIONS
                </span>
                <ul className="space-y-2 text-xs font-bold">
                  {directLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noreferrer' : undefined}
                        className="strikethrough-link text-white/80 hover:text-white block transition-colors text-[11px]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Media & Social */}
              <div className="glass-panel p-5 border border-white/10 space-y-3">
                <span className="text-xs font-bold text-red-600 uppercase block tracking-wider">
                  MEDIA &amp; SOCIAL
                </span>
                <ul className="space-y-2 text-xs font-bold">
                  {socialChannels.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="strikethrough-link text-white/80 hover:text-white block transition-colors text-[11px]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation Quick Links */}
              <div className="glass-panel p-5 border border-white/10 space-y-3">
                <span className="text-xs font-bold text-white/50 uppercase block tracking-wider">
                  NAVIGATION
                </span>
                <ul className="space-y-2 text-xs font-bold">
                  <li>
                    <button
                      onClick={() => onNavigate('home')}
                      className="strikethrough-link text-left text-white/80 hover:text-red-500 uppercase cursor-pointer text-[11px]"
                    >
                      01. ENTRY
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('arena')}
                      className="strikethrough-link text-left text-white/80 hover:text-red-500 uppercase cursor-pointer text-[11px]"
                    >
                      02. ACHIEVEMENTS
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('pilots')}
                      className="strikethrough-link text-left text-white/80 hover:text-red-500 uppercase cursor-pointer text-[11px]"
                    >
                      03. MEMBERS
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('projects')}
                      className="strikethrough-link text-left text-white/80 hover:text-red-500 uppercase cursor-pointer text-[11px]"
                    >
                      04. THE LAB
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Video Feed Preview: Rotor Telemetry */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-white/90 uppercase">
                <Disc3 className="w-3.5 h-3.5 animate-spin text-rose-400" />
                <span>WEAPON ROTOR TESTBENCH</span>
              </div>
              <div className="glass-panel p-2 border border-white/10 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                <MediaPlaceholder
                  type="video"
                  id="testbench-video"
                  title="WEAPON ROTOR BENCH TEST"
                  subtitle="Kinetic weapon spinup and telemetry validation"
                  aspectRatio="aspect-video"
                  badge="TESTBENCH"
                  badgeColor="#FF3366"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Liquid Glass Terminal Console */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 space-y-5 border border-white/15 bg-[#0A0F1D]/80 shadow-[0_12px_45px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-rose-400" />
                <span className="font-mono font-bold text-xs uppercase text-white">
                  {siteContent.signal.terminalTitle}
                </span>
              </div>
              <span className="text-[10px] text-red-500 bg-red-600/10 border border-red-600/30 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                {siteContent.signal.terminalPort}
              </span>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4 font-mono text-center">
                <CheckCircle2 className="w-10 h-10 mx-auto text-red-600" />
                <div className="font-bold text-base uppercase text-white">TRANSMISSION RECEIVED</div>
                <p className="text-xs font-medium text-white/80 leading-relaxed">
                  {siteContent.signal.responseGuarantee}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-red-600 text-black text-xs font-bold uppercase cursor-pointer hover:bg-red-600 transition-colors"
                >
                  TRANSMIT ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-white/70 font-bold uppercase mb-1">
                    NAME / ORGANIZATION:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.G. SPONSOR REP / RESEARCH LEAD"
                    className="w-full p-2.5 glass-input text-white uppercase font-bold text-xs placeholder:text-white/30"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-bold uppercase mb-1">
                    EMAIL ADDRESS:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="REPRESENTATIVE@DOMAIN.COM"
                    className="w-full p-2.5 glass-input text-white uppercase font-bold text-xs placeholder:text-white/30"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-bold uppercase mb-1">
                    CATEGORY:
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 glass-input text-white bg-[#0a0a0a] uppercase font-bold text-xs cursor-pointer"
                  >
                    <option value="Sponsorship" className="bg-[#0a0a0a] text-white">SPONSORSHIP &amp; CHASSIS PARTNERSHIP</option>
                    <option value="Arena Match" className="bg-[#0a0a0a] text-white">ARENA COMBAT CHALLENGE</option>
                    <option value="Hackathon" className="bg-[#0a0a0a] text-white">HACKATHON COLLABORATION</option>
                    <option value="Recruitment" className="bg-[#0a0a0a] text-white">STUDENT TRYOUTS &amp; LAB ACCESS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 font-bold uppercase mb-1">
                    MESSAGE:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="INPUT HARDWARE SPECS, EVENT DETAILS, OR INQUIRY..."
                    className="w-full p-2.5 glass-input text-white uppercase font-bold text-xs placeholder:text-white/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-red-600 text-white font-bold uppercase hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(255,51,102,0.4)] font-mono text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. BOTTOM COLOPHON                                                        */}
        {/* ========================================================================= */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-medium text-white/60">
          <div>{siteContent.colophon.copyright}</div>
          <div>{siteContent.colophon.principles}</div>
        </div>
      </div>
    </div>
  );
};
