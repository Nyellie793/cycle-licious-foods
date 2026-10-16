import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ComingSoon';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { getProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Shop the Chocolate Love Bar and Exotic Passion Granola.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Our products</h1>
          <p className="mt-4 text-lg text-cocoa-soft">
            Fibre-rich, whole-food and made for your mornings.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
      <ComingSoon className="bg-blush-soft" />
    </>
  );
}
