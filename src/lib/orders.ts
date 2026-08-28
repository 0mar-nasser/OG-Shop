import prisma from './prisma';
import { PaymentStatus, OrderStatus } from '@prisma/client';
import { sendOrderNotificationEmail } from './mail';

export interface RawOrderItemInput {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface ValidatedOrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressDetails: {
    city: string;
    street: string;
    building?: string;
    district?: string;
  };
  items: RawOrderItemInput[];
  couponCode?: string;
  userId?: string;
  paymentMethod?: string;
}

/**
 * Validates cart items against the PostgreSQL database
 * and retrieves verified current prices directly from the server.
 */
export async function validateAndCalculateOrderItems(
  items: RawOrderItemInput[]
): Promise<{
  validatedItems: ValidatedOrderItem[];
  subtotal: number;
}> {
  if (!items || items.length === 0) {
    throw new Error('سلة التسوق فارغة.');
  }

  const productIds = items.map((i) => i.productId);
  const dbProducts = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      isActive: true,
    },
  });

  const productMap = new Map(dbProducts.map((p) => [p.id, p]));

  let subtotal = 0;
  const validatedItems: ValidatedOrderItem[] = [];

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new Error(`المنتج المطلوب غير متوفر أو تم حذفه.`);
    }

    const qty = Math.max(1, Math.min(99, Math.floor(Number(item.quantity) || 1)));
    const unitPrice = Number(product.price);
    subtotal += unitPrice * qty;

    validatedItems.push({
      productId: product.id,
      name: product.name,
      image: product.images[0] || '/placeholder.png',
      price: unitPrice,
      quantity: qty,
      size: item.size || (product.sizes[0] ?? 'Free Size'),
      color: item.color || 'افتراضي',
    });
  }

  return { validatedItems, subtotal };
}

/**
 * Server-side calculation of discounts and shipping
 */
export function calculateOrderTotals(
  subtotal: number,
  couponCode?: string
): {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
} {
  let discount = 0;

  // Coupon evaluation
  if (couponCode && couponCode.trim().toUpperCase() === 'RAQI10') {
    discount = Math.round(subtotal * 0.1 * 100) / 100; // 10% discount
  } else if (couponCode && couponCode.trim().toUpperCase() === 'WELCOME20') {
    discount = Math.round(subtotal * 0.2 * 100) / 100; // 20% discount
  }

  // Free shipping threshold: >= 300 AED -> Free, else 25 AED
  const shipping = subtotal >= 300 || subtotal === 0 ? 0 : 25;
  const total = Math.max(0, Math.round((subtotal - discount + shipping) * 100) / 100);

  return {
    subtotal,
    discount,
    shipping,
    total,
  };
}

/**
 * Creates a new pending order in PostgreSQL database before redirecting to Stripe
 */
export async function createPendingOrder(data: CreateOrderData) {
  const { validatedItems, subtotal } = await validateAndCalculateOrderItems(data.items);
  const totals = calculateOrderTotals(subtotal, data.couponCode);

  const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  // Verify if userId exists in database to prevent Foreign Key constraint violation
  let validUserId: string | null = null;
  if (data.userId) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: data.userId },
        select: { id: true },
      });
      if (existingUser) {
        validUserId = existingUser.id;
      }
    } catch {
      validUserId = null;
    }
  }

  // If no valid userId by ID, check if a registered user with this email exists
  if (!validUserId && data.customerEmail) {
    try {
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email: data.customerEmail.trim().toLowerCase() },
        select: { id: true },
      });
      if (existingUserByEmail) {
        validUserId = existingUserByEmail.id;
      }
    } catch {
      validUserId = null;
    }
  }

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: validUserId,
      customerName: data.customerName.trim(),
      customerEmail: data.customerEmail.trim().toLowerCase(),
      customerPhone: data.customerPhone.trim(),
      addressDetails: data.addressDetails as any,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      paymentMethod: data.paymentMethod || 'STRIPE',
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      discount: totals.discount,
      total: totals.total,
      couponCode: data.couponCode || null,
      estimatedDelivery: '3-5 أيام عمل',
      items: {
        create: validatedItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  return { order, validatedItems, totals };
}

/**
 * Updates the order with the created Stripe Checkout Session ID
 */
export async function attachStripeSessionToOrder(orderId: string, sessionId: string) {
  return await prisma.order.update({
    where: { id: orderId },
    data: { stripeSessionId: sessionId },
  });
}

/**
 * Idempotently marks an order as PAID upon successful Stripe Webhook event
 */
