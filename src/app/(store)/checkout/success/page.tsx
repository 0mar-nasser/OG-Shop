import React from 'react';
import Link from 'next/link';
import { getOrderByStripeSessionId } from '@/lib/orders';
import { stripe } from '@/lib/stripe';
import { CheckCircle2, Clock, Package, ArrowLeft, ShoppingBag } from 'lucide-react';
import { SuccessCartCleaner } from './SuccessCartCleaner';

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  let order: any = null;
  let sessionStatus = 'pending';

  if (session_id) {
    try {
      // 1. Fetch order from DB
      order = await getOrderByStripeSessionId(session_id);

      // 2. Also check Stripe session status directly as supplementary info
      const stripeSession = await stripe.checkout.sessions.retrieve(session_id);
      if (stripeSession.payment_status === 'paid') {
        sessionStatus = 'paid';
      }
    } catch (e) {
      console.error('[Success Page] Error verifying session:', e);
    }
  }

  const isPaid = order?.paymentStatus === 'PAID' || sessionStatus === 'paid';

  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-[75vh] flex items-center justify-center">
      {/* Client component to clear the local cart only upon reaching success */}
      <SuccessCartCleaner />

      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xl text-center space-y-6">

          {/* Status Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
            {isPaid ? (
              <CheckCircle2 className="w-10 h-10" />
            ) : (
              <Clock className="w-10 h-10 text-amber-600" />
            )}
          </div>

          {/* Heading */}
          <div>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2 ${
                isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isPaid ? 'تم الدفع وتأكيد الطلب بنجاح' : 'جاري معالجة وتأكيد الدفع'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              شكراً لطلبك من راقِي!
            </h1>
          </div>

          {/* Order Details Preview */}
          {order ? (
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/60 text-right space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                <span className="text-stone-500">رقم الطلب:</span>
                <span className="font-mono font-bold text-stone-900 text-sm">{order.orderNumber}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                <span className="text-stone-500">الاسم:</span>
                <span className="font-bold text-stone-900">{order.customerName}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                <span className="text-stone-500">المبلغ المدفوع:</span>
                <span className="font-bold text-stone-900 text-sm">{order.total} درهم</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">حالة الدفع:</span>
                <span className="font-bold text-emerald-700">
                  {order.paymentStatus === 'PAID' ? 'مكتمل (PAID) ✓' : 'قيد المراجعة عبر Webhook'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-500 leading-relaxed">
              تم استلام بيانات طلبك بنجاح من خلال بوابة Stripe وسيصلك بريد إلكتروني ورسالة نصية بتفاصيل الشحنة.
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/account"
              className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-[#9E866C] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>متابعة الطلب في حسابي</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>العودة للمتجر</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
