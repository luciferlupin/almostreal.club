import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExplodedObjectView } from '../components/ExplodedObjectView';
import { ObjectPassportModal } from '../components/ObjectPassportModal';
import { ShieldCheck, Heart, ArrowRight, RotateCw, Check, Truck, Shield } from 'lucide-react';
import type { Passport } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { 
    objects, 
    selectedObjectId, 
    addToBag, 
    savedObjectIds, 
    toggleSaveObject,
    setCursorLabel 
  } = useApp();

  const object = objects.find((o) => o.id === selectedObjectId) || objects[0];

  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const [showSamplePassport, setShowSamplePassport] = useState(false);
  const [acquiredSuccess, setAcquiredSuccess] = useState(false);

  const isSaved = savedObjectIds.includes(object.id);

  const handleAcquireClick = () => {
    addToBag(object);
    setAcquiredSuccess(true);
    setTimeout(() => setAcquiredSuccess(false), 3000);
  };

  const samplePassport: Passport = {
    passportId: `AR-${object.category.substring(0, 2)}-0087`,
    objectId: object.id,
    objectName: object.name,
    objectNumber: object.objectNumber,
    category: object.category,
    edition: object.edition,
    serialNumber: `087 / ${object.editionTotal}`,
    createdDate: '2026-03-15',
    verificationStatus: 'VERIFIED',
    ownerId: 'MEMBER 00481',
    careInstructions: object.materials.map(m => m.detail),
    ownershipHistory: [
      { date: '2026-03-15', owner: 'ALMOSTREAL CLUB ATELIER', action: 'CRAFTED & AUTHENTICATED' }
    ]
  };

  return (
    <div className="bg-[#080808] text-[#F2F0EA] space-y-0">
      <section className="min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 border-b border-white/10 relative overflow-hidden">
        <div className="container-editorial my-auto text-center space-y-8">
          <div className="space-y-3">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase block">
              {object.objectNumber} &nbsp;—&nbsp; {object.category}
            </span>
            <h1 className="font-serif text-6xl md:text-9xl font-light text-white tracking-tight">
              {object.name}
            </h1>
            <p className="font-serif text-xl md:text-3xl italic text-neutral-400 max-w-2xl mx-auto">
              "{object.subtitle}"
            </p>
          </div>

          <div className="relative w-full max-w-2xl mx-auto h-[450px] md:h-[600px] flex items-center justify-center py-8">
            <img
              src={object.heroImageReal}
              alt={object.name}
              className="w-full h-full object-contain filter contrast-125 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-emergent"
            />
          </div>

          <div className="font-mono text-xs text-neutral-400 tracking-[0.25em]">
            SCROLL DOWN TO DISCOVER STORY & ATELIER DETAILS ↓
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#0c0c0c] border-b border-white/10">
        <div className="container-editorial space-y-12 text-center">
          <div className="space-y-2">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
              INTERACTIVE VIEW / 360° ROTATION
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white">
              INSPECT FROM ALL ANGLES
            </h2>
          </div>

          <div className="relative w-full max-w-xl mx-auto h-[380px] bg-black/60 border border-white/10 p-8 flex items-center justify-center select-none">
            <img
              src={rotationDeg % 180 > 90 ? object.heroImageUnreal : object.heroImageReal}
              alt="360 view"
              className="w-full h-full object-contain transition-transform duration-100"
              style={{
                transform: `rotateY(${rotationDeg}deg)`
              }}
            />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[0.65rem] text-neutral-400">
              <span className="flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" /> DRAG SLIDER TO ROTATE
              </span>
              <span>ANGLE: {rotationDeg}°</span>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <input
              type="range"
              min="0"
              max="360"
              value={rotationDeg}
              onChange={(e) => setRotationDeg(Number(e.target.value))}
              className="w-full h-1 bg-neutral-800 appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#080808] border-b border-white/10">
        <div className="container-editorial space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
              MATERIAL MACRO ANALYSIS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white">
              RAW CRAFTSMANSHIP
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {object.materials.map((mat, idx) => (
              <div
                key={idx}
                className="bg-[#0c0c0c] border border-white/10 p-8 space-y-4 hover:border-white/30 transition-colors"
              >
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-neutral-500">MATERIAL 0{idx + 1}</span>
                  <span className="text-emerald-400">ATELIER SPEC</span>
                </div>
                <h3 className="font-serif text-2xl text-white">{mat.name}</h3>
                <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                  {mat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#0c0c0c] border-b border-white/10">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
              EDITORIAL NARRATIVE
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white leading-tight">
              FORMED IN SHADOW. <br />
              <span className="italic text-neutral-400">AUTHENTICATED IN REALITY.</span>
            </h2>
            <p className="font-sans text-base text-neutral-300 leading-relaxed">
              {object.description}
            </p>
            <div className="pt-4 font-mono text-xs text-neutral-400 space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>INDIVIDUALLY NUMBERED EDITION OF {object.editionTotal}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>ENCRYPTED NFC PASSPORT INCLUDED</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <img
              src={object.heroImageUnreal}
              alt="Editorial presentation"
              className="w-full max-w-lg object-contain bg-neutral-900/40 p-6 border border-white/10"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#080808] border-b border-white/10">
        <div className="container-editorial">
          <ExplodedObjectView object={object} />
        </div>
      </section>

      <section className="section-padding bg-[#050505] relative">
        <div className="container-editorial max-w-4xl mx-auto bg-[#0c0c0c] border border-white/20 p-8 md:p-16 space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-8 gap-4">
            <div>
              <span className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase">
                ACQUISITION SPECIFICATIONS
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-light mt-1">
                {object.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-neutral-400 block">PRICE</span>
              <span className="font-serif text-3xl text-white font-light">{object.priceFormatted}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs text-neutral-300 bg-neutral-900/60 p-6 border border-white/10">
            <div>
              <span className="text-neutral-500 text-[0.65rem] block">CATALOG NUMBER</span>
              <span className="text-white">{object.objectNumber}</span>
            </div>
            <div>
              <span className="text-neutral-500 text-[0.65rem] block">EDITION</span>
              <span className="text-white">{object.edition} (TOTAL: {object.editionTotal})</span>
            </div>
            <div>
              <span className="text-neutral-500 text-[0.65rem] block">STATUS</span>
              <span className={object.availability === 'ALMOST GONE' ? 'text-amber-400 font-bold' : 'text-white'}>
                {object.availability} ({object.remainingCount} REMAIN)
              </span>
            </div>
            <div>
              <span className="text-neutral-500 text-[0.65rem] block">ACCESS LEVEL</span>
              <span className="text-white font-bold">CLUB ACCESS 01</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAcquireClick}
              onMouseEnter={() => setCursorLabel('ACQUIRE')}
              onMouseLeave={() => setCursorLabel('')}
              className="btn-primary w-full py-5 text-center justify-center text-sm tracking-[0.25em]"
            >
              <span>{acquiredSuccess ? 'OBJECT ADDED TO BAG ✓' : 'ACQUIRE OBJECT'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => toggleSaveObject(object.id)}
                className={`btn-outline w-full py-4 text-center justify-center text-xs tracking-widest ${
                  isSaved ? 'border-rose-400 text-rose-400' : ''
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'OBJECT SAVED' : 'SAVE OBJECT'}</span>
              </button>

              <button
                onClick={() => setShowSamplePassport(true)}
                className="btn-outline w-full py-4 text-center justify-center text-xs tracking-widest"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>PREVIEW PASSPORT</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10 font-mono text-[0.7rem] text-neutral-400">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-white" />
              <span>INSURED EXPRESS DELIVERY</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-white" />
              <span>NFC DIGITAL AUTHENTICITY</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-white" />
              <span>14-DAY ATELIER RETURNS</span>
            </div>
          </div>
        </div>
      </section>

      {showSamplePassport && (
        <ObjectPassportModal
          passport={samplePassport}
          onClose={() => setShowSamplePassport(false)}
        />
      )}
    </div>
  );
};
