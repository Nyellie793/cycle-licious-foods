import type { Metadata } from 'next';
import {
  AlertTriangle,
  Coffee,
  Cookie,
  Droplets,
  Footprints,
  Heart,
  Leaf,
  Sun,
  Wheat,
  type LucideIcon,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { Accordion } from '@/components/Accordion';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductPurchase } from '@/components/ProductPurchase';
import { Reveal } from '@/components/Reveal';
import { PRODUCT_CONTENT, getProductBySlug, getProducts } from '@/lib/products';

const ICONS: Record<string, LucideIcon> = {
  wheat: Wheat,
  leaf: Leaf,
  footprints: Footprints,
  cookie: Cookie,
  heart: Heart,
  droplets: Droplets,
  sun: Sun,
  coffee: Coffee,
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();
  const content = PRODUCT_CONTENT[product.slug];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
      {/* Hero: gallery + buy box */}
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-dark">Cycle-licious Foods</p>
            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">{product.name}</h1>
            {content && <p className="mt-3 text-lg text-cocoa-soft">{content.tagline}</p>}
          </div>
          <p className="text-cocoa-soft">{product.description}</p>
          <ProductPurchase product={product} packLabel={content?.packLabel ?? ''} />
          <div className="flex gap-3 rounded-2xl bg-blush-soft p-4 text-sm">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
            <p>
              <span className="font-semibold">Allergy information:</span> {product.allergy_info}
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <section className="mt-20">
        <Reveal>
          <h2 className="text-3xl font-bold">Why you&apos;ll love it</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {product.benefits.map((benefit, i) => {
            const Icon = ICONS[content?.benefitIcons[i] ?? 'leaf'] ?? Leaf;
            return (
              <Reveal key={benefit} delay={i * 0.06}>
                <div className="flex h-full flex-col items-center gap-3 rounded-3xl bg-white p-6 text-center shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush">
                    <Icon className="h-6 w-6 text-primary-dark" />
                  </span>
                  <p className="text-sm font-semibold">{benefit}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Ingredients + nutrition */}
      <section className="mt-20 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-bold">Ingredients</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {product.ingredients.map((ingredient) => (
              <li key={ingredient} className="rounded-full bg-blush px-4 py-2 text-sm font-medium">
                {ingredient}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-cocoa-soft">{product.allergy_info}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl font-bold">Nutrition</h2>
          <NutritionTable title={product.nutrition.serving} rows={product.nutrition.rows} />
          {product.nutrition.per100 && <NutritionTable title="per 100g" rows={product.nutrition.per100} />}
        </Reveal>
      </section>

      {/* How to use */}
      {content && (
        <section className="mt-20">
          <Reveal>
            <h2 className="text-3xl font-bold">How to enjoy</h2>
          </Reveal>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {content.howToUse.map((step, i) => (
              <li key={step} className="rounded-3xl bg-white p-6 shadow-soft">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold">{i + 1}</span>
                <p className="mt-3 text-cocoa-soft">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* FAQ */}
      {content && (
        <section className="mx-auto mt-20 max-w-3xl pb-16">
          <Reveal>
            <h2 className="mb-8 text-center text-3xl font-bold">Questions, answered</h2>
            <Accordion items={content.faqs} />
          </Reveal>
        </section>
      )}
    </div>
  );
}

function NutritionTable({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <table className="mt-6 w-full overflow-hidden rounded-3xl bg-white text-sm shadow-soft first-of-type:mt-6 [&+table]:mt-4">
      <caption className="bg-primary px-5 py-3 text-left font-semibold capitalize">Nutrition {title}</caption>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className="border-t border-primary/20">
            <th scope="row" className={`px-5 py-3 text-left ${label.startsWith('of which') ? 'pl-9 font-normal text-cocoa-soft' : 'font-semibold'}`}>
              {label}
            </th>
            <td className="px-5 py-3 text-right">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
