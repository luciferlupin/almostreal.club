import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, ArrowRight } from 'lucide-react';

export const BagDrawer: React.FC = () => {
  const { 
    bag, 
    isBagOpen, 
    setIsBagOpen, 
    removeFromBag, 
    updateBagQuantity, 
    setCurrentRoute,
    setCursorLabel
  } = useApp();

  if (!isBagOpen) return null;

  const subtotal = bag.reduce((acc, item) => acc + item.object.price * item.quantity, 0);
  const subtotalFormatted = `₹${subtotal.toLocaleString('en-IN')}`;

  const handleAcquire = () => {
    setIsBagOpen(false);
    setCurrentRoute('checkout');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/80 backdrop-blur-md animate-emergent">
      <div className="w-full max-w-md bg-[#080808] border-l border-white/10 h-full flex flex-col justify-between p-6 md:p-8 text-[#F2F0EA]">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h2 className="font-serif text-2xl font-light tracking-wide">YOUR BAG</h2>
            <p className="font-mono text-[0.65rem] text-neutral-400 tracking-[0.2em] uppercase mt-1">
              RESERVED OBJECTS ({bag.reduce((a, b) => a + b.quantity, 0)})
            </p>
          </div>
          <button
            onClick={() => setIsBagOpen(false)}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {bag.length === 0 ? (
            <div className="text-center py-20 font-mono text-xs text-neutral-500 tracking-widest space-y-4">
              <p>YOUR BAG IS CURRENTLY EMPTY.</p>
              <button
                onClick={() => {
                  setIsBagOpen(false);
                  setCurrentRoute('objects');
                }}
                className="btn-outline text-xs"
              >
                EXPLORE OBJECTS
              </button>
            </div>
          ) : (
            bag.map((item) => (
              <div
                key={item.object.id}
                className="flex items-center gap-4 pb-6 border-b border-white/10"
              >
                <img
                  src={item.object.heroImageReal}
                  alt={item.object.name}
                  className="w-20 h-20 object-contain bg-neutral-900/60 p-2 border border-white/10"
                />

                <div className="flex-1 space-y-1">
                  <span className="font-mono text-[0.65rem] text-neutral-400 tracking-widest block">
                    {item.object.objectNumber}
                  </span>
                  <h3 className="font-serif text-lg text-white font-light">
                    {item.object.name}
                  </h3>
                  <span className="font-mono text-xs text-neutral-300 block">
                    {item.object.priceFormatted}
                  </span>

                  <div className="flex items-center gap-3 pt-2 font-mono text-xs">
                    <button
                      onClick={() => updateBagQuantity(item.object.id, -1)}
                      className="px-2 py-0.5 border border-white/20 text-neutral-400 hover:text-white"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateBagQuantity(item.object.id, 1)}
                      className="px-2 py-0.5 border border-white/20 text-neutral-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromBag(item.object.id)}
                  className="text-neutral-500 hover:text-red-400 transition-colors p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Acquisition Subtotal & CTA */}
        {bag.length > 0 && (
          <div className="border-t border-white/10 pt-6 space-y-4 font-mono text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>SUBTOTAL</span>
              <span className="text-white text-base font-bold">{subtotalFormatted}</span>
            </div>
            <p className="text-[0.65rem] text-neutral-500 tracking-wider">
              COMPLIMENTARY SECURE INSURED WORLDWIDE EXPRESS SHIPPING
            </p>

            <button
              onClick={handleAcquire}
              onMouseEnter={() => setCursorLabel('ACQUIRE')}
              onMouseLeave={() => setCursorLabel('')}
              className="btn-primary w-full py-4 text-center justify-center tracking-[0.25em]"
            >
              <span>ACQUIRE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsBagOpen(false)}
              className="w-full text-center text-[0.7rem] text-neutral-400 hover:text-white tracking-widest py-2"
            >
              CONTINUE EXPLORING
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
