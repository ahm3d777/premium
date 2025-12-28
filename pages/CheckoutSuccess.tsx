import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/UI';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';

export const CheckoutSuccess = () => {
  const { navigateTo } = useStore();
  const orderId = `BD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  const email = "customer@example.com"; // In a real app, this would come from the checkout form

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in py-12">
      
      {/* Success Icon Animation */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center relative z-10 animate-slide-up">
          <CheckCircle size={56} className="text-green-500 drop-shadow-sm" strokeWidth={1.5} />
        </div>
      </div>
      
      <div className="animate-slide-up-delayed max-w-lg w-full">
        <div className="inline-block px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 mb-6">
           <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Payment Successful</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-heading font-black text-brand-dark mb-4 tracking-tight leading-none">
          Order Confirmed
        </h1>
        
        <div className="flex items-center justify-center gap-2 mb-8 text-gray-400 font-medium">
          <span>Order ID:</span>
          <span className="text-brand-dark font-mono font-bold">{orderId}</span>
        </div>
        
        <p className="text-gray-500 mb-10 leading-relaxed">
          Thank you for your purchase. We have sent a confirmation email to <span className="text-brand-dark font-semibold">{email}</span>. 
          Your premium kit is being prepared for dispatch.
        </p>

        {/* Order Status Preview */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 shadow-sm text-left">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-brand-dark/5 rounded-full flex items-center justify-center text-brand-dark">
                 <Package size={20} />
              </div>
              <div>
                 <div className="text-sm font-bold text-brand-dark">Preparing Order</div>
                 <div className="text-xs text-gray-400">Estimated Delivery: 2-3 Days</div>
              </div>
           </div>
           <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-dark w-[15%] rounded-full"></div>
           </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigateTo('home')} variant="outline" className="min-w-[160px]">
                Return Home
            </Button>
            <Button onClick={() => navigateTo('shop')} variant="black" className="min-w-[160px]">
                Continue Shopping <ArrowRight size={16} />
            </Button>
        </div>
      </div>
    </div>
  );
};