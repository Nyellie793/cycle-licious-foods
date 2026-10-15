import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="mt-3 text-cocoa-soft">We couldn&apos;t find that page.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-primary px-8 py-4 font-semibold hover:bg-primary-dark">
        Back home
      </Link>
    </section>
  );
}
