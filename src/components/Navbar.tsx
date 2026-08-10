import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, Search, ShoppingBag, Lock } from 'lucide-react';
import type { Category } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentRoute, 
    setCurrentRoute, 
    bag, 
    setIsBagOpen, 
    setIsSearchOpen, 
    setCursorLabel,
    isAdmin
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalBagItems = bag.reduce((acc, item) => acc + item.quantity, 0);

  const handleCategoryClick = (_cat: Category) => {
    setCurrentRoute('objects');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container-editorial flex items-center justify-between">
          <button
            onClick={() => setCurrentRoute('home')}
            onMouseEnter={() => setCursorLabel('HOME')}
            onMouseLeave={() => setCursorLabel('')}
            className="text-left group"
          >
            <span className="font-serif text-xl md:text-2xl tracking-widest text-[#F2F0EA] group-hover:text-white transition-colors">
              ALMOSTREAL®
            </span>
          </button>

          <nav className="hidden md:flex items-center space-x-10 text-xs font-mono tracking-[0.2em] text-[#F2F0EA]/80">
            <button
              onClick={() => setCurrentRoute('new-reality')}
              className={`hover:text-white transition-colors ${currentRoute === 'new-reality' ? 'text-white border-b border-white pb-0.5' : ''}`}
            >
              NEW REALITY
            </button>
            <button
              onClick={() => setCurrentRoute('objects')}
              className={`hover:text-white transition-colors ${currentRoute === 'objects' ? 'text-white border-b border-white pb-0.5' : ''}`}
            >
              OBJECTS
            </button>
            <button
              onClick={() => setCurrentRoute('gallery')}
              className={`hover:text-white transition-colors ${currentRoute === 'gallery' ? 'text-white border-b border-white pb-0.5' : ''}`}
            >
              GALLERY
            </button>
            <button
              onClick={() => setCurrentRoute('campaign')}
              className={`hover:text-white transition-colors ${currentRoute === 'campaign' ? 'text-white border-b border-white pb-0.5' : ''}`}
            >
              EDITIONS
            </button>
            <button
              onClick={() => setCurrentRoute('archive')}
              className={`hover:text-white transition-colors ${currentRoute === 'archive' ? 'text-white border-b border-white pb-0.5' : ''}`}
            >
              ARCHIVE
            </button>
            <button
              onClick={() => setCurrentRoute('club')}
              className={`hover:text-white transition-colors ${currentRoute === 'club' ? 'text-white border-b border-white pb-0.5' : ''}`}
            >
              CLUB
            </button>
          </nav>

          <div className="flex items-center space-x-6">


            <button
              onClick={() => setIsSearchOpen(true)}
              onMouseEnter={() => setCursorLabel('SEARCH')}
              onMouseLeave={() => setCursorLabel('')}
              className="p-1.5 text-neutral-300 hover:text-white transition-colors"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsBagOpen(true)}
              onMouseEnter={() => setCursorLabel('BAG')}
              onMouseLeave={() => setCursorLabel('')}
              className="font-mono text-xs tracking-widest text-[#F2F0EA] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>BAG ({totalBagItems})</span>
            </button>

            <button
              onClick={() => setCurrentRoute(currentRoute === 'admin' ? 'home' : 'admin')}
              title="CMS Admin Portal"
              className={`p-1.5 transition-colors ${isAdmin ? 'text-emerald-400' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <Lock className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 text-neutral-300 hover:text-white"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-between p-8 text-[#F2F0EA] animate-emergent">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
            <span className="font-serif text-xl tracking-widest">ALMOSTREAL®</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-neutral-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-6 my-auto font-mono text-sm tracking-[0.2em]">
            <button
              onClick={() => { setCurrentRoute('new-reality'); setMobileMenuOpen(false); }}
              className="text-left text-2xl font-serif font-light py-1 border-b border-neutral-900"
            >
              NEW REALITY
            </button>

            <div className="flex flex-col space-y-3 pl-2 py-2 border-l border-neutral-800">
              <button onClick={() => handleCategoryClick('CARRY')} className="text-left text-neutral-400 hover:text-white text-xs">
                01 / CARRY
              </button>
              <button onClick={() => handleCategoryClick('VISION')} className="text-left text-neutral-400 hover:text-white text-xs">
                02 / VISION
              </button>
              <button onClick={() => handleCategoryClick('TIME')} className="text-left text-neutral-400 hover:text-white text-xs">
                03 / TIME
              </button>
              <button onClick={() => handleCategoryClick('SCENT')} className="text-left text-neutral-400 hover:text-white text-xs">
                04 / SCENT
              </button>
            </div>

            <button
              onClick={() => { setCurrentRoute('objects'); setMobileMenuOpen(false); }}
              className="text-left text-xl font-serif py-1 border-b border-neutral-900"
            >
              OBJECTS
            </button>
            <button
              onClick={() => { setCurrentRoute('gallery'); setMobileMenuOpen(false); }}
              className="text-left text-xl font-serif py-1 border-b border-neutral-900"
            >
              PRODUCT GALLERY
            </button>
            <button
              onClick={() => { setCurrentRoute('campaign'); setMobileMenuOpen(false); }}
              className="text-left text-xl font-serif py-1 border-b border-neutral-900"
            >
              EDITIONS
            </button>
            <button
              onClick={() => { setCurrentRoute('archive'); setMobileMenuOpen(false); }}
              className="text-left text-xl font-serif py-1 border-b border-neutral-900"
            >
              ARCHIVE
            </button>
            <button
              onClick={() => { setCurrentRoute('club'); setMobileMenuOpen(false); }}
              className="text-left text-xl font-serif py-1 border-b border-neutral-900"
            >
              CLUB ACCESS
            </button>
            <button
              onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}
              className="text-left text-sm text-neutral-400 py-1"
            >
              SEARCH CATALOG
            </button>
          </div>

          <div className="border-t border-neutral-800 pt-6 flex justify-between items-center text-[0.65rem] font-mono text-neutral-500">
            <span>PRIVATE ACCESS</span>
            <span>EST. 2026</span>
          </div>
        </div>
      )}
    </>
  );
};
