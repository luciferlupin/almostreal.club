import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { setCurrentRoute, setCursorLabel } = useApp();

  return (
    <div className="min-h-screen bg-[#080808] text-[#F2F0EA] flex flex-col items-center justify-center p-8 text-center select-none relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#080808] to-[#040404] pointer-events-none" />

      <div className="relative z-10 space-y-8 max-w-2xl">
        <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase block">
          ERROR / 404
        </span>

        <h1 className="font-serif text-5xl md:text-8xl font-light text-white tracking-tight leading-none">
          THIS PAGE <br />
          <span className="italic text-neutral-400">WAS NEVER REAL.</span>
        </h1>

        <div className="relative w-48 h-48 mx-auto my-6 flex items-center justify-center">
          <img
            src="/assets/carry_unreal.png"
            alt="404 Distorted Object"
            className="w-full h-full object-contain filter invert opacity-50 blur-[1px] animate-pulse"
          />
        </div>

        <div>
          <button
            onClick={() => setCurrentRoute('home')}
            onMouseEnter={() => setCursorLabel('REALITY')}
            onMouseLeave={() => setCursorLabel('')}
            className="btn-primary"
          >
            <span>RETURN TO REALITY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
