
import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard, ProductCardSkeleton } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MOCK_PRODUCTS } from '../constants';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';

export const Shop = () => {
  const { activeCategory, setCategory } = useStore();
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    if (activeCategory !== 'All' && p.league !== activeCategory) return false;
    if (p.price > priceRange) return false;
    return true;
  });

  const breadcrumbItems = [
    { label: 'Shop All', view: 'shop' as const },
    ...(activeCategory !== 'All' ? [{ label: activeCategory }] : [])
  ];

  return (
    <div className="bg-white min-h-screen py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">
            {activeCategory === 'All' ? 'All Collections' : activeCategory}
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">Discover our curated selection of authentic jerseys from the world's top leagues and national teams.</p>
        </div>

        {/* Filter Bar - Modern Horizontal */}
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md py-4 border-b border-gray-100 mb-12 shadow-sm transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {['All', 'La Liga', 'Premier League', 'Serie A', 'International'].map(league => (
                <button
                  key={league}
                  onClick={() => setCategory(league)}
                  className={`px-5 py-2 rounded-[2px] text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                    activeCategory === league 
                      ? 'bg-brand-dark text-white border-brand-dark shadow-md' 
                      : 'bg-white text-gray-500 border-gray-200 hover:border-brand-dark hover:text-brand-dark'
                  }`}
                >
                  {league}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Max Price:</span>
                  <input 
                    type="range" 
                    min="500" 
                    max="4000" 
                    step="100" 
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-24 md:w-32 accent-brand-dark h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-bold font-sport">৳{priceRange.toLocaleString()}</span>
               </div>
               
               <div className="h-4 w-px bg-gray-300 hidden md:block"></div>

               <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-brand-crimson transition-colors">
                 Sort By <ChevronDown size={14} />
               </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                <SlidersHorizontal className="text-gray-300" />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-dark mb-2">No jerseys found</h3>
              <p className="text-gray-400 text-sm">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => {setCategory('All'); setPriceRange(3000);}}
                className="mt-6 text-brand-crimson font-bold text-xs uppercase tracking-widest hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
