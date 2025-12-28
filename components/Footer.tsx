import React from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Button } from './UI';

export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-8 mt-auto border-t border-white/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-crimson to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* About */}
          <div className="space-y-8">
            {/* Premium Modern Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <path d="M32 2L58 14V34C58 50 46 60 32 64C18 60 6 50 6 34V14L32 2Z" fill="#1E293B" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M32 2V64C46 60 58 50 58 34V14L32 2Z" fill="black" fillOpacity="0.2" />
                  <g transform="translate(17, 22)">
                     <path d="M0 0H8C12 0 14 2 14 5C14 7 12 9 9 9H2V11H10C13 11 15 13 15 16C15 19 13 21 9 21H0V0Z" fill="white" />
                     <path d="M18 0H24C29 0 32 4 32 10.5C32 17 29 21 24 21H18V0ZM22 17H24C26.5 17 28 15 28 10.5C28 6 26.5 4 24 4H22V17Z" fill="white" />
                  </g>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-heading font-black text-xl leading-none tracking-tighter">
                  PREMIUM<span className="text-brand-crimson">KITS</span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-500">Official Store</div>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
              Bangladesh's most trusted destination for authentic football merchandise. 
              We bring the stadium atmosphere to your wardrobe with premium quality jerseys.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-royal hover:border-brand-royal transition-all duration-300 hover:-translate-y-1 group"><Facebook size={18} className="group-hover:text-white" /></a>
              <a href="#" className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-crimson hover:border-brand-crimson transition-all duration-300 hover:-translate-y-1 group"><Instagram size={18} className="group-hover:text-white" /></a>
              <a href="#" className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-400 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 group"><Twitter size={18} className="group-hover:text-white" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h4 className="font-heading font-bold text-lg mb-6 text-white tracking-wide border-l-2 border-brand-crimson pl-3">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors block py-1 hover:translate-x-1 duration-200 flex items-center gap-2"><span className="w-1 h-1 bg-brand-crimson rounded-full opacity-0 hover:opacity-100"></span> New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors block py-1 hover:translate-x-1 duration-200 flex items-center gap-2"><span className="w-1 h-1 bg-brand-crimson rounded-full opacity-0 hover:opacity-100"></span> Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors block py-1 hover:translate-x-1 duration-200 flex items-center gap-2"><span className="w-1 h-1 bg-brand-crimson rounded-full opacity-0 hover:opacity-100"></span> Player Edition</a></li>
              <li><a href="#" className="hover:text-white transition-colors block py-1 hover:translate-x-1 duration-200 flex items-center gap-2"><span className="w-1 h-1 bg-brand-crimson rounded-full opacity-0 hover:opacity-100"></span> Retro Kits</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white tracking-wide border-l-2 border-brand-crimson pl-3">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors block py-1 hover:translate-x-1 duration-200">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors block py-1 hover:translate-x-1 duration-200">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors block py-1 hover:translate-x-1 duration-200">Returns & Exchange</a></li>
              <li><a href="#" className="hover:text-white transition-colors block py-1 hover:translate-x-1 duration-200">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors block py-1 hover:translate-x-1 duration-200">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white tracking-wide border-l-2 border-brand-crimson pl-3">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="space-y-3">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson transition-all"
                />
              </div>
              <Button variant="primary" fullWidth className="text-xs h-12 shadow-none hover:shadow-lg rounded-none">
                Subscribe <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-medium tracking-wide">© 2026 Premium Kits Bangladesh. All rights reserved.</p>
          <div className="flex gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="h-7 px-2 bg-white rounded-sm flex items-center justify-center border border-gray-200">
               <span className="text-blue-900 font-bold text-[10px] italic">VISA</span>
            </div>
            <div className="h-7 px-2 bg-white rounded-sm flex items-center justify-center border border-gray-200">
               <span className="text-orange-500 font-bold text-[10px]">Mastercard</span>
            </div>
            <div className="h-7 px-2 bg-pink-600 rounded-sm flex items-center justify-center border border-pink-700">
               <span className="text-white font-bold text-[10px]">bKash</span>
            </div>
            <div className="h-7 px-2 bg-orange-600 rounded-sm flex items-center justify-center border border-orange-700">
               <span className="text-white font-bold text-[10px]">Nagad</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};