import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRIVATE_ROOM_ITEMS } from '../data/mockData';
import { Volume2, VolumeX, ShieldAlert, ArrowLeft } from 'lucide-react';

export const PrivateRoomPage: React.FC = () => {
  const { setCurrentRoute } = useApp();
  const [accessState, setAccessState] = useState<'accessing' | 'granted'>('accessing');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [reservedIds, setReservedIds] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAccessState('granted');
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  const toggleReservation = (id: string) => {
    setReservedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-[#030303] text-[#F2F0EA] min-h-screen pt-28 pb-24 px-6 md:px-12 relative overflow-hidden select-none font-mono">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#101010] via-[#030303] to-[#000000] opacity-90 pointer-events-none" />

      <div className="container-editorial relative z-10 space-y-16">
        <div className="flex justify-between items-center text-xs text-neutral-500 tracking-[0.25em] border-b border-white/10 pb-6">
          <button
            onClick={() => setCurrentRoute('home')}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO PUBLIC REALITY</span>
          </button>
          <span className="text-amber-500 font-bold">CLASSIFIED ACCESS LEVEL 03</span>
        </div>

        {accessState === 'accessing' ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-amber-400 rounded-full animate-spin" />
            <p className="text-sm tracking-[0.3em] text-neutral-400 animate-pulse">
              ACCESSING ENCRYPTED ATELIER PROTOCOL...
            </p>
          </div>
        ) : (
          <div className="space-y-16 animate-emergent">
            <div className="space-y-4 max-w-3xl border-b border-white/10 pb-8">
              <div className="flex items-center gap-3 text-amber-500 text-xs tracking-widest">
                <ShieldAlert className="w-4 h-4" />
                <span>UNSANCTIONED ENVIRONMENT</span>
              </div>
              <h1 className="font-serif text-4xl md:text-7xl font-light text-white tracking-tight leading-none">
                YOU FOUND SOMETHING <br />
                <span className="italic text-neutral-400">YOU WEREN’T SHOWN.</span>
              </h1>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xl">
                This environment contains unreleased prototypes, redacted material specs, and confidential drop calendars reserved strictly for the Atelier inner circle.
              </p>
            </div>

            <div className="bg-neutral-950 border border-white/10 p-6 flex justify-between items-center text-xs text-neutral-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                  className="p-2 border border-white/20 hover:border-white text-white"
                >
                  {isAudioPlaying ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <span>AMBIENT DRONE FREQUENCY: 432HZ SYNTHESIS ({isAudioPlaying ? 'ACTIVE' : 'MUTED'})</span>
              </div>
              <span className="text-neutral-600">ENCRYPTION: AES-256</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {PRIVATE_ROOM_ITEMS.map((item) => {
                const isReserved = reservedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="bg-[#080808] border border-white/15 p-8 space-y-6 hover:border-amber-500/40 transition-all"
                  >
                    <div className="flex justify-between items-center text-xs text-neutral-400">
                      <span className="text-amber-500 font-bold">{item.code}</span>
                      <span>{item.percentage}</span>
                    </div>

                    <div className="relative aspect-[16/9] bg-black/80 border border-white/5 p-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain filter invert contrast-150 opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute top-4 left-4 text-[0.65rem] text-red-500 font-bold border border-red-500/30 px-2 py-0.5 bg-red-950/40">
                        REDACTED SPECIFICATION
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl text-white">{item.title}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">{item.note}</p>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/10 pt-4 text-xs">
                      <span className="text-neutral-500">{item.status}</span>
                      <button
                        onClick={() => toggleReservation(item.id)}
                        className={`btn-outline text-[0.65rem] py-2 px-4 ${
                          isReserved ? 'border-amber-400 text-amber-400' : ''
                        }`}
                      >
                        {isReserved ? 'RESERVATION RECORDED ✓' : 'REQUEST PRIVATE ALLOCATION'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
