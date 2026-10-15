'use client';

import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Logo } from '@/components/Logo';
import { SearchOverlay } from '@/components/SearchOverlay';
import type { Product } from '@/lib/products';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
];

export function Navbar({ products }: { products: Product[] }) {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-primary/20 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm font-medium transition-colors hover:text-primary-dark ${
                    active ? 'text-primary-dark' : 'text-cocoa'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="rounded-full p-2.5 hover:bg-blush"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/login" aria-label="Account" className="hidden rounded-full p-2.5 hover:bg-blush sm:block">
            <User className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${itemCount} items`}
            className="relative rounded-full p-2.5 hover:bg-blush"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-dark px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="rounded-full p-2.5 hover:bg-blush md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="space-y-1 border-t border-primary/20 bg-cream px-4 py-3 md:hidden">
          {[...LINKS, { href: '/login', label: 'Account' }].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-3 font-medium text-cocoa hover:bg-blush"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} products={products} />
    </header>
  );
}
