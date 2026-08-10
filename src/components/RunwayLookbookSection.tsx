import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Eye, Sparkles, Plus, Check } from 'lucide-react';

interface RunwayLook {
  id: string;
  lookNumber: string;
  title: string;
  season: string;
  image: string;
  description: string;
  pieces: {
    name: string;
    category: string;
    priceFormatted: string;
    objectId: string;
  }[];
}

const RUNWAY_LOOKS: RunwayLook[] = [
  {
    id: 'look-01',
    lookNumber: 'LOOK 01',
    title: 'SILVER TWEED TAILORING & METALLIC CLUTCH',
    season: 'HAUTE COUTURE SALON 2026',
    image: '/assets/look_silver_tweed.jpg',
    description: 'A shimmering metallic silver tweed tailored trouser suit paired with the crystal-embellished metallic silver shoulder pochette on a delicate gold link chain.',
    pieces: [
      { name: 'THE 01 HANDBAG', category: 'CARRY', priceFormatted: '₹2,45,000', objectId: 'obj-001' },
      { name: 'BLIND TITANIUM SUNGLASSES', category: 'VISION', priceFormatted: '₹1,12,000', objectId: 'obj-003' }
    ]
  },
  {
    id: 'look-02',
    lookNumber: 'LOOK 02',
    title: 'EMERALD SILK HERITAGE & JEWELED POCHETTE',
    season: 'ATELIER HERITAGE ARCHIVE',
    image: '/assets/look_emerald_heritage.jpg',
    description: 'Traditional heavy emerald green Kanjivaram zari silk draped over a warm caramel leather pochette with hand-set crystal emblem and solid gold box chain.',
    pieces: [
      { name: 'SATCHEL 02 FLAP CHAIN', category: 'CARRY', priceFormatted: '₹1,95,000', objectId: 'obj-005' },
      { name: 'OBSIDIAN SPICE EXTRAIT', category: 'SCENT', priceFormatted: '₹48,000', objectId: 'obj-004' }
    ]
  },
  {
    id: 'look-03',
    lookNumber: 'LOOK 03',
    title: 'CAMEL TRENCH & MONOGRAM ATELIER TOTE',
    season: 'SALON BOUTIQUE EDITION',
    image: '/assets/look_camel_boutique.jpg',
    description: 'Double-faced cashmere camel tailored overcoat with mocha silk blouse, carrying the structured monogram chain tote in two-tone leather.',
    pieces: [
      { name: 'THE 01 HANDBAG', category: 'CARRY', priceFormatted: '₹2,45,000', objectId: 'obj-001' },
      { name: '11:59 TITANIUM CHRONOMETER', category: 'TIME', priceFormatted: '₹6,80,000', objectId: 'obj-002' }
    ]
  },
  {
    id: 'look-04',
    lookNumber: 'LOOK 04',
    title: 'NOIR ARCHITECTURE & SHIELDED VISION',
    season: 'WINTER SALON 2026',
    image: '/assets/runway_look_01.png',
    description: 'A monolithic tailored black wool structured overcoat paired with Japanese beta-titanium BLIND optics and THE 01 architectural calfskin handbag with mirror-polished chrome clasp.',
    pieces: [
      { name: 'THE 01 HANDBAG', category: 'CARRY', priceFormatted: '₹2,45,000', objectId: 'obj-001' },
      { name: 'BLIND TITANIUM SUNGLASSES', category: 'VISION', priceFormatted: '₹1,12,000', objectId: 'obj-003' }
    ]
  },
  {
    id: 'look-05',
    lookNumber: 'LOOK 05',
    title: 'OBSIDIAN TUXEDO & HOROLOGY',
    season: 'WINTER SALON 2026',
    image: '/assets/runway_look_02.png',
    description: 'Sharp razor-cut obsidian faille tuxedo silhouette anchored by SATCHEL 02 with heavyweight chrome Cuban chain and 11:59 skeletonized titanium chronometer.',
    pieces: [
      { name: 'SATCHEL 02 FLAP CHAIN', category: 'CARRY', priceFormatted: '₹1,95,000', objectId: 'obj-005' },
      { name: '11:59 TITANIUM CHRONOMETER', category: 'TIME', priceFormatted: '₹6,80,000', objectId: 'obj-002' }
    ]
  },
  {
    id: 'look-06',
    lookNumber: 'LOOK 06',
    title: 'MEDITERRANEAN RESORT & OBSIDIAN TOTE',
    season: 'RESORT CRUISE SALON',
    image: '/assets/look_mediterranean_resort.jpg',
    description: 'Breezy cream linen jumpsuit with camel cashmere wrap overlooking the Mediterranean coastline, carrying the signature black monogram chain tote.',
    pieces: [
      { name: 'THE 01 HANDBAG', category: 'CARRY', priceFormatted: '₹2,45,000', objectId: 'obj-001' },
      { name: 'OBSIDIAN SPICE EXTRAIT', category: 'SCENT', priceFormatted: '₹48,000', objectId: 'obj-004' }
    ]
  },
  {
    id: 'look-07',
    lookNumber: 'LOOK 07',
    title: 'TAILORED BLAZER & MONOCHROME SATCHEL',
    season: 'METROPOLITAN SALON EDITION',
    image: '/assets/look_blazer_monochrome.jpg',
    description: 'Sleek black tailored blazer with silk crepe blouse, styled with the ivory & noir monogram satchel featuring matte black Cuban chain hardware.',
    pieces: [
      { name: 'SATCHEL 02 FLAP CHAIN', category: 'CARRY', priceFormatted: '₹1,95,000', objectId: 'obj-005' },
      { name: 'BLIND TITANIUM SUNGLASSES', category: 'VISION', priceFormatted: '₹1,12,000', objectId: 'obj-003' }
    ]
  },
  {
    id: 'look-08',
    lookNumber: 'LOOK 08',
    title: 'CYCLADIC RESORT & MINI BARREL DUFFEL',
    season: 'SUMMER CRUISE ARCHIVE',
    image: '/assets/look_cycladic_resort.jpg',
    description: 'Embroidered ivory sundress overlooking the Aegean sea with espresso leather notebook, carrying the jacquard monogram mini barrel duffel.',
    pieces: [
      { name: 'THE 01 HANDBAG', category: 'CARRY', priceFormatted: '₹2,45,000', objectId: 'obj-001' },
      { name: 'OBSIDIAN SPICE EXTRAIT', category: 'SCENT', priceFormatted: '₹48,000', objectId: 'obj-004' }
    ]
  },
  {
    id: 'look-09',
    lookNumber: 'LOOK 09',
    title: 'PENTHOUSE SALON & BRAIDED CRESCENT',
    season: 'METROPOLITAN PRIVATE SALON',
    image: '/assets/look_penthouse_salon.jpg',
    description: 'Cream ribbed knit pullover and tailored noir trousers in the high-rise private salon lounge, carrying the noir braided leather handle crescent hobo.',
    pieces: [
      { name: 'SATCHEL 02 FLAP CHAIN', category: 'CARRY', priceFormatted: '₹1,95,000', objectId: 'obj-005' },
      { name: '11:59 TITANIUM CHRONOMETER', category: 'TIME', priceFormatted: '₹6,80,000', objectId: 'obj-002' }
    ]
  },
  {
    id: 'look-10',
    lookNumber: 'LOOK 10',
    title: 'ARCHITECTURAL STORM PARKA & SCARLET FLAP',
    season: 'WINTER RUNWAY ARCHIVE',
    image: '/assets/look_noir_parka_scarlet.jpg',
    description: 'Cinched technical noir hooded storm parka with contrast stripe cuffs, slung with the vibrant scarlet French box calf chain shoulder flap.',
    pieces: [
      { name: 'THE 01 HANDBAG', category: 'CARRY', priceFormatted: '₹2,45,000', objectId: 'obj-001' },
      { name: 'BLIND TITANIUM SUNGLASSES', category: 'VISION', priceFormatted: '₹1,12,000', objectId: 'obj-003' }
    ]
  },
  {
    id: 'look-11',
    lookNumber: 'LOOK 11',
    title: 'RAW INDIGO DENIM & OBLIQUE SADDLE',
    season: 'PARIS COUTURE SALON',
    image: '/assets/look_dior_oblique_saddle.jpg',
    description: 'Wide-leg raw Japanese indigo denim paired with the iconic Oblique jacquard canvas Saddle Bag featuring aged gold CD and D stirrup hardware.',
    pieces: [
      { name: 'THE 01 HANDBAG', category: 'CARRY', priceFormatted: '₹2,45,000', objectId: 'obj-001' },
      { name: 'OBSIDIAN SPICE EXTRAIT', category: 'SCENT', priceFormatted: '₹48,000', objectId: 'obj-004' }
    ]
  },
  {
    id: 'look-12',
    lookNumber: 'LOOK 12',
    title: 'EXECUTIVE PRIVATE SUITE & BRAIDED HOBO',
    season: 'METROPOLITAN PRIVATE SALON',
    image: '/assets/look_executive_desk_salon.jpg',
    description: 'Executive private office suite overlooking the skyline, styled with the noir pebbled leather braided handle crescent shoulder hobo.',
    pieces: [
      { name: 'SATCHEL 02 FLAP CHAIN', category: 'CARRY', priceFormatted: '₹1,95,000', objectId: 'obj-005' },
      { name: '11:59 TITANIUM CHRONOMETER', category: 'TIME', priceFormatted: '₹6,80,000', objectId: 'obj-002' }
    ]
  }
];

