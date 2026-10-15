import { Camera } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { INSTAGRAM_URL } from '@/lib/format';

export function Footer() {
  return (
    <footer className="border-t border-primary/30 bg-blush-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo variant="full" />
          <p className="mt-3 max-w-xs text-sm text-cocoa-soft">
            Breakfast that loves your hormones back. Whole-food, fibre-rich foods made with women in mind.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-cocoa">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-cocoa-soft">
            <li><Link href="/products" className="hover:text-cocoa">Products</Link></li>
            <li><Link href="/about" className="hover:text-cocoa">Our story</Link></li>
            <li><Link href="/login" className="hover:text-cocoa">Account</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-cocoa">Follow along</h3>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-cocoa-soft hover:text-cocoa"
          >
            <Camera className="h-4 w-4" /> Instagram
          </a>
        </div>
      </div>
      <div className="border-t border-primary/20 py-5 text-center text-xs text-cocoa-soft">
        &copy; {new Date().getFullYear()} Cycle-licious Foods. Food supplements and snacks are not a substitute for
        medical advice.
      </div>
    </footer>
  );
}
