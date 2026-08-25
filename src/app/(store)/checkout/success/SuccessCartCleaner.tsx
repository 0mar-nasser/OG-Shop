'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';

export function SuccessCartCleaner() {
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (!hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }
  }, [clearCart]);

  return null;
}
