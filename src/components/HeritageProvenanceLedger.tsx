import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Search, Cpu, CheckCircle2, Lock } from 'lucide-react';

interface RegistryRecord {
  serialNumber: string;
  objectName: string;
  category: string;
  edition: string;
  artisan: string;
  atelierLocation: string;
  completionDate: string;
  nfcChipUid: string;
  cryptographicHash: string;
  materialComposition: string[];
  ownershipStatus: string;
}

const SAMPLE_RECORDS: Record<string, RegistryRecord> = {
  'AR-01-0087-2026': {
    serialNumber: 'AR-01-0087-2026',
    objectName: 'OBJECT 001 — THE 01',
    category: 'CARRY / ARCHITECTURAL TOTE',
    edition: 'EDITION I (#087 OF 250)',
    artisan: 'MAÎTRE MAROQUINIER JEAN-LUC MOREAU',
    atelierLocation: 'PARIS ATELIER 4 (RUE SAINT-HONORÉ)',
    completionDate: 'OCTOBER 10, 2026',
    nfcChipUid: '04:A2:8B:19:64:3C:90',
    cryptographicHash: '0x8f2d9c4b1e7a3f05c6d2e9b8a1f4c7e2d9a3b6f8',
    materialComposition: [
      'Single-source French Box Calfskin (Tannery Haas)',
      'Solid 316L mirror-lapped stainless chrome hardware',
      'Japanese silk faille lining with encrypted micro-thread',
      'Architectural titanium structural spine'
    ],
    ownershipStatus: 'AUTHENTICATED — PRIVATE LEDGER VAULT'
  },
  'AR-02-0019-2026': {
    serialNumber: 'AR-02-0019-2026',
    objectName: 'OBJECT 002 — 11:59',
    category: 'TIME / SKELETONIZED CHRONOMETER',
    edition: 'EDITION I (#019 OF 100)',
    artisan: 'MASTER HOROLOGIST HENRI DELACROIX',
    atelierLocation: 'GENEVA HAUTE HORLOGERIE ATELIER',
    completionDate: 'NOVEMBER 04, 2026',
    nfcChipUid: '04:B5:11:89:FE:44:21',
    cryptographicHash: '0x3c7e9a2b5d8f104c8b6e3a9d2f5c7e1b4a8d0f3e',
    materialComposition: [
      'Grade 5 aerospace titanium monobloc chassis',
      'Ruthenium skeletonized automatic movement (28,800 vph)',
      'Double-arched sapphire crystal with dual AR coating',
      'Hand-stitched Louisiana alligator strap'
    ],
    ownershipStatus: 'AUTHENTICATED — VAULT ALLOCATION'
  },
  'AR-03-0142-2026': {
    serialNumber: 'AR-03-0142-2026',
    objectName: 'OBJECT 003 — BLIND',
    category: 'VISION / TITANIUM OPTICS',
    edition: 'EDITION I (#142 OF 300)',
    artisan: 'TAKUMI MASTER KENJI TAKAHASHI',
    atelierLocation: 'SABAE PRECISION OPTICS (FUKUI, JAPAN)',
    completionDate: 'NOVEMBER 12, 2026',
    nfcChipUid: '04:88:9C:22:D0:A5:77',
    cryptographicHash: '0x1a4f8c2e7b9d035e6a8c1f4b9e2d7a3c5f8b0e4d',
    materialComposition: [
      'Japanese beta-titanium monobloc frame (14 grams)',
      'Custom photochromic Carl Zeiss glass lenses',
      'Patented 7-barrel screwless titanium hinge',
      'Micro-laser engraved serial authentication'
    ],
    ownershipStatus: 'AUTHENTICATED — ACTIVE DISPATCH'
  },
  'AR-04-0289-2026': {
    serialNumber: 'AR-04-0289-2026',
    objectName: 'OBJECT 004 — OBSIDIAN SPICE',
    category: 'SCENT / EXTRAIT DE PARFUM',
    edition: 'EDITION I (#289 OF 500)',
    artisan: 'MASTER PERFUMER AURELIE LAURENT',
    atelierLocation: 'GRASSE DISTILLATION ATELIER (FRANCE)',
    completionDate: 'DECEMBER 01, 2026',
    nfcChipUid: '04:FA:43:91:02:C6:18',
    cryptographicHash: '0x7e2b9d4f1a8c035b6e9a2d5f8c1b4e7a0d3f6b9c',
    materialComposition: [
      '32% concentration Extrait de Parfum',
      'Hand-blown French smoked flint glass',
      'Solid carved natural obsidian stone stopper',
      'Steeped in dark maceration tanks for 180 days'
    ],
    ownershipStatus: 'AUTHENTICATED — REGISTERED'
  }
};

