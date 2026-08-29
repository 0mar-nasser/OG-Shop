import { NextRequest, NextResponse } from 'next/server';
import { getOrdersForUser, searchOrdersForTracking } from '@/lib/orders';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || undefined;
    const email = searchParams.get('email') || undefined;
    const phone = searchParams.get('phone') || undefined;
    const orderNumbersRaw = searchParams.get('orderNumbers') || '';
    const query = searchParams.get('q') || searchParams.get('track') || undefined;

    let orders: any[] = [];

    if (query && query.trim()) {
      orders = await searchOrdersForTracking(query);
    } else {
      const orderNumbers = orderNumbersRaw
        ? orderNumbersRaw.split(',').map((n) => n.trim()).filter(Boolean)
        : undefined;

      orders = await getOrdersForUser({
        userId,
        email,
        phone,
        orderNumbers,
      });
    }

    // Map to user-friendly structure
    const formattedOrders = orders.map((order) => {
      const addressObj = (order.addressDetails as any) || {};

      let statusArabic = 'قيد الانتظار';
      let statusStep = 1;

      switch (order.status) {
        case 'PENDING':
          statusArabic = 'تم استلام الطلب وبانتظار التجهيز';
          statusStep = 1;
          break;
        case 'PROCESSING':
          statusArabic = 'جاري التجهيز والتغليف';
          statusStep = 2;
          break;
        case 'SHIPPED':
          statusArabic = 'تم الشحن مع مندوب التوصيل';
          statusStep = 3;
          break;
        case 'DELIVERED':
          statusArabic = 'تم التوصيل بنجاح';
          statusStep = 4;
          break;
        case 'CANCELLED':
          statusArabic = 'تم إلغاء الطلب';
          statusStep = 0;
          break;
      }

      return {
        id: order.id,
        orderNumber: order.orderNumber,
        createdAt: order.createdAt,
        date: new Intl.DateTimeFormat('ar-AE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date(order.createdAt)),
        status: order.status.toLowerCase(),
        statusText: statusArabic,
        statusStep,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod === 'COD' ? 'الدفع عند الاستلام' : 'بطاقة ائتمانية (Stripe)',
        subtotal: order.subtotal,
        shipping: order.shipping,
        discount: order.discount,
        total: order.total,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        trackingNumber: order.trackingNumber || `TRK-${order.orderNumber.replace(/[^0-9]/g, '')}-AE`,
        estimatedDelivery: order.estimatedDelivery || '3-5 أيام عمل',
        shippingAddress: {
          title: 'عنوان الشحن',
          fullName: order.customerName,
          phone: order.customerPhone,
          city: addressObj.city || 'دبي',
          district: addressObj.district || '',
          street: addressObj.street || 'العنوان المسجل',
          building: addressObj.building || '',
        },
        items: order.items.map((item: any) => ({
          id: item.id,
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
      };
    });

    return NextResponse.json({
      success: true,
      count: formattedOrders.length,
      orders: formattedOrders,
    });
  } catch (error: any) {
    console.error('[API /api/orders] Error fetching orders:', error);
    return NextResponse.json(
      { error: error.message || 'فشل في استرجاع سجل الطلبات' },
      { status: 500 }
    );
  }
}
