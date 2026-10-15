'use client';

import { useState, type FormEvent } from 'react';
import { useCart } from '@/components/CartProvider';
import { getBrowserSupabase } from '@/lib/supabase/client';

const inputClass =
  'w-full rounded-xl border border-primary/50 bg-white px-4 py-3 text-cocoa focus:outline-none focus:ring-2 focus:ring-primary';

export default function LoginPage() {
  const { user } = useCart();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setMessage('Accounts are not available yet. Add your Supabase keys to enable sign-in.');
      return;
    }
    setBusy(true);
    setMessage('');
    const { error } =
      mode === 'signin'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    setBusy(false);
    if (error) setMessage(error.message);
    else if (mode === 'signup') setMessage('Check your inbox to confirm your email, then sign in.');
    else setMessage('Signed in. Your cart will now be saved to your account.');
  }

  if (user) {
    return (
      <section className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">You&apos;re signed in</h1>
        <p className="mt-3 text-cocoa-soft">{user.email}</p>
        <p className="mt-2 text-sm text-cocoa-soft">Your cart is saved to your account across devices.</p>
        <button
          type="button"
          onClick={() => getBrowserSupabase()?.auth.signOut()}
          className="mt-6 rounded-full border border-primary-dark px-8 py-3 font-semibold hover:bg-blush"
        >
          Sign out
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-center text-3xl font-bold">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
      <p className="mt-2 text-center text-sm text-cocoa-soft">Sign in to save your cart and view your orders.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-4xl bg-white p-6 shadow-soft">
        <input className={inputClass} type="email" required autoComplete="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
        <input className={inputClass} type="password" required minLength={6} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" />
        {message && <p role="status" className="text-sm text-cocoa-soft">{message}</p>}
        <button type="submit" disabled={busy} className="w-full rounded-full bg-primary py-3.5 font-semibold hover:bg-primary-dark disabled:opacity-60">
          {busy ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Sign up'}
        </button>
      </form>
      <button
        type="button"
        onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
        className="mt-4 block w-full text-center text-sm font-medium text-cocoa-soft hover:text-cocoa"
      >
        {mode === 'signin' ? 'New here? Create an account' : 'Already have an account? Sign in'}
      </button>
    </section>
  );
}
