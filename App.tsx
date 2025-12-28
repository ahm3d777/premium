
import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { NotificationContainer } from './components/UI';

interface FootballIconProps {
  className?: string;
}

const FootballIcon: React.FC<FootballIconProps> = ({ className = "text-brand-dark" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
    <path d="M2 12h20"></path>
    <path d="M12 2v20"></path>
  </svg>
);

const SplashScreen = () => (
  <div className="fixed inset-0 z-[100] bg-brand-dark flex flex-col items-center justify-center animate-fade-out" style={{ animationDelay: '1.2s', pointerEvents: 'none' }}>
    
    <div className="relative mb-14">
       <div className="absolute inset-0 bg-brand-crimson blur-[80px] opacity-20 animate-pulse"></div>
       <div className="relative w-40 h-40 flex items-center justify-center z-10 drop-shadow-2xl">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="shield-modern-splash" x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D40D36" />
                  <stop offset="1" stopColor="#8A0822" />
                </linearGradient>
              </defs>
              <path d="M32 2L58 14V34C58 50 46 60 32 64C18 60 6 50 6 34V14L32 2Z" fill="url(#shield-modern-splash)" stroke="white" strokeWidth="1.5" />
              <path d="M32 2V64C46 60 58 50 58 34V14L32 2Z" fill="black" fillOpacity="0.2" />
              <g transform="translate(17, 22)">
                 <path d="M0 0H8C12 0 14 2 14 5C14 7 12 9 9 9H2V11H10C13 11 15 13 15 16C15 19 13 21 9 21H0V0Z" fill="white" />
                 <path d="M18 0H24C29 0 32 4 32 10.5C32 17 29 21 24 21H18V0ZM22 17H24C26.5 17 28 15 28 10.5C28 6 26.5 4 24 4H22V17Z" fill="white" />
              </g>
              <path d="M32 54L36 50L32 46L28 50L32 54Z" fill="#F59E0B" />
          </svg>
       </div>
    </div>

    <div className="flex flex-col items-center gap-1 mb-16">
      <h1 className="font-heading font-black text-4xl tracking-[0.2em] leading-none text-white drop-shadow-lg">
        PREMIUM<span className="text-brand-crimson">KITS</span>
      </h1>
      <p className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold opacity-80 mt-3">
        Official Store
      </p>
    </div>
    
    <div className="relative w-64">
      <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-brand-crimson to-brand-gold w-full origin-left animate-load-progress" style={{ animationDuration: '1.0s' }}></div>
      </div>
      
      <div className="absolute top-1/2 w-6 h-6 text-white animate-ball-roll" style={{ animationDuration: '1.0s' }}>
        <FootballIcon className="text-white drop-shadow-lg" />
      </div>
    </div>
  </div>
);

const MainContent = () => {
  const { currentPage } = useStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'wishlist':
        return <Wishlist />;
      case 'checkout-success':
        return <CheckoutSuccess />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark bg-white selection:bg-brand-crimson selection:text-white">
      <Navbar />
      <NotificationContainer />
      <main className={`flex-grow ${currentPage === 'home' ? 'pt-0' : 'pt-20 lg:pt-24'}`}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400); // 30% reduction from 2000ms
    return () => clearTimeout(timer);
  }, []);

  return (
    <StoreProvider>
      {loading && <SplashScreen />}
      <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}>
        <MainContent />
      </div>
    </StoreProvider>
  );
};

export default App;
