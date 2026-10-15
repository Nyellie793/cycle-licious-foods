/**
 * Lifestyle photography. Files live in /public/images/lifestyle/.
 * Replace or add real photos there (see README, "Lifestyle photos").
 * Until a file exists the <LifestylePhoto /> component shows a soft gradient.
 */
export interface Lifestyle {
  src: string;
  alt: string;
}

export const LIFESTYLE: Record<string, Lifestyle> = {
  hero: {
    src: '/images/lifestyle/hero.jpg',
    alt: 'A woman enjoying a healthy breakfast in soft morning light',
  },
  about: {
    src: '/images/lifestyle/about.jpg',
    alt: 'Friends laughing together over a healthy brunch',
  },
  problem: {
    src: '/images/lifestyle/problem.jpg',
    alt: 'A woman reading a food label in her kitchen',
  },
  banner: {
    src: '/images/lifestyle/banner.jpg',
    alt: 'A woman doing a calm morning stretch at home',
  },
  community1: { src: '/images/lifestyle/community-1.jpg', alt: 'Woman holding a granola bowl' },
  community2: { src: '/images/lifestyle/community-2.jpg', alt: 'Women friends at brunch' },
  community3: { src: '/images/lifestyle/community-3.jpg', alt: 'Woman in a morning yoga routine' },
  community4: { src: '/images/lifestyle/community-4.jpg', alt: 'Woman laughing in a sunny kitchen' },
};
