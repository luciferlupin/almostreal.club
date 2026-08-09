import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, QrCode, ArrowRight } from 'lucide-react';
import { ObjectPassportModal } from '../components/ObjectPassportModal';

export const ClubPage: React.FC = () => {
  const { 
    currentMember, 
    objects, 
    passports, 
    savedObjectIds, 
    orders, 
    setSelectedObjectId, 
    setCurrentRoute,
    setActivePassportModal,
    activePassportModal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'my-objects' | 'passports' | 'saved' | 'orders'>('my-objects');

  const member = currentMember || {
    id: 'mem-001',
    memberId: 'MEMBER 00481',
    name: 'Julian Vance',
    email: 'j.vance@almostreal.club',
    accessLevel: 'ACCESS 02',
    memberSince: '2026',
    ownedObjects: ['AR-01-0087', 'AR-02-0019'],
    savedObjects: ['obj-003', 'obj-004']
  };

  const savedObjects = objects.filter((o) => savedObjectIds.includes(o.id));

  return (
    <div className="bg-[#080808] text-[#F2F0EA] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="container-editorial space-y-16">
        <div className="space-y-4 border-b border-white/10 pb-8">
          <p className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">
            PRIVATE MEMBERSHIP REALM
          </p>
          <h1 className="font-serif text-5xl md:text-8xl font-light text-white tracking-tight">
            CLUB ACCESS
          </h1>
          <p className="font-serif text-xl italic text-neutral-400 max-w-xl">
            OWN AN OBJECT. ENTER THE CLUB.
          </p>
        </div>

        <div className="bg-[#0c0c0c] border border-white/20 p-8 md:p-12 grid grid-cols-1 md:grid-cols-4 gap-8 font-mono text-xs text-neutral-300">
          <div className="space-y-1 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
            <span className="text-neutral-500 text-[0.65rem] block uppercase">MEMBER IDENTITY</span>
            <span className="text-white text-lg font-bold font-mono">{member.memberId}</span>
            <span className="text-neutral-400 block">{member.name}</span>
          </div>

          <div className="space-y-1 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
            <span className="text-neutral-500 text-[0.65rem] block uppercase">ACCESS LEVEL</span>
            <span className="text-emerald-400 text-lg font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> {member.accessLevel}
            </span>
            <span className="text-neutral-400 block">ESTABLISHED COLLECTOR</span>
          </div>

          <div className="space-y-1 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
            <span className="text-neutral-500 text-[0.65rem] block uppercase">MEMBER SINCE</span>
            <span className="text-white text-lg font-bold">{member.memberSince}</span>
            <span className="text-neutral-400 block">VERIFIED ATELIER</span>
          </div>

          <div className="space-y-1">
            <span className="text-neutral-500 text-[0.65rem] block uppercase">COLLECTION STATS</span>
            <div className="flex gap-4 text-white font-bold">
              <span>OWNED: 0{member.ownedObjects.length}</span>
              <span>SAVED: 0{savedObjectIds.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="bg-neutral-900/60 border border-white/10 p-6 space-y-3">
            <div className="flex justify-between items-center text-white">
              <span className="font-bold">ACCESS 01</span>
              <span className="text-emerald-400">ACTIVE</span>
            </div>
            <p className="text-neutral-400 text-[0.7rem] leading-relaxed">
              Available after first qualifying purchase. Unlocks digital object passports and public releases.
            </p>
          </div>

          <div className="bg-neutral-900/60 border border-white/20 p-6 space-y-3">
            <div className="flex justify-between items-center text-white">
              <span className="font-bold">ACCESS 02</span>
              <span className="text-emerald-400">YOUR TIER</span>
            </div>
            <p className="text-neutral-400 text-[0.7rem] leading-relaxed">
              For established collectors. Unlocks priority allocation, early release windows, and private drops.
            </p>
          </div>

          <div className="bg-neutral-950 border border-white/10 p-6 space-y-3 relative overflow-hidden">
            <div className="flex justify-between items-center text-amber-400">
              <span className="font-bold">ACCESS 03</span>
              <Lock className="w-4 h-4" />
            </div>
            <p className="text-amber-400/80 font-bold text-sm tracking-widest">
              YOU DON’T APPLY.
            </p>
            <p className="text-neutral-500 text-[0.7rem] leading-relaxed">
              Strictly invitation only by the Atelier Board. Private unique colorways and members-only objects.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 font-mono text-xs tracking-widest border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('my-objects')}
            className={`pb-2 px-4 transition-colors ${
              activeTab === 'my-objects' ? 'text-white border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            MY OBJECTS ({member.ownedObjects.length})
          </button>
          <button
            onClick={() => setActiveTab('passports')}
            className={`pb-2 px-4 transition-colors ${
              activeTab === 'passports' ? 'text-white border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            OBJECT PASSPORTS ({passports.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-2 px-4 transition-colors ${
              activeTab === 'saved' ? 'text-white border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            SAVED OBJECTS ({savedObjects.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2 px-4 transition-colors ${
              activeTab === 'orders' ? 'text-white border-b-2 border-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            ORDERS ({orders.length})
          </button>
        </div>

        {activeTab === 'my-objects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-emergent">
            {passports.map((pass) => (
              <div
                key={pass.passportId}
                className="bg-[#0c0c0c] border border-white/10 p-6 flex flex-col justify-between space-y-4 hover:border-white/30 transition-colors"
              >
                <div className="flex justify-between items-center font-mono text-xs text-neutral-400">
                  <span>{pass.passportId}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {pass.verificationStatus}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-black/40 border border-white/10 p-2 flex items-center justify-center">
                    <img src="/assets/carry_real.png" alt={pass.objectName} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[0.65rem] text-neutral-400 block">{pass.objectNumber} / {pass.edition}</span>
                    <h3 className="font-serif text-2xl text-white">{pass.objectName}</h3>
                    <span className="font-mono text-xs text-neutral-300 block">SERIAL: {pass.serialNumber}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActivePassportModal(pass)}
                  className="btn-outline w-full text-xs text-center justify-center py-3"
                >
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>VIEW DIGITAL PASSPORT</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'passports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-emergent">
            {passports.map((pass) => (
              <div
                key={pass.passportId}
                onClick={() => setActivePassportModal(pass)}
                className="bg-[#0c0c0c] border border-white/10 p-6 space-y-4 cursor-pointer hover:border-white/40 transition-colors"
              >
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-white font-bold">{pass.passportId}</span>
                  <span className="text-emerald-400">{pass.verificationStatus}</span>
                </div>
                <h3 className="font-serif text-2xl text-white">{pass.objectName}</h3>
                <p className="font-mono text-xs text-neutral-400">SERIAL NO: {pass.serialNumber}</p>
                <span className="font-mono text-[0.65rem] text-neutral-400 block underline">OPEN FULL PASSPORT →</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-emergent">
            {savedObjects.length === 0 ? (
              <p className="font-mono text-xs text-neutral-500">NO SAVED OBJECTS.</p>
            ) : (
              savedObjects.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => {
                    setSelectedObjectId(obj.id);
                    setCurrentRoute('product-detail');
                  }}
                  className="bg-[#0c0c0c] border border-white/10 p-6 flex items-center justify-between cursor-pointer hover:border-white/30"
                >
                  <div className="flex items-center gap-4">
                    <img src={obj.heroImageReal} alt={obj.name} className="w-16 h-16 object-contain" />
                    <div>
                      <span className="font-mono text-[0.65rem] text-neutral-400 block">{obj.objectNumber}</span>
                      <h4 className="font-serif text-xl text-white">{obj.name}</h4>
                      <span className="font-mono text-xs text-neutral-300">{obj.priceFormatted}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-400" />
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6 font-mono text-xs animate-emergent">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-[#0c0c0c] border border-white/10 p-6 space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-3 text-neutral-400">
                  <span>ORDER #{ord.orderNumber}</span>
                  <span className="text-emerald-400 font-bold">{ord.status}</span>
                </div>
                <div className="space-y-2 text-white">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span>{item.object.name} x {item.quantity}</span>
                      <span>{item.object.priceFormatted}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-neutral-300">
                  <span>SHIPPING TO: {ord.shippingAddress.city}, {ord.shippingAddress.country}</span>
                  <span className="text-white font-bold">TOTAL: ₹{ord.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activePassportModal && (
        <ObjectPassportModal
          passport={activePassportModal}
          onClose={() => setActivePassportModal(null)}
        />
      )}
    </div>
  );
};
