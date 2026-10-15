'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/lib/products';

export function SearchOverlay({
  open,
  onClose,
  products,
}: {
  open: boolean;
  onClose: () => void;
  products: Product[];
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.description, ...p.ingredients, ...p.benefits].join(' ').toLowerCase().includes(q),
    );
  }, [query, products]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-cocoa/40 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            className="mx-auto mt-16 max-w-xl rounded-3xl bg-cream p-5 shadow-2xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 rounded-full border border-primary/50 bg-white px-4 py-3">
              <Search className="h-5 w-5 text-primary-dark" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bars, granola, ingredients..."
                className="flex-1 bg-transparent text-cocoa placeholder:text-cocoa-soft/60 focus:outline-none"
                aria-label="Search"
              />
              <button type="button" onClick={onClose} aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {results.length === 0 && (
                <li className="px-2 py-6 text-center text-sm text-cocoa-soft">
                  No products match &ldquo;{query}&rdquo;.
                </li>
              )}
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 rounded-2xl p-2 hover:bg-blush"
                  >
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-blush-soft">
                      <Image src={p.images[0]} alt="" fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-cocoa">{p.name}</p>
                      <p className="text-sm text-cocoa-soft">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
