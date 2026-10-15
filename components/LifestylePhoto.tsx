'use client';

import Image from 'next/image';
import { useState } from 'react';
import { LIFESTYLE } from '@/lib/lifestyle';

interface Props {
  name: keyof typeof LIFESTYLE;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Real lifestyle photography from /public/images/lifestyle, optimised by next/image.
 * If a file has not been added yet it falls back to a soft brand gradient so the
 * layout never breaks.
 */
export function LifestylePhoto({ name, className = '', priority = false, sizes = '100vw' }: Props) {
  const photo = LIFESTYLE[name];
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-blush to-primary-light ${className}`}>
      {!failed && (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
