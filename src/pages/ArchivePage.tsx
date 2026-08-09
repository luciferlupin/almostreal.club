import React from 'react';
import { useApp } from '../context/AppContext';
import { Lock } from 'lucide-react';

export const ArchivePage: React.FC = () => {
  const { setSelectedObjectId, setCurrentRoute, setCursorLabel } = useApp();

  const archiveEntries = [
    {
      code: 'AR001',
      name: 'THE 01',
      category: 'CARRY',
      edition: 'EDITION OF 250',
      status: 'GONE',
      year: '2026',
      objectId: 'obj-001',
      image: '/assets/carry_real.png'
    },
    {
      code: 'AR002',
      name: '11:59',
      category: 'TIME',
      edition: 'EDITION OF 100',
      status: 'AVAILABLE',
      year: '2026',
      objectId: 'obj-002',
      image: '/assets/time_real.png'
    },
    {
      code: 'AR003',
      name: 'BLIND',
      category: 'VISION',
      edition: 'EDITION OF 300',
      status: 'AVAILABLE',
      year: '2026',
      objectId: 'obj-003',
      image: '/assets/vision_real.png'
    },
    {
      code: 'AR004',
      name: 'MEMORY',
      category: 'SCENT',
      edition: 'EDITION OF 500',
      status: 'ALMOST GONE',
      year: '2026',
      objectId: 'obj-004',
      image: '/assets/scent_real.png'
    },
    {
      code: 'AR005',
      name: 'ARCHETYPE',
      category: 'CARRY',
      edition: 'EDITION OF 100',
      status: 'GONE',
      year: '2026',
      objectId: 'obj-005',
      image: '/assets/carry_unreal.png'
    },
    {
      code: 'AR006',
      name: 'PHANTOM',
      category: 'VISION',
      edition: 'EDITION OF 150',
      status: 'NOT YET REAL',
      year: '2026',
      objectId: 'obj-006',
      image: '/assets/vision_real.png'
    }
  ];

  const handleSelectArchive = (id: string, status: string) => {
    if (status === 'NOT YET REAL') return;
    setSelectedObjectId(id);
    setCurrentRoute('product-detail');
  };

  return (
    <div className="bg-[#080808] text-[#F2F0EA] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="container-editorial space-y-16">
        <div className="space-y-4 border-b border-white/10 pb-8">
          <p className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
            CHRONOLOGICAL RECORD
          </p>
          <h1 className="font-serif text-5xl md:text-8xl font-light text-white tracking-tight">
            ALMOSTREAL ARCHIVE®
          </h1>
          <p className="font-serif text-xl italic text-neutral-400 max-w-xl">
            EVERYTHING THAT WAS REAL. FOR A WHILE.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4 font-mono text-sm tracking-widest text-neutral-400 border-b border-white/10 pb-4">
            <span className="text-white font-bold text-lg">2026</span>
            <span className="text-neutral-600">/ CHRONICLE OF EDITIONS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archiveEntries.map((item) => {
              const isFuture = item.status === 'NOT YET REAL';
              return (
                <div
                  key={item.code}
                  onClick={() => handleSelectArchive(item.objectId, item.status)}
                  onMouseEnter={() => setCursorLabel(isFuture ? 'EARLY' : 'INSPECT')}
                  onMouseLeave={() => setCursorLabel('')}
                  className={`group relative bg-[#0c0c0c] border border-white/10 p-6 space-y-6 transition-all duration-500 ${
                    isFuture
                      ? 'cursor-not-allowed opacity-75'
                      : 'cursor-pointer hover:border-white/40'
                  }`}
                >
                  <div className="flex justify-between items-center font-mono text-xs text-neutral-400">
                    <span>{item.code}</span>
                    <span
                      className={
                        item.status === 'GONE'
                          ? 'text-red-400 font-bold'
                          : item.status === 'NOT YET REAL'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden bg-black/40 border border-white/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-contain transition-all duration-700 ${
                        isFuture ? 'filter blur-md grayscale scale-95' : 'group-hover:scale-105'
                      }`}
                    />

                    {isFuture && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-center space-y-2 group-hover:bg-black/80 transition-colors">
                        <Lock className="w-6 h-6 text-amber-400" />
                        <span className="font-mono text-xs text-white tracking-[0.25em] font-bold">
                          YOU’RE EARLY.
                        </span>
                        <span className="font-mono text-[0.65rem] text-neutral-400">
                          PROTOTYPE STAGE / REDACTED
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 font-mono text-xs border-t border-white/10 pt-4">
                    <span className="text-neutral-500 text-[0.65rem] block">{item.category} / {item.edition}</span>
                    <h3 className="font-serif text-2xl text-white font-light">{item.name}</h3>
                    {!isFuture && (
                      <span className="text-neutral-400 hover:text-white block pt-1">
                        VIEW ARCHIVE SPECS →
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
