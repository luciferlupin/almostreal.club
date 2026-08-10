import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface LeatherOption {
  id: string;
  name: string;
  detail: string;
  previewColor: string;
}

interface HardwareOption {
  id: string;
  name: string;
  detail: string;
  previewBg: string;
}

const LEATHER_OPTIONS: LeatherOption[] = [
  { id: 'box-calf', name: 'OBSIDIAN BOX CALF', detail: 'Single-origin French calfskin with deep satin patina', previewColor: '#121212' },
  { id: 'pebbled-grain', name: 'GRAINED PEBBLE LEATHER', detail: 'Hand-tumbled full-grain leather, scratch resistant', previewColor: '#1e1e1e' },
  { id: 'matte-alligator', name: 'MATTE ALLIGATOR ACCORD', detail: 'Sustainably sourced Mississippi alligator with matte wax finish', previewColor: '#181515' },
  { id: 'liquid-sheen', name: 'LIQUID CHROME METALLIC', detail: 'Micro-pigmented chrome vapor deposited leather', previewColor: '#4a4a4f' }
];

const HARDWARE_OPTIONS: HardwareOption[] = [
  { id: 'mirror-chrome', name: 'MIRROR POLISHED 316L CHROME', detail: 'Hand-lapped to optical liquid reflection', previewBg: 'linear-gradient(135deg, #ffffff 0%, #a0a0a5 50%, #e0e0e5 100%)' },
  { id: 'obsidian-titanium', name: 'BRUSHED OBSIDIAN TITANIUM', detail: 'Grade 5 aerospace titanium with satin bead-blast', previewBg: 'linear-gradient(135deg, #333333 0%, #1a1a1a 50%, #444444 100%)' },
  { id: 'antique-silver', name: 'HAND-HAMMERED SILVER 925', detail: 'Artisanal solid sterling silver with aged dark oxidation', previewBg: 'linear-gradient(135deg, #dcdcdc 0%, #888888 50%, #c0c0c0 100%)' },
  { id: 'black-ruthenium', name: 'BLACK RUTHENIUM PVD', detail: 'Ultra-dense galvanic ruthenium alloy plating', previewBg: 'linear-gradient(135deg, #222225 0%, #0a0a0c 50%, #2f2f35 100%)' }
];

