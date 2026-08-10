import React from 'react';

const WHATSAPP_URL =
  'https://wa.me/918800233568?text=Hello%20AlmostReal%20Club%2C%20I%20would%20like%20to%20connect%20with%20the%20atelier.';

export const WhatsAppCTA: React.FC = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with AlmostReal Club on WhatsApp at +91 88002 33568"
    title="WhatsApp +91 88002 33568"
    className="group fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#25D366] text-white shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] md:bottom-7 md:right-7 md:h-16 md:w-16"
  >
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-7 w-7 fill-current md:h-8 md:w-8"
    >
      <path d="M16.04 3C8.86 3 3.03 8.77 3.03 15.9c0 2.28.6 4.5 1.72 6.46L3 28.76l6.58-1.72a13.07 13.07 0 0 0 6.45 1.68h.01c7.17 0 13-5.78 13-12.9C29.04 8.77 23.21 3 16.04 3Zm0 23.54h-.01a10.9 10.9 0 0 1-5.56-1.52l-.4-.24-3.9 1.02 1.04-3.77-.26-.4a10.66 10.66 0 0 1-1.67-5.73c0-5.92 4.83-10.72 10.77-10.72 5.94 0 10.76 4.8 10.76 10.72 0 5.91-4.83 10.64-10.77 10.64Zm5.9-8.02c-.32-.16-1.91-.94-2.21-1.04-.3-.11-.51-.16-.73.16-.21.32-.83 1.04-1.02 1.25-.19.22-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.6a9.72 9.72 0 0 1-1.8-2.22c-.2-.32-.02-.5.14-.66.15-.14.32-.37.49-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.74-1-2.39-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.4-.3.32-1.13 1.1-1.13 2.68 0 1.58 1.16 3.11 1.32 3.32.16.22 2.28 3.46 5.52 4.85.77.33 1.38.53 1.85.68.78.24 1.48.21 2.04.13.62-.09 1.91-.78 2.18-1.53.27-.75.27-1.39.19-1.53-.08-.13-.3-.21-.62-.37Z" />
    </svg>
    <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap border border-white/15 bg-[#080808]/95 px-3 py-2 font-mono text-[0.6rem] tracking-[0.16em] text-white shadow-xl backdrop-blur-sm group-hover:block md:block md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
      WHATSAPP CONCIERGE
    </span>
  </a>
);
