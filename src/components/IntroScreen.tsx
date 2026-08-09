import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { GraphicSplashCanvas } from './GraphicSplashCanvas';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const IntroScreen: React.FC = () => {
  const { setHasEnteredClub, setCursorLabel } = useApp();
  const [phase, setPhase] = useState<'dark' | 'reveal' | 'ready'>('dark');
  const [isSplashing, setIsSplashing] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 300);
    const t2 = setTimeout(() => setPhase('ready'), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    setMousePos({ x, y });
  };

  const handleEnterClick = () => {
    setIsSplashing(true);
    setCursorLabel('');

    let currentPct = 0;
    const interval = setInterval(() => {
      currentPct += Math.floor(Math.random() * 16) + 14;
      if (currentPct >= 100) {
        currentPct = 100;
        clearInterval(interval);
        setTimeout(() => {
          setHasEnteredClub(true);
        }, 400);
      }
      setLoadingProgress(currentPct);
    }, 110);
  };

  return (
    <>
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="fixed inset-0 z-[1000] bg-[#080808] text-[#F2F0EA] flex flex-col justify-between items-center p-6 md:p-12 overflow-hidden select-none transition-all duration-1000"
      >
        {/* Dynamic Motion Ambient Spotlight Background */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,255,255,0.08),_rgba(8,8,8,1)_70%)] pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0)`
          }}
        />

        {/* Floating Interactive Model Silhouette with Motion Parallax */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.95, scale: 1.05 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden"
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 3}deg) rotateX(${-mousePos.y * 3}deg) translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`
          }}
        >
          <img
            src="/assets/model_cutout_perfect.png"
            alt="ALMOSTREAL High Fashion Model"
            className="h-[86vh] max-h-[920px] w-auto object-contain filter contrast-125 brightness-95 transition-transform duration-700 ease-out"
          />
        </motion.div>

        {/* Dark Subtle Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/80 pointer-events-none" />

        {/* Top Brand Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center pt-4"
        >
          <p className="font-mono text-[0.65rem] md:text-xs tracking-[0.35em] uppercase text-neutral-300 drop-shadow-md">
            ALMOSTREAL CLUB® &nbsp;—&nbsp; EST. 2026 PRIVATE ACCESS
          </p>
        </motion.div>

        {/* Central Revealed Motion Typography */}
        <div className="relative z-10 text-center my-auto max-w-4xl space-y-6">
          <AnimatePresence>
            {phase !== 'dark' && (
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
                  REAL ENOUGH <br />
                  <span className="italic font-normal text-neutral-300">TO WANT.</span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Motion CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'ready' ? 1 : 0, y: phase === 'ready' ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 pb-8"
        >
          <button
            onClick={handleEnterClick}
            onMouseEnter={() => setCursorLabel('ENTER')}
            onMouseLeave={() => setCursorLabel('')}
            className="btn-primary group relative text-xs md:text-sm tracking-[0.25em] px-9 py-4 rounded-full border border-white/20 bg-white text-black hover:bg-transparent hover:text-white transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.2)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>ENTER THE CLUB</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </motion.div>
      </div>

      {/* PROPER 3D WEBGL GRAPHIC ANIMATION SPLASH OVERLAY */}
      <AnimatePresence>
        {isSplashing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[2000] bg-[#050505] text-[#F2F0EA] flex flex-col items-center justify-between p-8 md:p-16 select-none overflow-hidden"
          >
            {/* 3D WebGL Graphic Canvas Engine */}
            <GraphicSplashCanvas progress={loadingProgress} />

            {/* Top Brand Header */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 text-center pt-4"
            >
              <span className="font-serif text-2xl md:text-4xl tracking-widest text-white block font-light">
                ALMOSTREAL®
              </span>
              <span className="font-mono text-[0.65rem] text-neutral-400 tracking-[0.35em] block pt-1">
                EST. 2026 &nbsp;/&nbsp; GRAPHIC REALITY INITIALIZATION
              </span>
            </motion.div>

            {/* Center Graphic Telemetry */}
            <div className="relative z-10 text-center space-y-4 max-w-lg my-auto">
              <div className="space-y-1">
                <p className="font-mono text-xs tracking-[0.35em] uppercase text-white font-bold animate-pulse">
                  BECOMING REAL...
                </p>
                <p className="font-mono text-sm tracking-[0.25em] text-neutral-300">
                  REALITY LOADING / <span className="text-white font-bold">{loadingProgress}%</span>
                </p>
              </div>

              {/* Micro Precision Progress Bar */}
              <div className="w-64 h-1 bg-neutral-800/80 mx-auto rounded-full overflow-hidden border border-white/10 backdrop-blur-md">
                <div
                  className="h-full bg-white transition-all duration-150 ease-out shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              <p className="font-mono text-[0.65rem] text-neutral-400 tracking-[0.2em]">
                3D VERTEX MATRIX &nbsp;|&nbsp; LIQUID CHROME REFRACTION &nbsp;|&nbsp; PRIVATE ACCESS
              </p>
            </div>

            {/* Bottom Terminal Telemetry */}
            <div className="relative z-10 text-center pb-4">
              <p className="font-mono text-[0.6rem] text-neutral-500 tracking-[0.3em] uppercase">
                STATUS: {loadingProgress < 100 ? 'ACCELERATING PARTICLE VORTEX...' : 'ACCESS GRANTED. ENTERING THE CLUB.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
