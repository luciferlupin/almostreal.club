import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Search, ArrowRight } from 'lucide-react';
import { INITIAL_EDITIONS } from '../data/mockData';

export const SearchOverlay: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    objects, 
    setSelectedObjectId, 
    setCurrentRoute 
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredObjects = query.trim()
    ? objects.filter(
        (o) =>
          o.name.toLowerCase().includes(query.toLowerCase()) ||
          o.category.toLowerCase().includes(query.toLowerCase()) ||
          o.description.toLowerCase().includes(query.toLowerCase()) ||
          o.objectNumber.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredEditions = query.trim()
    ? INITIAL_EDITIONS.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.number.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectObject = (id: string) => {
    setSelectedObjectId(id);
    setCurrentRoute('product-detail');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#080808]/98 backdrop-blur-2xl flex flex-col p-6 md:p-16 text-[#F2F0EA] animate-emergent overflow-y-auto">
      {/* Top Header Close */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
        <span className="font-serif text-xl tracking-widest">ALMOSTREAL®</span>
        <button
          onClick={() => setIsSearchOpen(false)}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Search Input */}
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <p className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
          FULL CATALOG SEARCH
        </p>

        <h2 className="font-serif text-3xl md:text-5xl font-light">
          WHAT ARE YOU <span className="italic text-neutral-400">LOOKING FOR?</span>
        </h2>

        <div className="relative border-b-2 border-white/30 focus-within:border-white transition-colors py-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="TYPE OBJECT, CATEGORY, OR EDITION..."
            autoFocus
            className="w-full bg-transparent font-serif text-2xl md:text-4xl text-white placeholder-neutral-600 focus:outline-none tracking-wide uppercase"
          />
          <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400 pointer-events-none" />
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex flex-wrap gap-3 font-mono text-xs tracking-wider text-neutral-400 pt-2">
          <span className="text-neutral-500">SUGGESTIONS:</span>
          {['BLACK', 'CARRY', 'VISION', 'TIME', 'SCENT', 'EDITION I'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="hover:text-white underline"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        {query.trim() && (
          <div className="pt-12 space-y-12 animate-emergent">
            {/* Objects Results */}
            <div className="space-y-6">
              <h3 className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase border-b border-white/10 pb-2">
                OBJECTS ({filteredObjects.length})
              </h3>

              {filteredObjects.length === 0 ? (
                <p className="font-mono text-xs text-neutral-500">NO MATCHING OBJECTS FOUND.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredObjects.map((obj) => (
                    <div
                      key={obj.id}
                      onClick={() => handleSelectObject(obj.id)}
                      className="p-6 border border-white/10 bg-neutral-900/40 hover:bg-neutral-900 hover:border-white/30 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <img src={obj.heroImageReal} alt={obj.name} className="w-12 h-12 object-contain" />
                        <div>
                          <span className="font-mono text-[0.65rem] text-neutral-400 tracking-widest block">
                            {obj.objectNumber} / {obj.category}
                          </span>
                          <h4 className="font-serif text-xl text-white group-hover:text-neutral-200">
                            {obj.name}
                          </h4>
                          <span className="font-mono text-xs text-neutral-400">{obj.priceFormatted}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Editions Results */}
            {filteredEditions.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase border-b border-white/10 pb-2">
                  EDITIONS ({filteredEditions.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEditions.map((ed) => (
                    <div
                      key={ed.id}
                      onClick={() => {
                        setCurrentRoute('campaign');
                        setIsSearchOpen(false);
                      }}
                      className="p-6 border border-white/10 bg-neutral-900/40 hover:border-white/30 cursor-pointer"
                    >
                      <span className="font-mono text-xs text-neutral-400 block mb-1">
                        {ed.number} — {ed.year}
                      </span>
                      <h4 className="font-serif text-2xl text-white">{ed.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
