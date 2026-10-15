export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);

export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/cycle_licious_foods/';
export const INSTAGRAM_HANDLE = '@cycle_licious_foods';
