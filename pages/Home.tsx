
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
    
    // Slide/Dissolve Loop Interval
    const heroTimer = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 5000); // 5 seconds total duration for each image state

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
      
      {/* Cinematic Hero Section with Slide-Dissolve Loop */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-brand-dark">
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out transform ${
                currentHeroIndex === index 
                  ? 'opacity-60 scale-110 translate-x-0 blur-0' 
                  : 'opacity-0 scale-125 translate-x-20 blur-sm'
              }`}
            >
              <img 
                src={img} 
                alt={`Hero Background ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Permanent Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-brand-dark/30 mix-blend-multiply z-10"></div>
        </div>
        
        <div className={`relative z-20 text-center max-w-6xl px-4 flex flex-col items-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="mb-8 animate-float">
             <span className="inline-flex items-center gap-3 py-2 px-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl text-white text-xs font-bold uppercase tracking-[0.25em] shadow-2xl hover:bg-white/10 transition-colors cursor-default ring-1 ring-white/10">
                <Star size={12} className="text-brand-gold fill-brand-gold" />
                <span>Official 2025/26 Season</span>
                <Star size={12} className="text-brand-gold fill-brand-gold" />
             </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white mb-6 tracking-tighter leading-[0.9]">
            <span className="block text-outline opacity-40 select-none uppercase">Authentic</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-2xl uppercase">
              Performance
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-slide-up-delayed">
            Sourced directly from Europe's elite clubs. Engineered for the athlete, designed for the fan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up-delayed" style={{ animationDelay: '0.4s' }}>
            <Button onClick={() => navigateTo('shop')} variant="primary" className="min-w-[200px] border-none shadow-[0_0_40px_-10px_rgba(212,13,54,0.5)]">
              Shop New Arrivals
            </Button>
            <Button onClick={() => navigateTo('shop')} variant="outline" className="min-w-[200px] text-white border-white/20 hover:bg-white hover:text-brand-dark hover:border-white backdrop-blur-sm">
              Explore Collections
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 z-20">
           <span className="text-[10px] text-white uppercase tracking-widest">Scroll</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-brand-crimson text-white overflow-hidden py-4 relative z-20 shadow-2xl rotate-0 md:-rotate-1 scale-105 border-y-4 border-brand-dark">
        <div className="animate-marquee whitespace-nowrap flex gap-16 font-heading font-bold text-sm uppercase tracking-widest items-center">
            {[...Array(10)].map((_, i) => (
                <React.Fragment key={i}>
                    <span className="flex items-center gap-4">
                        <Flame size={16} className="animate-pulse" />
                        Free Shipping Over ৳2,000
                    </span>
                    <span className="text-brand-dark opacity-40">•</span>
                    <span className="flex items-center gap-4">
                        <ShieldCheck size={16} />
                        Authentic Jersey Guarantee
                    </span>
                    <span className="text-brand-dark opacity-40">•</span>
                    <span className="flex items-center gap-4">
                        <Star size={16} fill="currentColor" />
                        New 2025/26 Kits Available
                    </span>
                    <span className="text-brand-dark opacity-40">•</span>
                </React.Fragment>
            ))}
        </div>
      </div>

      {/* Trending Section */}
      <section className="py-24 bg-brand-offWhite relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="flex items-center gap-2 text-brand-crimson font-bold text-xs uppercase tracking-[0.2em] mb-3">
                   <div className="w-8 h-[2px] bg-brand-crimson"></div>
                   Weekly Drop
                </span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark">Trending Now</h2>
              </div>
              <Button onClick={() => navigateTo('shop')} variant="ghost" className="group hover:bg-white border border-transparent hover:border-gray-200">
                View All Jerseys <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 mb-20">
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
            <div className="relative w-full rounded-3xl overflow-hidden bg-brand-dark p-1 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-crimson/30 via-brand-dark to-brand-royal opacity-50"></div>
              
              <div className="relative bg-[#0A0A0C] rounded-[calc(1.5rem-2px)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-white/5">
                
                <div className="lg:col-span-5 relative h-80 lg:h-auto min-h-[500px] overflow-hidden bg-[#0D0D10]">
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={ASSETS.UI.STADIUM_NIGHT}
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                        alt="Stadium Texture"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]"></div>
                      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-crimson/20 blur-[100px] rounded-full animate-pulse-slow"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-gold/10 blur-[100px] rounded-full animate-float-delayed"></div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12 z-10">
                      <div className="relative group perspective-[1500px]">
                        <div className="relative z-20 transition-transform duration-700 group-hover:[transform:rotateY(10deg)_rotateX(5deg)_scale(1.05)]">
                          <img 
                            src={specialJersey.image} 
                            alt={specialJersey.name}
                            className="w-full max-w-[320px] drop-shadow-[0_40px_60px_rgba(212,13,54,0.5)] animate-float"
                          />
                        </div>
                        
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap bg-white text-brand-dark font-heading font-black text-xl px-10 py-4 rounded-sm shadow-[0_15px_40px_rgba(255,255,255,0.2)] z-30 group-hover:scale-110 transition-transform duration-500 border-b-4 border-brand-crimson">
                          <Trophy size={20} className="text-brand-gold animate-bounce" fill="currentColor" /> MESSI MVP 2025
                        </div>

                        <div className="absolute -inset-20 bg-gradient-to-tr from-brand-crimson/0 via-brand-crimson/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl"></div>
                      </div>
                    </div>
                </div>

                <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center items-start relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                        <circle cx="50" cy="50" r="40" />
                        <circle cx="20" cy="30" r="15" />
                        <circle cx="80" cy="70" r="25" />
                      </svg>
                   </div>

                   <div className="inline-flex items-center gap-3 text-brand-gold font-bold text-xs uppercase tracking-[0.35em] mb-8 bg-brand-gold/10 px-5 py-2 rounded-full border border-brand-gold/30 backdrop-blur-md">
                      <Sparkles size={14} fill="currentColor" className="animate-spin-slow" /> 
                      COMMEMORATIVE DROPS
                   </div>
                   
                   <h2 className="text-5xl md:text-7xl font-heading font-black text-white mb-8 leading-[0.95] tracking-tighter">
                      THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">MVP</span> <br/>
                      <span className="text-brand-crimson">LEGACY.</span>
                   </h2>

                   <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
                      Lionel Messi 2025 MVP Edition. A celebration of pure excellence. Featuring high-definition commemorative graphics and official player-spec performance fabric.
                   </p>

                   <div className="grid grid-cols-2 gap-6 mb-10 w-full max-w-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-crimson flex-shrink-0">
                           <Zap size={18} />
                        </div>
                        <div>
                           <div className="text-white font-bold text-sm uppercase tracking-wide">Elite Graphics</div>
                           <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">Heat-Pressed Vinyl</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold flex-shrink-0">
                           <Trophy size={18} />
                        </div>
                        <div>
                           <div className="text-white font-bold text-sm uppercase tracking-wide">Limited Edition</div>
                           <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">MVP Series 01</div>
                        </div>
                      </div>
                   </div>

                   <div className="w-full max-w-md mb-12 space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Drops Remaining</span>
                        </div>
                        <span className="text-sm font-sport font-bold text-brand-gold">{stockRemaining} Kits Left</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-crimson to-brand-gold transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(212,13,54,0.5)]" 
                          style={{ width: `${(stockRemaining / 50) * 100}%` }}
                        ></div>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                      <Button 
                        onClick={() => navigateTo('product', specialJersey)} 
                        variant="primary" 
                        className="h-16 px-12 text-lg shadow-[0_20px_40px_-10px_rgba(212,13,54,0.5)] group w-full sm:w-auto"
                      >
                         Secure MVP Kit — ৳{specialJersey.price.toLocaleString()}
                         <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                      </Button>
                      
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                         <div className="flex -space-x-3">
                            {[1,2,3].map(i => (
                               <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-dark bg-gray-800 flex items-center justify-center overflow-hidden">
                                  <Users size={12} className="text-gray-400" />
                               </div>
                            ))}
                         </div>
                         <span>Exclusively for premium members</span>
                      </div>
                   </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 bg-brand-dark relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">The Premium Standard</h2>
              <div className="w-24 h-1 bg-brand-crimson mx-auto"></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { icon: ShieldCheck, title: "Official Certification", desc: "Verified serial numbers and heat-applied holographic tags on every jersey." },
                { icon: Truck, title: "Global Express", desc: "Premium logistics ensuring your gear arrives in pristine showroom condition." },
                { icon: Flame, title: "Elite Tech", desc: "Authentic player-spec fabrics including ADV cooling and moisture management." }
            ].map((feature, i) => (
                <Reveal key={i} delay={i * 0.2}>
                  <div className="group p-10 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-crimson/50 transition-all duration-500 relative overflow-hidden h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-8 text-white group-hover:scale-110 group-hover:text-brand-crimson transition-all duration-300">
                          <feature.icon size={32} strokeWidth={1.2} />
                      </div>
                      <h3 className="font-heading font-bold text-xl uppercase tracking-wider text-white mb-4 group-hover:text-brand-crimson transition-colors">{feature.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">{feature.desc}</p>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Immersion Section */}
      <section className="py-6 bg-brand-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-dark via-brand-royal/20 to-brand-dark"></div>
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="relative h-[700px] w-full group overflow-hidden">
             <img 
                src={ASSETS.UI.PLAYER_EDITION_IMMERSION} 
                alt="Player Edition Background" 
                className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110 opacity-40 group-hover:opacity-20" 
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
             
             <div className="absolute inset-0 flex items-center">
               <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8 relative z-10">
                      <Reveal>
                        <div className="inline-block px-4 py-1 border border-brand-gold/50 text-brand-gold text-xs font-bold uppercase tracking-[0.3em] bg-black/50 backdrop-blur-md rounded-sm">
                            Premium Tier
                        </div>
                      </Reveal>
                      
                      <Reveal delay={0.2}>
                        <h2 className="text-6xl md:text-8xl font-heading font-black leading-none drop-shadow-2xl uppercase">
                            PLAYER <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">EDITION</span>
                        </h2>
                      </Reveal>

                      <Reveal delay={0.4}>
                        <p className="text-gray-300 text-lg max-w-md leading-relaxed font-light">
                            Engineered for the world's elite athletes. Sourced from authentic club specifications. 
                            Featuring lightweight fabric, streamlined fit, and high-spec moisture management.
                        </p>
                      </Reveal>

                      <Reveal delay={0.6}>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <Button 
                            onClick={() => navigateTo('shop')} 
                            variant="primary" 
                            className="bg-brand-gold text-brand-dark hover:bg-white hover:text-brand-crimson border-none shadow-[0_0_20px_rgba(207,162,56,0.3)] h-16 px-10"
                          >
                              Shop Player Spec Kits
                          </Button>
                          <div className="flex items-center gap-3 text-xs font-bold text-gray-400 px-4 uppercase tracking-widest border border-white/5 bg-white/5 rounded-full">
                              <CheckCircle size={16} className="text-brand-gold" /> Official Licensed Gear
                          </div>
                        </div>
                      </Reveal>
                  </div>
                  
                  <div className="hidden md:flex relative h-[600px] w-full items-center justify-center">
                      <div className="absolute w-[600px] h-[600px] bg-gradient-to-b from-brand-crimson/10 via-purple-900/10 to-transparent blur-[120px] rounded-full animate-pulse-slow"></div>
                      <div className="animate-float z-10 relative group cursor-pointer perspective-[1200px]">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-gold via-brand-crimson to-brand-gold rounded-[2.5rem] blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                          <div className="relative w-[360px] h-[500px] rounded-[2.2rem] bg-[#0F0F13] border border-white/10 shadow-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] [transform:rotateY(-15deg)_rotateX(8deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_scale(1.05)]">
                              <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
                              <div className="absolute inset-0 z-0">
                                  <img 
                                      src={ASSETS.PRODUCTS.BARCELONA_HOME}
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                      alt="Collector Jersey"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                              </div>
                              <div className="absolute bottom-0 left-0 w-full p-10 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                  <div className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-2">Vaporknit Series</div>
                                  <h3 className="text-5xl font-heading font-black text-white mb-1 tracking-tighter leading-none drop-shadow-lg">
                                      FCB <span className="text-brand-crimson">25/26</span>
                                  </h3>
                              </div>
                          </div>
                      </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
