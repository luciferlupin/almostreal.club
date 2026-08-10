import React from 'react';
import { RefreshCw, Feather, Cpu, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const RestorationPactSection: React.FC = () => {
  const PILLARS = [
    {
      number: '01',
      title: 'LIFETIME LEATHER SPA',
      description: 'French Box Calfskin & pebbled leathers receive complimentary bi-annual re-nourishment with natural beeswax balm and saddle stitch re-tensioning in our Paris atelier.',
      icon: Feather
    },
    {
      number: '02',
      title: 'TITANIUM & CHROME RE-POLISH',
      description: '316L mirror chrome and Grade 5 titanium hardware are polished to sub-micron optical tolerances to eliminate minor surface patinas and restore mirror sheen.',
      icon: Cpu
    },
    {
      number: '03',
      title: 'HOROLOGY 5-YEAR OVERHAUL',
      description: '11:59 and TOURBILLON timepieces receive complete disassembly, ultrasonic jewel cleaning, synthetic lubrication, and timing recalibration every 5 years.',
      icon: RefreshCw
    },
    {
      number: '04',
      title: 'ARCHIVAL BUYBACK INDEX',
      description: 'ALMOSTREAL guarantees minimum 85% archival re-acquisition valuation on all registered Edition 001 objects via our Private Room exchange.',
      icon: Award
    }
  ];

  return (
    <section className="section-padding bg-[#0a0a0a] border-b border-white/10 relative overflow-hidden">
      <div className="container-editorial space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase block">
            THE 100-YEAR LONGEVITY MANIFESTO
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
            CRAFTED NEVER TO BE <br />
            <span className="italic text-neutral-400">DISCARDED.</span>
          </h2>
          <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed">
            In the enduring philosophy of true luxury, an object is not consumed — it is safeguarded across generations. Every ALMOSTREAL object is supported by our lifetime atelier care pact.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p) => {
            const IconComp = p.icon;
            return (
              <motion.div
                key={p.number}
                whileHover={{ y: -6 }}
                className="bg-[#060606] border border-white/10 p-8 flex flex-col justify-between space-y-8 hover:border-white/40 transition-colors shadow-lg"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                    <span>CHAPTER {p.number}</span>
                    <IconComp className="w-5 h-5 text-neutral-300 stroke-1" />
                  </div>
                  <h3 className="font-serif text-2xl text-white font-light">{p.title}</h3>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2 font-mono text-[0.65rem] text-neutral-500 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>GUARANTEED BY ATELIER PACT</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
