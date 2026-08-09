import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, Wind, Flame } from 'lucide-react';

export const PerfumeExperiencePage: React.FC = () => {
  const { objects, addToBag, setCursorLabel } = useApp();
  const perfume = objects.find((o) => o.category === 'SCENT') || objects[3];

  const [activeNoteTab, setActiveNoteTab] = useState<'TOP' | 'HEART' | 'BASE'>('TOP');

  const scentArch = perfume.scentArchitecture || {
    top: ['CALABRIAN BERGAMOT', 'CRUSHED BLACK PEPPER', 'CARDAMOM ESSENCE'],
    heart: ['FLORENTINE IRIS', 'SMOKED LEATHER ACCORD', 'BLACK ORCHID'],
    base: ['RAW AMBER', 'ATLAS CEDARWOOD', 'OBSIDIAN MUSK']
  };

  // Background atmosphere overlay based on active note tab
  const getAtmosphereBg = () => {
    switch (activeNoteTab) {
      case 'TOP':
        return 'from-amber-950/30 via-[#080808] to-[#040404]'; // Golden spice mist
      case 'HEART':
        return 'from-purple-950/40 via-[#080808] to-[#040404]'; // Deep iris smoke
      case 'BASE':
        return 'from-amber-900/40 via-[#080808] to-[#050505]'; // Warm amber glow
      default:
        return 'from-neutral-900 via-[#080808] to-[#050505]';
    }
  };

  return (
    <div className={`bg-[#080808] text-[#F2F0EA] transition-all duration-1000 bg-gradient-to-b ${getAtmosphereBg()} min-h-screen pt-32 pb-24 px-6 md:px-12 relative overflow-hidden`}>
      {/* Dynamic Ambient Particles / Smoke Simulation */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[140px] animate-pulse" />
      </div>

      <div className="container-editorial space-y-16 relative z-10">
        {/* Title Header */}
        <div className="text-center space-y-4">
          <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase block">
            {perfume.objectNumber} &nbsp;—&nbsp; EAU DE PARFUM / 100ML
          </span>
          <h1 className="font-serif text-6xl md:text-9xl font-light text-white tracking-tight">
            {perfume.name}
          </h1>
          <p className="font-serif text-2xl italic text-neutral-400 max-w-xl mx-auto">
            "{perfume.subtitle}"
          </p>
        </div>

        {/* Hero Perfume Bottle Showcase */}
        <div className="relative w-full max-w-lg mx-auto h-[450px] flex items-center justify-center">
          <img
            src={perfume.heroImageReal}
            alt={perfume.name}
            className="w-full h-full object-contain filter contrast-125 drop-shadow-[0_0_50px_rgba(255,200,100,0.15)]"
          />
        </div>

        {/* FRAGRANCE ARCHITECTURE EXPERIENCE */}
        <div className="max-w-4xl mx-auto bg-black/60 border border-white/10 p-8 md:p-12 space-y-12 backdrop-blur-xl">
          <div className="text-center space-y-2 border-b border-white/10 pb-6">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
              OLFACTORY ARCHITECTURE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-white">
              VISUALIZING THE UNSEEN
            </h2>
          </div>

          {/* Fragrance Architecture Tabs */}
          <div className="grid grid-cols-3 gap-4 font-mono text-xs tracking-[0.2em] border-b border-white/10 pb-6">
            <button
              onClick={() => setActiveNoteTab('TOP')}
              className={`py-4 border text-center transition-all ${
                activeNoteTab === 'TOP'
                  ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                  : 'border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <Wind className="w-4 h-4 mx-auto mb-1" />
              <span>01 / TOP NOTES</span>
            </button>

            <button
              onClick={() => setActiveNoteTab('HEART')}
              className={`py-4 border text-center transition-all ${
                activeNoteTab === 'HEART'
                  ? 'bg-purple-400/20 border-purple-400 text-purple-200 font-bold'
                  : 'border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 mx-auto mb-1" />
              <span>02 / HEART NOTES</span>
            </button>

            <button
              onClick={() => setActiveNoteTab('BASE')}
              className={`py-4 border text-center transition-all ${
                activeNoteTab === 'BASE'
                  ? 'bg-amber-600/20 border-amber-500 text-amber-300 font-bold'
                  : 'border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4 mx-auto mb-1" />
              <span>03 / BASE NOTES</span>
            </button>
          </div>

          {/* Active Note Breakdown Display */}
          <div className="space-y-8 text-center animate-emergent">
            <div className="space-y-1">
              <span className="font-mono text-xs text-neutral-400 tracking-widest">
                ACTIVE ESSENCE LAYER: {activeNoteTab}
              </span>
              <p className="font-serif text-2xl text-white italic">
                {activeNoteTab === 'TOP' && 'First impression upon atmospheric release (0 – 15 mins).'}
                {activeNoteTab === 'HEART' && 'The central soul of the fragrance emerging as light dissipates (15 mins – 4 hrs).'}
                {activeNoteTab === 'BASE' && 'Deep resonant anchor lingering permanently on skin and memory (4 hrs – 24 hrs).'}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 font-mono text-sm tracking-wider">
              {(activeNoteTab === 'TOP'
                ? scentArch.top
                : activeNoteTab === 'HEART'
                ? scentArch.heart
                : scentArch.base
              ).map((note, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 bg-neutral-900/80 border border-white/20 text-white flex items-center gap-2"
                >
                  <span className="text-neutral-500 text-xs">✦</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Acquisition Action */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-neutral-400 block">EAU DE PARFUM / 100ML</span>
              <span className="font-serif text-3xl text-white font-light">{perfume.priceFormatted}</span>
            </div>

            <button
              onClick={() => addToBag(perfume)}
              onMouseEnter={() => setCursorLabel('ACQUIRE')}
              onMouseLeave={() => setCursorLabel('')}
              className="btn-primary py-4 px-8 text-xs tracking-[0.25em]"
            >
              <span>ACQUIRE PERFUME</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
