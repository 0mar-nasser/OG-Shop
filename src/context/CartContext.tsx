'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product } from '@/types/product';
import { CartItem, Coupon, CartSummaryData } from '@/types/cart';
import { MOCK_COUPONS } from '@/data/products';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedSize: string, selectedColor: { name: string; hex: string }, quantity?: number) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  summary: CartSummaryData;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 300;
const STANDARD_SHIPPING_FEE = 25;

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fashion_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem('fashion_coupon');
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('fashion_cart', JSON.stringify(cart));
      if (appliedCoupon) {
        localStorage.setItem('fashion_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('fashion_coupon');
      }
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart, appliedCoupon, isLoaded]);

  const addToCart = useCallback((
    product: Product,
    selectedSize: string,
    selectedColor: { name: string; hex: string },
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${selectedSize}-${selectedColor.name}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            selectedSize,
            selectedColor,
            quantity
          }
        ];
      }
    });

    showToast(`تمت إضافة "${product.name}" إلى السلة`, 'success');
  }, [showToast]);

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  }, []);

  const setQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('تم حذف المنتج من السلة', 'info');
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = useCallback((code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const found = MOCK_COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      showToast('كوبون الخصم غير صالح أو منتهي', 'error');
      return false;
    }

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (found.minSpend && subtotal < found.minSpend) {
      showToast(`هذا الكوبون يتطلب مشتريات بقيمة ${found.minSpend} درهم على الأقل`, 'warning');
      return false;
    }

    setAppliedCoupon(found);
    showToast(`تم تطبيق الكوبون ${found.code} بنجاح!`, 'success');
    return true;
  }, [cart, showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast('تم إلغاء كوبون الخصم', 'info');
  }, [showToast]);

  // Calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const discount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.discountPercentage) / 100)
    : 0;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shipping = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const total = Math.max(0, subtotal - discount + shipping);

  const summary: CartSummaryData = {
    subtotal,
    discount,
    shipping,
    tax: 0,
    total,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountNeededForFreeShipping,
    appliedCoupon
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        setQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        summary,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
