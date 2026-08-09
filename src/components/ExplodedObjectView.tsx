import React, { useState } from 'react';
import type { ObjectItem } from '../types';

interface ExplodedObjectViewProps {
  object: ObjectItem;
}

export const ExplodedObjectView: React.FC<ExplodedObjectViewProps> = ({ object }) => {
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
  const [explodedAmount, setExplodedAmount] = useState<number>(60);

  const layers = object.explodedLayers || [
    { name: '01 / Outer Architecture', description: 'Primary outer shell sculpted from materials.' },
    { name: '02 / Internal Chassis', description: 'Internal support framework engineered for durability.' },
    { name: '03 / Hardware & Assemblies', description: 'Hand-finished solid metal locking fixtures.' },
    { name: '04 / Micro Security Core', description: 'Encrypted serial chip for digital authentication.' }
  ];

  return (
    <div className="w-full bg-[#0c0c0c] border border-white/10 p-8 md:p-12 text-[#F2F0EA]">
      <div className="flex flex-col md:flex-row items-start justify-between border-b border-white/10 pb-6 mb-8 gap-4">
        <div>
          <p className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase">
            EXPLODED COMPONENT ANIMATION
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-light">
            CONSTRUCTION DECONSTRUCTION
          </h3>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <span className="font-mono text-xs text-neutral-400">ASSEMBLED</span>
          <input
            type="range"
            min="0"
            max="100"
            value={explodedAmount}
            onChange={(e) => setExplodedAmount(Number(e.target.value))}
            className="w-36 h-1 bg-neutral-800 appearance-none accent-white cursor-pointer"
          />
          <span className="font-mono text-xs text-neutral-400">EXPLODED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 relative h-[360px] md:h-[450px] flex items-center justify-center overflow-hidden bg-black/40 border border-white/5 p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {layers.map((layer, idx) => {
              const offsetFactor = (idx - layers.length / 2) * (explodedAmount * 1.5);
              const isSelected = activeLayerIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveLayerIndex(idx)}
                  className={`absolute transition-all duration-500 ease-out cursor-pointer p-4 border rounded-sm ${
                    isSelected
                      ? 'border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)] z-20'
                      : 'border-white/20 bg-neutral-900/60 opacity-60 hover:opacity-100 z-10'
                  }`}
                  style={{
                    transform: `translateY(${offsetFactor}px) scale(${isSelected ? 1.05 : 0.95}) rotateX(45deg) rotateZ(-15deg)`,
                    width: '60%',
                    height: '100px'
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-white font-bold">{layer.name}</span>
                    <span className="text-neutral-400">LAYER 0{idx + 1}</span>
                  </div>
                  <div className="mt-2 h-1 bg-neutral-800 rounded overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-300" 
                      style={{ width: `${(idx + 1) * 25}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="font-mono text-xs text-emerald-400 tracking-widest uppercase">
            ACTIVE LAYER SPECS / 0{activeLayerIndex + 1}
          </div>

          <h4 className="font-serif text-3xl font-light text-white">
            {layers[activeLayerIndex].name}
          </h4>

          <p className="font-sans text-sm text-neutral-300 leading-relaxed border-l-2 border-white/20 pl-4 py-1">
            {layers[activeLayerIndex].description}
          </p>

          <div className="pt-4 flex flex-col space-y-2 font-mono text-xs text-neutral-400">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>TOLERANCE MATCHING</span>
              <span className="text-white">±0.02MM</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>FINISH QUALITY</span>
              <span className="text-white">ATELIER GRADE 1</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>STRESS CYCLES</span>
              <span className="text-white">TESTED 50,000+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
