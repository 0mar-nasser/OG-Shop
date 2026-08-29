'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';

interface SuccessCartCleanerProps {
  orderNumber?: string;
}

export function SuccessCartCleaner({ orderNumber }: SuccessCartCleanerProps) {
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (!hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }

    if (orderNumber) {
      try {
        const stored = localStorage.getItem('raqi_recent_orders');
        const recentOrders: string[] = stored ? JSON.parse(stored) : [];
        if (!recentOrders.includes(orderNumber)) {
          recentOrders.unshift(orderNumber);
          localStorage.setItem('raqi_recent_orders', JSON.stringify(recentOrders.slice(0, 10)));
        }
      } catch (e) {
        console.error('Failed to save recent order', e);
      }
    }
  }, [clearCart, orderNumber]);

  return null;
}