export async function markOrderAsPaid(
  orderId: string,
  stripeSessionId: string,
  stripePaymentIntentId?: string
) {
  // Idempotency check: verify current status
  const existingOrder = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!existingOrder) {
    throw new Error(`Order with ID ${orderId} not found`);
  }

  if (existingOrder.paymentStatus === PaymentStatus.PAID) {
    console.log(`[Order Service] Order ${existingOrder.orderNumber} is already marked as PAID. Skipping duplicate processing.`);
    return { order: existingOrder, alreadyPaid: true };
  }

  // Atomic update to mark as paid
  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      paymentStatus: PaymentStatus.PAID,
      status: OrderStatus.PROCESSING,
      stripeSessionId: stripeSessionId || existingOrder.stripeSessionId,
      ...(stripePaymentIntentId ? { stripePaymentIntentId } : {}),
    },
    include: {
      items: true,
    },
  });

  console.log(`[Order Service] Order ${updatedOrder.orderNumber} successfully marked as PAID.`);

  // Send automated Gmail notification with full details & images
  const addressObj = (updatedOrder.addressDetails as any) || {};
  sendOrderNotificationEmail({
    orderNumber: updatedOrder.orderNumber,
    customerName: updatedOrder.customerName,
    customerPhone: updatedOrder.customerPhone,
    customerEmail: updatedOrder.customerEmail,
    city: addressObj.city || 'غير محدد',
    address: addressObj.street || '',
    paymentMethod: updatedOrder.paymentMethod,
    paymentStatus: updatedOrder.paymentStatus,
    subtotal: updatedOrder.subtotal,
    discount: updatedOrder.discount,
    couponCode: updatedOrder.couponCode,
    shipping: updatedOrder.shipping,
    total: updatedOrder.total,
    items: updatedOrder.items.map((item) => ({
      name: item.name,
      image: item.image,
      size: item.size,
      color: item.color,
      price: item.price,
      quantity: item.quantity,
    })),
  }).catch((err) => console.error('[Order Notification Error]', err));

  return { order: updatedOrder, alreadyPaid: false };
}

/**
 * Creates a Cash on Delivery (COD) order in PostgreSQL and sends Gmail notification
 */
export async function createCodOrder(data: CreateOrderData) {
  const { validatedItems, subtotal } = await validateAndCalculateOrderItems(data.items);
  const totals = calculateOrderTotals(subtotal, data.couponCode);
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  let validUserId: string | null = null;
  if (data.userId) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: data.userId },
        select: { id: true },
      });
      if (existingUser) validUserId = existingUser.id;
    } catch {
      validUserId = null;
    }
  }

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: validUserId,
      customerName: data.customerName.trim(),
      customerEmail: data.customerEmail.trim().toLowerCase(),
      customerPhone: data.customerPhone.trim(),
      addressDetails: data.addressDetails as any,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      paymentMethod: 'COD',
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      discount: totals.discount,
      total: totals.total,
      couponCode: data.couponCode || null,
      estimatedDelivery: '3-5 أيام عمل',
      items: {
        create: validatedItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  // Send automated Gmail notification with full details & images
  const addressObj = (order.addressDetails as any) || {};
  sendOrderNotificationEmail({
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerEmail: order.customerEmail,
    city: addressObj.city || 'غير محدد',
    address: addressObj.street || '',
    paymentMethod: 'COD',
    paymentStatus: 'PENDING',
    subtotal: order.subtotal,
    discount: order.discount,
    couponCode: order.couponCode,
    shipping: order.shipping,
    total: order.total,
    items: order.items.map((item) => ({
      name: item.name,
      image: item.image,
      size: item.size,
      color: item.color,
      price: item.price,
      quantity: item.quantity,
    })),
  }).catch((err) => console.error('[Order Notification Error]', err));

  return { order, validatedItems, totals };
}

/**
 * Updates payment status to FAILED if payment explicitly declined
 */
export async function markOrderAsFailed(orderId: string, reason?: string) {
  const existingOrder = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!existingOrder || existingOrder.paymentStatus === PaymentStatus.PAID) {
    return;
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: PaymentStatus.FAILED,
      notes: reason ? `فشل الدفع: ${reason}` : undefined,
    },
  });
}

/**
 * Fetches an order by Stripe Checkout Session ID
 */
export async function getOrderByStripeSessionId(sessionId: string) {
  return await prisma.order.findFirst({
    where: { stripeSessionId: sessionId },
    include: {
      items: true,
    },
  });
}

/**
 * Fetches an order by ID with details
 */
export async function getOrderById(id: string) {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
    },
  });
}
