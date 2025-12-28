export type ProductStatus = 'in-stock' | 'low-stock' | 'pre-order' | 'out-of-stock';
export type JerseyType = 'Home' | 'Away' | 'Third' | 'Special';
export type League = 'La Liga' | 'Premier League' | 'Serie A' | 'International';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[]; // Multiple images for product detail page
  category: string;
  team: string;
  league: League;
  type: JerseyType;
  isPlayerEdition: boolean;
  status: ProductStatus;
  rating: number;
  reviews: number;
  description: string;
  season?: string;
  color?: string; // Hex code for primary team color (without #)
}

export interface CartItem extends Product {
  cartId: string;
  selectedSize: string;
  quantity: number;
  customization?: {
    name: string;
    number: string;
    font: string;
  };
}

export type PageView = 'home' | 'shop' | 'product' | 'cart' | 'checkout-success' | 'wishlist';

export interface FilterState {
  league: string[];
  type: string[];
  maxPrice: number;
}