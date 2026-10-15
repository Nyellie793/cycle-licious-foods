# Cycle-licious Foods

Breakfast that loves your hormones back. A women-focused e-commerce site for the **Chocolate Love Bar** and **Exotic Passion Granola**.

**Stack:** Next.js 14 (App Router) · React · TypeScript · Tailwind CSS · Supabase (auth, database) · Stripe Checkout · Framer Motion · lucide-react · Poppins

## Features

- Home, About, Products and a detail page per product (gallery, benefits with icons, ingredients, nutrition tables, how to enjoy, FAQ accordion, sticky desktop add-to-cart)
- Slide-out cart with quantity controls, shipping calculator and item count in the navbar
- Cart saved in `localStorage`, and in Supabase (`carts` table) when the customer is signed in
- Full checkout page, Stripe Checkout payment, order confirmation page
- Product search, newsletter sign-up, Instagram section, simple sign-in page
- Prices and shipping are recalculated on the server, never trusted from the browser
- The storefront still renders from built-in product data if Supabase is not connected yet

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in your keys
npm run dev                  # http://localhost:3000
```

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and run it. This creates `products`, `orders`, `newsletter` and `carts`, turns on Row Level Security, and seeds the two products.
3. Copy **Project URL** and **anon key** (Project Settings, API) into `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Copy the **service_role key** into `SUPABASE_SERVICE_ROLE_KEY`. It is used only in server API routes to save orders. Never expose it in the browser.

### 2. Stripe

1. Get your secret key from the [Stripe dashboard](https://dashboard.stripe.com/apikeys) and set `STRIPE_SECRET_KEY` (use `sk_test_...` first).
2. Add a webhook endpoint pointing at `https://YOUR-SITE/api/webhooks/stripe` for the `checkout.session.completed` event, and put its signing secret in `STRIPE_WEBHOOK_SECRET`. This marks orders as `paid`.
3. Test card: `4242 4242 4242 4242`, any future date, any CVC.

### 3. Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | Public anon key (protected by RLS) |
| `STRIPE_SECRET_KEY` | yes | Creates Stripe Checkout sessions |
| `SUPABASE_SERVICE_ROLE_KEY` | recommended | Saves orders from the API (server only) |
| `STRIPE_WEBHOOK_SECRET` | recommended | Verifies Stripe webhooks |
| `NEXT_PUBLIC_SITE_URL` | recommended | Your live URL, used for metadata |
| `NEXT_PUBLIC_INSTAGRAM_URL` | optional | Link for the Instagram section and footer |

## Deploy to Vercel

1. Push this repo to GitHub (`cycle-licious-foods`).
2. In Vercel choose **Add New, Project**, import the repo. `vercel.json` already sets the Next.js framework.
3. Add the environment variables above and deploy.
4. Set `NEXT_PUBLIC_SITE_URL` to the live URL and redeploy once.

## Photos

- **Products:** `public/images/products/` holds your two uploaded product photos plus two close-up crops of each for the gallery.
- **Lifestyle photos:** add real photography to `public/images/lifestyle/` using these file names (landscape for `banner`, portrait 4:5 for `hero`, square for `community-*`):
  `hero.jpg`, `about.jpg`, `problem.jpg`, `banner.jpg`, `community-1.jpg` to `community-4.jpg`.
  Paths and alt text are defined in `lib/lifestyle.ts`. Until a file exists, a soft pink gradient is shown. Unsplash and Pexels photos are free to use under their licences.

## Content to replace before launch

- **Testimonials** in `components/Testimonials.tsx` are sample wording. Swap in real Instagram comments (with permission).
- **Instagram handle**: set `NEXT_PUBLIC_INSTAGRAM_URL` to your real profile.
- **Shipping rates** live in `lib/shipping.ts`.

## Project structure

```
app/            pages and API routes (checkout, newsletter, Stripe webhook)
components/     UI components, cart provider, cart drawer
lib/            products, shipping, formatting, Supabase clients (lib/supabase)
public/images/  products/ and lifestyle/
supabase/       schema.sql (tables, RLS policies, seed data)
```

## Scripts

`npm run dev` · `npm run build` · `npm start` · `npm run lint` · `npm run typecheck`
