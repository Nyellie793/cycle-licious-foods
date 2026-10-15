import Link from 'next/link';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Cycle-licious Foods home"
      className={`inline-flex items-baseline gap-0.5 text-2xl font-extrabold tracking-tight text-cocoa ${className}`}
    >
      Cycle<span className="text-primary-dark">-</span>licious
    </Link>
  );
}
