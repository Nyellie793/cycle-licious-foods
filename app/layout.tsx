import type { Metadata, Viewport } from 'next';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import './globals.css';
import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider } from '@/components/CartProvider';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { getProducts } from '@/lib/products';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Cycle-licious Foods | Breakfast That Loves Your Hormones Back',
    template: '%s | Cycle-licious Foods',
  },
  description:
    'Fibre-rich, whole-food breakfast bars and granola made with women in mind. Chocolate Love Bar and Exotic Passion Granola.',
  openGraph: {
    title: 'Cycle-licious Foods',
    description: 'Breakfast That Loves Your Hormones Back',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Cycle-licious Foods. Nourish your cycle. Love yourself.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cycle-licious Foods',
    description: 'Breakfast That Loves Your Hormones Back',
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#FFF8F5',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await getProducts();

  return (
    <html lang="en-GB">
      <body className="min-h-screen">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <Navbar products={products} />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
