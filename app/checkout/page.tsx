'use client';

import { Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { ShippingCalculator } from '@/components/ShippingCalculator';
import { formatPrice } from '@/lib/format';
import { calculateShipping } from '@/lib/shipping';
import { getBrowserSupabase } from '@/lib/supabase/client';

const inputClass =
  'w-full rounded-xl border border-primary/50 bg-white px-4 py-3 text-cocoa placeholder:text-cocoa-soft/50 focus:outline-none focus:ring-2 focus:ring-primary';

function CheckoutForm() {
  const params = useSearchParams();
  const { items, subtotal, user } = useCart();
  const [country, setCountry] = useState(params.get('country') ?? 'GB');
  const [form, setForm] = useState({ email: user?.email ?? '', name: '', line1: '', line2: '', city: '', postcode: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const shipping = calculateShipping(country, subtotal);
  const total = subtotal + shipping.cost;
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const session = await getBrowserSupabase()?.auth.getSession();
      const token = session?.data.session?.access_token;
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
          email: form.email,
          name: form.name,
          address: { line1: form.line1, line2: form.line2, city: form.city, postcode: form.postcode, country },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Something went wrong');
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-24 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-cocoa-soft">Add something delicious before checking out.</p>
        <Link href="/products" className="mt-6 inline-flex rounded-full bg-primary px-8 py-4 font-semibold hover:bg-primary-dark">
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1fr_420px]">
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Contact</h2>
          <input className={inputClass} type="email" required autoComplete="email" placeholder="Email address" value={form.email} onChange={set('email')} aria-label="Email address" />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold">Delivery address</h2>
          <input className={inputClass} required autoComplete="name" placeholder="Full name" value={form.name} onChange={set('name')} aria-label="Full name" />
          <input className={inputClass} required autoComplete="address-line1" placeholder="Address" value={form.line1} onChange={set('line1')} aria-label="Address line 1" />
          <input className={inputClass} autoComplete="address-line2" placeholder="Apartment, suite, etc. (optional)" value={form.line2} onChange={set('line2')} aria-label="Address line 2" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input className={inputClass} required autoComplete="address-level2" placeholder="City" value={form.city} onChange={set('city')} aria-label="City" />
            <input className={inputClass} required autoComplete="postal-code" placeholder="Postcode" value={form.postcode} onChange={set('postcode')} aria-label="Postcode" />
          </div>
          <ShippingCalculator country={country} onCountryChange={setCountry} subtotal={subtotal} />
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold">Payment</h2>
          <p className="flex items-start gap-2 rounded-2xl bg-blush-soft p-4 text-sm text-cocoa-soft">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary-dark" />
            You will enter your card details on Stripe&apos;s secure payment page. We never see or store your card number.
          </p>
        </section>
      </div>

      <aside className="h-fit space-y-5 rounded-4xl bg-white p-6 shadow-soft lg:sticky lg:top-24">
        <h2 className="text-xl font-bold">Order summary</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.slug} className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-blush-soft">
                <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-bl-lg bg-primary-dark px-1 text-xs font-bold text-white">
                  {item.quantity}
                </span>
              </div>
              <p className="flex-1 text-sm font-semibold">{item.name}</p>
              <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-primary/30 pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-cocoa-soft">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-cocoa-soft">Shipping</dt><dd>{shipping.cost === 0 ? 'Free' : formatPrice(shipping.cost)}</dd></div>
          <div className="flex justify-between pt-2 text-lg font-bold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
        </dl>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-cocoa transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          <Lock className="h-4 w-4" /> {submitting ? 'Redirecting to Stripe...' : `Pay ${formatPrice(total)}`}
        </button>
      </aside>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
      <h1 className="mb-8 text-4xl font-extrabold">Checkout</h1>
      <Suspense fallback={<p className="text-cocoa-soft">Loading checkout...</p>}>
        <CheckoutForm />
      </Suspense>
    </div>
  );
}
