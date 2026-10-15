import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProducts } from '@/lib/products';
import { COUNTRIES, calculateShipping } from '@/lib/shipping';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';

interface Body {
  items: { slug: string; quantity: number }[];
  email: string;
  name: string;
  address: { line1: string; line2?: string; city: string; postcode: string; country: string };
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: 'Payments are not configured yet. Add STRIPE_SECRET_KEY to your environment variables.' },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { items, email, name, address } = body;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Your cart is empty' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email ?? '') || !name?.trim() || !address?.line1?.trim() || !address?.city?.trim() || !address?.postcode?.trim()) {
    return NextResponse.json({ error: 'Please complete your email and delivery address' }, { status: 400 });
  }
  if (!COUNTRIES.some((c) => c.code === address.country)) {
    return NextResponse.json({ error: 'We do not ship to that country yet' }, { status: 400 });
  }

  // Never trust prices from the browser: look everything up again on the server.
  const catalogue = await getProducts();
  const lines: { name: string; slug: string; unit: number; quantity: number }[] = [];
  for (const item of items) {
    const product = catalogue.find((p) => p.slug === item.slug);
    const quantity = Math.floor(Number(item.quantity));
    if (!product || !(quantity >= 1 && quantity <= 20)) {
      return NextResponse.json({ error: 'One of the items in your cart is no longer available' }, { status: 400 });
    }
    if (product.stock < quantity) {
      return NextResponse.json({ error: `Sorry, ${product.name} is low on stock` }, { status: 409 });
    }
    lines.push({ name: product.name, slug: product.slug, unit: product.price, quantity });
  }

  const subtotal = lines.reduce((n, l) => n + l.unit * l.quantity, 0);
  const shipping = calculateShipping(address.country, subtotal);
  const total = Math.round((subtotal + shipping.cost) * 100) / 100;

  const stripe = new Stripe(secret);
  const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  // Optional: link the order to the signed-in user
  const admin = getAdminSupabase();
  let userId: string | null = null;
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (admin && token) {
    const { data } = await admin.auth.getUser(token);
    userId = data.user?.id ?? null;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        ...lines.map((l) => ({
          quantity: l.quantity,
          price_data: {
            currency: 'gbp',
            unit_amount: Math.round(l.unit * 100),
            product_data: { name: l.name },
          },
        })),
        ...(shipping.cost > 0
          ? [
              {
                quantity: 1,
                price_data: {
                  currency: 'gbp',
                  unit_amount: Math.round(shipping.cost * 100),
                  product_data: { name: `Shipping (${shipping.eta})` },
                },
              },
            ]
          : []),
      ],
      metadata: { customer_name: name, country: address.country },
      success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    if (admin) {
      await admin.from('orders').insert({
        user_id: userId,
        items: lines,
        total,
        status: 'pending',
        email,
        shipping_address: { name, ...address },
        stripe_session_id: session.id,
      });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error', err);
    return NextResponse.json({ error: 'We could not start the payment. Please try again.' }, { status: 502 });
  }
}
