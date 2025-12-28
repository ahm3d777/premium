
import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button, Reveal } from '../components/UI';
import { ProductCard, ProductCardSkeleton } from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { ASSETS } from '../assets/images';
import { ArrowRight, ShieldCheck, Truck, Clock, Flame, Star, ChevronRight, Users, CheckCircle, Sparkles, Zap, Activity, Cpu, Layers, Trophy } from 'lucide-react';

export const Home = () => {
  const { navigateTo } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [stockRemaining, setStockRemaining] = useState(7);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const heroImages = [ASSETS.UI.HERO_BG, ASSETS.UI.HERO_BG_ALT];

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsLoadingFeatured(false), 1200);
    
    const heroTimer = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);

    const stockTimer = setInterval(() => {
      setStockRemaining(prev => Math.max(3, prev - (Math.random() > 0.8 ? 1 : 0)));
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(heroTimer);
      clearInterval(stockTimer);
    };
  }, []);

  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);
  const specialJersey = MOCK_PRODUCTS.find(p => p.id === '10') || MOCK_PRODUCTS[0];

  return (
    <div className="animate-fade-in overflow-hidden">
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[90vh] md:h-screen min-h-[500px] w-full overflow-hidden flex items-center justify-center bg-brand-dark">
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-all duration-[2500ms] md:duration-[3000ms] ease-in-out transform ${
                currentHeroIndex === index 
                  ? 'opacity-60 scale-105 md:scale-110 translate-x-0 blur-0' 
                  : 'opacity-0 scale-115 md:scale-125 translate-x-10 md:translate-x-20 blur-sm'
              }`}
            >
              <img 
                src={img} 
                alt={`Hero Background ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply z-10"></div>
        </div>
        
        <div className={`relative z-20 text-center max-w-6xl px-6 md:px-4 flex flex-col items-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 md:translate-y-20 opacity-0'}`}>
          <div className="mb-6 md:mb-8 animate-float">
             <span className="inline-flex items-center gap-2.5 md:gap-3 py-1.5 md:py-2 px-5 md:px-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] shadow-2xl">
                <Star size={10} className="text-brand-gold fill-brand-gold" />
                <span>Official 2025/26 Season</span>
                <Star size={10} className="text-brand-gold fill-brand-gold" />
             </span>
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-black text-white mb-6 tracking-tighter leading-[1] md:leading-[0.9]">
            <span className="block text-outline opacity-40 select-none uppercase text-4xl md:text-7xl lg:text-8xl">Authentic</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-2xl uppercase">
              Performance
            </span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed px-4">
            Sourced directly from Europe's elite clubs. Engineered for the athlete, designed for the fan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center w-full px-6 sm:px-0">
            <Button onClick={() => navigateTo('shop')} variant="primary" className="w-full sm:min-w-[200px] border-none shadow-xl h-14 md:h-12">
              Shop New Arrivals
            </Button>
            <Button onClick={() => navigateTo('shop')} variant="outline" className="w-full sm:min-w-[200px] text-white border-white/20 backdrop-blur-sm h-14 md:h-12">
              Explore Collections
            </Button>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 z-20">
           <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-brand-crimson text-white overflow-hidden py-3 md:py-4 relative z-20 shadow-xl border-y-2 md:border-y-4 border-brand-dark">
        <div className="animate-marquee whitespace-nowrap flex gap-10 md:gap-16 font-heading font-bold text-[10px] md:text-sm uppercase tracking-widest items-center">
            {[...Array(6)].map((_, i) => (
                <React.Fragment key={i}>
                    <span className="flex items-center gap-3 md:gap-4">
                        <Flame size={14} className="animate-pulse" />
                        Free Shipping Over ৳2,000
                    </span>
                    <span className="text-brand-dark opacity-30">•</span>
                    <span className="flex items-center gap-3 md:gap-4">
                        <ShieldCheck size={14} />
                        Authentic Kit Guarantee
                    </span>
                    <span className="text-brand-dark opacity-30">•</span>
                    <span className="flex items-center gap-3 md:gap-4">
                        <Star size={14} fill="currentColor" />
                        2025/26 Kits Available
                    </span>
                    <span className="text-brand-dark opacity-30">•</span>
                </React.Fragment>
            ))}
        </div>
      </div>

      {/* Trending Section */}
      <section className="py-16 md:py-24 bg-brand-offWhite relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-6">
              <div>
                <span className="flex items-center gap-2 text-brand-crimson font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 md:mb-3">
                   <div className="w-6 md:w-8 h-[2px] bg-brand-crimson"></div>
                   Weekly Drop
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark">Trending Now</h2>
              </div>
              <Button onClick={() => navigateTo('shop')} variant="ghost" className="group h-10 px-0 md:px-6 hover:bg-transparent md:hover:bg-white text-xs font-bold">
                View All Jerseys <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-8 md:gap-y-12 mb-16 md:mb-20">
            {isLoadingFeatured ? (
              [...Array(4)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : (
              featuredProducts.map((product, idx) => (
                <Reveal key={product.id} delay={idx * 0.1}>
                  <ProductCard product={product} />
                </Reveal>
              ))
            )}
          </div>

          {/* Special Edition - Messi MVP 2025 */}
          <Reveal>
            <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-brand-dark p-0.5 md:p-1 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-crimson/20 via-brand-dark to-brand-royal opacity-40"></div>
              
              <div className="relative bg-[#0A0A0C] rounded-[calc(1rem-1px)] md:rounded-[calc(1.5rem-2px)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-white/5">
                
                <div className="lg:col-span-5 relative h-72 md:h-96 lg:h-auto min-h-[350px] md:min-h-[500px] overflow-hidden bg-[#0D0D10]">
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={ASSETS.UI.STADIUM_NIGHT}
                        className="w-full h-full object-cover opacity-15"
                        alt="Stadium"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]"></div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
                      <div className="relative group">
                        <div className="relative z-20">
                          <img 
                            src={specialJersey.image} 
                            alt={specialJersey.name}
                            className="w-full max-w-[240px] md:max-w-[320px] drop-shadow-[0_20px_40px_rgba(212,13,54,0.4)] animate-float"
                          />
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap bg-white text-brand-dark font-heading font-black text-base md:text-xl px-6 md:px-10 py-3 md:py-4 rounded-sm shadow-xl z-30 border-b-2 md:border-b-4 border-brand-crimson">
                          <Trophy size={16} className="text-brand-gold md:w-5 md:h-5" fill="currentColor" /> MESSI MVP 2025
                        </div>
                      </div>
                    </div>
                </div>

                <div className="lg:col-span-7 p-6 md:p-10 lg:p-16 flex flex-col justify-center items-start relative overflow-hidden">
                   <div className="inline-flex items-center gap-2.5 text-brand-gold font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6 md:mb-8 bg-brand-gold/10 px-4 md:px-5 py-2 rounded-full border border-brand-gold/20 backdrop-blur-md">
                      <Sparkles size={12} fill="currentColor" /> 
                      COMMEMORATIVE DROPS
                   </div>
                   
                   <h2 className="text-4xl md:text-7xl font-heading font-black text-white mb-6 md:mb-8 leading-[1] tracking-tighter uppercase">
                      THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">MVP</span> <br/>
                      <span className="text-brand-crimson">LEGACY.</span>
                   </h2>

                   <p className="text-gray-400 text-sm md:text-lg mb-8 md:mb-10 max-w-xl leading-relaxed">
                      Lionel Messi 2025 MVP Edition. A celebration of excellence. Featuring official player-spec performance fabric.
                   </p>

                   <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10 w-full max-w-lg">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-crimson flex-shrink-0">
                           <Zap size={16} className="md:w-[18px] md:h-[18px]" />
                        </div>
                        <div>
                           <div className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">Elite Graphics</div>
                           <div className="text-gray-500 text-[8px] md:text-[10px] uppercase font-bold tracking-widest mt-1">Player Grade</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold flex-shrink-0">
                           <Trophy size={16} className="md:w-[18px] md:h-[18px]" />
                        </div>
                        <div>
                           <div className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">Limited</div>
                           <div className="text-gray-500 text-[8px] md:text-[10px] uppercase font-bold tracking-widest mt-1">MVP Series 01</div>
                        </div>
                      </div>
                   </div>

                   <div className="w-full max-w-md mb-8 md:mb-12 space-y-3 md:space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 md:gap-3">
                           <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                           <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Available Stock</span>
                        </div>
                        <span className="text-xs md:text-sm font-sport font-bold text-brand-gold">{stockRemaining} Kits Left</span>
                      </div>
                      <div className="h-1.5 md:h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-crimson to-brand-gold transition-all duration-1000 ease-out" 
                          style={{ width: `${(stockRemaining / 50) * 100}%` }}
                        ></div>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
                      <Button 
                        onClick={() => navigateTo('product', specialJersey)} 
                        variant="primary" 
                        className="h-14 md:h-16 px-8 md:px-12 text-sm md:text-lg shadow-xl group w-full sm:w-auto"
                      >
                         Secure MVP Kit — ৳{specialJersey.price.toLocaleString()}
                         <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform md:w-5 md:h-5" />
                      </Button>
                      
                      <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                         <div className="flex -space-x-2 md:-space-x-3">
                            {[1,2,3].map(i => (
                               <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-brand-dark bg-gray-800 flex items-center justify-center">
                                  <Users size={10} className="text-gray-400 md:w-3 md:h-3" />
                               </div>
                            ))}
                         </div>
                         <span>Exclusively for members</span>
                      </div>
                   </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 md:py-24 bg-brand-dark relative px-4 md:px-0">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">The Premium Standard</h2>
              <div className="w-16 md:w-24 h-1 bg-brand-crimson mx-auto"></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
                { icon: ShieldCheck, title: "Certified Gear", desc: "Verified serial numbers and heat-applied holographic tags on every jersey." },
                { icon: Truck, title: "Global Shipping", desc: "Express logistics ensuring your gear arrives in pristine showroom condition." },
                { icon: Flame, title: "Authentic Fabrics", desc: "Authentic player-spec fabrics including ADV cooling and moisture management." }
            ].map((feature, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div className="group p-8 md:p-10 rounded-xl bg-white/5 border border-white/10 hover:border-brand-crimson/30 transition-all duration-500 h-full">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-6 md:mb-8 text-white group-hover:scale-110 transition-all">
                          <feature.icon size={28} className="md:w-8 md:h-8" />
                      </div>
                      <h3 className="font-heading font-bold text-lg md:text-xl uppercase tracking-wider text-white mb-3 md:mb-4">{feature.title}</h3>
                      <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Immersion Section */}
      <section className="py-6 bg-brand-dark text-white overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="relative h-[600px] md:h-[700px] w-full group overflow-hidden md:rounded-3xl">
             <img 
                src={ASSETS.UI.PLAYER_EDITION_IMMERSION} 
                alt="Immersion" 
                className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-[10s]" 
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
             
             <div className="absolute inset-0 flex items-center">
               <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
                  <div className="space-y-6 md:space-y-8 relative z-10">
                      <Reveal>
                        <div className="inline-block px-3 py-1 border border-brand-gold/50 text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] bg-black/40 backdrop-blur-md rounded-sm">
                            Premium Tier
                        </div>
                      </Reveal>
                      
                      <Reveal delay={0.15}>
                        <h2 className="text-5xl md:text-8xl font-heading font-black leading-none uppercase">
                            PLAYER <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">EDITION</span>
                        </h2>
                      </Reveal>

                      <Reveal delay={0.3}>
                        <p className="text-gray-300 text-sm md:text-lg max-w-md leading-relaxed font-light">
                            Engineered for elite athletes. Sourced from authentic club specifications. 
                        </p>
                      </Reveal>

                      <Reveal delay={0.45}>
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                          <Button 
                            onClick={() => navigateTo('shop')} 
                            variant="primary" 
                            className="bg-brand-gold text-brand-dark h-14 md:h-16 px-8 md:px-10 font-black"
                          >
                              Shop Player Spec
                          </Button>
                        </div>
                      </Reveal>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
