import { getServerSupabase } from '@/lib/supabase/server';

export type NutritionRow = [string, string];

export interface Nutrition {
  serving: string;
  rows: NutritionRow[];
  per100?: NutritionRow[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  ingredients: string[];
  nutrition: Nutrition;
  benefits: string[];
  allergy_info: string;
  stock: number;
}

/**
 * Static copy of the two launch products. It mirrors supabase/schema.sql and is
 * used as a fallback so the storefront still renders before Supabase is connected.
 */
export const STATIC_PRODUCTS: Product[] = [
  {
    id: 'chocolate-love-bar',
    name: 'Chocolate Love Bar',
    slug: 'chocolate-love-bar',
    description:
      'A fibre-rich snack bar created for women seeking convenient and enjoyable ways to increase daily fibre intake. Made with whole-food ingredients, it combines the richness of dark chocolate with the natural sweetness of dates and the nutritional benefits of flaxseed and almonds.',
    price: 24.99,
    images: [
      '/images/products/chocolate-love-bar-main.jpg',
      '/images/products/chocolate-love-bar-detail-1.jpg',
      '/images/products/chocolate-love-bar-detail-2.jpg',
    ],
    ingredients: [
      'Rye Flour',
      'Ground Flaxseed',
      'Butter',
      'Brown Sugar',
      'Dates',
      'Almonds',
      '70% Dark Chocolate',
      'Cocoa Powder',
      'Flaked Almonds (Topping)',
    ],
    nutrition: {
      serving: 'per 50g bar',
      rows: [
        ['Energy', '200-240 kcal'],
        ['Protein', '4-5g'],
        ['Carbohydrates', '20-25g'],
        ['of which sugars', '8-12g'],
        ['Fat', '10-14g'],
        ['Fibre', '5-6g'],
        ['Salt', '<0.1g'],
      ],
    },
    benefits: [
      'Fibre-rich',
      'Whole-food ingredients',
      'On-the-go',
      'Rich chocolate flavour',
      'Supports women increasing their fibre intake',
    ],
    allergy_info:
      'Contains Almonds, Wheat/Gluten (Rye) and Milk (Butter). Pack: box of 10 bars (500g total).',
    stock: 200,
  },
  {
    id: 'exotic-passion-granola',
    name: 'Exotic Passion Granola',
    slug: 'exotic-passion-granola',
    description:
      'A fibre-rich breakfast granola made with wholesome ingredients including millet, flaxseed, almonds and fruit. Tropical flavour, supporting healthy habits one breakfast at a time.',
    price: 14.99,
    images: [
      '/images/products/exotic-passion-granola-main.jpg',
      '/images/products/exotic-passion-granola-detail-1.jpg',
      '/images/products/exotic-passion-granola-detail-2.jpg',
    ],
    ingredients: [
      'Flaked Millet',
      'Puffed Millet',
      'Brown Lentils',
      'Ground Flaxseed',
      'Coconut Flakes',
      'Passion Fruit',
      'Almonds',
      'Dried Cranberries',
      'Maple Syrup',
    ],
    nutrition: {
      serving: 'per 50g',
      rows: [
        ['Energy', '210-220 kcal'],
        ['Protein', '5-6g'],
        ['Carbohydrates', '23-25g'],
        ['of which sugars', '5-7g'],
        ['Fat', '10-11g'],
        ['Fibre', '5-6g'],
      ],
      per100: [
        ['Energy', '420-440 kcal'],
        ['Protein', '10-11g'],
        ['Carbohydrates', '46-50g'],
        ['of which sugars', '10-14g'],
        ['Fat', '20-22g'],
        ['Fibre', '10-12g'],
      ],
    },
    benefits: [
      'Fibre-rich',
      'Whole-food ingredients',
      'Naturally sweetened',
      'Tropical flavour',
      'Convenient breakfast',
    ],
    allergy_info: 'Contains Almonds. Pack: 300g bag.',
    stock: 200,
  },
];

/** Extra storytelling content that is not stored in the database. */
export const PRODUCT_CONTENT: Record<
  string,
  {
    tagline: string;
    packLabel: string;
    howToUse: string[];
    faqs: { q: string; a: string }[];
    benefitIcons: string[];
  }
> = {
  'chocolate-love-bar': {
    tagline: 'Dark chocolate, dates and flaxseed in one easy bar.',
    packLabel: 'Box of 10 bars (500g)',
    benefitIcons: ['wheat', 'leaf', 'footprints', 'cookie', 'heart'],
    howToUse: [
      'Unwrap and enjoy as an on-the-go breakfast or mid-morning snack.',
      'Pair with fruit or a warm drink for a more filling start to the day.',
      'Store in a cool, dry place. Keep sealed after opening.',
    ],
    faqs: [
      {
        q: 'How much fibre is in each bar?',
        a: 'Each 50g bar contains around 5-6g of fibre, from flaxseed, almonds, dates and rye flour.',
      },
      {
        q: 'Does it contain allergens?',
        a: 'Yes. It contains almonds, wheat/gluten (rye) and milk (butter). Please check the allergy information before eating.',
      },
      {
        q: 'What comes in a box?',
        a: 'A box holds 10 bars, 500g in total.',
      },
      {
        q: 'How long does it keep?',
        a: 'Store in a cool, dry place and check the best-before date printed on the box.',
      },
    ],
  },
  'exotic-passion-granola': {
    tagline: 'Tropical passion fruit and coconut, with millet and flaxseed.',
    packLabel: '300g bag',
    benefitIcons: ['wheat', 'leaf', 'droplets', 'sun', 'coffee'],
    howToUse: [
      'Pour over yoghurt or your favourite plant milk.',
      'Sprinkle on porridge, smoothie bowls or fresh fruit.',
      'Enjoy dry from the bag as a crunchy snack. Reseal after opening.',
    ],
    faqs: [
      {
        q: 'What makes it different from regular granola?',
        a: 'It is built on flaked and puffed millet, brown lentils and ground flaxseed, and sweetened with maple syrup and fruit.',
      },
      {
        q: 'Does it contain allergens?',
        a: 'It contains almonds. Please check the allergy information before eating.',
      },
      {
        q: 'How big is a serving?',
        a: 'Nutrition is shown per 50g serving and per 100g. A 300g bag gives around six servings.',
      },
      {
        q: 'How should I store it?',
        a: 'Keep the bag sealed in a cool, dry place to stay crunchy.',
      },
    ],
  },
};

function normalise(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    description: String(row.description ?? ''),
    price: Number(row.price),
    images: (row.images as string[]) ?? [],
    ingredients: (row.ingredients as string[]) ?? [],
    nutrition: (row.nutrition as Nutrition) ?? { serving: '', rows: [] },
    benefits: (row.benefits as string[]) ?? [],
    allergy_info: String(row.allergy_info ?? ''),
    stock: Number(row.stock ?? 0),
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = getServerSupabase();
  if (!supabase) return STATIC_PRODUCTS;
  try {
    const { data, error } = await supabase.from('products').select('*').order('created_at');
    if (error || !data || data.length === 0) return STATIC_PRODUCTS;
    return data.map(normalise);
  } catch {
    return STATIC_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}
