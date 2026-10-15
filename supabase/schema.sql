-- Cycle-licious Foods: schema, RLS policies and seed data.
-- Run in Supabase Dashboard -> SQL Editor.

create extension if not exists "pgcrypto";

-- ---------- Tables ----------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null,
  price numeric(10,2) not null check (price >= 0),
  images text[] not null default '{}',
  ingredients text[] not null default '{}',
  nutrition jsonb not null default '{}'::jsonb,
  benefits text[] not null default '{}',
  allergy_info text,
  stock integer not null default 0 check (stock >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  items jsonb not null,
  total numeric(10,2) not null check (total >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'shipped', 'cancelled')),
  email text,
  shipping_address jsonb,
  stripe_session_id text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter (
  email text primary key,
  created_at timestamptz not null default now()
);

-- One saved cart per logged-in user
create table if not exists public.carts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.newsletter enable row level security;
alter table public.carts enable row level security;

-- Products: anyone can read, nobody can write from the client
drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
  on public.products for select using (true);

-- Orders: users read their own orders. Inserts/updates are done server-side
-- with the service role key (which bypasses RLS).
drop policy if exists "Users can view their own orders" on public.orders;
create policy "Users can view their own orders"
  on public.orders for select using (auth.uid() = user_id);

-- Newsletter: anyone may subscribe (insert only), nobody can read the list
drop policy if exists "Anyone can subscribe" on public.newsletter;
create policy "Anyone can subscribe"
  on public.newsletter for insert
  with check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- Carts: each user manages only their own cart
drop policy if exists "Users manage their own cart" on public.carts;
create policy "Users manage their own cart"
  on public.carts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------- Seed ----------
insert into public.products
  (name, slug, description, price, images, ingredients, nutrition, benefits, allergy_info, stock)
values
(
  'Chocolate Love Bar',
  'chocolate-love-bar',
  'A fibre-rich snack bar created for women seeking convenient and enjoyable ways to increase daily fibre intake. Made with whole-food ingredients, it combines the richness of dark chocolate with the natural sweetness of dates and the nutritional benefits of flaxseed and almonds.',
  24.99,
  array[
    '/images/products/chocolate-love-bar-main.jpg',
    '/images/products/chocolate-love-bar-detail-1.jpg',
    '/images/products/chocolate-love-bar-detail-2.jpg'
  ],
  array['Rye Flour','Ground Flaxseed','Butter','Brown Sugar','Dates','Almonds','70% Dark Chocolate','Cocoa Powder','Flaked Almonds (Topping)'],
  '{"serving":"per 50g bar","rows":[["Energy","200-240 kcal"],["Protein","4-5g"],["Carbohydrates","20-25g"],["of which sugars","8-12g"],["Fat","10-14g"],["Fibre","5-6g"],["Salt","<0.1g"]]}'::jsonb,
  array['Fibre-rich','Whole-food ingredients','On-the-go','Rich chocolate flavour','Supports women increasing their fibre intake'],
  'Contains Almonds, Wheat/Gluten (Rye) and Milk (Butter). Pack: box of 10 bars (500g total).',
  200
),
(
  'Exotic Passion Granola',
  'exotic-passion-granola',
  'A fibre-rich breakfast granola made with wholesome ingredients including millet, flaxseed, almonds and fruit. Tropical flavour, supporting healthy habits one breakfast at a time.',
  14.99,
  array[
    '/images/products/exotic-passion-granola-main.jpg',
    '/images/products/exotic-passion-granola-detail-1.jpg',
    '/images/products/exotic-passion-granola-detail-2.jpg'
  ],
  array['Flaked Millet','Puffed Millet','Brown Lentils','Ground Flaxseed','Coconut Flakes','Passion Fruit','Almonds','Dried Cranberries','Maple Syrup'],
  '{"serving":"per 50g","rows":[["Energy","210-220 kcal"],["Protein","5-6g"],["Carbohydrates","23-25g"],["of which sugars","5-7g"],["Fat","10-11g"],["Fibre","5-6g"]],"per100":[["Energy","420-440 kcal"],["Protein","10-11g"],["Carbohydrates","46-50g"],["of which sugars","10-14g"],["Fat","20-22g"],["Fibre","10-12g"]]}'::jsonb,
  array['Fibre-rich','Whole-food ingredients','Naturally sweetened','Tropical flavour','Convenient breakfast'],
  'Contains Almonds. Pack: 300g bag.',
  200
)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  images = excluded.images,
  ingredients = excluded.ingredients,
  nutrition = excluded.nutrition,
  benefits = excluded.benefits,
  allergy_info = excluded.allergy_info,
  stock = excluded.stock;
