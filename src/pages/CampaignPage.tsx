import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const CampaignPage: React.FC = () => {
  const { setSelectedObjectId, setCurrentRoute, setCursorLabel } = useApp();

  const handleInspectObject = (id: string) => {
    setSelectedObjectId(id);
    setCurrentRoute('product-detail');
  };

  return (
    <div className="bg-[#080808] text-[#F2F0EA] space-y-0">
      {/* Editorial Cover */}
      <section className="min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 border-b border-white/10 relative overflow-hidden">
        <div className="container-editorial my-auto space-y-8">
          <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase block">
            DIGITAL FASHION PUBLICATION / ISSUE 01
          </span>
          <h1 className="font-serif text-6xl md:text-9xl font-light text-white tracking-tight leading-[0.9]">
            EDITION 001 <br />
            <span className="italic text-neutral-400">FALSE MEMORY.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 items-end">
            <p className="font-serif text-2xl text-neutral-300 italic max-w-md leading-relaxed">
              "We remember places we have never walked and touch objects that exist only in shadow."
            </p>
            <div className="font-mono text-xs text-neutral-400 space-y-1 text-right">
              <span>PHOTOGRAPHY: ATELIER ALMOSTREAL</span> <br />
              <span>LOCATION: CONFIDENTIAL STUDIO / NY</span> <br />
              <span>EDITION: LIMITED RELEASE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Chapter 1: Asymmetrical Spread */}
      <section className="section-padding bg-[#0c0c0c] border-b border-white/10">
        <div className="container-editorial space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative aspect-[4/5] bg-neutral-900 border border-white/10 overflow-hidden group">
              <img
                src="/assets/carry_unreal.png"
                alt="Campaign Spread 1"
                className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-1000"
              />
              <div 
                onClick={() => handleInspectObject('obj-001')}
                onMouseEnter={() => setCursorLabel('INSPECT')}
                onMouseLeave={() => setCursorLabel('')}
                className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md p-4 border border-white/20 cursor-pointer font-mono text-xs text-white flex items-center gap-3"
              >
                <span>FEATURED: OBJECT 001 / THE 01</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
                ESSAY 01 / PERCEPTION
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight">
                THE WEIGHT OF UNSEEN CRAFT
              </h2>
              <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                Modern luxury has surrendered to volume. ALMOSTREAL reclaims restraint. Every curve of calfskin and polished edge of chrome titanium is engineered to provoke a quiet question: is this object real, or a vivid memory?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Chapter 2: Macro Eyewear Spread */}
      <section className="section-padding bg-[#080808] border-b border-white/10">
        <div className="container-editorial space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
              <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
                ESSAY 02 / OPTICAL ILLUSION
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight">
                SHADOWS OVER LIGHT
              </h2>
              <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                Vision frames reality. Titanium structures forged in Japanese workshops frame dark smoke Carl Zeiss lenses, filtering reality to 91% clarity.
              </p>
              <button
                onClick={() => handleInspectObject('obj-003')}
                className="btn-outline text-xs"
              >
                INSPECT OBJECT 003 →
              </button>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 relative aspect-[4/5] bg-neutral-900 border border-white/10 overflow-hidden group">
              <img
                src="/assets/vision_real.png"
                alt="Campaign Eyewear"
                className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
