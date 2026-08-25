import { NextRequest, NextResponse } from 'next/server';
import { stripe, toStripeAmount } from '@/lib/stripe';
import { createPendingOrder, attachStripeSessionToOrder } from '@/lib/orders';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, address, city, items, couponCode, userId } = body;

    // 1. Basic validation of input
    if (!customerName || !customerPhone || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'يرجى تزويد كافة البيانات المطلوبة والمنتجات في السلة.' },
        { status: 400 }
      );
    }

    const email = (customerEmail && customerEmail.trim()) || `customer-${Date.now()}@example.com`;

    // 2. Create pending order with server-verified prices and totals
    const { order, validatedItems, totals } = await createPendingOrder({
      customerName,
      customerEmail: email,
      customerPhone,
      addressDetails: {
        city: city || 'دبي',
        street: address || 'العنوان المسجل',
      },
      items,
      couponCode,
      userId,
      paymentMethod: 'STRIPE',
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // 3. Build line items for Stripe Checkout
    const lineItems: any[] = validatedItems.map((item) => {
      // If there is a discount on the order, apply proportional unit discount or display raw unit price
      const unitAmountInAed = item.price;
      return {
        price_data: {
          currency: 'aed',
          product_data: {
            name: item.name,
            images: item.image && item.image.startsWith('http') ? [item.image] : undefined,
            description: `المقاس: ${item.size} | اللون: ${item.color}`,
          },
          unit_amount: toStripeAmount(unitAmountInAed),
        },
        quantity: item.quantity,
      };
    });

    // Add shipping fee if applicable
    if (totals.shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'aed',
          product_data: {
            name: 'رسوم الشحن والتوصيل السريع',
            description: 'توصيل لباب المنزل (3-5 أيام عمل)',
          },
          unit_amount: toStripeAmount(totals.shipping),
        },
        quantity: 1,
      });
    }

    // 4. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      client_reference_id: order.id,
      line_items: lineItems,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
    });

    if (!session.url) {
      throw new Error('Failed to generate Stripe Checkout URL');
    }

    // 5. Save session ID to order
    await attachStripeSessionToOrder(order.id, session.id);

    console.log(`[Stripe Checkout] Created session ${session.id} for order ${order.orderNumber}`);

    return NextResponse.json({
      url: session.url,
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  } catch (error: any) {
    console.error('[API /api/checkout] Error creating checkout session:', error);
    return NextResponse.json(
      {
        error: error.message || 'حدث خطأ أثناء إنشاء جلسة الدفع. يرجى المحاولة مرة أخرى.',
      },
      { status: 500 }
    );
  }
}
