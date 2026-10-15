'use client';

import { useEffect } from 'react';
import { useCart } from '@/components/CartProvider';

/** Empties the cart once a paid order is confirmed. */
export function ClearCartOnMount() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
