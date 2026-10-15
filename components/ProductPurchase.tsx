'use client';

import { Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/lib/products';

export function ProductPurchase({ product, packLabel }: { product: Product; packLabel: string }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const mainButton = useRef<HTMLButtonElement>(null);
  const outOfStock = product.stock <= 0;

  // Show the sticky bar only after the main button has scrolled out of view
  useEffect(() => {
    const el = mainButton.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const add = () =>
    addItem(
      { slug: product.slug, name: product.name, price: product.price, image: product.images[0] },
      quantity,
    );

  return (
    <>
      <div className="space-y-5">
        <p className="text-3xl font-bold text-cocoa">
          {formatPrice(product.price)} <span className="text-base font-normal text-cocoa-soft">· {packLabel}</span>
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 rounded-full border border-primary/60 bg-white px-2">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-3 hover:text-primary-dark"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center font-semibold" aria-live="polite">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              className="p-3 hover:text-primary-dark"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            ref={mainButton}
            type="button"
            onClick={add}
            disabled={outOfStock}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-cocoa transition-colors hover:bg-primary-dark disabled:opacity-50"
          >
            <ShoppingBag className="h-5 w-5" />
            {outOfStock ? 'Sold out' : `Add to cart · ${formatPrice(product.price * quantity)}`}
          </button>
        </div>
      </div>

      {/* Sticky add-to-cart, desktop only */}
      <div
        aria-hidden={!showSticky}
        className={`fixed inset-x-0 bottom-0 z-30 hidden border-t border-primary/30 bg-cream/95 shadow-[0_-8px_30px_-12px_rgba(61,43,31,0.25)] backdrop-blur transition-transform duration-300 md:block ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl">
              <Image src={product.images[0]} alt="" fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <p className="font-semibold text-cocoa">{product.name}</p>
              <p className="text-sm text-cocoa-soft">{formatPrice(product.price)}</p>
            </div>
          </div>
          <button
            type="button"
            tabIndex={showSticky ? 0 : -1}
            onClick={add}
            disabled={outOfStock}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-cocoa hover:bg-primary-dark disabled:opacity-50"
          >
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </button>
        </div>
      </div>
    </>
  );
}
