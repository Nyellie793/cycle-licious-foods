import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  const clean = email?.trim().toLowerCase() ?? '';

  if (!EMAIL_RE.test(clean)) {
    return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Sign-ups are not available yet. Please try again soon.' },
      { status: 503 },
    );
  }

  const { error } = await supabase.from('newsletter').insert({ email: clean });
  // 23505 = already subscribed. Treat as success so we never reveal who is on the list.
  if (error && error.code !== '23505') {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'You are on the list. Welcome to the community!' });
}
