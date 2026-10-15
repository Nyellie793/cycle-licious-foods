import Image from 'next/image';
import Link from 'next/link';

/**
 * Brand logo.
 * - "nav":  the circular mark next to the cycle-licious wordmark (compact, for the header)
 * - "full": the complete lockup with tagline (for the footer and large placements)
 * Source files live in /public/images/brand (transparent PNGs).
 */
export function Logo({ variant = 'nav', className = '' }: { variant?: 'nav' | 'full'; className?: string }) {
  if (variant === 'full') {
    return (
      <Link href="/" aria-label="Cycle-licious Foods home" className={`inline-block ${className}`}>
        <Image
          src="/images/brand/logo-full.png"
          alt="Cycle-licious Foods. Nourish your cycle. Love yourself."
          width={1000}
          height={738}
          sizes="240px"
          className="h-auto w-48 sm:w-56"
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="Cycle-licious Foods home"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <Image
        src="/images/brand/logo-mark.png"
        alt=""
        width={600}
        height={513}
        priority
        sizes="56px"
        className="h-10 w-auto sm:h-11"
      />
      <Image
        src="/images/brand/logo-wordmark.png"
        alt="Cycle-licious Foods"
        width={1000}
        height={273}
        priority
        sizes="160px"
        className="h-8 w-auto sm:h-10"
      />
    </Link>
  );
}
