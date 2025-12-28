
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
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={28} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-heading font-black text-brand-dark mb-3 uppercase tracking-tighter">Empty Bag</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-xs leading-relaxed">Your shopping bag is currently empty. Explore our latest premium kits.</p>
        <Button onClick={() => navigateTo('shop')} variant="black" className="px-10 rounded-full">Browse Shop</Button>
      </div>
    );
  }

  const shippingCost = cartTotal > 2000 ? 0 : 100;
  const grandTotal = cartTotal + shippingCost;

  const CheckoutProgress = () => (
    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10 scale-90 sm:scale-100">
        <div className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs ${step === 'cart' ? 'bg-brand-dark text-white shadow-xl' : 'bg-green-500 text-white'}`}>
                {step === 'checkout' ? <CheckCircle size={16} /> : '1'}
            </div>
            <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${step === 'cart' ? 'text-brand-dark' : 'text-gray-400'}`}>Bag</span>
        </div>
        <div className={`h-[1px] w-6 sm:w-12 ${step === 'checkout' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
        <div className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs ${step === 'checkout' ? 'bg-brand-dark text-white shadow-xl' : 'bg-gray-100 text-gray-400'}`}>
                2
            </div>
            <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${step === 'checkout' ? 'text-brand-dark' : 'text-gray-400'}`}>Checkout</span>
        </div>
    </div>
  );

  if (step === 'checkout') {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 animate-fade-in">
        <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Bag', view: 'cart' as const }, { label: 'Checkout' }]} />
        </div>
        
        <CheckoutProgress />

        <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 order-2 lg:order-1">
                <button onClick={() => setStep('cart')} className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-dark mb-8 flex items-center gap-2">
                    ← Edit Bag
                </button>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl sm:text-3xl font-heading font-black text-brand-dark uppercase tracking-tighter">Shipping Info</h1>
                    <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded text-[8px] font-black">
                        <Lock size={12} /> SECURE
                    </div>
                </div>
                
                <div className="space-y-8">
                    <section className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-[8px] font-black uppercase text-gray-400 tracking-widest mb-2">Full Name</label>
                                <input type="text" className="w-full border-b border-gray-100 py-3 text-sm focus:border-brand-dark focus:outline-none bg-transparent" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-[8px] font-black uppercase text-gray-400 tracking-widest mb-2">Phone Number</label>
                                <input type="tel" className="w-full border-b border-gray-100 py-3 text-sm focus:border-brand-dark focus:outline-none bg-transparent" placeholder="+880 1..." />
                            </div>
                            <div>
                                <label className="block text-[8px] font-black uppercase text-gray-400 tracking-widest mb-2">District</label>
                                <select className="w-full border-b border-gray-100 py-3 text-sm bg-transparent focus:border-brand-dark focus:outline-none cursor-pointer">
                                    <option>Dhaka</option>
                                    <option>Chittagong</option>
                                    <option>Sylhet</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[8px] font-black uppercase text-gray-400 tracking-widest mb-2">Address</label>
                                <input type="text" className="w-full border-b border-gray-100 py-3 text-sm focus:border-brand-dark focus:outline-none bg-transparent" placeholder="House, Road, Area..." />
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark mb-4">Payment Method</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {['bkash', 'nagad', 'cod'].map((method) => (
                                <label 
                                    key={method}
                                    className={`flex items-center gap-4 p-4 border transition-all cursor-pointer rounded-xl ${paymentMethod === method ? 'border-brand-dark bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <input type="radio" name="payment" className="accent-brand-dark w-4 h-4" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />
                                    <div className="flex-1">
                                        <div className="font-heading font-black text-sm uppercase text-brand-dark leading-none mb-1">
                                            {method === 'cod' ? 'Cash on Delivery' : method.toUpperCase()}
                                        </div>
                                        <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                                            {method === 'cod' ? '+৳50 Handling' : 'Instant Confirmation'}
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </section>

                    <Button fullWidth onClick={() => { clearCart(); navigateTo('checkout-success'); }} variant="black" className="h-16 text-xs sm:text-sm rounded-full shadow-2xl">
                        Place Order — {CURRENCY_SYMBOL}{grandTotal.toLocaleString()}
                    </Button>
                </div>
            </div>

            <div className="lg:w-1/3 order-1 lg:order-2">
                <div className="bg-gray-50 p-6 sm:p-8 sticky top-24 border border-gray-100 rounded-2xl">
                    <h3 className="font-heading font-black text-lg mb-6 text-brand-dark uppercase tracking-tight">Summary</h3>
                    <div className="space-y-4 mb-6 max-h-[30vh] overflow-y-auto pr-2 no-scrollbar">
                        {cart.map(item => (
                        <div key={item.cartId} className="flex justify-between gap-4 text-xs py-3 border-b border-gray-200/50 last:border-0">
                            <div className="flex-1 pr-4">
                                <span className="text-brand-dark font-bold block uppercase tracking-tight truncate">{item.name}</span>
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Size {item.selectedSize} × {item.quantity}</span>
                            </div>
                            <span className="font-sport font-bold text-brand-dark">{CURRENCY_SYMBOL}{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 space-y-3">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            <span>Subtotal</span>
                            <span className="text-brand-dark font-sport">{CURRENCY_SYMBOL}{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            <span>Shipping</span>
                            <span className="text-brand-dark font-sport">{shippingCost === 0 ? 'FREE' : `${CURRENCY_SYMBOL}${shippingCost}`}</span>
                        </div>
                        <div className="flex justify-between font-heading font-black text-2xl text-brand-dark pt-5 border-t border-gray-200 mt-5">
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 animate-fade-in">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'Shopping Bag', view: 'cart' as const }]} />
      </div>

      <h1 className="text-2xl sm:text-5xl font-heading font-black mb-8 text-center text-brand-dark uppercase tracking-tighter">Your Bag <span className="text-brand-crimson">({cart.length})</span></h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.cartId} className="flex gap-4 p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors rounded-xl">
              <div className="w-20 h-28 sm:w-28 sm:h-36 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-heading font-bold text-brand-dark text-sm sm:text-lg truncate uppercase tracking-tight">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.cartId)} className="text-gray-300 hover:text-brand-crimson p-1 transition-colors shrink-0 active:scale-90">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Size {item.selectedSize}</div>
                  {item.customization && (
                    <div className="text-[8px] font-black bg-brand-crimson/10 inline-block px-2 py-1 text-brand-crimson rounded uppercase tracking-[0.1em]">
                      {item.customization.name} • {item.customization.number}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-gray-100 h-8 rounded-full px-1 bg-white">
                    <button onClick={() => updateQuantity(item.cartId, -1)} className="w-7 h-full text-gray-400 font-bold active:bg-gray-100 rounded-l-full">-</button>
                    <span className="px-2 text-[10px] font-black min-w-[24px] text-center text-brand-dark">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartId, 1)} className="w-7 h-full text-gray-400 font-bold active:bg-gray-100 rounded-r-full">+</button>
                  </div>
                  <div className="font-sport font-bold text-base sm:text-lg text-brand-dark">
                    {CURRENCY_SYMBOL}{((item.price + (item.customization ? 800 : 0)) * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm lg:sticky lg:top-24">
            <h3 className="font-heading font-black text-lg mb-6 text-brand-dark uppercase tracking-tight">Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <span>Items Subtotal</span>
                <span className="text-brand-dark font-sport">{CURRENCY_SYMBOL}{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                 <span>Shipping</span>
                 <span>{shippingCost === 0 ? <span className="text-green-600">FREE</span> : `${CURRENCY_SYMBOL}${shippingCost}`}</span>
              </div>
              <div className="border-t border-gray-200 pt-5 flex justify-between font-heading font-black text-2xl text-brand-dark">
                <span>TOTAL</span>
                <span className="font-sport">{CURRENCY_SYMBOL}{grandTotal.toLocaleString()}</span>
              </div>
            </div>
            <Button fullWidth onClick={() => setStep('checkout')} variant="black" className="h-16 text-xs sm:text-sm rounded-full shadow-2xl">
              Proceed to Checkout <ArrowRight size={18} />
            </Button>
            <div className="mt-6 flex flex-wrap justify-center gap-2 opacity-20 grayscale scale-75">
                <div className="h-6 w-10 bg-gray-400 rounded-sm"></div>
                <div className="h-6 w-10 bg-gray-400 rounded-sm"></div>
                <div className="h-6 w-10 bg-gray-400 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
