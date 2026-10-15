import type { Metadata } from 'next';
import { FlaskConical, Heart, MessageCircle, Microscope, Users } from 'lucide-react';
import Link from 'next/link';
import { LifestylePhoto } from '@/components/LifestylePhoto';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Our story',
  description:
    'Cycle-licious is a women-focused food venture built on research, prototype testing and community feedback.',
};

const PILLARS = [
  {
    icon: Microscope,
    title: 'Research first',
    text: 'Before a single bar was baked, we studied ingredients linked with estrogen regulation and everyday fibre intake.',
  },
  {
    icon: FlaskConical,
    title: 'Tested by women',
    text: 'Early prototypes went to women who gave honest feedback on taste, texture and how breakfast fit their mornings.',
  },
  {
    icon: MessageCircle,
    title: 'Shaped by our community',
    text: 'Our Instagram community told us what they wanted. Their comments and questions shape every recipe.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-widest text-primary-dark">Our story</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            A women-focused venture, built on research
          </h1>
          <p className="mt-5 text-lg text-cocoa-soft">
            Cycle-licious started with a simple question: why is the food we eat every morning so rarely designed
            with women&apos;s hormonal health in mind?
          </p>
          <p className="mt-4 text-cocoa-soft">
            We began with the science. We researched ingredients associated with estrogen regulation and fibre intake,
            then turned the findings into foods that are easy to love: a rich dark chocolate bar and a tropical
            granola. Both were prototyped and tested among women, and refined through feedback from our Instagram
            community.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <LifestylePhoto
            name="about"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-4xl shadow-soft"
          />
        </Reveal>
      </section>

      <section className="bg-blush-soft py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How we build</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="h-full rounded-4xl bg-white p-8 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush">
                    <p.icon className="h-6 w-6 text-primary-dark" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-cocoa-soft">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <LifestylePhoto name="banner" sizes="100vw" className="h-72 w-full sm:h-96" />
        <div className="absolute inset-0 flex items-center justify-center bg-cocoa/50 px-4 text-center">
          <Reveal className="max-w-2xl text-white">
            <Heart className="mx-auto h-8 w-8" />
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Our mission</h2>
            <p className="mt-3 text-lg">
              To bridge the gap between your daily breakfast and your hormonal health, one delicious, fibre-rich
              morning at a time.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <Reveal>
          <Users className="mx-auto h-8 w-8 text-primary-dark" />
          <h2 className="mt-3 text-3xl font-bold">Come and taste it</h2>
          <p className="mt-3 text-cocoa-soft">Two products, made with care. Pick your favourite or try both.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-full bg-primary px-8 py-4 font-semibold text-cocoa shadow-soft transition-colors hover:bg-primary-dark"
          >
            Shop products
          </Link>
        </Reveal>
      </section>
    </>
  );
}
