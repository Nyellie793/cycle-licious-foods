'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { getBrowserSupabase } from '@/lib/supabase/client';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  user: User | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
}

const STORAGE_KEY = 'cyclelicious-cart-v1';
const CartContext = createContext<CartContextValue | null>(null);

function mergeCarts(a: CartItem[], b: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();
  [...a, ...b].forEach((item) => {
    const existing = map.get(item.slug);
    // Same product in both carts: keep the larger quantity instead of double counting.
    if (existing) existing.quantity = Math.max(existing.quantity, item.quantity);
    else map.set(item.slug, { ...item });
  });
  return Array.from(map.values());
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const syncedForUser = useRef<string | null>(null);

  // 1. Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  // 2. Persist to localStorage on every change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full or blocked */
    }
  }, [items, hydrated]);

  // 3. Track the Supabase auth user
  useEffect(() => {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // 4. When a user signs in, merge the saved cart with the local one
  useEffect(() => {
    const supabase = getBrowserSupabase();
    if (!supabase || !hydrated || !user || syncedForUser.current === user.id) return;
    syncedForUser.current = user.id;
    supabase
      .from('carts')
      .select('items')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        const remote = (data?.items as CartItem[] | undefined) ?? [];
        setItems((local) => mergeCarts(remote, local));
      });
  }, [user, hydrated]);

  // 5. Save to Supabase (debounced) while signed in
  useEffect(() => {
    const supabase = getBrowserSupabase();
    if (!supabase || !hydrated || !user || syncedForUser.current !== user.id) return;
    const timer = setTimeout(() => {
      supabase
        .from('carts')
        .upsert({ user_id: user.id, items, updated_at: new Date().toISOString() })
        .then(() => undefined);
    }, 600);
    return () => clearTimeout(timer);
  }, [items, user, hydrated]);

  const addItem = useCallback<CartContextValue['addItem']>((item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, quantity: Math.min(i.quantity + quantity, 20) } : i,
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, quantity: Math.min(quantity, 20) } : i)),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((n, i) => n + i.quantity * i.price, 0),
      isOpen,
      user,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      setQuantity,
      removeItem,
      clear,
    }),
    [items, isOpen, user, addItem, setQuantity, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
