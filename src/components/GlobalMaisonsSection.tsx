import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Calendar, Clock, Sparkles, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface Maison {
  id: string;
  city: string;
  country: string;
  address: string;
  features: string[];
  hours: string;
  conciergeEmail: string;
}

const MAISONS: Maison[] = [
  {
    id: 'paris',
    city: 'PARIS',
    country: 'FRANCE',
    address: '14 Place Vendôme, 75001 Paris',
    features: ['Private Atelier Vault', 'Sur-Mesure Fitting Salon', 'Permanent Horology Archives'],
    hours: 'TUESDAY – SATURDAY / BY PRIVATE APPOINTMENT ONLY',
    conciergeEmail: 'paris.maison@almostreal.club'
  },
  {
    id: 'london',
    city: 'LONDON',
    country: 'UNITED KINGDOM',
    address: '17 New Bond Street, Mayfair, London W1S 2RB',
    features: ['Bespoke Leather Suite', 'Private Viewing Lounge', 'Vault Courier Dispatch'],
    hours: 'MONDAY – SATURDAY / 10:00 – 19:00 (PRIVATE BOOKING)',
    conciergeEmail: 'london.maison@almostreal.club'
  },
  {
    id: 'tokyo',
    city: 'TOKYO',
    country: 'JAPAN',
    address: '5-7-22 Minami-Aoyama, Minato-ku, Tokyo 107-0062',
    features: ['Japanese Titanium Optics Lab', 'Zen Obsidian Tea Salon', 'Edition 001 Reserve'],
    hours: 'DAILY / 11:00 – 20:00 (BY APPOINTMENT)',
    conciergeEmail: 'tokyo.maison@almostreal.club'
  },
  {
    id: 'newyork',
    city: 'NEW YORK',
    country: 'UNITED STATES',
    address: '712 Fifth Avenue, New York, NY 10019',
    features: ['High Jewelry & Timepiece Vault', 'Private Stylist Chambers', 'Champagne Bar'],
    hours: 'TUESDAY – SUNDAY / PRIVATE SALON BOOKINGS',
    conciergeEmail: 'ny.maison@almostreal.club'
  },
  {
    id: 'mumbai',
    city: 'MUMBAI',
    country: 'INDIA',
    address: 'Altamount Road, Cumballa Hill, Mumbai 400026',
    features: ['Atelier Special Orders', 'Private Private Room Chamber', 'Direct Vault Delivery'],
    hours: 'BY INVITATION ONLY / PRIVATE ACCESS 02+',
    conciergeEmail: 'mumbai.maison@almostreal.club'
  }
];

export const GlobalMaisonsSection: React.FC = () => {
  const { setCursorLabel } = useApp();
  const [selectedMaison, setSelectedMaison] = useState<Maison>(MAISONS[0]);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [bookingDate, setBookingDate] = useState<string>('2026-10-18');
  const [bookingTime, setBookingTime] = useState<string>('15:00');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setShowBookingModal(false);
    }, 3000);
  };

  return (
    <section className="section-padding bg-[#080808] border-b border-white/10 relative overflow-hidden">
      <div className="container-editorial space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-neutral-300" />
              GLOBAL MAISONS &amp; PRIVATE SALONS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              THE PHYSICAL <span className="italic text-neutral-400">MAISONS</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-sm leading-relaxed">
            Experience ALMOSTREAL in our private sanctuaries in Paris, London, Tokyo, New York, and Mumbai. Reserved exclusively for private appointments and custom atelier fittings.
          </p>
        </div>

        {/* Maisons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: City Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {MAISONS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMaison(m)}
                className={`w-full p-6 border text-left transition-all flex items-center justify-between group ${
                  selectedMaison.id === m.id
                    ? 'border-white bg-[#121212] text-white shadow-xl'
                    : 'border-white/10 bg-[#0c0c0c] text-neutral-400 hover:border-white/30 hover:text-white'
                }`}
              >
                <div>
                  <span className="font-mono text-[0.6rem] text-neutral-500 tracking-widest uppercase block">
                    {m.country}
                  </span>
                  <h3 className="font-serif text-2xl font-light text-white group-hover:translate-x-1 transition-transform">
                    {m.city}
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 group-hover:text-white transition-colors">
                  <span className="hidden sm:inline">VIEW SALON</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Active Maison Card & Appointment CTA */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/15 p-8 md:p-12 space-y-8 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
              <div>
                <span className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase block">
                  FLAGSHIP SALON / {selectedMaison.country}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-white font-light mt-1">
                  MAISON {selectedMaison.city}
                </h3>
              </div>
              <span className="font-mono text-[0.65rem] text-emerald-400 px-3 py-1 bg-emerald-950/40 border border-emerald-500/30 uppercase tracking-widest self-start">
                PRIVATE ACCESS ACTIVE
              </span>
            </div>

            {/* Address & Hours */}
            <div className="space-y-4 font-mono text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                <span>{selectedMaison.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400">{selectedMaison.hours}</span>
              </div>
            </div>

            {/* Amenities / Features */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="font-mono text-[0.65rem] text-neutral-400 tracking-widest uppercase block">
                SALON AMENITIES &amp; VAULT SERVICES:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedMaison.features.map((f, i) => (
                  <div key={i} className="p-3 bg-black/60 border border-white/10 font-mono text-[0.7rem] text-neutral-300 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setShowBookingModal(true)}
                onMouseEnter={() => setCursorLabel('BOOK')}
                onMouseLeave={() => setCursorLabel('')}
                className="btn-primary py-4 px-8 font-mono text-xs tracking-[0.25em] justify-center flex-1"
              >
                <span>REQUEST PRIVATE SALON APPOINTMENT</span>
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-emergent">
          <div className="relative w-full max-w-lg bg-[#0c0c0c] border border-white/20 p-8 md:p-10 text-[#F2F0EA]">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase block">
                  PRIVATE SALON CONCIERGE
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-white mt-1">
                  BOOK MAISON {selectedMaison.city}
                </h3>
              </div>

              {!isBooked ? (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[0.65rem] text-neutral-400 tracking-wider uppercase block">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Alexander von Stein"
                      className="w-full bg-[#060606] border border-white/20 text-white font-mono text-xs p-3 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[0.65rem] text-neutral-400 tracking-wider uppercase block">CLIENT EMAIL</label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="alexander@domain.com"
                      className="w-full bg-[#060606] border border-white/20 text-white font-mono text-xs p-3 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[0.65rem] text-neutral-400 tracking-wider uppercase block">PREFERRED DATE</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-[#060606] border border-white/20 text-white font-mono text-xs p-3 focus:outline-none focus:border-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[0.65rem] text-neutral-400 tracking-wider uppercase block">TIME</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-[#060606] border border-white/20 text-white font-mono text-xs p-3 focus:outline-none focus:border-white"
                      >
                        <option value="11:00">11:00 AM (MORNING TEA)</option>
                        <option value="14:00">02:00 PM (ATELIER FITTING)</option>
                        <option value="17:00">05:00 PM (CHAMPAGNE SALON)</option>
                        <option value="19:00">07:00 PM (VAULT PRIVATE ACCESS)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-4 text-center justify-center font-mono text-xs tracking-[0.25em] font-bold mt-4"
                  >
                    CONFIRM SALON RESERVATION
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4 animate-emergent">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl text-white">RESERVATION CONFIRMED</h4>
                  <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                    Maison {selectedMaison.city} has reserved your private chamber for {bookingDate} at {bookingTime}. Your personal atelier host will contact you shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
