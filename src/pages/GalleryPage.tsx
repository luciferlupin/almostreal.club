import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Eye, ArrowRight, X, ChevronLeft, ChevronRight, Grid, LayoutGrid, ShoppingBag, ShieldCheck } from 'lucide-react';
import type { Category } from '../types';

interface GalleryItem {
  id: string;
  objectId?: string;
  title: string;
  subtitle: string;
  category: Category | 'RUNWAY' | 'ATELIER';
  image: string;
  aspectRatio: string;
  edition: string;
  priceFormatted?: string;
  isUnreal?: boolean;
  materialTag: string;
  specs: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    objectId: 'obj-001',
    title: 'THE 01 — ARCHIVAL SILHOUETTE',
    subtitle: 'FRENCH FULL-GRAIN CALFSKIN',
    category: 'CARRY',
    image: '/assets/carry_real.png',
    aspectRatio: 'aspect-square',
    edition: 'EDITION OF 250',
    priceFormatted: '₹2,45,000',
    isUnreal: false,
    materialTag: 'FRENCH BOX CALF • 316L LIQUID CHROME',
    specs: ['Single-origin black calfskin', 'Saddle hand-stitched waxed thread', 'Mirror-lapped chrome lock']
  },
  {
    id: 'gal-02',
    objectId: 'obj-001',
    title: 'THE 01 — SURREAL CHROME METAMORPHOSIS',
    subtitle: 'LIQUID MERCURY REFRACTION',
    category: 'CARRY',
    image: '/assets/carry_unreal.png',
    aspectRatio: 'aspect-square',
    edition: 'UNREAL EDITION',
    priceFormatted: '₹2,45,000',
    isUnreal: true,
    materialTag: 'LIQUID CHROME • SURREAL MESH',
    specs: ['Vapor deposited metallic sheen', 'Variable fluid reflection', '3D Vertex displacement']
  },
  {
    id: 'gal-03',
    objectId: 'obj-002',
    title: '11:59 — SKELETONIZED CHRONOMETER',
    subtitle: 'GRADE 5 AEROSPACE TITANIUM',
    category: 'TIME',
    image: '/assets/time_real.png',
    aspectRatio: 'aspect-square',
    edition: 'EDITION OF 100',
    priceFormatted: '₹6,80,000',
    isUnreal: false,
    materialTag: 'GRADE 5 TITANIUM • SAPPHIRE',
    specs: ['Ruthenium exposed caliber movement', 'Anti-reflective double-arched sapphire', 'Alligator leather strap']
  },
  {
    id: 'gal-04',
    objectId: 'obj-003',
    title: 'BLIND — TITANIUM OPTICS',
    subtitle: 'JAPANESE BETA-TITANIUM',
    category: 'VISION',
    image: '/assets/vision_real.png',
    aspectRatio: 'aspect-square',
    edition: 'EDITION OF 300',
    priceFormatted: '₹1,12,000',
    isUnreal: false,
    materialTag: 'BETA-TITANIUM • PHOTOCHROMIC',
    specs: ['Carl Zeiss dark gradient lenses', 'Laser-engraved temple filigree', '14 gram weightless chassis']
  },
  {
    id: 'gal-05',
    objectId: 'obj-004',
    title: 'OBSIDIAN SPICE — EXTRAIT DE PARFUM',
    subtitle: 'HAND-BLOWN SMOKED FLINT GLASS',
    category: 'SCENT',
    image: '/assets/scent_real.png',
    aspectRatio: 'aspect-square',
    edition: 'EDITION OF 500',
    priceFormatted: '₹48,000',
    isUnreal: false,
    materialTag: 'FLINT GLASS • NATURAL OBSIDIAN STONE',
    specs: ['32% Extrait de Parfum concentration', 'Florentine dark iris & smoked leather', 'Carved volcanic obsidian cap']
  },
  {
    id: 'gal-06',
    objectId: 'obj-005',
    title: 'SATCHEL 02 — CUBAN CHAIN FLAP',
    subtitle: 'TEXTURED PEBBLED CALFSKIN',
    category: 'CARRY',
    image: '/assets/carry_002_real.png',
    aspectRatio: 'aspect-square',
    edition: 'EDITION OF 200',
    priceFormatted: '₹1,95,000',
    isUnreal: false,
    materialTag: 'PEBBLED CALFSKIN • SOLID CHROME CHAIN',
    specs: ['Interlocking solid chrome Cuban chain', 'Hand-burnished edges', 'Velvet suede interior chamber']
  },
  {
    id: 'gal-07',
    objectId: 'obj-006',
    title: 'TITANIUM SHIELD — FLAME TEMPLE WRAP',
    subtitle: 'SCULPTED SILVER CHROME',
    category: 'VISION',
    image: '/assets/vision_002_real.png',
    aspectRatio: 'aspect-square',
    edition: 'EDITION OF 150',
    priceFormatted: '₹1,45,000',
    isUnreal: false,
    materialTag: 'CHROME FLAME ALLOY • POLARIZED OPTICS',
    specs: ['Flame-milled solid chrome temples', '9-layer polarized obsidian glass', 'Seamless wrap-around curve']
  },
  {
    id: 'gal-08',
    objectId: 'obj-007',
    title: 'TOURBILLON 01 — REVOLVING CAGE HOROLOGY',
    subtitle: 'HAUTE HORLOGERIE MASTERPIECE',
    category: 'TIME',
    image: '/assets/time_002_real.png',
    aspectRatio: 'aspect-square',
    edition: 'EDITION OF 50',
    priceFormatted: '₹9,80,000',
    isUnreal: false,
    materialTag: 'RUTHENIUM BRIDGES • FLYING TOURBILLON',
    specs: ['Single-axis 360° revolving tourbillon', '108-hour manual wind power reserve', 'Micro-blasted titanium case']
  },
  {
    id: 'gal-09',
    objectId: 'obj-008',
    title: 'NOIR OBSIDIENNE — AMETHYST CRYSTAL',
    subtitle: 'HAND-HAMMERED SILVER STOPPER',
    category: 'SCENT',
    image: '/assets/scent_002_real.png',
    aspectRatio: 'aspect-square',
    edition: 'EDITION OF 300',
    priceFormatted: '₹68,000',
    isUnreal: false,
    materialTag: 'AMETHYST FLINT GLASS • 925 SILVER',
    specs: ['36% Parfum concentration', 'Hand-hammered artisan silver cap', 'Smoked resin & Bourbon vanilla']
  },
  {
    id: 'gal-10',
    title: 'SALON LOOK 01 — NOIR MONOLITH',
    subtitle: 'WINTER SALON RUNWAY ARCHIVE',
    category: 'RUNWAY',
    image: '/assets/runway_look_01.png',
    aspectRatio: 'aspect-[4/5]',
    edition: 'RUNWAY ARCHIVE',
    isUnreal: false,
    materialTag: 'ARCHITECTURAL WOOL • CHROME HARDWARE',
    specs: ['Structured tailored outerwear', 'Shielded beta-titanium eyewear', 'The 01 calfskin handbag']
  },
  {
    id: 'gal-11',
    title: 'SALON LOOK 02 — OBSIDIAN TUXEDO',
    subtitle: 'WINTER SALON RUNWAY ARCHIVE',
    category: 'RUNWAY',
    image: '/assets/runway_look_02.png',
    aspectRatio: 'aspect-[4/5]',
    edition: 'RUNWAY ARCHIVE',
    isUnreal: false,
    materialTag: 'SILK FAILLE • CHROME CHAIN SATCHEL',
    specs: ['Bespoke evening tuxedo tailoring', 'Satchel 02 pebbled flap bag', '11:59 titanium timepiece']
  },
  {
    id: 'gal-12',
    title: 'EDITION 001 — EDITORIAL COUTURE CAMPAIGN',
    subtitle: 'PARIS ATELIER PUBLICATION',
    category: 'RUNWAY',
    image: '/assets/campaign_model.png',
    aspectRatio: 'aspect-[4/5]',
    edition: 'EDITORIAL 001',
    isUnreal: false,
    materialTag: 'ORIGAMI PLEATING • LIQUID HARDWARE',
    specs: ['Haute couture sculptural tailoring', 'Liquid chrome tote handbag', 'Obsidian Spice fragrance notes']
  }
];

