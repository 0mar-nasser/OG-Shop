import { Product } from './product';

export interface CartItem {
  id: string; // unique cart item id (product.id + size + color)
  product: Product;
  selectedSize: string;
  selectedColor: {
    name: string;
    hex: string;
  };
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minSpend?: number;
  description: string;
}

export interface CartSummaryData {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  appliedCoupon: Coupon | null;
}
