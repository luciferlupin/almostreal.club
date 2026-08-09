import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CheckCircle2, ArrowRight, QrCode } from 'lucide-react';
import type { Order } from '../types';
import { ObjectPassportModal } from '../components/ObjectPassportModal';

export const CheckoutPage: React.FC = () => {
  const { bag, placeOrder, setCurrentRoute, setActivePassportModal, activePassportModal } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'Julian Vance',
    addressLine: '14 Mayfair Park Gate',
    city: 'London',
    country: 'United Kingdom',
    postalCode: 'W1K 7AA'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '•••• •••• •••• 8841',
    expiry: '08/28',
    cvv: '•••'
  });

  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const subtotal = bag.reduce((acc, item) => acc + item.object.price * item.quantity, 0);

  const handleProceedToDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleCompleteAcquisition = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder(shippingInfo);
    setCompletedOrder(order);
    setStep(4);
  };

  return (
    <div className="bg-[#080808] text-[#F2F0EA] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="container-editorial max-w-4xl mx-auto space-y-12">
        <div className="flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <span className="font-serif text-2xl tracking-widest text-white">ALMOSTREAL®</span>
            <p className="font-mono text-[0.65rem] text-neutral-400 tracking-[0.25em] uppercase mt-1">
              ACQUISITION CHECKOUT & CLUB REGISTRATION
            </p>
          </div>
          <div className="font-mono text-xs text-neutral-400">
            STEP 0{step} / 04
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 font-mono text-[0.65rem] tracking-widest text-center">
          <div className={`py-2 border-b-2 ${step >= 1 ? 'border-white text-white' : 'border-neutral-800 text-neutral-600'}`}>
            01 / INFORMATION
          </div>
          <div className={`py-2 border-b-2 ${step >= 2 ? 'border-white text-white' : 'border-neutral-800 text-neutral-600'}`}>
            02 / DELIVERY
          </div>
          <div className={`py-2 border-b-2 ${step >= 3 ? 'border-white text-white' : 'border-neutral-800 text-neutral-600'}`}>
            03 / PAYMENT
          </div>
          <div className={`py-2 border-b-2 ${step === 4 ? 'border-emerald-400 text-emerald-400 font-bold' : 'border-neutral-800 text-neutral-600'}`}>
            04 / ACQUIRED
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleProceedToDelivery} className="bg-[#0c0c0c] border border-white/10 p-8 space-y-6 font-mono text-xs animate-emergent">
            <h3 className="font-serif text-2xl text-white font-light border-b border-white/10 pb-4">
              01 INFORMATION & CLUB ACCESS
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-neutral-400 block mb-2">FULL NAME</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/20 p-3 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-2">COUNTRY / REGION</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.country}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/20 p-3 text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-neutral-400">SUBTOTAL: ₹{subtotal.toLocaleString('en-IN')}</span>
              <button type="submit" className="btn-primary">
                <span>PROCEED TO DELIVERY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleProceedToPayment} className="bg-[#0c0c0c] border border-white/10 p-8 space-y-6 font-mono text-xs animate-emergent">
            <h3 className="font-serif text-2xl text-white font-light border-b border-white/10 pb-4">
              02 SECURE LOGISTICS & DELIVERY
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-neutral-400 block mb-2">STREET ADDRESS</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.addressLine}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, addressLine: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/20 p-3 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-400 block mb-2">CITY</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/20 p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-2">POSTAL CODE</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/20 p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <button type="button" onClick={() => setStep(1)} className="text-neutral-400 hover:text-white">← BACK</button>
              <button type="submit" className="btn-primary">
                <span>PROCEED TO PAYMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleCompleteAcquisition} className="bg-[#0c0c0c] border border-white/10 p-8 space-y-6 font-mono text-xs animate-emergent">
            <h3 className="font-serif text-2xl text-white font-light border-b border-white/10 pb-4">
              03 SECURE ENCRYPTED PAYMENT
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-neutral-400 block mb-2">CARD NUMBER</label>
                <input
                  type="text"
                  required
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/20 p-3 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-400 block mb-2">EXPIRY (MM/YY)</label>
                  <input
                    type="text"
                    required
                    value={paymentInfo.expiry}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/20 p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-2">SECURITY CODE (CVV)</label>
                  <input
                    type="password"
                    required
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/20 p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <button type="button" onClick={() => setStep(2)} className="text-neutral-400 hover:text-white">← BACK</button>
              <button type="submit" className="btn-primary bg-emerald-400 text-black border-emerald-400 hover:bg-emerald-300">
                <span>AUTHORIZE ACQUISITION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 4 && completedOrder && (
          <div className="bg-[#0c0c0c] border border-emerald-500/30 p-8 md:p-12 space-y-8 text-center animate-emergent">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />

            <div className="space-y-2">
              <span className="font-mono text-xs text-emerald-400 tracking-[0.3em] uppercase">
                ACQUISITION CONFIRMED / ORDER #{completedOrder.orderNumber}
              </span>
              <h2 className="font-serif text-5xl md:text-7xl font-light text-white">
                IT’S YOURS.
              </h2>
              <p className="font-serif text-xl italic text-neutral-300">
                WELCOME TO THE CLUB.
              </p>
            </div>

            {completedOrder.passportsIssued.length > 0 && (
              <div className="bg-neutral-900/80 border border-white/10 p-6 space-y-4 max-w-lg mx-auto text-left font-mono text-xs">
                <div className="flex justify-between items-center text-white">
                  <span className="font-bold">DIGITAL PASSPORT GENERATED</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="space-y-1 text-neutral-300">
                  <div>PASSPORT ID: <span className="text-white">{completedOrder.passportsIssued[0].passportId}</span></div>
                  <div>OBJECT: <span className="text-white">{completedOrder.passportsIssued[0].objectName}</span></div>
                  <div>SERIAL NUMBER: <span className="text-white">{completedOrder.passportsIssued[0].serialNumber}</span></div>
                </div>

                <button
                  onClick={() => setActivePassportModal(completedOrder.passportsIssued[0])}
                  className="btn-outline w-full py-3 text-center justify-center"
                >
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>VIEW MY NEW PASSPORT</span>
                </button>
              </div>
            )}

            <div className="pt-6 flex justify-center gap-4 font-mono text-xs">
              <button onClick={() => setCurrentRoute('club')} className="btn-primary">
                ENTER CLUB DASHBOARD →
              </button>
            </div>
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
