'use client';

import { useState, type FormEvent } from 'react';

export function NewsletterForm({ className = '' }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong');
      setState('done');
      setMessage(data.message ?? 'You are on the list. Welcome to the community!');
      setEmail('');
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-full border border-primary/50 bg-white px-5 py-3.5 text-cocoa placeholder:text-cocoa-soft/60 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="rounded-full bg-cocoa px-7 py-3.5 font-semibold text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {state === 'loading' ? 'Joining...' : 'Join the community'}
        </button>
      </div>
      {message && (
        <p
          role="status"
          className={`mt-3 text-sm ${state === 'error' ? 'text-red-700' : 'text-cocoa'}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
