import { Heart, Leaf, Venus, Wheat } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const SHOTS = [
  {
    href: '/products/chocolate-love-bar',
    src: '/images/packaging/chocolate-love-bar-angle.jpg',
    alt: 'The Chocolate Love Bar box in blush pink with cacao pods and flowers',
    name: 'Chocolate Love Bar',
    note: 'Box of 10 bars',
  },
  {
    href: '/products/exotic-passion-granola',
    src: '/images/packaging/exotic-passion-granola-box.jpg',
    alt: 'The Exotic Passion Granola box and side panel, with passion fruit and blossoms',
    name: 'Exotic Passion Granola',
    note: 'Breakfast granola',
  },
];

const BADGES = [
  { icon: Wheat, label: 'High in fibre' },
  { icon: Leaf, label: 'Natural ingredients' },
  { icon: Venus, label: 'Women focused' },
  { icon: Heart, label: 'Made with love' },
];

export function PackagingShowcase() {
  return (
    <section className="bg-white/70 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Packaged with love</h2>
          <p className="mt-3 text-cocoa-soft">
            Every box carries the same three promises: nourish your cycle, love yourself, fuel your body.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {SHOTS.map((shot, i) => (
            <Reveal key={shot.href} delay={i * 0.1}>
              <Link href={shot.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-4xl bg-blush-soft shadow-soft">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4 px-2">
                  <h3 className="text-xl font-bold">{shot.name}</h3>
                  <span className="text-sm font-semibold text-primary-dark group-hover:underline">
                    {shot.note} &rarr;
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {BADGES.map((badge, i) => (
            <li key={badge.label}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col items-center gap-3 rounded-3xl bg-cream p-5 text-center shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush">
                    <badge.icon className="h-6 w-6 text-primary-dark" />
                  </span>
                  <span className="text-sm font-semibold">{badge.label}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