export const GalleryPage: React.FC = () => {
  const { setSelectedObjectId, setCurrentRoute, setCursorLabel, addToBag, objects } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [realityFilter, setRealityFilter] = useState<'ALL' | 'REAL' | 'UNREAL'>('ALL');
  const [layoutMode, setLayoutMode] = useState<'editorial' | 'grid'>('editorial');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesReality =
      realityFilter === 'ALL' ||
      (realityFilter === 'REAL' && !item.isUnreal) ||
      (realityFilter === 'UNREAL' && item.isUnreal);
    return matchesCategory && matchesReality;
  });

  const handleOpenLightbox = (item: GalleryItem) => {
    setLightboxItem(item);
  };

  const handleNextLightbox = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === lightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setLightboxItem(filteredItems[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === lightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxItem(filteredItems[prevIndex]);
  };

  const handleInspectObject = (objectId?: string) => {
    if (objectId) {
      setSelectedObjectId(objectId);
      setCurrentRoute('product-detail');
      setLightboxItem(null);
    }
  };

  const handleAcquireObject = (objectId?: string) => {
    if (objectId) {
      const obj = objects.find((o) => o.id === objectId);
      if (obj) {
        addToBag(obj);
      }
    }
  };

  return (
    <div className="bg-[#080808] text-[#F2F0EA] space-y-0 min-h-screen">
      {/* Editorial Gallery Hero Header */}
      <section className="pt-36 pb-16 px-6 md:px-12 border-b border-white/10 relative overflow-hidden">
        <div className="container-editorial space-y-8">
          <div className="flex justify-between items-start font-mono text-xs tracking-[0.3em] text-neutral-400">
            <span className="text-white font-bold">VISUAL ARCHIVE / 001</span>
            <span>GALLERY REPOSITORY</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <p className="font-mono text-xs text-neutral-400 tracking-[0.35em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              ALMOSTREAL® PRODUCT &amp; RUNWAY GALLERY
            </p>
            <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.92]">
              THE PERMANENT <br />
              <span className="italic text-neutral-400">COLLECTION GALLERY.</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-neutral-300 max-w-xl font-light leading-relaxed">
              Explore high-resolution studio catalogue photography, surreal object transformations, and runway salon silhouettes from Edition 001.
            </p>
          </div>

          {/* Gallery Filters & View Controls Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {['ALL', 'CARRY', 'TIME', 'VISION', 'SCENT', 'RUNWAY'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 font-mono text-xs tracking-[0.2em] uppercase border transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-black border-white font-bold shadow-md'
                      : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Reality Filter & Layout Toggles */}
            <div className="flex items-center gap-4 self-end lg:self-auto">
              <div className="flex items-center border border-white/10 bg-[#0c0c0c] p-1 font-mono text-[0.65rem] tracking-wider">
                <button
                  onClick={() => setRealityFilter('ALL')}
                  className={`px-2.5 py-1 ${realityFilter === 'ALL' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  ALL
                </button>
                <button
                  onClick={() => setRealityFilter('REAL')}
                  className={`px-2.5 py-1 ${realityFilter === 'REAL' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  REAL
                </button>
                <button
                  onClick={() => setRealityFilter('UNREAL')}
                  className={`px-2.5 py-1 ${realityFilter === 'UNREAL' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  UNREAL
                </button>
              </div>

              <div className="flex items-center border border-white/10 bg-[#0c0c0c] p-1">
                <button
                  onClick={() => setLayoutMode('editorial')}
                  className={`p-1.5 transition-colors ${layoutMode === 'editorial' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
                  title="Editorial Spread View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`p-1.5 transition-colors ${layoutMode === 'grid' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
                  title="Compact Studio Grid"
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Grid */}
      <section className="section-padding bg-[#080808]">
        <div className="container-editorial">
          {layoutMode === 'editorial' ? (
            /* Editorial Asymmetrical Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenLightbox(item)}
                  onMouseEnter={() => setCursorLabel('INSPECT')}
                  onMouseLeave={() => setCursorLabel('')}
                  className={`group relative bg-[#0c0c0c] border border-white/10 overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-700 hover:border-white/40 shadow-xl ${
                    idx % 5 === 0 ? 'md:col-span-2 aspect-[16/10]' : item.aspectRatio
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-700 select-none"
                    />

                    {/* Tag Overlays */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/15 font-mono text-[0.6rem] tracking-widest uppercase text-white">
                        {item.category}
                      </span>
                      {item.isUnreal && (
                        <span className="px-2.5 py-1 bg-white text-black font-mono text-[0.6rem] tracking-widest uppercase font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> UNREAL
                        </span>
                      )}
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md p-2 border border-white/20 text-white">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Caption Bar */}
                  <div className="p-6 bg-black/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-light text-white group-hover:underline">
                        {item.title}
                      </h3>
                      <p className="font-mono text-[0.65rem] text-neutral-400 tracking-wider mt-0.5">
                        {item.materialTag}
                      </p>
                    </div>

                    {item.priceFormatted && (
                      <span className="font-mono text-xs text-neutral-300 font-bold">
                        {item.priceFormatted}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Compact Studio Grid */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenLightbox(item)}
                  onMouseEnter={() => setCursorLabel('VIEW')}
                  onMouseLeave={() => setCursorLabel('')}
                  className="group relative bg-[#0c0c0c] border border-white/10 aspect-square p-6 flex flex-col justify-between cursor-pointer hover:border-white/40 transition-colors shadow-lg"
                >
                  <div className="flex justify-between items-center font-mono text-[0.6rem] text-neutral-500">
                    <span>{item.category}</span>
                    {item.isUnreal && <span className="text-white font-bold">UNREAL</span>}
                  </div>

                  <div className="relative w-full h-[65%] flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <h4 className="font-serif text-sm text-white truncate">{item.title}</h4>
                    <p className="font-mono text-[0.65rem] text-neutral-400 mt-0.5">{item.priceFormatted || item.edition}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Full-Screen Lightbox Inspection Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 animate-emergent select-none">
          {/* Close Button */}
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-6 right-6 p-3 text-neutral-400 hover:text-white border border-white/20 bg-black/60 rounded-full transition-colors z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevLightbox}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-neutral-400 hover:text-white border border-white/20 bg-black/60 rounded-full transition-colors z-50 hidden md:block"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextLightbox}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-neutral-400 hover:text-white border border-white/20 bg-black/60 rounded-full transition-colors z-50 hidden md:block"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content Grid */}
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#0c0c0c] border border-white/20 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
            {/* Left: High-Res Image Display */}
            <div className="lg:col-span-7 bg-[#060606] p-8 md:p-12 flex items-center justify-center relative min-h-[350px] lg:min-h-[550px] border-b lg:border-b-0 lg:border-r border-white/10">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="max-h-[75vh] max-w-full object-contain filter contrast-110 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
              />

              {lightboxItem.isUnreal && (
                <div className="absolute top-6 left-6 px-3 py-1.5 bg-white text-black font-mono text-xs tracking-widest uppercase font-bold flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  UNREAL FREQUENCY EDITION
                </div>
              )}
            </div>

            {/* Right: Atelier Pedigree & Acquisition Actions */}
            <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-8 bg-[#0a0a0a] overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
                    {lightboxItem.category} &nbsp;•&nbsp; {lightboxItem.edition}
                  </span>
                  <span className="font-mono text-xs text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> AUTHENTIC
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-3xl md:text-4xl text-white font-light leading-tight">
                    {lightboxItem.title}
                  </h2>
                  <p className="font-mono text-xs text-neutral-400 tracking-wider">
                    {lightboxItem.subtitle}
                  </p>
                  {lightboxItem.priceFormatted && (
                    <p className="font-mono text-xl text-white font-bold pt-2">
                      {lightboxItem.priceFormatted}
                    </p>
                  )}
                </div>

                {/* Material & Specs */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <span className="font-mono text-[0.65rem] text-neutral-500 tracking-widest uppercase block">
                    MATERIAL COMPOSITION &amp; CRAFTSMANSHIP:
                  </span>
                  <div className="space-y-2">
                    {lightboxItem.specs.map((spec, i) => (
                      <div key={i} className="p-3 bg-neutral-900/60 border border-white/10 font-mono text-xs text-neutral-300 flex items-start gap-2.5">
                        <span className="text-neutral-500">0{i + 1}.</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                {lightboxItem.objectId && (
                  <>
                    <button
                      onClick={() => handleAcquireObject(lightboxItem.objectId)}
                      className="btn-primary w-full py-4 text-center justify-center font-mono text-xs tracking-[0.25em] font-bold"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      <span>ACQUIRE OBJECT</span>
                    </button>

                    <button
                      onClick={() => handleInspectObject(lightboxItem.objectId)}
                      className="btn-outline w-full py-3 text-center justify-center font-mono text-xs tracking-[0.2em]"
                    >
                      <span>VIEW FULL ATELIER DOSSIER</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
