'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { formatPrice } from '@/lib/format';
import { PRODUCT_CONTENT, type Product } from '@/lib/products';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const content = PRODUCT_CONTENT[product.slug];

  return (
    <article className="group flex flex-col overflow-hidden rounded-4xl bg-white shadow-soft transition-transform hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-blush-soft">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-cocoa">
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </h3>
            <p className="text-sm text-cocoa-soft">{content?.packLabel}</p>
          </div>
          <p className="text-lg font-bold text-cocoa">{formatPrice(product.price)}</p>
        </div>
        <p className="text-sm text-cocoa-soft">{content?.tagline}</p>
        <div className="mt-auto flex gap-3 pt-2">
          <button
            type="button"
            onClick={() =>
              addItem({
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
              })
            }
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-cocoa transition-colors hover:bg-primary-dark"
          >
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center rounded-full border border-primary px-5 py-3 text-sm font-semibold text-cocoa transition-colors hover:bg-blush"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
