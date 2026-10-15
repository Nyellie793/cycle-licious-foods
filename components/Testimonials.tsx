import { Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

/**
 * TODO: replace these with real comments from your Instagram community
 * (with the commenter's permission). The wording below is sample copy so the
 * layout can be reviewed; it is not real customer feedback.
 */
const TESTIMONIALS = [
  {
    quote: 'I never thought a breakfast bar could taste like dessert and still feel like a proper start to my day.',
    who: 'Instagram community member',
  },
  {
    quote: 'Finally a brand talking about hormones and food without making me feel like a patient.',
    who: 'Instagram community member',
  },
  {
    quote: 'The granola is so good with yoghurt. I actually look forward to my mornings now.',
    who: 'Instagram community member',
  },
];

export function Testimonials() {
  return (
    <section className="bg-blush-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-cocoa sm:text-4xl">Loved by our community</h2>
          <p className="mt-3 text-cocoa-soft">Words from the women who tasted, tested and shaped Cycle-licious.</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.quote} delay={i * 0.1}>
              <figure className="h-full rounded-4xl bg-white p-8 shadow-soft">
                <Quote className="h-7 w-7 text-primary" />
                <blockquote className="mt-4 text-cocoa">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-cocoa-soft">{t.who}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
