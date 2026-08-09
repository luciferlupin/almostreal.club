import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RealitySlider } from '../components/RealitySlider';
import { RealityCheckModal } from '../components/RealityCheckModal';
import type { ObjectItem, Category } from '../types';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Cpu, Feather, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  const { 
    objects, 
    setSelectedObjectId, 
    setCurrentRoute, 
    setCursorLabel,
    savedObjectIds,
    toggleSaveObject
  } = useApp();

  const [activeRealityCheckObj, setActiveRealityCheckObj] = useState<ObjectItem | null>(null);

  const handleSelectObject = (id: string) => {
    setSelectedObjectId(id);
    setCurrentRoute('product-detail');
  };

  const handleCategoryExplore = (_cat: Category) => {
    setCurrentRoute('objects');
  };

  return (
    <div className="bg-[#080808] text-[#F2F0EA] space-y-0 selection:bg-[#F2F0EA] selection:text-[#080808]">
      {/* 01. HERO SECTION: Full-Bleed Editorial Masterpiece (LV & Chrome Hearts Inspired) */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 px-6 md:px-16 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-900/50 via-[#080808] to-[#050505] pointer-events-none" />

        {/* Top Eyebrow Bar */}
        <div className="relative z-10 flex justify-between items-start font-mono text-xs tracking-[0.3em] text-neutral-400">
          <div>
            <span className="text-white font-bold">NEW REALITY</span> / 001
          </div>
          <div className="text-right">
            <span className="text-white font-bold">PRIVATE ACCESS</span> <br />
            <span className="text-neutral-500">EDITION 001</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
          <div className="lg:col-span-7 space-y-8">
            <p className="font-mono text-xs text-neutral-400 tracking-[0.35em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              ALMOSTREAL® EDITION 001
            </p>
            <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.92] text-white">
              SOMETHING FAMILIAR. <br />
              <span className="italic font-normal text-neutral-400">SOMETHING ISN’T.</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-neutral-300 max-w-lg leading-relaxed font-light">
              ALMOSTREAL CLUB exists in the space between something real and something imagined. Objects sculpted in limited quantities for those who discern the illusion.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setCurrentRoute('campaign')}
                onMouseEnter={() => setCursorLabel('EXPLORE')}
                onMouseLeave={() => setCursorLabel('')}
                className="btn-primary"
              >
                <span>EXPLORE EDITION 001</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentRoute('objects')}
                onMouseEnter={() => setCursorLabel('CATALOG')}
                onMouseLeave={() => setCursorLabel('')}
                className="btn-outline"
              >
                <span>VIEW ALL OBJECTS</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div 
              onClick={() => handleSelectObject('obj-001')}
              onMouseEnter={() => setCursorLabel('VIEW')}
              onMouseLeave={() => setCursorLabel('')}
              className="relative w-full max-w-md aspect-square bg-[#0c0c0c] border border-white/15 p-8 flex items-center justify-center group cursor-pointer overflow-hidden transition-all duration-700 hover:border-white/50 shadow-2xl"
            >
              <img
                src="/assets/carry_real.png"
                alt="THE 01"
                className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[0.65rem] tracking-widest text-neutral-300 bg-black/80 backdrop-blur-md px-4 py-2.5 border border-white/10">
                <span>OBJECT 001 / THE 01</span>
                <span className="text-white group-hover:translate-x-1 transition-transform">ACQUIRE OBJECT →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Telemetry Bar */}
        <div className="relative z-10 font-mono text-[0.65rem] tracking-[0.3em] text-neutral-500 text-center uppercase pt-8">
          REAL ENOUGH TO WANT. &nbsp;—&nbsp; GLOBAL CRAFTSMANSHIP &amp; PRIVATE DIGITAL REALM
        </div>
      </section>

      {/* 02. NEW REALITY CATALOGUE (Louis Vuitton Style Product Cards) */}
      <section className="section-padding bg-[#0c0c0c] border-b border-white/10">
        <div className="container-editorial space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
                01 / NEW REALITY
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-white tracking-tight">
                EDITION 001 <span className="italic text-neutral-400">OBJECTS</span>
              </h2>
            </div>
            <p className="font-mono text-xs text-neutral-400 max-w-xs">
              FOUR PERMANENT EDITIONS SCULPTED FROM HIGH-DENSITY LEATHER, TITANIUM, AND RAW FLORA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objects.map((obj) => {
              const isSaved = savedObjectIds.includes(obj.id);
              return (
                <div
                  key={obj.id}
                  className="group relative bg-[#080808] border border-white/10 p-6 flex flex-col justify-between transition-all duration-500 hover:border-white/40 shadow-xl"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-6">
                    <span>{obj.objectNumber}</span>
                    <button
                      onClick={() => toggleSaveObject(obj.id)}
                      className={`p-1 transition-colors ${isSaved ? 'text-rose-400' : 'text-neutral-500 hover:text-white'}`}
                      title="Save Object"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <div 
                    onClick={() => handleSelectObject(obj.id)}
                    onMouseEnter={() => setCursorLabel('VIEW')}
                    onMouseLeave={() => setCursorLabel('')}
                    className="relative aspect-square flex items-center justify-center mb-6 cursor-pointer overflow-hidden p-4"
                  >
                    <img
                      src={obj.heroImageReal}
                      alt={obj.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="font-mono text-[0.65rem] text-neutral-500 tracking-widest uppercase">
                        {obj.category}
                      </p>
                      <h3 
                        onClick={() => handleSelectObject(obj.id)}
                        className="font-serif text-xl font-normal text-white cursor-pointer hover:underline"
                      >
                        {obj.name}
                      </h3>
                      <p className="font-mono text-xs text-neutral-400 mt-1">
                        {obj.priceFormatted}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setActiveRealityCheckObj(obj)}
                        onMouseEnter={() => setCursorLabel('INSPECT')}
                        onMouseLeave={() => setCursorLabel('')}
                        className="font-mono text-[0.65rem] text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                        <span>REALITY CHECK</span>
                      </button>

                      <button
                        onClick={() => handleSelectObject(obj.id)}
                        onMouseEnter={() => setCursorLabel('ACQUIRE')}
                        onMouseLeave={() => setCursorLabel('')}
                        className="font-mono text-[0.65rem] tracking-wider text-white hover:text-neutral-300 transition-colors uppercase font-bold"
                      >
                        ACQUIRE →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03. HERMÈS & LV SAVOIR-FAIRE (Craftsmanship Storytelling Chapter) */}
      <section className="section-padding bg-[#080808] border-b border-white/10">
        <div className="container-editorial space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase block">
              SAVOIR-FAIRE &amp; ATELIER CRAFTSMANSHIP
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white tracking-tight leading-none">
              THE ART OF THE <br />
              <span className="italic font-normal text-neutral-400">UNCOMPROMISING OBJECT</span>
            </h2>
            <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed">
              Every ALMOSTREAL object is born in private European ateliers using raw materials selected for their longevity, weight, and tactile presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#0c0c0c] border border-white/10 p-8 space-y-6 flex flex-col justify-between hover:border-white/30 transition-colors"
            >
              <Feather className="w-8 h-8 text-neutral-300 stroke-1" />
              <div className="space-y-2">
                <span className="font-mono text-[0.65rem] text-neutral-500 tracking-widest block uppercase">CHAPTER 01</span>
                <h3 className="font-serif text-2xl text-white">Full-Grain Leather</h3>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                  Hand-selected French calfskin, vegetable-tanned over 90 days for unmatched density and patina evolution.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#0c0c0c] border border-white/10 p-8 space-y-6 flex flex-col justify-between hover:border-white/30 transition-colors"
            >
              <Cpu className="w-8 h-8 text-neutral-300 stroke-1" />
              <div className="space-y-2">
                <span className="font-mono text-[0.65rem] text-neutral-500 tracking-widest block uppercase">CHAPTER 02</span>
                <h3 className="font-serif text-2xl text-white">Grade 5 Titanium</h3>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                  Machined with sub-micron tolerances for weightless strength, corrosion immunity, and chrome hand-polish.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#0c0c0c] border border-white/10 p-8 space-y-6 flex flex-col justify-between hover:border-white/30 transition-colors"
            >
              <Sparkles className="w-8 h-8 text-neutral-300 stroke-1" />
              <div className="space-y-2">
                <span className="font-mono text-[0.65rem] text-neutral-500 tracking-widest block uppercase">CHAPTER 03</span>
                <h3 className="font-serif text-2xl text-white">Skeletonized Caliber</h3>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                  Self-winding mechanical movements assembled by master Swiss watchmakers with 72-hour power reserve.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#0c0c0c] border border-white/10 p-8 space-y-6 flex flex-col justify-between hover:border-white/30 transition-colors"
            >
              <Compass className="w-8 h-8 text-neutral-300 stroke-1" />
              <div className="space-y-2">
                <span className="font-mono text-[0.65rem] text-neutral-500 tracking-widest block uppercase">CHAPTER 04</span>
                <h3 className="font-serif text-2xl text-white">Grasse Olfactory Art</h3>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                  Raw extracts of dark iris, smoked amber, and black pepper hand-blown into obsidian glass vessels.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 04. INTERACTIVE 3D REALITY SLIDER EXPERIENCE */}
      <RealitySlider />

      {/* 05. EDITORIAL CATEGORY CHAPTERS (Chrome Hearts & High Fashion Magazine Style) */}
      <section className="section-padding bg-[#080808]">
        <div className="container-editorial space-y-24">
          {/* Chapter 01: Carry */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">CHAPTER 01 / EDITIONS</span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-white tracking-tight">01 / CARRY</h2>
              <p className="font-sans text-sm md:text-base text-neutral-300 max-w-md leading-relaxed font-light">
                Architectural bags crafted from full-grain calfskin and raw chrome hardware. Sculpted to command space without saying a word.
              </p>
              <div>
                <button
                  onClick={() => handleCategoryExplore('CARRY')}
                  onMouseEnter={() => setCursorLabel('EXPLORE')}
                  onMouseLeave={() => setCursorLabel('')}
                  className="btn-outline"
                >
                  <span>EXPLORE CARRY EDITIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div 
              onClick={() => handleCategoryExplore('CARRY')}
              className="lg:col-span-6 aspect-video bg-[#0c0c0c] border border-white/10 p-8 flex items-center justify-center cursor-pointer group hover:border-white/40 transition-colors"
            >
              <img
                src="/assets/carry_real.png"
                alt="01 CARRY"
                className="h-full w-auto object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Chapter 02: Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div 
              onClick={() => handleCategoryExplore('VISION')}
              className="lg:col-span-6 lg:order-1 order-2 aspect-video bg-[#0c0c0c] border border-white/10 p-8 flex items-center justify-center cursor-pointer group hover:border-white/40 transition-colors"
            >
              <img
                src="/assets/vision_real.png"
                alt="02 VISION"
                className="h-full w-auto object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-6 lg:order-2 order-1 space-y-6">
              <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">CHAPTER 02 / EDITIONS</span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-white tracking-tight">02 / VISION</h2>
              <p className="font-sans text-sm md:text-base text-neutral-300 max-w-md leading-relaxed font-light">
                Titanium optical frames and photochromic glass lenses designed for dark environments and private discernment.
              </p>
              <div>
                <button
                  onClick={() => handleCategoryExplore('VISION')}
                  onMouseEnter={() => setCursorLabel('EXPLORE')}
                  onMouseLeave={() => setCursorLabel('')}
                  className="btn-outline"
                >
                  <span>EXPLORE VISION EDITIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Chapter 03: Time */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">CHAPTER 03 / EDITIONS</span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-white tracking-tight">03 / TIME</h2>
              <p className="font-sans text-sm md:text-base text-neutral-300 max-w-md leading-relaxed font-light">
                Skeletonized mechanical horology. Titanium case construction displaying the raw movement of mechanical time.
              </p>
              <div>
                <button
                  onClick={() => handleCategoryExplore('TIME')}
                  onMouseEnter={() => setCursorLabel('EXPLORE')}
                  onMouseLeave={() => setCursorLabel('')}
                  className="btn-outline"
                >
                  <span>EXPLORE TIME EDITIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div 
              onClick={() => handleCategoryExplore('TIME')}
              className="lg:col-span-6 aspect-video bg-[#0c0c0c] border border-white/10 p-8 flex items-center justify-center cursor-pointer group hover:border-white/40 transition-colors"
            >
              <img
                src="/assets/time_real.png"
                alt="03 TIME"
                className="h-full w-auto object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Chapter 04: Scent */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div 
              onClick={() => handleCategoryExplore('SCENT')}
              className="lg:col-span-6 lg:order-1 order-2 aspect-video bg-[#0c0c0c] border border-white/10 p-8 flex items-center justify-center cursor-pointer group hover:border-white/40 transition-colors"
            >
              <img
                src="/assets/scent_real.png"
                alt="04 SCENT"
                className="h-full w-auto object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-6 lg:order-2 order-1 space-y-6">
              <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">CHAPTER 04 / EDITIONS</span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-white tracking-tight">04 / SCENT</h2>
              <p className="font-sans text-sm md:text-base text-neutral-300 max-w-md leading-relaxed font-light">
                Olfactory architecture. Hand-blown flint glass encapsulating raw extracts of iris, smoked leather, and dark cedar.
              </p>
              <div>
                <button
                  onClick={() => setCurrentRoute('perfume-experience')}
                  onMouseEnter={() => setCursorLabel('SCENT')}
                  onMouseLeave={() => setCursorLabel('')}
                  className="btn-primary"
                >
                  <span>EXPERIENCE OLFACTORY ARCHITECTURE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REALITY CHECK MODAL */}
      {activeRealityCheckObj && (
        <RealityCheckModal
          object={activeRealityCheckObj}
          onClose={() => setActiveRealityCheckObj(null)}
        />
      )}
    </div>
  );
};
