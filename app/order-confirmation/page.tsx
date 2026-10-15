import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Stripe from 'stripe';
import { ClearCartOnMount } from '@/components/ClearCartOnMount';
import { formatPrice } from '@/lib/format';

export const metadata: Metadata = { title: 'Order confirmed', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  let email: string | null = null;
  let total: number | null = null;
  let paid = false;
  let reference: string | null = null;

  const secret = process.env.STRIPE_SECRET_KEY;
  if (secret && searchParams.session_id) {
    try {
      const session = await new Stripe(secret).checkout.sessions.retrieve(searchParams.session_id);
      paid = session.payment_status === 'paid';
      email = session.customer_details?.email ?? session.customer_email ?? null;
      total = session.amount_total != null ? session.amount_total / 100 : null;
      reference = session.id.slice(-8).toUpperCase();
    } catch {
      /* fall through to the generic message */
    }
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      {paid && <ClearCartOnMount />}
      <CheckCircle2 className="mx-auto h-16 w-16 text-primary-dark" />
      <h1 className="mt-6 text-4xl font-extrabold">
        {paid ? 'Thank you for your order!' : 'Thanks for shopping with us'}
      </h1>
      <p className="mt-4 text-cocoa-soft">
        {paid
          ? `We have received your payment${email ? ` and sent a receipt to ${email}` : ''}. We will start packing your order right away.`
          : 'If your payment went through you will get a confirmation email from Stripe shortly.'}
      </p>
      {paid && (reference || total != null) && (
        <dl className="mx-auto mt-8 max-w-xs space-y-2 rounded-3xl bg-white p-6 text-sm shadow-soft">
          {reference && (
            <div className="flex justify-between"><dt className="text-cocoa-soft">Reference</dt><dd className="font-semibold">{reference}</dd></div>
          )}
          {total != null && (
            <div className="flex justify-between"><dt className="text-cocoa-soft">Total paid</dt><dd className="font-semibold">{formatPrice(total)}</dd></div>
          )}
        </dl>
      )}
      <Link href="/products" className="mt-10 inline-flex rounded-full bg-primary px-8 py-4 font-semibold hover:bg-primary-dark">
        Continue shopping
      </Link>
    </section>
  );
}
