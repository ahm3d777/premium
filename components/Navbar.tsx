import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, User, Heart, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const MinimalLogo = ({ isDark }: { isDark: boolean }) => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className={`transition-colors duration-300 ${isDark ? 'text-brand-dark' : 'text-white'}`}>
       <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 2L58 14V34C58 50 46 60 32 64C18 60 6 50 6 34V14L32 2Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          <path d="M32 12V52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 32H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
       </svg>
    </div>
    <div className="flex flex-col">
      <span className={`font-heading font-bold text-lg leading-none tracking-tight transition-colors duration-300 ${isDark ? 'text-brand-dark' : 'text-white'}`}>
        PREMIUM<span className="text-brand-crimson">KITS</span>
      </span>
    </div>
  </div>
);

export const Navbar = () => {
  const { navigateTo, cartCount, wishlist, currentPage, setCategory, activeCategory } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Logic: Transparent on Home (when at top), White on scroll or other pages
  const isHome = currentPage === 'home';
  const isTransparent = isHome && !scrolled && !isMobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Visual Styles
  const navBgClass = isTransparent 
    ? 'bg-transparent border-transparent py-6' 
    : 'bg-white/80 backdrop-blur-md shadow-sm border-gray-100 py-4';
  
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
      {/* Search Overlay */}
      <div className={`fixed inset-0 z-[60] bg-white/98 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center ${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <button onClick={() => setSearchOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={32} className="text-brand-dark" />
        </button>
        <div className="w-full max-w-2xl px-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8 text-center">What are you looking for?</h2>
            <div className="relative group mb-12">
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    autoFocus={searchOpen}
                    className="w-full text-center text-4xl md:text-5xl font-heading font-bold text-brand-dark bg-transparent border-b-2 border-gray-100 py-6 focus:outline-none focus:border-brand-dark transition-all placeholder:text-gray-200"
                />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                {['Messi', 'Real Madrid', 'Retro', '2025 Kits'].map(tag => (
                    <button key={tag} className="px-6 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm font-medium text-gray-600 hover:bg-brand-dark hover:text-white transition-all">
                        {tag}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${navBgClass}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            
            {/* 1. Left: Brand */}
            <div onClick={() => navigateTo('home')} className="z-50 relative">
              <MinimalLogo isDark={!isTransparent} />
            </div>

            {/* 2. Center: Navigation */}
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

            {/* 3. Right: Icons */}
            <div className={`flex items-center gap-1 md:gap-2 z-50 transition-colors duration-300 ${textColorClass}`}>
                <button 
                    onClick={() => setSearchOpen(true)}
                    className={`p-3 rounded-full transition-all duration-300 ${hoverBgClass}`}
                >
                    <Search size={20} strokeWidth={1.5} />
                </button>
                
                <button 
                    onClick={() => navigateTo('wishlist')}
                    className={`hidden md:block p-3 rounded-full transition-all duration-300 relative ${hoverBgClass}`}
                >
                    <Heart size={20} strokeWidth={1.5} fill={wishlist.length > 0 ? "currentColor" : "none"} className={wishlist.length > 0 ? "text-brand-crimson" : ""} />
                </button>

                <button 
                    onClick={() => navigateTo('cart')}
                    className={`p-3 rounded-full transition-all duration-300 relative ${hoverBgClass}`}
                >
                    <ShoppingBag size={20} strokeWidth={1.5} />
                    {cartCount > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-brand-crimson rounded-full ring-2 ring-white"></span>
                    )}
                </button>

                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className={`lg:hidden p-3 rounded-full transition-all duration-300 ${hoverBgClass}`}
                >
                    <Menu size={24} strokeWidth={1.5} />
                </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[70] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <div 
            className={`absolute inset-0 bg-brand-dark/20 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-8">
                    <span className="font-heading font-bold text-xl text-brand-dark tracking-tight">MENU</span>
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-brand-dark"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-8 py-4 space-y-2">
                    {navLinks.map((link, idx) => (
                        <button
                            key={link.label}
                            onClick={() => { link.action(); setIsMobileMenuOpen(false); }}
                            className={`flex items-center justify-between w-full py-4 text-left group border-b border-gray-50 last:border-0`}
                            style={{ 
                                opacity: isMobileMenuOpen ? 1 : 0, 
                                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(10px)',
                                transition: `all 0.4s ease-out ${idx * 0.05 + 0.1}s`
                            }}
                        >
                            <span className={`font-heading font-bold text-xl transition-colors ${link.active ? 'text-brand-crimson' : 'text-brand-dark group-hover:text-gray-600'}`}>
                                {link.label}
                            </span>
                            <ChevronRight size={18} className="text-gray-300 group-hover:text-brand-dark transition-colors" />
                        </button>
                    ))}
                </div>

                {/* Drawer Footer */}
                <div className="p-8 bg-gray-50 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => { navigateTo('wishlist'); setIsMobileMenuOpen(false); }} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform">
                             <Heart size={20} className="mb-2 text-brand-dark" />
                             <span className="text-xs font-bold uppercase tracking-wide text-gray-600">Wishlist</span>
                        </button>
                        <button onClick={() => { /* Account logic */ setIsMobileMenuOpen(false); }} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform">
                             <User size={20} className="mb-2 text-brand-dark" />
                             <span className="text-xs font-bold uppercase tracking-wide text-gray-600">Account</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};