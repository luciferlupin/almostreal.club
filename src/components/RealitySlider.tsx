import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ThreeDHandbagCanvas } from './ThreeDHandbagCanvas';

export const RealitySlider: React.FC = () => {
  const { setCursorLabel } = useApp();
  const [sliderVal, setSliderVal] = useState<number>(35);

  const unrealRatio = sliderVal / 100;

  return (
    <section className="section-padding bg-[#080808] border-t border-b border-white/10 relative overflow-hidden">
      <div className="container-editorial">
        <div className="text-center space-y-3 mb-12">
          <p className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
            INTERACTIVE EXPERIENCE / 001
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-white tracking-tight">
            HOW REAL <br />
            <span className="italic text-neutral-400">DO YOU NEED IT TO BE?</span>
          </h2>
        </div>

        {/* 3D WebGL Canvas Container */}
        <div 
          className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[550px] bg-[#0c0c0c] border border-white/10 overflow-hidden flex items-center justify-center select-none"
          onMouseEnter={() => setCursorLabel('3D DRAG')}
          onMouseLeave={() => setCursorLabel('')}
        >
          {/* Ambient Unreal Glow */}
          <div 
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: unrealRatio * 0.8,
              background: `radial-gradient(circle at 50% 50%, rgba(191, 192, 194, ${0.25 * unrealRatio}), rgba(20, 20, 20, 0) 70%)`
            }}
          />

          <div 
            className="absolute top-6 left-6 font-mono text-[0.65rem] tracking-[0.25em] text-neutral-400 transition-opacity duration-300 pointer-events-none z-10"
            style={{ opacity: unrealRatio }}
          >
            LIQUID CHROME FIELD: ACTIVE <br />
            3D VERTEX DISPLACEMENT: {(unrealRatio * 100).toFixed(0)}%
          </div>

          <div 
            className="absolute bottom-6 right-6 font-mono text-[0.65rem] tracking-[0.25em] text-neutral-400 text-right transition-opacity duration-300 pointer-events-none z-10"
            style={{ opacity: unrealRatio }}
          >
            SURREAL GEOMETRY: DRIFT <br />
            OBJECT FREQUENCY: ACTIVE
          </div>

          {/* Real Interactive 3D WebGL Canvas */}
          <ThreeDHandbagCanvas unrealRatio={unrealRatio} className="w-full h-full" />

          <div 
            className="absolute top-0 bottom-0 w-[1px] bg-white/40 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10"
            style={{ left: `${sliderVal}%` }}
          />
        </div>

        {/* Bottom Slider Bar */}
        <div className="mt-12 w-full max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between font-mono text-xs tracking-[0.25em] text-neutral-400">
            <span className={sliderVal < 20 ? 'text-white font-bold' : ''}>REAL</span>
            <span className="text-[0.65rem] text-neutral-500">DRAG SLIDER TO TRANSFORM 3D MESH</span>
            <span className={sliderVal > 80 ? 'text-white font-bold' : ''}>UNREAL</span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-full h-1 bg-neutral-800 appearance-none cursor-pointer focus:outline-none accent-white hover:bg-neutral-700 transition-colors"
            />
          </div>

          <div className="text-center font-mono text-[0.65rem] tracking-[0.2em] text-neutral-500">
            CURRENT PERCEPTION: <span className="text-neutral-300">{sliderVal <= 20 ? 'HYPER-REAL STUDIO 3D' : sliderVal >= 80 ? 'SURREAL MESH DISPLACEMENT' : 'INTERMEDIATE FREQUENCY'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
