import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#E8A0C8', dark: '#D07FAE', light: '#F3C3DE' },
        blush: { DEFAULT: '#FFD6E8', soft: '#FFEAF3' },
        cream: '#FFF8F5',
        cocoa: { DEFAULT: '#3D2B1F', soft: '#6B5446' },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: { '4xl': '2rem' },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(61, 43, 31, 0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
