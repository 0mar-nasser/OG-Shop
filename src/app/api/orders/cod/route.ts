import { NextRequest, NextResponse } from 'next/server';
import { createCodOrder } from '@/lib/orders';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, address, city, items, couponCode, userId } = body;

    // Validation - Authentication requirement
    if (!userId) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً لإتمام طلب الشراء.' },
        { status: 401 }
      );
    }

    if (!customerName || !customerPhone || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'يرجى تزويد كافة البيانات المطلوبة والمنتجات في السلة.' },
        { status: 400 }
      );
    }

    const email = (customerEmail && customerEmail.trim()) || `${customerPhone}@raqi-store.com`;

    const { order } = await createCodOrder({
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
      paymentMethod: 'COD',
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      order,
    });
  } catch (error: any) {
    console.error('[API /api/orders/cod] Error creating COD order:', error);
    return NextResponse.json(
      {
        error: error.message || 'حدث خطأ أثناء تسجيل الطلب. يرجى المحاولة مرة أخرى.',
      },
      { status: 500 }
    );
  }
}
