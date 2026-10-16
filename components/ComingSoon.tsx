import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { COMING_SOON } from '@/lib/range';

export function ComingSoon({ className = '' }: { className?: string }) {
  if (COMING_SOON.length === 0) return null;

  return (
    <section className={`py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">On the way</h2>
          <p className="mt-3 text-cocoa-soft">
            Two more Cycle-licious favourites are coming. Join the list and be the first to know.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {COMING_SOON.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.1}>
              <article className="h-full overflow-hidden rounded-4xl bg-white shadow-soft">
                <div className="relative aspect-[4/3] bg-blush-soft">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-cocoa px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cream">
                    Coming soon
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="mt-2 text-sm text-cocoa-soft">{item.blurb}</p>
                  <Link
                    href="/#newsletter"
                    className="mt-5 inline-flex rounded-full border border-primary-dark px-6 py-3 text-sm font-semibold transition-colors hover:bg-blush"
                  >
                    Get notified
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
