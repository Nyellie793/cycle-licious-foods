'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { ShippingCalculator } from '@/components/ShippingCalculator';
import { formatPrice } from '@/lib/format';
import { calculateShipping } from '@/lib/shipping';

export function CartDrawer() {
  const { items, isOpen, closeCart, setQuantity, removeItem, subtotal } = useCart();
  const [country, setCountry] = useState('GB');
  const shipping = calculateShipping(country, subtotal);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-cocoa/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <header className="flex items-center justify-between border-b border-primary/30 px-6 py-5">
              <h2 className="text-lg font-bold text-cocoa">Your cart</h2>
              <button type="button" onClick={closeCart} aria-label="Close cart" className="rounded-full p-2 hover:bg-blush">
                <X className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingBag className="h-12 w-12 text-primary" />
                <p className="font-semibold text-cocoa">Your cart is empty</p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-cocoa hover:bg-primary-dark"
                >
                  Shop products
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {items.map((item) => (
                    <li key={item.slug} className="flex gap-4 rounded-2xl bg-white p-3 shadow-sm">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-blush-soft">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between gap-2">
                          <p className="text-sm font-semibold text-cocoa">{item.name}</p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.slug)}
                            aria-label={`Remove ${item.name}`}
                            className="text-cocoa-soft hover:text-cocoa"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-primary/50">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQuantity(item.slug, item.quantity - 1)}
                              className="p-2 hover:text-primary-dark"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQuantity(item.slug, item.quantity + 1)}
                              className="p-2 hover:text-primary-dark"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="space-y-4 border-t border-primary/30 px-6 py-5">
                  <ShippingCalculator country={country} onCountryChange={setCountry} subtotal={subtotal} />
                  <dl className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-cocoa-soft">Subtotal</dt>
                      <dd>{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-cocoa-soft">Shipping</dt>
                      <dd>{shipping.cost === 0 ? 'Free' : formatPrice(shipping.cost)}</dd>
                    </div>
                    <div className="flex justify-between pt-2 text-base font-bold">
                      <dt>Total</dt>
                      <dd>{formatPrice(subtotal + shipping.cost)}</dd>
                    </div>
                  </dl>
                  <Link
                    href={`/checkout?country=${country}`}
                    onClick={closeCart}
                    className="block rounded-full bg-primary py-4 text-center font-semibold text-cocoa transition-colors hover:bg-primary-dark"
                  >
                    Checkout
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
