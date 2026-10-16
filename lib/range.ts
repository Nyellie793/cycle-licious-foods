/**
 * Packaging imagery and upcoming products.
 * Files live in /public/images/packaging/.
 * To launch a "coming soon" product, remove it from COMING_SOON and add it to the
 * products table in Supabase (and STATIC_PRODUCTS in lib/products.ts).
 */

/** Packaging shots added to each product's gallery (after the main photo). */
export const PACKAGING: Record<string, string[]> = {
  'chocolate-love-bar': [
    '/images/packaging/chocolate-love-bar-front.jpg',
    '/images/packaging/chocolate-love-bar-angle.jpg',
  ],
  'exotic-passion-granola': ['/images/packaging/exotic-passion-granola-box.jpg'],
};

export interface ComingSoonItem {
  name: string;
  blurb: string;
  image: string;
  alt: string;
}

export const COMING_SOON: ComingSoonItem[] = [
  {
    name: 'Crunch Bar',
    blurb: 'A crunchy, high-fibre breakfast bar. Box of 10.',
    image: '/images/packaging/crunch-bar-front.jpg',
    alt: 'Cycle-licious Crunch Bar box next to a crunchy seeded bar',
  },
  {
    name: 'Spice Mix Granola',
    blurb: 'Warm cinnamon and ginger with pumpkin seeds, almonds, coconut and flaxseed. 500g.',
    image: '/images/packaging/spice-mix-granola-box.jpg',
    alt: 'Cycle-licious Spice Mix Granola box with cinnamon sticks, ginger and almonds',
  },
];

export interface Dieline {
  name: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const DIELINES: Dieline[] = [
  {
    name: 'Chocolate Love Bar',
    src: '/images/packaging/dieline-chocolate-love-bar.jpg',
    width: 860,
    height: 853,
    alt: 'Flat packaging artwork for the Chocolate Love Bar box',
  },
  {
    name: 'Crunch Bar',
    src: '/images/packaging/dieline-crunch-bar.jpg',
    width: 877,
    height: 853,
    alt: 'Flat packaging artwork for the Crunch Bar box',
  },
];