export const RunwayLookbookSection: React.FC = () => {
  const { setSelectedObjectId, setCurrentRoute, setCursorLabel, addToBag, objects } = useApp();
  const [activeLookIndex, setActiveLookIndex] = useState<number>(0);
  const [acquiredMap, setAcquiredMap] = useState<Record<string, boolean>>({});

  const currentLook = RUNWAY_LOOKS[activeLookIndex];

  const handleAcquirePiece = (objectId: string) => {
    const obj = objects.find((o) => o.id === objectId);
    if (obj) {
      addToBag(obj);
      setAcquiredMap((prev) => ({ ...prev, [objectId]: true }));
      setTimeout(() => {
        setAcquiredMap((prev) => ({ ...prev, [objectId]: false }));
      }, 2500);
    }
  };

  const handleInspectPiece = (objectId: string) => {
    setSelectedObjectId(objectId);
    setCurrentRoute('product-detail');
  };

  return (
    <section className="section-padding bg-[#0c0c0c] border-b border-white/10 relative overflow-hidden">
      <div className="container-editorial space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              THE SALON &amp; RUNWAY ARCHIVE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              CURATED <span className="italic text-neutral-400">SILHOUETTES</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-sm leading-relaxed">
            Explorations in silhouette, proportion, and weight. View complete salon looks featuring ALMOSTREAL leather goods, optics, and horology.
          </p>
        </div>

        {/* Runway Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Full-Bleed Runway Photograph */}
          <div className="lg:col-span-7 relative aspect-[4/5] bg-[#060606] border border-white/15 overflow-hidden group shadow-2xl">
            <img
              src={currentLook.image}
              alt={currentLook.title}
              className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Look Number Tag Overlay */}
            <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md px-3.5 py-1.5 border border-white/20 font-mono text-xs text-white tracking-widest uppercase">
              {currentLook.lookNumber} &nbsp;•&nbsp; {currentLook.season}
            </div>
          </div>

          {/* Right Column: Ensemble Details & Direct Acquisition */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase block">
                ENSEMBLE BREAKDOWN
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight">
                {currentLook.title}
              </h3>
              <p className="font-sans text-sm text-neutral-300 leading-relaxed font-light">
                {currentLook.description}
              </p>
            </div>

            {/* Featured Objects in Ensemble */}
            <div className="space-y-3 border-t border-white/10 pt-6">
              <span className="font-mono text-xs text-neutral-400 tracking-[0.2em] uppercase block">
                FEATURED ATELIER OBJECTS:
              </span>
              <div className="space-y-3">
                {currentLook.pieces.map((piece) => (
                  <div
                    key={piece.objectId}
                    className="p-4 bg-[#080808] border border-white/10 flex items-center justify-between hover:border-white/30 transition-colors"
                  >
                    <div>
                      <span className="font-mono text-[0.6rem] text-neutral-500 tracking-widest block uppercase">
                        {piece.category}
                      </span>
                      <h4 
                        onClick={() => handleInspectPiece(piece.objectId)}
                        className="font-serif text-base text-white cursor-pointer hover:underline"
                      >
                        {piece.name}
                      </h4>
                      <span className="font-mono text-xs text-neutral-300">
                        {piece.priceFormatted}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleInspectPiece(piece.objectId)}
                        onMouseEnter={() => setCursorLabel('INSPECT')}
                        onMouseLeave={() => setCursorLabel('')}
                        className="p-2 border border-white/20 text-neutral-300 hover:text-white hover:border-white transition-colors"
                        title="Inspect Object Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleAcquirePiece(piece.objectId)}
                        onMouseEnter={() => setCursorLabel('ACQUIRE')}
                        onMouseLeave={() => setCursorLabel('')}
                        className={`px-3 py-2 font-mono text-[0.65rem] tracking-wider border transition-all flex items-center gap-1.5 ${
                          acquiredMap[piece.objectId]
                            ? 'bg-emerald-500 text-black border-emerald-500 font-bold'
                            : 'bg-white text-black border-white hover:bg-transparent hover:text-white'
                        }`}
                      >
                        {acquiredMap[piece.objectId] ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>ADDED</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>ACQUIRE</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lookbook Navigation Tabs */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-2">
                {RUNWAY_LOOKS.map((look, idx) => (
                  <button
                    key={look.id}
                    onClick={() => setActiveLookIndex(idx)}
                    className={`px-4 py-2 font-mono text-xs tracking-widest uppercase border transition-all ${
                      activeLookIndex === idx
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {look.lookNumber}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentRoute('campaign')}
                className="font-mono text-xs text-neutral-400 hover:text-white flex items-center gap-2 tracking-widest uppercase transition-colors"
              >
                <span>FULL CAMPAIGN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