export const HeritageProvenanceLedger: React.FC = () => {
  const { setCursorLabel } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('AR-01-0087-2026');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [record, setRecord] = useState<RegistryRecord | null>(SAMPLE_RECORDS['AR-01-0087-2026']);

  const handleSearch = (key?: string) => {
    const target = key || searchQuery.trim().toUpperCase();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setRecord(SAMPLE_RECORDS[target] || null);
    }, 700);
  };

  return (
    <section className="section-padding bg-[#080808] border-b border-white/10 relative overflow-hidden">
      <div className="container-editorial space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-neutral-300" />
              DIGITAL PROVENANCE &amp; SERIAL REGISTRY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              THE HERITAGE <span className="italic text-neutral-400">LEDGER</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-sm leading-relaxed">
            Every ALMOSTREAL object possesses an integrated encrypted NFC microchip and an irrevocable provenance certificate recorded in our European atelier registry.
          </p>
        </div>

        {/* Interactive Lookup Terminal */}
        <div className="bg-[#0c0c0c] border border-white/15 p-8 md:p-12 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ENTER SERIAL NUMBER (E.G. AR-01-0087-2026)"
                className="w-full bg-[#060606] border border-white/20 text-white font-mono text-xs md:text-sm pl-11 pr-4 py-4 uppercase tracking-[0.2em] focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              onMouseEnter={() => setCursorLabel('VERIFY')}
              onMouseLeave={() => setCursorLabel('')}
              className="btn-primary py-4 px-8 font-mono text-xs tracking-[0.25em] justify-center"
            >
              <span>{isScanning ? 'AUTHENTICATING NFC...' : 'VERIFY PROVENANCE'}</span>
            </button>
          </div>

          {/* Quick Query Keys */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="font-mono text-[0.65rem] text-neutral-500 tracking-widest uppercase mr-2">SAMPLE REGISTRY KEYS:</span>
            {Object.keys(SAMPLE_RECORDS).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSearchQuery(key);
                  handleSearch(key);
                }}
                className={`px-3 py-1 font-mono text-[0.65rem] tracking-wider border transition-colors ${
                  searchQuery === key
                    ? 'border-white bg-white/10 text-white'
                    : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Certificate of Authenticity Display */}
          {isScanning ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="font-mono text-xs tracking-[0.3em] text-neutral-400 uppercase animate-pulse">
                DECRYPTING ATELIER BLOCKCHAIN PROVENANCE...
              </p>
            </div>
          ) : record ? (
            <div className="border border-white/20 bg-[#070707] p-6 md:p-10 space-y-8 animate-emergent">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>OFFICIALLY AUTHENTICATED ATELIER RECORD</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-light">{record.objectName}</h3>
                  <p className="font-mono text-xs text-neutral-400 tracking-wider">{record.category} &nbsp;•&nbsp; {record.edition}</p>
                </div>

                <div className="text-left sm:text-right font-mono text-xs space-y-1">
                  <div className="text-neutral-500 text-[0.65rem] tracking-widest uppercase">NFC CHIP UID</div>
                  <div className="text-white font-bold tracking-wider">{record.nfcChipUid}</div>
                </div>
              </div>

              {/* Pedigree Spec Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs border-b border-white/10 pb-8">
                <div className="space-y-1">
                  <span className="text-[0.65rem] text-neutral-500 tracking-widest uppercase block">MASTER CRAFTSMAN</span>
                  <span className="text-white font-medium block">{record.artisan}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[0.65rem] text-neutral-500 tracking-widest uppercase block">ORIGIN WORKSHOP</span>
                  <span className="text-white font-medium block">{record.atelierLocation}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[0.65rem] text-neutral-500 tracking-widest uppercase block">DATE OF COMPLETION</span>
                  <span className="text-white font-medium block">{record.completionDate}</span>
                </div>
              </div>

              {/* Material Assay Breakdown */}
              <div className="space-y-3">
                <span className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase block">
                  ATELIER MATERIAL ASSAY &amp; ALLOY SPECS
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {record.materialComposition.map((mat, idx) => (
                    <div key={idx} className="p-3 bg-neutral-900/60 border border-white/10 font-mono text-xs text-neutral-300 flex items-start gap-2.5">
                      <span className="text-neutral-500">0{idx + 1}.</span>
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cryptographic Hash Bar */}
              <div className="bg-black border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[0.65rem] text-neutral-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>CRYPTOGRAPHIC CERTIFICATE HASH:</span>
                  <span className="text-neutral-200 font-mono tracking-wider">{record.cryptographicHash}</span>
                </div>
                <div className="text-emerald-400 uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  PERMANENT RECORD
                </div>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center font-mono text-xs text-neutral-400 space-y-2">
              <p>NO RECORD FOUND FOR SERIAL NUMBER "{searchQuery}".</p>
              <p className="text-neutral-500 text-[0.65rem]">PLEASE CHECK YOUR CERTIFICATE OR TRY ONE OF THE SAMPLE REGISTRY KEYS ABOVE.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