export const BespokeAtelierSection: React.FC = () => {
  const { setCursorLabel } = useApp();
  const [selectedSilhouette, setSelectedSilhouette] = useState<'carry' | 'satchel' | 'time' | 'vision'>('carry');
  const [selectedLeather, setSelectedLeather] = useState<LeatherOption>(LEATHER_OPTIONS[0]);
  const [selectedHardware, setSelectedHardware] = useState<HardwareOption>(HARDWARE_OPTIONS[0]);
  const [monogram, setMonogram] = useState<string>('A.R.C.');
  const [foilColor, setFoilColor] = useState<'silver' | 'blind' | 'chrome'>('silver');
  const [isCommissionSubmitted, setIsCommissionSubmitted] = useState<boolean>(false);

  const getSilhouetteImage = () => {
    switch (selectedSilhouette) {
      case 'carry': return '/assets/carry_real.png';
      case 'satchel': return '/assets/carry_002_real.png';
      case 'time': return '/assets/time_real.png';
      case 'vision': return '/assets/vision_real.png';
    }
  };

  const getSilhouetteName = () => {
    switch (selectedSilhouette) {
      case 'carry': return 'THE 01 ARCHITECTURAL TOTE';
      case 'satchel': return 'SATCHEL 02 FLAP CHAIN';
      case 'time': return '11:59 SKELETON CHRONOMETER';
      case 'vision': return 'BLIND TITANIUM OPTICS';
    }
  };

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCommissionSubmitted(true);
    setTimeout(() => {
      setIsCommissionSubmitted(false);
    }, 5000);
  };

  return (
    <section className="section-padding bg-[#0a0a0a] border-b border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="container-editorial space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              SUR-MESURE & SPECIAL COMMISSIONS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              THE PRIVATE <span className="italic text-neutral-400">ATELIER STUDIO</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-sm leading-relaxed">
            In the tradition of Hermès Special Orders and Place Vendôme ateliers, personalize materials, hardware alloys, and hand-embossed monograms for made-to-order execution.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Live Customizer Visualizer */}
          <div className="lg:col-span-6 sticky top-28 space-y-6">
            <div className="relative aspect-square bg-[#060606] border border-white/15 p-8 flex items-center justify-center overflow-hidden shadow-2xl group">
              {/* Studio ambient spotlight */}
              <div 
                className="absolute inset-0 transition-all duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 70%)`
                }}
              />

              {/* Silhouette Object Image */}
              <img
                src={getSilhouetteImage()}
                alt={getSilhouetteName()}
                className="w-full h-full object-contain filter contrast-110 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500"
              />

              {/* Monogram Overlay Badge */}
              {monogram && (
                <div className="absolute bottom-6 right-6 bg-black/85 backdrop-blur-md px-4 py-2 border border-white/20 flex flex-col items-center">
                  <span className="font-mono text-[0.55rem] text-neutral-500 tracking-widest uppercase">ATELIER STAMP</span>
                  <span 
                    className={`font-serif text-base tracking-[0.25em] font-medium ${
                      foilColor === 'silver' ? 'text-neutral-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' :
                      foilColor === 'chrome' ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]' :
                      'text-neutral-500'
                    }`}
                  >
                    {monogram}
                  </span>
                </div>
              )}

              {/* Top Left Spec Tags */}
              <div className="absolute top-6 left-6 font-mono text-[0.6rem] tracking-[0.2em] text-neutral-400 space-y-1">
                <div className="text-white font-bold">{getSilhouetteName()}</div>
                <div>{selectedLeather.name}</div>
                <div className="text-neutral-500">{selectedHardware.name}</div>
              </div>
            </div>

            {/* Atelier Crafting Telemetry */}
            <div className="bg-[#0c0c0c] border border-white/10 p-5 grid grid-cols-3 gap-4 text-center font-mono text-xs">
              <div>
                <span className="text-[0.6rem] text-neutral-500 tracking-widest uppercase block">ESTIMATED LEAD TIME</span>
                <span className="text-neutral-200 font-bold">6–8 WEEKS</span>
              </div>
              <div className="border-x border-white/10">
                <span className="text-[0.6rem] text-neutral-500 tracking-widest uppercase block">WORKSHOP ORIGIN</span>
                <span className="text-neutral-200 font-bold">PARIS ATELIER 4</span>
              </div>
              <div>
                <span className="text-[0.6rem] text-neutral-500 tracking-widest uppercase block">AUTHENTICATION</span>
                <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> NFC CHIP
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-6 space-y-10">
            {/* 1. Silhouette Selection */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase block">
                01 / SELECT OBJECT SILHOUETTE
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'carry', name: 'THE 01 TOTE', price: '₹2,45,000' },
                  { id: 'satchel', name: 'SATCHEL 02 FLAP', price: '₹1,95,000' },
                  { id: 'time', name: '11:59 CHRONO', price: '₹6,80,000' },
                  { id: 'vision', name: 'BLIND TITANIUM', price: '₹1,12,000' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSilhouette(s.id as any)}
                    className={`p-4 border text-left transition-all ${
                      selectedSilhouette === s.id
                        ? 'border-white bg-white/5 text-white shadow-lg'
                        : 'border-white/10 bg-[#080808] text-neutral-400 hover:border-white/30 hover:text-neutral-200'
                    }`}
                  >
                    <div className="font-serif text-sm font-light text-white">{s.name}</div>
                    <div className="font-mono text-[0.65rem] text-neutral-500 mt-1">{s.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Leather & Material Selection */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase block">
                02 / SELECT ATELIER LEATHER GRADE
              </label>
              <div className="space-y-2">
                {LEATHER_OPTIONS.map((leather) => (
                  <button
                    key={leather.id}
                    onClick={() => setSelectedLeather(leather)}
                    className={`w-full p-4 border flex items-center justify-between text-left transition-all ${
                      selectedLeather.id === leather.id
                        ? 'border-white bg-white/5 text-white'
                        : 'border-white/10 bg-[#080808] text-neutral-400 hover:border-white/30 hover:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span 
                        className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0"
                        style={{ backgroundColor: leather.previewColor }}
                      />
                      <div>
                        <div className="font-mono text-xs font-bold text-white tracking-wider">{leather.name}</div>
                        <div className="font-sans text-[0.7rem] text-neutral-400 font-light">{leather.detail}</div>
                      </div>
                    </div>
                    {selectedLeather.id === leather.id && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Hardware & Alloy Finishing */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase block">
                03 / SELECT HARDWARE &amp; PRECISION ALLOY
              </label>
              <div className="space-y-2">
                {HARDWARE_OPTIONS.map((hw) => (
                  <button
                    key={hw.id}
                    onClick={() => setSelectedHardware(hw)}
                    className={`w-full p-4 border flex items-center justify-between text-left transition-all ${
                      selectedHardware.id === hw.id
                        ? 'border-white bg-white/5 text-white'
                        : 'border-white/10 bg-[#080808] text-neutral-400 hover:border-white/30 hover:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span 
                        className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0 shadow-sm"
                        style={{ background: hw.previewBg }}
                      />
                      <div>
                        <div className="font-mono text-xs font-bold text-white tracking-wider">{hw.name}</div>
                        <div className="font-sans text-[0.7rem] text-neutral-400 font-light">{hw.detail}</div>
                      </div>
                    </div>
                    {selectedHardware.id === hw.id && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Hand-Debossed Monogram Stamp */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase block">
                04 / BESPOKE MONOGRAM EMBOSSING (MAX 4 CHARACTERS)
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  maxLength={5}
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  placeholder="E.G. A.V.S."
                  className="bg-[#080808] border border-white/20 text-white font-mono text-sm px-4 py-3 tracking-[0.25em] uppercase focus:outline-none focus:border-white flex-1"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFoilColor('silver')}
                    className={`px-3 py-2 font-mono text-[0.65rem] border ${
                      foilColor === 'silver' ? 'border-white bg-white text-black font-bold' : 'border-white/20 text-neutral-400'
                    }`}
                  >
                    SILVER FOIL
                  </button>
                  <button
                    type="button"
                    onClick={() => setFoilColor('chrome')}
                    className={`px-3 py-2 font-mono text-[0.65rem] border ${
                      foilColor === 'chrome' ? 'border-white bg-white text-black font-bold' : 'border-white/20 text-neutral-400'
                    }`}
                  >
                    CHROME
                  </button>
                  <button
                    type="button"
                    onClick={() => setFoilColor('blind')}
                    className={`px-3 py-2 font-mono text-[0.65rem] border ${
                      foilColor === 'blind' ? 'border-white bg-white text-black font-bold' : 'border-white/20 text-neutral-400'
                    }`}
                  >
                    BLIND DEBOSS
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Commission Button */}
            <form onSubmit={handleCommissionSubmit} className="pt-4 border-t border-white/10 space-y-4">
              <button
                type="submit"
                onMouseEnter={() => setCursorLabel('COMMISSION')}
                onMouseLeave={() => setCursorLabel('')}
                className="btn-primary w-full py-5 text-center justify-center font-mono text-xs tracking-[0.25em] font-bold"
              >
                <span>REQUEST ATELIER COMMISSION APPOINTMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {isCommissionSubmitted && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs tracking-wider flex items-center gap-3 animate-emergent">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <span>COMMISSION REQUEST REGISTERED. YOUR PRIVATE ATELIER LIAISON WILL CONTACT YOU WITHIN 2 HOURS.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
