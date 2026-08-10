import React, { useState, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles } from 'lucide-react';

export const RealitySlider: React.FC = () => {
  const { setCursorLabel } = useApp();
  const [sliderVal, setSliderVal] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderVal(Math.round(percentage));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handlePointerMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handlePointerMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

  return (
    <section 
      className="section-padding bg-[#080808] border-t border-b border-white/10 relative overflow-hidden select-none"
      onMouseUp={handleMouseUp}
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <p className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            INTERACTIVE EXPERIENCE / 001
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
            HOW REAL <br />
            <span className="italic text-neutral-400">DO YOU NEED IT TO BE?</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
            Drag the divider or slider below to compare the original archival silhouette with the transformed surreal edition.
          </p>
        </div>

        {/* Interactive Old Bag vs New Bag Comparison Container */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-4xl mx-auto h-[420px] md:h-[580px] bg-[#0c0c0c] border border-white/15 overflow-hidden flex items-center justify-center cursor-ew-resize group shadow-2xl"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
          onMouseEnter={() => setCursorLabel('SLIDE')}
          onMouseLeave={() => {
            setCursorLabel('');
            if (isDragging) setIsDragging(false);
          }}
        >
          {/* Subtle Studio Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          
          {/* Ambient Glow */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${sliderVal}% 50%, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0) 70%)`
            }}
          />

          {/* Top Left Tag: OLD BAG */}
          <div className="absolute top-6 left-6 z-20 pointer-events-none flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/70 border border-white/20 font-mono text-[0.65rem] tracking-[0.2em] text-white uppercase backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              OLD BAG — REAL
            </span>
            <span className="font-mono text-[0.6rem] tracking-widest text-neutral-500 hidden sm:block">
              FRENCH CALFSKIN • ATELIER CUT
            </span>
          </div>

          {/* Top Right Tag: NEW BAG */}
          <div className="absolute top-6 right-6 z-20 pointer-events-none flex flex-col items-end gap-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/70 border border-white/20 font-mono text-[0.65rem] tracking-[0.2em] text-white uppercase backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-neutral-300" />
              NEW BAG — UNREAL
            </span>
            <span className="font-mono text-[0.6rem] tracking-widest text-neutral-500 hidden sm:block text-right">
              LIQUID CHROME • SURREAL MESH
            </span>
          </div>

          {/* Bottom Left / Right Specs */}
          <div className="absolute bottom-6 left-6 z-20 pointer-events-none font-mono text-[0.6rem] tracking-[0.2em] text-neutral-400 hidden md:block">
            ARCHIVE SPEC: 100% TACTILE
          </div>
          <div className="absolute bottom-6 right-6 z-20 pointer-events-none font-mono text-[0.6rem] tracking-[0.2em] text-neutral-400 hidden md:block text-right">
            FUTURE SPEC: 100% UNREAL
          </div>

          {/* BASE LAYER: OLD BAG (REAL) */}
          <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12 pointer-events-none">
            <img
              src="/assets/carry_real.png"
              alt="Old Bag — Real Edition"
              className="max-h-[82%] max-w-[82%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] filter contrast-105 select-none pointer-events-none"
              draggable={false}
            />
          </div>

          {/* OVERLAY LAYER: NEW BAG (UNREAL) - CLIPPED TO SLIDER POSITION */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-8 md:p-12 pointer-events-none overflow-hidden"
            style={{
              clipPath: `polygon(${sliderVal}% 0, 100% 0, 100% 100%, ${sliderVal}% 100%)`
            }}
          >
            <img
              src="/assets/carry_unreal.png"
              alt="New Bag — Unreal Edition"
              className="max-h-[82%] max-w-[82%] object-contain drop-shadow-[0_20px_45px_rgba(255,255,255,0.15)] filter contrast-110 select-none pointer-events-none"
              draggable={false}
            />
          </div>

          {/* VERTICAL DIVIDER LINE & DRAGGABLE HANDLE */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-white/70 z-30 pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{ left: `${sliderVal}%` }}
          >
            {/* Center Circular Luxury Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/90 border-2 border-white flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.4)] backdrop-blur-md">
              <div className="flex items-center gap-1 font-mono text-[0.7rem] font-bold">
                <span>‹</span>
                <span className="w-0.5 h-3 bg-white/60" />
                <span>›</span>
              </div>
            </div>

            {/* Top & Bottom Pin Highlights */}
            <div className="absolute top-0 -translate-x-1/2 w-2.5 h-2.5 bg-white shadow-[0_0_8px_white]" />
            <div className="absolute bottom-0 -translate-x-1/2 w-2.5 h-2.5 bg-white shadow-[0_0_8px_white]" />
          </div>
        </div>

        {/* Bottom Control & Range Slider */}
        <div className="mt-10 w-full max-w-2xl mx-auto space-y-6">
          {/* Quick Comparison Presets */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setSliderVal(0)}
              className={`px-4 py-1.5 font-mono text-[0.65rem] tracking-[0.2em] border transition-all uppercase ${
                sliderVal === 0 
                  ? 'bg-white text-black border-white font-bold' 
                  : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/40 hover:text-white'
              }`}
            >
              100% OLD BAG
            </button>
            <button
              onClick={() => setSliderVal(50)}
              className={`px-4 py-1.5 font-mono text-[0.65rem] tracking-[0.2em] border transition-all uppercase ${
                sliderVal === 50 
                  ? 'bg-white text-black border-white font-bold' 
                  : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/40 hover:text-white'
              }`}
            >
              50 / 50 SPLIT
            </button>
            <button
              onClick={() => setSliderVal(100)}
              className={`px-4 py-1.5 font-mono text-[0.65rem] tracking-[0.2em] border transition-all uppercase ${
                sliderVal === 100 
                  ? 'bg-white text-black border-white font-bold' 
                  : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/40 hover:text-white'
              }`}
            >
              100% NEW BAG
            </button>
          </div>

          {/* Range Slider Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs tracking-[0.25em] text-neutral-400">
              <span className={sliderVal < 30 ? 'text-white font-bold' : ''}>OLD BAG (0%)</span>
              <span className="text-[0.65rem] text-neutral-500 uppercase">DRAG SLIDER TO REVEAL</span>
              <span className={sliderVal > 70 ? 'text-white font-bold' : ''}>NEW BAG (100%)</span>
            </div>

            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 appearance-none cursor-pointer focus:outline-none accent-white hover:bg-neutral-700 transition-colors rounded-none"
              />
            </div>
          </div>

          {/* Telemetry Status Bar */}
          <div className="text-center font-mono text-[0.65rem] tracking-[0.2em] text-neutral-400 flex items-center justify-center gap-3">
            <span>PERCEPTION RATIO:</span>
            <span className="text-white font-bold">
              OLD {100 - sliderVal}% &nbsp;/&nbsp; NEW {sliderVal}%
            </span>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-300">
              {sliderVal < 25 
                ? 'ARCHIVAL ATELIER LEATHER' 
                : sliderVal > 75 
                ? 'LIQUID CHROME UNREAL SILHOUETTE' 
                : 'SYNTHESIS OF REAL & UNREAL'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
