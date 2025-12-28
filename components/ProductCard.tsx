
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { CURRENCY_SYMBOL } from '../constants';
import { Badge, Skeleton } from './UI';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
    <Skeleton className="aspect-[3/4] w-full" />
    <div className="p-4 md:p-5 space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-16 rounded-sm" />
        <Skeleton className="h-3 w-10 rounded-sm" />
      </div>
      <Skeleton className="h-6 w-3/4 rounded-sm" />
      <div className="flex justify-between items-center pt-1">
        <Skeleton className="h-6 w-20 rounded-sm" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </div>
);

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, toggleWishlist, wishlist } = useStore();
  const isLiked = wishlist.includes(product.id);
  const [imgSrc, setImgSrc] = useState(product.image);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(product.image);
    setHasError(false);
  }, [product.image]);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      const bg = product.color || '1e293b';
      const text = ['F7B5CD', 'FCD116', 'FFFFFF'].includes(bg) ? '000000' : 'FFFFFF';
      setImgSrc(`https://placehold.co/600x800/${bg}/${text}?text=${encodeURIComponent(product.team)}`);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      className="group relative bg-white cursor-pointer rounded-xl md:rounded-2xl border border-gray-100 hover:border-brand-crimson/20 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden flex flex-col h-full touch-manipulation"
      onClick={() => navigateTo('product', product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex-shrink-0">
        
        <div className="absolute top-0 left-0 z-20 flex flex-col gap-1.5 md:gap-2 p-2.5 md:p-4">
          {product.isPlayerEdition && <Badge type="player">Player Edition</Badge>}
          {product.status === 'pre-order' && <Badge type="preorder">Pre-Order</Badge>}
          {product.originalPrice && (
            <span className="bg-brand-crimson text-white text-[8px] md:text-[9px] font-bold uppercase tracking-wider px-2 md:px-3 py-1 rounded-full shadow-sm">
              Save {(100 - (product.price / product.originalPrice * 100)).toFixed(0)}%
            </span>
          )}
        </div>

        <button 
          onClick={handleWishlistClick}
          className="absolute top-2.5 right-2.5 md:top-4 md:right-4 z-30 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-xl border border-white/40 text-brand-dark shadow-sm transition-all duration-300 hover:bg-brand-crimson hover:text-white active:scale-90"
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-white" : "text-brand-dark md:w-5 md:h-5"} />
        </button>

        <div className="w-full h-full overflow-hidden bg-gray-200">
            <img 
              src={imgSrc} 
              alt={product.name} 
              onError={handleImageError}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-500"></div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        {/* On mobile, we keep the explore CTA subtler but present */}
        {product.status !== 'out-of-stock' && (
           <div className="absolute inset-x-0 bottom-0 p-3 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] z-20 hidden md:block">
             <button className="w-full h-12 md:h-14 bg-brand-crimson text-white font-heading font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] shadow-xl hover:bg-brand-dark transition-all flex items-center justify-center gap-2 md:gap-3 rounded-full active:scale-95 group/btn">
                <Eye size={16} className="group-hover/btn:scale-110 transition-transform" /> 
                <span>Explore Kit</span>
                <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
             </button>
           </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-4 md:p-6 bg-white relative z-10">
        <div className="flex justify-between items-center mb-2 md:mb-3">
            <div className="text-[8px] md:text-[9px] font-black tracking-[0.15em] md:tracking-[0.2em] text-brand-gold uppercase bg-brand-gold/5 border border-brand-gold/10 px-1.5 md:px-2 py-0.5 rounded-sm">
                {product.team}
            </div>
            <div className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.season || '2025/26'}</div>
        </div>
        
        <h3 className="font-heading font-bold text-brand-dark text-sm md:text-base leading-snug md:leading-tight group-hover:text-brand-crimson transition-colors duration-300 line-clamp-2 mb-3 md:mb-4 flex-grow">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-50 mt-auto">
          <div className="flex items-baseline gap-1.5 md:gap-2">
            <span className="text-lg md:text-xl font-bold font-sport text-brand-dark">
                {CURRENCY_SYMBOL}{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
                <span className="text-[10px] md:text-xs text-gray-400 line-through font-sport opacity-70">
                {CURRENCY_SYMBOL}{product.originalPrice.toLocaleString()}
                </span>
            )}
          </div>
          
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-dark group-hover:text-white transition-all duration-500">
             <ShoppingBag size={16} className="md:w-[18px] md:h-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
