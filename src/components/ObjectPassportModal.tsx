import React, { useState } from 'react';
import type { Passport } from '../types';
import { X, ShieldCheck, QrCode, RefreshCw } from 'lucide-react';

interface ObjectPassportModalProps {
  passport: Passport;
  onClose: () => void;
}

export const ObjectPassportModal: React.FC<ObjectPassportModalProps> = ({ passport, onClose }) => {
  const [activeTab, setActiveTab] = useState<'passport' | 'care' | 'history'>('passport');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);

  const triggerVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifySuccess(true);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-emergent">
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/20 p-6 md:p-10 text-[#F2F0EA] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
          <div>
            <span className="font-serif text-xl tracking-widest text-white">ALMOSTREAL®</span>
            <p className="font-mono text-[0.65rem] text-neutral-400 tracking-[0.25em] uppercase mt-1">
              DIGITAL OBJECT PASSPORT & AUTHENTICITY CERTIFICATE
            </p>
          </div>
          <div className="text-right">
            <span className="font-mono text-sm text-white font-bold tracking-widest">
              {passport.passportId}
            </span>
          </div>
        </div>

        <div className="flex border-b border-white/10 font-mono text-xs tracking-widest mb-8">
          <button
            onClick={() => setActiveTab('passport')}
            className={`pb-3 px-4 transition-colors ${
              activeTab === 'passport' ? 'text-white border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            PASSPORT
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 px-4 transition-colors ${
              activeTab === 'care' ? 'text-white border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            CARE GUIDE
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-4 transition-colors ${
              activeTab === 'history' ? 'text-white border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            OWNERSHIP HISTORY
          </button>
        </div>

        {activeTab === 'passport' && (
          <div className="space-y-8 animate-emergent">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-mono text-xs tracking-wider bg-neutral-900/60 p-6 border border-white/10">
              <div>
                <span className="text-neutral-500 text-[0.65rem] block">OBJECT NAME</span>
                <span className="text-white font-serif text-lg">{passport.objectName}</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[0.65rem] block">CATEGORY</span>
                <span className="text-white">{passport.category}</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[0.65rem] block">EDITION</span>
                <span className="text-white">{passport.edition}</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[0.65rem] block">SERIAL NUMBER</span>
                <span className="text-white font-bold">{passport.serialNumber}</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[0.65rem] block">AUTHENTICITY</span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
                </span>
              </div>
              <div>
                <span className="text-neutral-500 text-[0.65rem] block">REGISTERED OWNER</span>
                <span className="text-white">{passport.ownerId}</span>
              </div>
            </div>

            <div className="border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-black/40">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 border border-white/10 text-white">
                  <QrCode className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-xs text-white">ENCRYPTED NFC PHYSICAL CHIP</p>
                  <p className="font-mono text-[0.65rem] text-neutral-400">
                    TAP MOBILE DEVICE TO PHYSICAL HARDWARE TO VERIFY ON CHAIN
                  </p>
                </div>
              </div>

              <button
                onClick={triggerVerification}
                disabled={isVerifying}
                className="btn-outline text-xs whitespace-nowrap"
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> VERIFYING CHIP...
                  </span>
                ) : verifySuccess ? (
                  <span className="text-emerald-400 font-bold">✓ CHIP VERIFIED</span>
                ) : (
                  'SIMULATE CHIP SCAN'
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="space-y-6 animate-emergent font-mono text-xs tracking-wider">
            <h4 className="font-serif text-xl text-white">ATELIER PRESERVATION PROTOCOLS</h4>
            <ul className="space-y-3 pl-4 border-l border-white/20">
              {passport.careInstructions.map((instruction, idx) => (
                <li key={idx} className="text-neutral-300">
                  <span className="text-neutral-500 mr-2">0{idx + 1}.</span>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6 animate-emergent font-mono text-xs tracking-wider">
            <h4 className="font-serif text-xl text-white">CHAIN OF CUSTODY LOG</h4>
            <div className="space-y-4">
              {passport.ownershipHistory.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <span className="text-white block font-bold">{item.owner}</span>
                    <span className="text-neutral-500 text-[0.65rem]">{item.action}</span>
                  </div>
                  <span className="text-neutral-400">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
