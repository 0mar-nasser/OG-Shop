export type CategorySlug = 'men' | 'women' | 'unisex';

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  categoryName: string;
  subcategory: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  images: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  sizes: string[];
  rating: number;
  reviewsCount: number;
  description: string;
  shortDescription: string;
  material: string;
  careInstructions: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  featured?: boolean;
  sku: string;
  reviews?: ProductReview[];
}

export interface FilterState {
  category?: string;
  subcategories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  minRating: number;
  onlyDiscount: boolean;
  onlyInStock: boolean;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
}
