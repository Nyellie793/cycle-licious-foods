import { LifestylePhoto } from '@/components/LifestylePhoto';
import { InstagramIcon } from '@/components/InstagramIcon';
import { Reveal } from '@/components/Reveal';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/format';

const TILES = ['community1', 'community2', 'community3', 'community4'] as const;

export function InstagramSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-cocoa sm:text-4xl">Join us on Instagram</h2>
          <p className="mt-3 text-cocoa-soft">
            Recipes, behind-the-scenes and honest conversations about food and your cycle. Find us at{' '}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-dark underline-offset-4 hover:underline"
            >
              {INSTAGRAM_HANDLE}
            </a>
            .
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {TILES.map((tile) => (
            <a
              key={tile}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${INSTAGRAM_HANDLE} on Instagram`}
              className="group relative block aspect-square overflow-hidden rounded-3xl"
            >
              <LifestylePhoto
                name={tile}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-cocoa/0 text-white opacity-0 transition-all group-hover:bg-cocoa/30 group-hover:opacity-100">
                <InstagramIcon className="h-8 w-8" />
              </span>
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary-dark px-7 py-3 font-semibold text-cocoa transition-colors hover:bg-blush"
          >
            <InstagramIcon className="h-4 w-4" /> Follow {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
    </section>
  );
}
