import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem, PageView } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface Notification {
  message: string;
  type: 'success' | 'info';
  id: number;
}

interface StoreContextType {
  // Navigation
  currentPage: PageView;
  currentProduct: Product | null;
  navigateTo: (page: PageView, product?: Product) => void;
  
  // Shop Filter
  activeCategory: string;
  setCategory: (category: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, customization?: { name: string; number: string; font: string }) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  cartTotal: number;
  cartCount: number;
  clearCart: () => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // UI
  notifications: Notification[];
  showNotification: (message: string, type?: 'success' | 'info') => void;
  removeNotification: (id: number) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const navigateTo = (page: PageView, product?: Product) => {
    window.scrollTo(0, 0);
    if (product) setCurrentProduct(product);
    setCurrentPage(page);
  };

  const setCategory = (category: string) => {
    setActiveCategory(category);
  };

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { message, type, id }]);
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addToCart = (product: Product, size: string, customization?: { name: string; number: string; font: string }) => {
    const newItem: CartItem = {
      ...product,
      cartId: Math.random().toString(36).substr(2, 9),
      selectedSize: size,
      quantity: 1,
      customization
    };
    setCart(prev => [...prev, newItem]);
    showNotification(`Added ${product.name} to cart`);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isRemoving = prev.includes(productId);
      const product = MOCK_PRODUCTS.find(p => p.id === productId);
      const name = product ? product.name : 'Item';
      
      showNotification(
        isRemoving ? `Removed from Wishlist` : `Added to Wishlist`, 
        'info'
      );
      
      return isRemoving 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId];
    });
  };

  const cartTotal = cart.reduce((acc, item) => {
    let price = item.price;
    if (item.customization) price += 800; // Customization fee
    return acc + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      currentPage,
      currentProduct,
      navigateTo,
      activeCategory,
      setCategory,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount,
      clearCart,
      wishlist,
      toggleWishlist,
      notifications,
      showNotification,
      removeNotification
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};