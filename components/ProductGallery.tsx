'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-4xl bg-blush-soft shadow-soft">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${name} view ${active + 1}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1} of ${name}`}
            aria-current={active === i}
            className={`relative aspect-[4/3] overflow-hidden rounded-2xl border-2 transition-colors ${
              active === i ? 'border-primary-dark' : 'border-transparent hover:border-primary'
            }`}
          >
            <Image src={src} alt="" fill sizes="160px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
