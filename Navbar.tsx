
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, User, Heart, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const MinimalLogo = ({ isDark }: { isDark: boolean }) => (
  <div className="flex items-center gap-2.5 md:gap-3 group cursor-pointer">
    <div className={`relative transition-all duration-500 group-hover:scale-110 ${isDark ? 'text-brand-dark' : 'text-white'}`}>
       <svg width="32" height="32" className="md:w-9 md:h-9" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 2L54 12V32C54 48 44 58 32 62C20 58 10 48 10 32V12L32 2Z" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2.5" />
          <path d="M26 20V44M26 20H38C42 20 44 22 44 26C44 30 42 32 38 32H26" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
          <path d="M34 32L44 44" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" className="text-brand-crimson" />
       </svg>
       <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-crimson rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
    <div className="flex flex-col">
      <span className={`font-heading font-black text-lg md:text-xl leading-none tracking-tighter transition-colors duration-300 ${isDark ? 'text-brand-dark' : 'text-white'}`}>
        PREMIUM<span className="text-brand-crimson">KITS</span>
      </span>
      <span className={`text-[7px] md:text-[8px] font-bold uppercase tracking-[0.4em] transition-opacity duration-300 ${isDark ? 'text-gray-400 opacity-100' : 'text-white/60 opacity-80'}`}>
        Authentic Gear
      </span>
    </div>
  </div>
);

export const Navbar = () => {
  const { navigateTo, cartCount, wishlist, currentPage, setCategory, activeCategory } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPage === 'home';
  const isTransparent = isHome && !scrolled && !isMobileMenuOpen;

  const navBgClass = isTransparent 
    ? 'bg-transparent border-transparent py-4 md:py-6' 
    : 'bg-white/90 backdrop-blur-xl shadow-sm border-gray-100 py-3 md:py-4';
  
  const textColorClass = isTransparent ? 'text-white' : 'text-brand-dark';
  const hoverBgClass = isTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100';

  const navLinks = [
    { label: 'Shop All', action: () => { setCategory('All'); navigateTo('shop'); }, active: currentPage === 'shop' && activeCategory === 'All' },
    { label: 'La Liga', action: () => { setCategory('La Liga'); navigateTo('shop'); }, active: activeCategory === 'La Liga' },
    { label: 'Premier League', action: () => { setCategory('Premier League'); navigateTo('shop'); }, active: activeCategory === 'Premier League' },
    { label: 'International', action: () => { setCategory('International'); navigateTo('shop'); }, active: activeCategory === 'International' },
  ];

  return (
    <>
      <div className={`fixed inset-0 z-[120] bg-white/98 backdrop-blur-3xl transition-all duration-500 flex flex-col items-center justify-center ${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="absolute top-6 right-6 md:top-8 md:right-8 p-3 hover:bg-gray-100 rounded-full transition-colors">
            <X size={28} className="text-brand-dark md:w-8 md:h-8" />
        </button>
        <div className="w-full max-w-2xl px-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">Search Collections</h2>
            <div className="relative group mb-8 md:mb-12">
                <input 
                    type="text" 
                    placeholder="Team, player, or league..." 
                    autoFocus={searchOpen}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-center text-3xl md:text-5xl font-heading font-bold text-brand-dark bg-transparent border-b-2 border-gray-100 py-4 md:py-6 focus:outline-none focus:border-brand-dark transition-all placeholder:text-gray-200"
                />
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {['Barcelona', 'Real Madrid', 'Inter Miami', '2025/26 Drop'].map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => { setSearchQuery(tag); }}
                      className="px-5 py-2 rounded-full bg-gray-50 border border-gray-100 text-xs md:text-sm font-medium text-gray-600 hover:bg-brand-dark hover:text-white transition-all"
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <header className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${navBgClass}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            
            <div onClick={() => navigateTo('home')} className="z-50 relative flex-shrink-0">
              <MinimalLogo isDark={!isTransparent} />
            </div>

            <nav className="hidden lg:flex items-center gap-10">
                {navLinks.map((link) => (
                    <button 
                        key={link.label}
                        onClick={link.action}
                        className={`relative group text-sm font-bold tracking-wide transition-colors duration-300 ${textColorClass} ${link.active ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                    >
                        {link.label}
                        <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-crimson transition-all duration-300 ${link.active ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}></span>
                    </button>
                ))}
            </nav>

            <div className={`flex items-center gap-0.5 md:gap-2 z-50 transition-colors duration-300 ${textColorClass}`}>
                <button 
                    onClick={() => setSearchOpen(true)}
                    className={`p-2.5 md:p-3 rounded-full transition-all duration-300 ${hoverBgClass}`}
                >
                    <Search size={20} strokeWidth={1.5} className="w-5 h-5 md:w-[20px] md:h-[20px]" />
                </button>
                
                <button 
                    onClick={() => navigateTo('wishlist')}
                    className={`hidden md:block p-3 rounded-full transition-all duration-300 relative ${hoverBgClass}`}
                >
                    <Heart size={20} strokeWidth={1.5} fill={wishlist.length > 0 ? "currentColor" : "none"} className={wishlist.length > 0 ? "text-brand-crimson" : ""} />
                </button>

                <button 
                    onClick={() => navigateTo('cart')}
                    className={`p-2.5 md:p-3 rounded-full transition-all duration-300 relative ${hoverBgClass}`}
                >
                    <ShoppingBag size={20} strokeWidth={1.5} className="w-5 h-5 md:w-[20px] md:h-[20px]" />
                    {cartCount > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-brand-crimson rounded-full ring-2 ring-white"></span>
                    )}
                </button>

                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className={`lg:hidden p-2.5 md:p-3 rounded-full transition-all duration-300 ${hoverBgClass}`}
                >
                    <Menu size={24} strokeWidth={1.5} className="w-6 h-6 md:w-[24px] md:h-[24px]" />
                </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[130] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-brand-dark/40 backdrop-blur-md transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-50">
                    <span className="font-heading font-black text-2xl text-brand-dark tracking-tighter">EXPLORE</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-gray-50 rounded-full text-brand-dark"><X size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
                    {navLinks.map((link) => (
                        <button key={link.label} onClick={() => { link.action(); setIsMobileMenuOpen(false); }} className={`flex items-center justify-between w-full py-4 text-left border-b border-gray-50 last:border-0`}>
                            <span className={`font-heading font-bold text-xl ${link.active ? 'text-brand-crimson' : 'text-brand-dark'}`}>{link.label}</span>
                            <ChevronRight size={18} className={link.active ? 'text-brand-crimson' : 'text-gray-300'} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </>
  );
};
