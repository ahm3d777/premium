
import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '../context/StoreContext';
import { Button, Badge, Reveal, Skeleton } from '../components/UI';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CURRENCY_SYMBOL, AVAILABLE_SIZES, FONT_STYLES } from '../constants';
import { Check, Star, Truck, Shield, Ruler, Share2, Heart, ChevronLeft, ChevronRight, Maximize2, ShoppingBag } from 'lucide-react';

const ProductDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
    <Skeleton className="h-4 w-48 mb-8 rounded" />
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24">
      <div className="lg:col-span-7 space-y-4 md:space-y-6">
        <Skeleton className="aspect-[4/5] w-full rounded-lg" />
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
      <div className="lg:col-span-5 space-y-6 md:space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-10 md:h-12 w-full rounded" />
          <Skeleton className="h-10 md:h-12 w-3/4 rounded" />
        </div>
        <Skeleton className="h-12 md:h-16 w-1/2 rounded" />
        <Skeleton className="h-24 md:h-32 w-full rounded" />
      </div>
    </div>
  </div>
);

export const ProductDetail = () => {
  const { currentProduct, addToCart, navigateTo, toggleWishlist, wishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [customization, setCustomization] = useState<{name: string, number: string, font: string}>({
    name: '',
    number: '',
    font: FONT_STYLES[0]
  });
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setFailedImages(new Set());
    
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);

    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentProduct]);

  if (!currentProduct) {
    navigateTo('home');
    return null;
  }

  const isWishlisted = wishlist.includes(currentProduct.id);
  const totalPrice = isCustomizing ? currentProduct.price + 800 : currentProduct.price;
  const gallery = currentProduct.gallery && currentProduct.gallery.length > 0 
    ? currentProduct.gallery 
    : [currentProduct.image, currentProduct.image, currentProduct.image, currentProduct.image];

  const handleImageError = (index: number) => {
    setFailedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  const getSafeImage = (src: string, index: number) => {
    if (failedImages.has(index)) {
      const bg = currentProduct.color || '1e293b';
      const text = ['F7B5CD', 'FCD116', 'FFFFFF'].includes(bg) ? '000000' : 'FFFFFF';
      return `https://placehold.co/800x1000/${bg}/${text}?text=${encodeURIComponent(currentProduct.team)}+View+${index + 1}&font=oswald`;
    }
    return src;
  };

  const nextImage = useCallback(() => {
    setActiveImageIndex(prev => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const prevImage = useCallback(() => {
    setActiveImageIndex(prev => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      const sizeSelector = document.getElementById('size-selector');
      if (sizeSelector) {
        sizeSelector.scrollIntoView({ behavior: 'smooth', block: 'center' });
        sizeSelector.classList.add('animate-pulse');
        setTimeout(() => sizeSelector.classList.remove('animate-pulse'), 2000);
      }
      return;
    }
    addToCart(currentProduct, selectedSize, isCustomizing ? customization : undefined);
  };

  if (isLoading) return <div className="bg-white min-h-screen pt-4 md:pt-8"><ProductDetailSkeleton /></div>;

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-32 pt-4 md:pt-8 animate-fade-in relative">
      
      {/* Mobile Sticky CTA */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-500 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest line-clamp-1">{currentProduct.name}</span>
            <span className="text-lg font-sport font-bold text-brand-dark">{CURRENCY_SYMBOL}{totalPrice.toLocaleString()}</span>
          </div>
          <Button onClick={handleAddToCart} variant="primary" className="flex-1 h-12 text-[10px] font-bold shadow-xl">
             <ShoppingBag size={16} /> Add to Cart
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-6 md:mb-8">
        <Breadcrumbs items={[{ label: 'Shop', view: 'shop' as const }, { label: currentProduct.league, view: 'shop' as const }, { label: currentProduct.name }]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24">
          
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            <div className="aspect-[4/5] bg-gray-50 relative group overflow-hidden shadow-xl rounded-lg touch-pan-y">
               <img 
                src={getSafeImage(gallery[activeImageIndex], activeImageIndex)} 
                alt={currentProduct.name} 
                className="w-full h-full object-cover" 
               />
               
               <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 md:px-4 pointer-events-none">
                  <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="p-3 bg-white/80 backdrop-blur rounded-full shadow-lg pointer-events-auto active:scale-90"><ChevronLeft size={18} /></button>
                  <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="p-3 bg-white/80 backdrop-blur rounded-full shadow-lg pointer-events-auto active:scale-90"><ChevronRight size={18} /></button>
               </div>

               {isCustomizing && customization.number && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20 animate-fade-in">
                    <div className="bg-white shadow-2xl p-6 md:p-8 text-center min-w-[180px] md:min-w-[240px] rounded-sm border-t-4 border-brand-crimson scale-90 md:scale-100">
                      <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest mb-3 md:mb-4">Live Preview</p>
                      <div className="font-sport font-bold text-6xl md:text-8xl text-brand-dark mb-1 md:mb-2">{customization.number}</div>
                      <div className="font-heading font-bold text-xl md:text-2xl uppercase text-brand-dark tracking-widest truncate">{customization.name || 'NAME'}</div>
                    </div>
                 </div>
               )}

               <div className="absolute top-3 left-3 z-10 scale-90 md:scale-100 origin-top-left">
                 {currentProduct.isPlayerEdition && <Badge type="player">Player Edition</Badge>}
               </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 md:gap-4 overflow-x-auto no-scrollbar">
              {gallery.map((img, i) => (
                <button 
                    key={i} 
                    className={`aspect-square bg-gray-50 cursor-pointer border-2 rounded-lg transition-all ${activeImageIndex === i ? 'border-brand-dark ring-2 md:ring-4 ring-brand-dark/10' : 'border-transparent opacity-60'}`}
                    onClick={() => setActiveImageIndex(i)}
                >
                  <img src={getSafeImage(img, i)} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 self-start space-y-8">
            <div className="space-y-4">
               <div className="flex justify-between items-start">
                  <h2 className="text-[10px] md:text-xs font-bold text-brand-crimson uppercase tracking-[0.2em]">{currentProduct.team} • {currentProduct.season}</h2>
                  <button className="text-gray-400 p-2 hover:bg-gray-50 rounded-full"><Share2 size={16} /></button>
               </div>
               <h1 className="text-3xl md:text-5xl font-heading font-black text-brand-dark leading-none tracking-tight uppercase">{currentProduct.name}</h1>
               <div className="flex items-center gap-3">
                  <div className="flex items-center text-brand-gold text-xs">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.floor(currentProduct.rating) ? "currentColor" : "none"} className={i < Math.floor(currentProduct.rating) ? "" : "text-gray-200"} />)}
                  </div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest border-l border-gray-100 pl-3">{currentProduct.reviews} Reviews</span>
               </div>
            </div>

            <div className="flex items-baseline gap-3 md:gap-4 border-b border-gray-50 pb-6 md:pb-8">
              <span className="text-3xl md:text-4xl font-sport font-bold text-brand-dark">{CURRENCY_SYMBOL}{totalPrice.toLocaleString()}</span>
              {currentProduct.originalPrice && <span className="text-lg md:text-xl text-gray-300 line-through font-sport">{CURRENCY_SYMBOL}{currentProduct.originalPrice.toLocaleString()}</span>}
            </div>

            <p className="text-gray-500 leading-relaxed text-sm md:text-base font-light">
              {currentProduct.description}
            </p>

            <div className="space-y-4" id="size-selector">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark">Size</span>
                <button className="flex items-center gap-1 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                  <Ruler size={12} /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {AVAILABLE_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 md:h-12 border transition-all text-xs md:text-sm font-bold rounded-sm ${selectedSize === size ? 'border-brand-dark bg-brand-dark text-white shadow-lg' : 'border-gray-100 text-gray-500 hover:border-brand-dark'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-5 md:p-6 border rounded-sm transition-all ${isCustomizing ? 'border-brand-dark bg-gray-50/50' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsCustomizing(!isCustomizing)}>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 border flex items-center justify-center rounded-sm ${isCustomizing ? 'bg-brand-dark border-brand-dark text-white' : 'border-gray-300 bg-white'}`}>
                    {isCustomizing && <Check size={12} />}
                  </div>
                  <span className="font-heading font-bold text-xs md:text-sm uppercase tracking-wider text-brand-dark">Personalize Kit</span>
                </div>
                <span className="text-xs md:text-sm font-bold text-brand-dark font-sport">+৳800</span>
              </div>

              <div className={`grid transition-all duration-300 overflow-hidden ${isCustomizing ? 'grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-gray-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="min-h-0 space-y-4">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Name</label>
                    <input type="text" maxLength={12} placeholder="YOUR NAME" value={customization.name} onChange={e => setCustomization({...customization, name: e.target.value.toUpperCase()})} className="w-full bg-white border border-gray-100 p-3 text-base md:text-sm uppercase font-heading focus:ring-1 focus:ring-brand-dark outline-none tracking-widest rounded-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Number</label>
                      <input type="number" max={99} placeholder="10" value={customization.number} onChange={e => setCustomization({...customization, number: e.target.value})} className="w-full bg-white border border-gray-100 p-3 text-base md:text-sm font-sport focus:ring-1 focus:ring-brand-dark outline-none text-center rounded-sm" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Font</label>
                      <select value={customization.font} onChange={e => setCustomization({...customization, font: e.target.value})} className="w-full bg-white border border-gray-100 p-3 text-base md:text-sm appearance-none outline-none font-bold text-gray-700 rounded-sm">
                        {FONT_STYLES.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4 pt-4">
              <Button onClick={handleAddToCart} fullWidth variant="primary" className="h-14 md:h-16 text-sm md:text-lg flex-1">
                Add to Cart — {CURRENCY_SYMBOL}{totalPrice.toLocaleString()}
              </Button>
              <button onClick={() => toggleWishlist(currentProduct.id)} className={`h-14 w-14 md:h-16 md:w-16 flex items-center justify-center border rounded-full transition-all ${isWishlisted ? 'bg-red-50 border-brand-crimson text-brand-crimson' : 'border-gray-100 text-gray-300'}`}>
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} className="md:w-6 md:h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-4">
                 <div className="p-4 bg-gray-50 rounded-sm space-y-2">
                   <Shield className="text-brand-dark" size={18} />
                   <h4 className="font-bold text-[10px] md:text-xs text-brand-dark uppercase">Certified Gear</h4>
                   <p className="text-[9px] text-gray-400 leading-tight">100% original player edition quality.</p>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-sm space-y-2">
                   <Truck className="text-brand-dark" size={18} />
                   <h4 className="font-bold text-[10px] md:text-xs text-brand-dark uppercase">Fast Shipping</h4>
                   <p className="text-[9px] text-gray-400 leading-tight">Nationwide delivery within 3-5 days.</p>
                 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
