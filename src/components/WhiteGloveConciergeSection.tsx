import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Truck, Key, PhoneCall, Check, Send, Sparkles } from 'lucide-react';

export const WhiteGloveConciergeSection: React.FC = () => {
  const { setCursorLabel } = useApp();
  const [clientInquiry, setClientInquiry] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [inquirySent, setInquirySent] = useState<boolean>(false);

  const SERVICES = [
    {
      title: 'ARMORED DIPLOMATIC COURIER',
      detail: 'Direct hand delivery to your residence or private aircraft in 140+ countries via insured diplomatic courier.',
      icon: Truck
    },
    {
      title: 'ENCRYPTED PASSPORT & NFC MINTING',
      detail: 'Every object is minted with a physical biometric NFC passport and cryptographically signed provenance key.',
      icon: Key
    },
    {
      title: 'CLIMATE-CONTROLLED VAULT CUSTODY',
      detail: 'Complimentary 12-month secure vault storage in our Geneva or Zurich private storage facilities.',
      icon: Shield
    },
    {
      title: '24/7 DEDICATED PRIVATE LIAISON',
      detail: 'Direct access to your dedicated personal atelier manager via encrypted private line and WhatsApp concierge.',
      icon: PhoneCall
    }
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setClientInquiry('');
      setClientContact('');
    }, 4000);
  };

  return (
    <section className="section-padding bg-[#0c0c0c] border-b border-white/10 relative overflow-hidden">
      <div className="container-editorial space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              CLIENT PRIVILEGES &amp; SECURE LOGISTICS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              WHITE GLOVE <span className="italic text-neutral-400">CONCIERGE</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-sm leading-relaxed">
            From the moment an object is sculpted in our atelier to its arrival in your private collection, experience seamless discretion and diplomatic-grade security.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#080808] border border-white/10 space-y-4 hover:border-white/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200">
                  <IconComponent className="w-5 h-5 stroke-1" />
                </div>
                <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                  {s.title}
                </h3>
                <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                  {s.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Private Concierge Inquiry Bar */}
        <div className="bg-[#070707] border border-white/15 p-8 md:p-10 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-[0.65rem] text-neutral-500 tracking-widest uppercase block">DIRECT ATELIER LIAISON</span>
              <h4 className="font-serif text-2xl text-white font-light mt-1">CONNECT WITH YOUR PERSONAL CONCIERGE</h4>
            </div>
            <div className="font-mono text-xs text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CONCIERGE DESK: ONLINE (24/7)</span>
            </div>
          </div>

          {!inquirySent ? (
            <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <input
                  type="text"
                  required
                  value={clientContact}
                  onChange={(e) => setClientContact(e.target.value)}
                  placeholder="YOUR EMAIL OR WHATSAPP NUMBER"
                  className="w-full bg-[#040404] border border-white/20 text-white font-mono text-xs p-4 focus:outline-none focus:border-white"
                />
              </div>
              <div className="md:col-span-6">
                <input
                  type="text"
                  required
                  value={clientInquiry}
                  onChange={(e) => setClientInquiry(e.target.value)}
                  placeholder="INQUIRY / SPECIAL REQUEST / PRIVATE VAULT DELIVERY"
                  className="w-full bg-[#040404] border border-white/20 text-white font-mono text-xs p-4 focus:outline-none focus:border-white"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  onMouseEnter={() => setCursorLabel('SEND')}
                  onMouseLeave={() => setCursorLabel('')}
                  className="btn-primary w-full py-4 text-center justify-center font-mono text-xs tracking-[0.2em] font-bold"
                >
                  <Send className="w-4 h-4 mr-1" />
                  <span>TRANSMIT</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs tracking-wider flex items-center gap-3 animate-emergent">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span>DISPATCH TRANSMITTED. YOUR PERSONAL ATELIER LIAISON IS REVIEWING YOUR REQUEST.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
