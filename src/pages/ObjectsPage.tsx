import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Category, ObjectItem } from '../types';
import { ShieldCheck, Heart } from 'lucide-react';
import { RealityCheckModal } from '../components/RealityCheckModal';

export const ObjectsPage: React.FC = () => {
  const { 
    objects, 
    setSelectedObjectId, 
    setCurrentRoute, 
    savedObjectIds, 
    toggleSaveObject,
    setCursorLabel 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<Category | 'ALL'>('ALL');
  const [activeRealityCheckObj, setActiveRealityCheckObj] = useState<ObjectItem | null>(null);

  const filteredObjects = activeCategory === 'ALL'
    ? objects
    : objects.filter((o) => o.category === activeCategory);

  const handleSelectObject = (id: string, category: Category) => {
    setSelectedObjectId(id);
    if (category === 'SCENT') {
      setCurrentRoute('perfume-experience');
    } else {
      setCurrentRoute('product-detail');
    }
  };

  return (
    <div className="bg-[#080808] text-[#F2F0EA] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="container-editorial space-y-16">
        <div className="space-y-4 border-b border-white/10 pb-8">
          <p className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
            CATALOGUE OF EXISTENCE
          </p>
          <h1 className="font-serif text-5xl md:text-8xl font-light text-white tracking-tight">
            OBJECTS
          </h1>
          <p className="font-sans text-sm text-neutral-300 max-w-xl leading-relaxed">
            Every object is sculpted in limited editions. Physical manifestations residing on the edge of reality.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 font-mono text-xs tracking-[0.2em] border-b border-white/10 pb-6">
          {(['ALL', 'CARRY', 'VISION', 'TIME', 'SCENT'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 border transition-all ${
                activeCategory === cat
                  ? 'bg-white text-black border-white font-bold'
                  : 'border-white/20 text-neutral-400 hover:text-white hover:border-white/40'
              }`}
            >
              {cat === 'ALL' ? '00 / ALL OBJECTS' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredObjects.map((obj) => {
            const isSaved = savedObjectIds.includes(obj.id);
            return (
              <div
                key={obj.id}
                className="group relative bg-[#0c0c0c] border border-white/10 p-8 flex flex-col justify-between transition-all duration-500 hover:border-white/40"
              >
                <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-6">
                  <span>{obj.objectNumber}</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleSaveObject(obj.id)}
                      className={`p-1 transition-colors ${isSaved ? 'text-rose-400' : 'text-neutral-500 hover:text-white'}`}
                      title="Save Object"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>

                <div 
                  onClick={() => handleSelectObject(obj.id, obj.category)}
                  onMouseEnter={() => setCursorLabel('VIEW')}
                  onMouseLeave={() => setCursorLabel('')}
                  className="relative w-full aspect-square my-6 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  <img
                    src={obj.heroImageReal}
                    alt={obj.name}
                    className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-300 flex flex-col items-center justify-center space-y-3 p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveRealityCheckObj(obj);
                      }}
                      className="btn-outline py-2.5 px-5 text-xs tracking-widest flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>REALITY CHECK</span>
                    </button>
                    <span className="font-mono text-[0.65rem] text-neutral-400">HOLD TO INSPECT</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6">
                  <span className="font-mono text-[0.65rem] text-neutral-400 tracking-widest block">
                    {obj.category} / {obj.edition}
                  </span>
                  <div className="flex justify-between items-baseline font-mono text-sm">
                    <h3 
                      onClick={() => handleSelectObject(obj.id, obj.category)}
                      className="font-serif text-3xl text-white font-light hover:text-neutral-300 cursor-pointer"
                    >
                      {obj.name}
                    </h3>
                    <span className="text-white font-bold">{obj.priceFormatted}</span>
                  </div>

                  <p className="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {obj.description}
                  </p>

                  <div className="flex justify-between items-center font-mono text-xs pt-2">
                    <span className={obj.availability === 'ALMOST GONE' ? 'text-amber-400' : 'text-neutral-400'}>
                      {obj.availability}
                    </span>
                    <button
                      onClick={() => handleSelectObject(obj.id, obj.category)}
                      className="text-white hover:underline tracking-widest"
                    >
                      VIEW OBJECT →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeRealityCheckObj && (
        <RealityCheckModal
          object={activeRealityCheckObj}
          onClose={() => setActiveRealityCheckObj(null)}
        />
      )}
    </div>
  );
};
