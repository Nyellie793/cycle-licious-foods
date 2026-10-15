/**
 * Lifestyle photography. Files live in /public/images/lifestyle/.
 * To swap a photo, replace the file (keep the name) or change `src` here.
 * `position` is the CSS object-position focal point used when the photo is cropped.
 * If a file is missing, <LifestylePhoto /> shows a soft gradient instead.
 */
export interface Lifestyle {
  src: string;
  alt: string;
  position?: string;
}

export const LIFESTYLE: Record<string, Lifestyle> = {
  hero: {
    src: '/images/lifestyle/hero.jpg',
    alt: 'A woman in a white headwrap enjoying pancakes and fresh fruit for breakfast at home',
    position: 'center 30%',
  },
  about: {
    src: '/images/lifestyle/about.jpg',
    alt: 'Two friends laughing together over a croissant and a glass of milk in soft morning light',
    position: 'center 40%',
  },
  problem: {
    src: '/images/lifestyle/problem.jpg',
    alt: 'A smiling woman enjoying a bowl of fresh fruit in her kitchen',
    position: 'center 35%',
  },
  banner: {
    src: '/images/lifestyle/banner.jpg',
    alt: 'Two women sharing a healthy breakfast of avocado toast and eggs',
    position: 'center 35%',
  },
  community1: {
    src: '/images/lifestyle/community-1.jpg',
    alt: 'A woman savouring a morning cup of tea',
  },
  community2: {
    src: '/images/lifestyle/community-2.jpg',
    alt: 'Friends sharing breakfast and laughing together',
  },
  community3: {
    src: '/images/lifestyle/community-3.jpg',
    alt: 'A relaxed breakfast table with pancakes and fresh fruit',
  },
  community4: {
    src: '/images/lifestyle/community-4.jpg',
    alt: 'Avocado toast and eggs on a wooden table',
  },
};
