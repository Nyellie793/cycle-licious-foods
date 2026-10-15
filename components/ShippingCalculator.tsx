'use client';

import { Truck } from 'lucide-react';
import { COUNTRIES, FREE_SHIPPING_THRESHOLD, calculateShipping } from '@/lib/shipping';
import { formatPrice } from '@/lib/format';

interface Props {
  country: string;
  onCountryChange: (code: string) => void;
  subtotal: number;
}

export function ShippingCalculator({ country, onCountryChange, subtotal }: Props) {
  const quote = calculateShipping(country, subtotal);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="rounded-2xl bg-blush-soft p-4 text-sm">
      <label htmlFor="ship-country" className="mb-2 flex items-center gap-2 font-semibold text-cocoa">
        <Truck className="h-4 w-4 text-primary-dark" /> Shipping calculator
      </label>
      <select
        id="ship-country"
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
        className="w-full rounded-xl border border-primary/40 bg-white px-3 py-2 text-cocoa focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
      <p className="mt-2 text-cocoa-soft">
        {quote.free ? 'Free shipping' : formatPrice(quote.cost)} · {quote.eta}
      </p>
      {country === 'GB' && remaining > 0 && subtotal > 0 && (
        <p className="mt-1 text-xs text-cocoa-soft">
          Spend {formatPrice(remaining)} more for free UK shipping.
        </p>
      )}
    </div>
  );
}
