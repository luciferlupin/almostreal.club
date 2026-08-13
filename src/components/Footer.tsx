import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentRoute, setCursorLabel } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#080808] text-[#F2F0EA] border-t border-white/10 pt-20 pb-12 px-6 md:px-12 relative overflow-hidden">
      <div className="container-editorial">
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10 items-end">
          <div className="lg:col-span-6 space-y-4">
            <p className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase">
              COMMUNICATION
            </p>
            <h2 className="font-serif text-2xl md:text-4xl font-light leading-tight">
              HEAR ABOUT THINGS <br />
              <span className="italic">BEFORE THEY BECOME REAL.</span>
            </h2>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleNewsletterSubmit} className="flex items-center border-b border-white/30 focus-within:border-white transition-colors pb-2">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent font-mono text-xs tracking-widest text-white placeholder-neutral-500 focus:outline-none uppercase"
              />
              <button
                type="submit"
                onMouseEnter={() => setCursorLabel('ENTER')}
                onMouseLeave={() => setCursorLabel('')}
                className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase hover:text-neutral-300 transition-colors pl-4"
              >
                {subscribed ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> RECORDED
                  </span>
                ) : (
                  <>
                    <span>ENTER</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 font-mono text-xs tracking-[0.2em] text-neutral-400">
          <div className="space-y-3">
            <p className="text-white text-[0.65rem] tracking-[0.3em] uppercase opacity-50 mb-4">DIRECTORY</p>
            <button onClick={() => setCurrentRoute('objects')} className="block hover:text-white transition-colors">OBJECTS</button>
            <button onClick={() => setCurrentRoute('gallery')} className="block hover:text-white transition-colors">GALLERY</button>
            <button onClick={() => setCurrentRoute('new-reality')} className="block hover:text-white transition-colors">NEW REALITY</button>
            <button onClick={() => setCurrentRoute('campaign')} className="block hover:text-white transition-colors">EDITIONS</button>
            <button onClick={() => setCurrentRoute('archive')} className="block hover:text-white transition-colors">ARCHIVE</button>
          </div>

          <div className="space-y-3">
            <p className="text-white text-[0.65rem] tracking-[0.3em] uppercase opacity-50 mb-4">CLUB</p>
            <button onClick={() => setCurrentRoute('club')} className="block hover:text-white transition-colors">CLUB ACCESS</button>
            <button onClick={() => setCurrentRoute('club')} className="block hover:text-white transition-colors">OBJECT PASSPORT</button>
            <button onClick={() => setCurrentRoute('club')} className="block hover:text-white transition-colors">PRIVATE RELEASES</button>
          </div>

          <div className="space-y-3">
            <p className="text-white text-[0.65rem] tracking-[0.3em] uppercase opacity-50 mb-4">CLIENT SERVICE</p>
            <a
              href="https://wa.me/918800233568?text=Hello%20AlmostReal%20Club%2C%20I%20would%20like%20to%20connect%20with%20the%20atelier."
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-white transition-colors"
              aria-label="Contact the atelier on WhatsApp at +91 88002 33568"
            >
              WHATSAPP: +91 88002 33568
            </a>
            <span className="block cursor-pointer hover:text-white transition-colors">SHIPPING & LOGISTICS</span>
            <span className="block cursor-pointer hover:text-white transition-colors">RETURNS POLICY</span>
            <span className="block cursor-pointer hover:text-white transition-colors">PRIVACY DISCLOSURE</span>
          </div>

          <div className="space-y-3">
            <p className="text-white text-[0.65rem] tracking-[0.3em] uppercase opacity-50 mb-4">CHANNELS</p>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="block hover:text-white transition-colors">INSTAGRAM</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="block hover:text-white transition-colors">X / TWITTER</a>
            <span className="block text-neutral-600">PARIS / TOKYO / NY</span>
          </div>
        </div>

        {/* Massive Logo Banner */}
        <div className="py-12 text-center border-t border-b border-white/5 overflow-hidden">
          <h1 className="font-serif text-[12vw] leading-none tracking-tighter text-neutral-900 select-none hover:text-neutral-800 transition-colors">
            ALMOSTREAL®
          </h1>
        </div>

        {/* Footer Bottom Bar with Secret Trigger */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between font-mono text-[0.65rem] tracking-[0.25em] text-neutral-500 gap-4">
          <div>
            <span>ALMOSTREAL CLUB® &nbsp; EST. 2026</span>
          </div>

          {/* Hidden Unexplained Symbol for Secret Room */}
          <div>
            <button
              onClick={() => setCurrentRoute('private-room')}
              onMouseEnter={() => setCursorLabel('???')}
              onMouseLeave={() => setCursorLabel('')}
              className="text-neutral-700 hover:text-neutral-300 transition-colors p-2 text-base"
              title="Unexplained Symbol"
            >
              ✦
            </button>
          </div>

          <div>
            <span>ALL RIGHTS RESERVED</span>
            <span className="text-neutral-700">•</span>
            <span>MADE BY <a href="https://www.curiouskaizer.com/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors underline underline-offset-4 decoration-neutral-800 hover:decoration-neutral-400" title="Curious Kaizer - Best Web Development Company in Delhi">CURIOUS KAIZER</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
