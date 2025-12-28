
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md leading-relaxed">Looks like you haven't added any jerseys yet. Explore our latest collections to find your match.</p>
        <Button onClick={() => navigateTo('shop')} variant="black">Start Shopping</Button>
      </div>
    );
  }

  const shippingCost = cartTotal > 2000 ? 0 : 100;
  const grandTotal = cartTotal + shippingCost;

  const cartBreadcrumbs = [
    { label: 'Cart', view: 'cart' as const }
  ];

  const checkoutBreadcrumbs = [
    { label: 'Cart', view: 'cart' as const },
    { label: 'Checkout' }
  ];

  const CheckoutProgress = () => (
    <div className="flex items-center justify-center gap-4 mb-12">
        <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step === 'cart' ? 'bg-brand-dark text-white ring-4 ring-gray-100' : 'bg-green-500 text-white'}`}>
                {step === 'checkout' ? <CheckCircle size={20} /> : '01'}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${step === 'cart' ? 'text-brand-dark' : 'text-gray-400'}`}>Cart</span>
        </div>
        <div className={`h-[2px] w-12 ${step === 'checkout' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
        <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step === 'checkout' ? 'bg-brand-dark text-white ring-4 ring-gray-100' : 'bg-gray-100 text-gray-400'}`}>
                02
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${step === 'checkout' ? 'text-brand-dark' : 'text-gray-400'}`}>Checkout</span>
        </div>
        <div className="h-[2px] w-12 bg-gray-200"></div>
        <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-gray-100 text-gray-400">
                03
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order</span>
        </div>
    </div>
  );

  if (step === 'checkout') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
            <Breadcrumbs items={checkoutBreadcrumbs} />
        </div>
        
        <CheckoutProgress />

        <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
                <button onClick={() => setStep('cart')} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-brand-dark mb-8 flex items-center gap-2">
                    ← Back to Cart
                </button>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-heading font-bold text-brand-dark">Checkout</h1>
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded text-xs font-bold">
                        <Lock size={12} /> Secure Checkout
                    </div>
                </div>
                
                <div className="space-y-10">
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-dark mb-6 border-b border-gray-200 pb-2">1. Shipping Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-2">Full Name</label>
                                <input type="text" className="w-full border-b border-gray-300 py-2 focus:border-brand-dark focus:outline-none transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-2">Phone Number</label>
                                <input type="tel" className="w-full border-b border-gray-300 py-2 focus:border-brand-dark focus:outline-none transition-colors" placeholder="+880 17..." />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-2">District</label>
                                <select className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-brand-dark focus:outline-none cursor-pointer">
                                    <option>Dhaka</option>
                                    <option>Chittagong</option>
                                    <option>Sylhet</option>
                                    <option>Rajshahi</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-2">Full Address</label>
                                <textarea className="w-full border-b border-gray-300 py-2 focus:border-brand-dark focus:outline-none transition-colors resize-none" rows={2} placeholder="House, Road, Area..." />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-dark mb-6 border-b border-gray-200 pb-2">2. Payment Method</h2>
                        <div className="space-y-4">
                            {[
                                { id: 'bkash', name: 'bKash', color: 'text-pink-600', sub: 'Fast & Secure' },
                                { id: 'nagad', name: 'Nagad', color: 'text-orange-600', sub: 'Mobile Banking' },
                                { id: 'cod', name: 'Cash on Delivery', color: 'text-brand-dark', sub: '+৳50 Fee' }
                            ].map((method) => (
                                <label 
                                    key={method.id}
                                    className={`flex items-center gap-4 p-5 border rounded rounded-[2px] cursor-pointer transition-all ${
                                        paymentMethod === method.id 
                                        ? 'border-brand-dark bg-gray-50' 
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        className="accent-brand-dark w-4 h-4" 
                                        checked={paymentMethod === method.id} 
                                        onChange={() => setPaymentMethod(method.id)} 
                                    />
                                    <div className="flex-1">
                                        <div className={`font-heading font-bold ${method.id === paymentMethod ? 'text-brand-dark' : 'text-gray-600'}`}>
                                            {method.name}
                                        </div>
                                        <div className="text-xs text-gray-400">{method.sub}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </section>

                    <Button fullWidth onClick={() => { clearCart(); navigateTo('checkout-success'); }} variant="black">
                        Place Order • {CURRENCY_SYMBOL}{grandTotal.toLocaleString()}
                    </Button>
                </div>
            </div>

            <div className="lg:w-1/3">
                <div className="bg-gray-50 p-8 sticky top-24 border border-gray-100 rounded-[2px]">
                    <h3 className="font-heading font-bold text-lg mb-6 text-brand-dark">Order Summary</h3>
                    <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                        {cart.map(item => (
                        <div key={item.cartId} className="flex justify-between text-sm py-2 border-b border-gray-200/50 last:border-0">
                            <div className="flex-1 pr-4">
                                <span className="text-brand-dark font-medium block">{item.name}</span>
                                <span className="text-xs text-gray-500">Size: {item.selectedSize} | Qty: {item.quantity}</span>
                                {item.customization && <div className="text-[10px] text-gray-400 mt-1 uppercase">Customized</div>}
                            </div>
                            <span className="font-medium text-brand-dark">{CURRENCY_SYMBOL}{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>{CURRENCY_SYMBOL}{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span>{CURRENCY_SYMBOL}{shippingCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-heading font-bold text-xl text-brand-dark pt-4">
                            <span>Total</span>
                            <span>{CURRENCY_SYMBOL}{grandTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <Breadcrumbs items={cartBreadcrumbs} />
      </div>

      <h1 className="text-4xl font-heading font-bold mb-12 text-center text-brand-dark">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.cartId} className="flex gap-6 p-4 border-b border-gray-100 last:border-0">
              <div className="w-28 h-36 bg-gray-50 overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading font-bold text-brand-dark text-lg">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.cartId)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Size: <span className="text-brand-dark font-medium">{item.selectedSize}</span></div>
                  {item.customization && (
                    <div className="text-xs bg-gray-50 inline-block px-2 py-1 text-gray-600 border border-gray-100 mt-1">
                      Custom: <span className="font-bold">{item.customization.name} #{item.customization.number}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-gray-200 h-8 rounded-full px-2">
                    <button onClick={() => updateQuantity(item.cartId, -1)} className="px-2 hover:bg-gray-100 h-full text-gray-500 rounded-l-full">-</button>
                    <span className="px-2 text-sm font-bold min-w-[24px] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartId, 1)} className="px-2 hover:bg-gray-100 h-full text-gray-500 rounded-r-full">+</button>
                  </div>
                  <div className="font-heading font-bold text-lg text-brand-dark">
                    {CURRENCY_SYMBOL}{((item.price + (item.customization ? 800 : 0)) * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="font-heading font-bold text-lg mb-6 text-brand-dark">Total</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{CURRENCY_SYMBOL}{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                 <span>Shipping Est.</span>
                 <span>{shippingCost === 0 ? <span className="text-green-600 font-bold text-xs uppercase tracking-wider">Free</span> : `${CURRENCY_SYMBOL}${shippingCost}`}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-heading font-bold text-xl text-brand-dark">
                <span>Total</span>
                <span>{CURRENCY_SYMBOL}{grandTotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-400">Shipping & taxes calculated at checkout</p>
            </div>
            <Button fullWidth onClick={() => setStep('checkout')} variant="black">
              Checkout <ArrowRight size={16} />
            </Button>
            <div className="mt-6 flex justify-center gap-4 opacity-50 grayscale">
                <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
