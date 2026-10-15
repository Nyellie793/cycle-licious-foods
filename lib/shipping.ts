export interface ShippingCountry {
  code: string;
  name: string;
  zone: 'uk' | 'europe' | 'world';
}

export const COUNTRIES: ShippingCountry[] = [
  { code: 'GB', name: 'United Kingdom', zone: 'uk' },
  { code: 'IE', name: 'Ireland', zone: 'europe' },
  { code: 'FR', name: 'France', zone: 'europe' },
  { code: 'DE', name: 'Germany', zone: 'europe' },
  { code: 'ES', name: 'Spain', zone: 'europe' },
  { code: 'IT', name: 'Italy', zone: 'europe' },
  { code: 'NL', name: 'Netherlands', zone: 'europe' },
  { code: 'BE', name: 'Belgium', zone: 'europe' },
  { code: 'PT', name: 'Portugal', zone: 'europe' },
  { code: 'SE', name: 'Sweden', zone: 'europe' },
  { code: 'CM', name: 'Cameroon', zone: 'world' },
  { code: 'NG', name: 'Nigeria', zone: 'world' },
  { code: 'US', name: 'United States', zone: 'world' },
  { code: 'CA', name: 'Canada', zone: 'world' },
];

export const FREE_SHIPPING_THRESHOLD = 35;

const RATES = { uk: 3.99, europe: 7.99, world: 14.99 } as const;
const ETA = {
  uk: '2-3 working days',
  europe: '4-7 working days',
  world: '7-14 working days',
} as const;

export interface ShippingQuote {
  cost: number;
  eta: string;
  free: boolean;
}

export function calculateShipping(countryCode: string, subtotal: number): ShippingQuote {
  const country = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];
  const eligibleForFree = country.zone === 'uk' && subtotal >= FREE_SHIPPING_THRESHOLD;
  return {
    cost: eligibleForFree || subtotal === 0 ? 0 : RATES[country.zone],
    eta: ETA[country.zone],
    free: eligibleForFree,
  };
}
