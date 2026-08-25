import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { markOrderAsPaid, markOrderAsFailed } from '@/lib/orders';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    console.error('[Stripe Webhook] Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'STRIPE_WEBHOOK_SECRET is not configured on server' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`[Stripe Webhook] Signature verification failed:`, err.message);
    return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
  }

  console.log(`[Stripe Webhook] Received verified event: ${event.type} [${event.id}]`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId || session.client_reference_id;

        if (!orderId) {
          console.warn(`[Stripe Webhook] Session ${session.id} missing orderId in metadata`);
          break;
        }

        // Only mark order as PAID if Stripe confirms payment_status is 'paid'
        if (session.payment_status === 'paid') {
          const paymentIntentId =
            typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent?.id;

          const result = await markOrderAsPaid(orderId, session.id, paymentIntentId);
          console.log(
            `[Stripe Webhook] Order ${orderId} status: ${
              result.alreadyPaid ? 'Already Paid' : 'Updated to PAID'
            }`
          );
        } else {
          console.log(`[Stripe Webhook] Session ${session.id} completed with status: ${session.payment_status}`);
        }
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId || session.client_reference_id;
        if (orderId) {
          const paymentIntentId =
            typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent?.id;
          await markOrderAsPaid(orderId, session.id, paymentIntentId);
        }
        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId || session.client_reference_id;
        if (orderId) {
          await markOrderAsFailed(orderId, 'فشلت عملية الدفع الإلكتروني المؤجلة');
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const failureMessage = paymentIntent.last_payment_error?.message || 'Payment failed';
        console.warn(`[Stripe Webhook] PaymentIntent ${paymentIntent.id} failed: ${failureMessage}`);
        break;
      }

      default:
        // Other events ignored safely
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error(`[Stripe Webhook] Error processing event ${event.type}:`, error);
    return NextResponse.json(
      { error: 'Error processing webhook event' },
      { status: 500 }
    );
  }
}
