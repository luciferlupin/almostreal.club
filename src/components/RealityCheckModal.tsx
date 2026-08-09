import React, { useState, useRef } from 'react';
import type { ObjectItem } from '../types';
import { X, ShieldCheck } from 'lucide-react';

interface RealityCheckModalProps {
  object: ObjectItem;
  onClose: () => void;
}

export const RealityCheckModal: React.FC<RealityCheckModalProps> = ({ object, onClose }) => {
  const [holding, setHolding] = useState(false);
  const [inspected, setInspected] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHold = () => {
    setHolding(true);
    holdTimerRef.current = setTimeout(() => {
      setHolding(false);
      setInspected(true);
    }, 1500);
  };

  const endHold = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    setHolding(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-emergent">
      <div className="relative w-full max-w-2xl bg-[#0c0c0c] border border-white/20 p-8 md:p-12 text-[#F2F0EA]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
          <span className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase">
            REALITY CHECK / INSPECTION MODE
          </span>
          <span className="font-mono text-xs text-neutral-300">
            AUTHENTICATED
          </span>
        </div>

        {!inspected ? (
          <div className="flex flex-col items-center text-center space-y-8 py-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              <img
                src={object.heroImageReal}
                alt={object.name}
                className="w-full h-full object-contain filter grayscale contrast-125"
              />

              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className="stroke-neutral-800 fill-none stroke-[2]"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className={`stroke-white fill-none stroke-[2] transition-all duration-[1500ms] linear ${
                    holding ? 'stroke-dashoffset-0' : 'stroke-dashoffset-[300]'
                  }`}
                  style={{ strokeDasharray: 300 }}
                />
              </svg>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl md:text-3xl font-light">
                {object.objectNumber} — {object.name}
              </h3>
              <p className="font-mono text-xs text-neutral-400 tracking-[0.2em] uppercase">
                HOLD FOR 1.5 SECONDS TO DECONSTRUCT
              </p>
            </div>

            <button
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              className={`btn-outline w-full py-4 text-center justify-center font-mono text-xs tracking-[0.25em] select-none ${
                holding ? 'bg-white text-black border-white' : ''
              }`}
            >
              {holding ? 'ANALYZING ATOMIC STRUCTURE...' : 'PRESS & HOLD TO INSPECT'}
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-emergent">
            <div className="flex items-center gap-3 text-emerald-400 border-b border-emerald-500/20 pb-4">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase">
                VERIFIED AUTHENTIC — ATELIER SPECS
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-3xl font-light">{object.name}</h3>
              <p className="font-mono text-xs text-neutral-400 tracking-widest">{object.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs tracking-wider text-neutral-300 bg-neutral-900/60 p-6 border border-white/10">
              {object.xrayDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-500">0{idx + 1}.</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <span className="font-serif text-xl italic text-neutral-300">
                REAL ENOUGH.
              </span>
              <button
                onClick={() => setInspected(false)}
                className="font-mono text-xs tracking-widest text-neutral-400 hover:text-white underline"
              >
                RE-INSPECT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
