import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('[Stripe] Warning: STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  typescript: true,
});

/**
 * Utility to convert amount in standard currency units (e.g. 100.50 AED)
 * to Stripe minor currency units / fils (e.g. 10050) preventing floating point errors.
 */
export function toStripeAmount(amount: number): number {
  return Math.round(Number(amount) * 100);
}
