
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/UI';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CURRENCY_SYMBOL } from '../constants';
import { Trash2, ShoppingBag, ArrowRight, Lock, CheckCircle } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, navigateTo, clearCart } = useStore();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  if (cart.length === 0 && step === 'cart') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 animate-fade-in">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-gray-300 md:w-10 md:h-10" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-black text-brand-dark mb-3 uppercase tracking-tighter">Your cart is empty</h2>
        <p className="text-gray-500 text-sm md:text-base mb-8 max-w-sm leading-relaxed">Explore our latest kits to find your perfect match.</p>
        <Button onClick={() => navigateTo('shop')} variant="black" className="px-10">Start Shopping</Button>
      </div>
    );
  }

  const shippingCost = cartTotal > 2000 ? 0 : 100;
  const grandTotal = cartTotal + shippingCost;

  const CheckoutProgress = () => (
    <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12 scale-90 md:scale-100">
        <div className="flex flex-col items-center gap-2">
            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm ${step === 'cart' ? 'bg-brand-dark text-white ring-4 ring-gray-100' : 'bg-green-500 text-white'}`}>
                {step === 'checkout' ? <CheckCircle size={18} /> : '01'}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${step === 'cart' ? 'text-brand-dark' : 'text-gray-400'}`}>Cart</span>
        </div>
        <div className={`h-[1px] md:h-[2px] w-8 md:w-12 ${step === 'checkout' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
        <div className="flex flex-col items-center gap-2">
            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm ${step === 'checkout' ? 'bg-brand-dark text-white ring-4 ring-gray-100' : 'bg-gray-100 text-gray-400'}`}>
                02
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${step === 'checkout' ? 'text-brand-dark' : 'text-gray-400'}`}>Payment</span>
        </div>
    </div>
  );

  if (step === 'checkout') {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 animate-fade-in">
        <div className="mb-6 md:mb-8">
            <Breadcrumbs items={[{ label: 'Cart', view: 'cart' as const }, { label: 'Checkout' }]} />
        </div>
        
        <CheckoutProgress />

        <div className="flex flex-col lg:flex-row gap-10 md:gap-12">
            <div className="flex-1">
                <button onClick={() => setStep('cart')} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-dark mb-6 md:mb-8 flex items-center gap-2">
                    ← Back to Cart
                </button>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl md:text-3xl font-heading font-black text-brand-dark uppercase tracking-tighter">Checkout</h1>
                    <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-sm text-[10px] font-bold">
                        <Lock size={12} /> SECURE
                    </div>
                </div>
                
                <div className="space-y-10">
                    <section>
                        <h2 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand-dark mb-6 border-b border-gray-100 pb-2">1. Delivery Info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-[9px] font-bold uppercase text-gray-400 mb-2">Full Name</label>
                                <input type="text" className="w-full border-b border-gray-200 py-3 text-base md:text-sm focus:border-brand-dark focus:outline-none bg-transparent" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-[9px] font-bold uppercase text-gray-400 mb-2">Phone</label>
                                <input type="tel" className="w-full border-b border-gray-200 py-3 text-base md:text-sm focus:border-brand-dark focus:outline-none bg-transparent" placeholder="+880 1..." />
                            </div>
                            <div>
                                <label className="block text-[9px] font-bold uppercase text-gray-400 mb-2">District</label>
                                <select className="w-full border-b border-gray-200 py-3 text-base md:text-sm bg-transparent focus:border-brand-dark focus:outline-none cursor-pointer">
                                    <option>Dhaka</option>
                                    <option>Chittagong</option>
                                    <option>Sylhet</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[9px] font-bold uppercase text-gray-400 mb-2">Full Address</label>
                                <textarea className="w-full border-b border-gray-200 py-3 text-base md:text-sm focus:border-brand-dark focus:outline-none bg-transparent resize-none" rows={2} placeholder="House, Area, Road..." />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand-dark mb-6 border-b border-gray-100 pb-2">2. Payment Method</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {['bkash', 'nagad', 'cod'].map((method) => (
                                <label 
                                    key={method}
                                    className={`flex items-center gap-4 p-4 md:p-5 border transition-all cursor-pointer ${paymentMethod === method ? 'border-brand-dark bg-gray-50 rounded-lg' : 'border-gray-100 rounded-lg hover:border-gray-200'}`}
                                >
                                    <input type="radio" name="payment" className="accent-brand-dark w-4 h-4" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />
                                    <div className="flex-1">
                                        <div className="font-heading font-black text-sm uppercase text-brand-dark">
                                            {method === 'cod' ? 'Cash on Delivery' : method.toUpperCase()}
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                            {method === 'cod' ? '+৳50 Handling' : 'Fast & Secure'}
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </section>

                    <Button fullWidth onClick={() => { clearCart(); navigateTo('checkout-success'); }} variant="black" className="h-16 text-sm">
                        Confirm Order — {CURRENCY_SYMBOL}{grandTotal.toLocaleString()}
                    </Button>
                </div>
            </div>

            <div className="lg:w-1/3 mt-6 lg:mt-0">
                <div className="bg-gray-50 p-6 md:p-8 sticky top-24 border border-gray-100 rounded-2xl">
                    <h3 className="font-heading font-black text-lg mb-6 text-brand-dark uppercase tracking-tight">Summary</h3>
                    <div className="space-y-4 mb-6 max-h-[30vh] md:max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
                        {cart.map(item => (
                        <div key={item.cartId} className="flex justify-between text-xs py-2 border-b border-gray-200/50 last:border-0">
                            <div className="flex-1 pr-4">
                                <span className="text-brand-dark font-bold block uppercase tracking-tight line-clamp-1">{item.name}</span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Size: {item.selectedSize} | Qty: {item.quantity}</span>
                            </div>
                            <span className="font-sport font-bold text-brand-dark">{CURRENCY_SYMBOL}{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 space-y-3">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                            <span>Subtotal</span>
                            <span className="text-brand-dark font-sport">{CURRENCY_SYMBOL}{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                            <span>Shipping</span>
                            <span className="text-brand-dark font-sport">{CURRENCY_SYMBOL}{shippingCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-heading font-black text-xl text-brand-dark pt-4 border-t border-gray-200 mt-4">
                            <span>TOTAL</span>
                            <span className="font-sport">{CURRENCY_SYMBOL}{grandTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 animate-fade-in">
      <div className="mb-6 md:mb-8">
        <Breadcrumbs items={[{ label: 'Cart', view: 'cart' as const }]} />
      </div>

      <h1 className="text-3xl md:text-5xl font-heading font-black mb-8 md:mb-12 text-center text-brand-dark uppercase tracking-tighter">Your Bag ({cart.length})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.cartId} className="flex gap-4 md:gap-6 p-3 md:p-4 border-b border-gray-50 last:border-0">
              <div className="w-24 h-32 md:w-28 md:h-36 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start mb-1 md:mb-2">
                    <h3 className="font-heading font-bold text-brand-dark text-base md:text-lg line-clamp-1 uppercase tracking-tight">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.cartId)} className="text-gray-300 hover:text-brand-crimson p-1 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">Size: <span className="text-brand-dark">{item.selectedSize}</span></div>
                  {item.customization && (
                    <div className="text-[10px] font-bold bg-gray-50 inline-block px-2 py-1 text-gray-500 rounded mt-2 uppercase tracking-widest">
                      {item.customization.name} #{item.customization.number}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-gray-100 h-8 rounded-full px-2 bg-gray-50">
                    <button onClick={() => updateQuantity(item.cartId, -1)} className="px-2 h-full text-gray-500 font-bold active:bg-gray-200 rounded-l-full transition-colors">-</button>
                    <span className="px-3 text-xs font-black min-w-[32px] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartId, 1)} className="px-2 h-full text-gray-500 font-bold active:bg-gray-200 rounded-r-full transition-colors">+</button>
                  </div>
                  <div className="font-sport font-bold text-base md:text-lg text-brand-dark">
                    {CURRENCY_SYMBOL}{((item.price + (item.customization ? 800 : 0)) * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 mt-6 lg:mt-0">
          <div className="bg-gray-50 p-6 md:p-8 rounded-2xl sticky top-24">
            <h3 className="font-heading font-black text-lg mb-6 text-brand-dark uppercase tracking-tight">Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>Items Subtotal</span>
                <span className="text-brand-dark font-sport">{CURRENCY_SYMBOL}{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                 <span>Shipping</span>
                 <span>{shippingCost === 0 ? <span className="text-green-600">FREE</span> : `${CURRENCY_SYMBOL}${shippingCost}`}</span>
              </div>
              <div className="border-t border-gray-200 pt-5 flex justify-between font-heading font-black text-xl text-brand-dark">
                <span>TOTAL</span>
                <span className="font-sport">{CURRENCY_SYMBOL}{grandTotal.toLocaleString()}</span>
              </div>
            </div>
            <Button fullWidth onClick={() => setStep('checkout')} variant="black" className="h-16 text-sm">
              Checkout Now <ArrowRight size={18} />
            </Button>
            <div className="mt-6 flex justify-center gap-3 opacity-30 grayscale scale-90">
                <div className="w-10 h-6 bg-gray-300 rounded-sm"></div>
                <div className="w-10 h-6 bg-gray-300 rounded-sm"></div>
                <div className="w-10 h-6 bg-gray-300 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
