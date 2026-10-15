import { ArrowRight, Leaf, ShoppingBag, Sparkles, Wheat } from 'lucide-react';
import Link from 'next/link';
import { InstagramSection } from '@/components/InstagramSection';
import { LifestylePhoto } from '@/components/LifestylePhoto';
import { NewsletterForm } from '@/components/NewsletterForm';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { Testimonials } from '@/components/Testimonials';
import { getProducts } from '@/lib/products';

const PROBLEMS = [
  'Many breakfast bars are built around refined sugar and very little fibre.',
  'Most are designed for everyone, not for the way women eat across the month.',
  'Ingredient lists are long, vague and hard to trust.',
];

const SOLUTIONS = [
  'Whole-food ingredients like flaxseed, almonds, dates and millet.',
  '5-6g of fibre per serving to help you reach your daily goal.',
  'Researched with women, and tested by women, before it reached a box.',
];

const STEPS = [
  { icon: Wheat, title: 'Choose your breakfast', text: 'Pick the Chocolate Love Bar, Exotic Passion Granola, or both.' },
  { icon: ShoppingBag, title: 'We pack and ship', text: 'Your order is packed and sent straight to your door.' },
  { icon: Sparkles, title: 'Make it a habit', text: 'Enjoy a fibre-rich breakfast that fits your morning, every day.' },
];

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 text-sm font-semibold">
              <Leaf className="h-4 w-4 text-primary-dark" /> Women-led · Research-first
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Breakfast That Loves Your Hormones Back
            </h1>
            <p className="mt-5 max-w-md text-lg text-cocoa-soft">
              Fibre-rich, whole-food bars and granola made for women who want mornings that feel good and taste even better.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-cocoa shadow-soft transition-colors hover:bg-primary-dark"
              >
                Shop now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-primary-dark px-8 py-4 font-semibold transition-colors hover:bg-blush"
              >
                Our story
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <LifestylePhoto
              name="hero"
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-[4/5] w-full rounded-4xl shadow-soft"
            />
          </Reveal>
        </div>
      </section>

      {/* Best sellers */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Best sellers</h2>
            <p className="mt-3 text-cocoa-soft">Two simple, delicious ways to bring more fibre into your day.</p>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / solution */}
      <section className="bg-blush-soft py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          <Reveal>
            <LifestylePhoto
              name="problem"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-4xl shadow-soft"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-bold sm:text-4xl">Why most bars don&apos;t support hormonal health</h2>
            <ul className="mt-6 space-y-3 text-cocoa-soft">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cocoa-soft/50" />
                  {p}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-xl font-bold">The Cycle-licious way</h3>
            <ul className="mt-4 space-y-3">
              {SOLUTIONS.map((s) => (
                <li key={s} className="flex gap-3">
                  <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="h-full rounded-4xl bg-white p-8 text-center shadow-soft">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blush">
                    <step.icon className="h-6 w-6 text-primary-dark" />
                  </span>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-primary-dark">Step {i + 1}</p>
                  <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-cocoa-soft">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <InstagramSection />

      {/* Newsletter */}
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="rounded-4xl bg-blush p-8 text-center shadow-soft sm:p-12">
            <h2 className="text-3xl font-bold">Get breakfast ideas &amp; first access</h2>
            <p className="mx-auto mt-3 max-w-md text-cocoa-soft">
              Join the Cycle-licious community for recipes, launches and honest food talk.
            </p>
            <NewsletterForm className="mx-auto mt-6 max-w-lg" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
