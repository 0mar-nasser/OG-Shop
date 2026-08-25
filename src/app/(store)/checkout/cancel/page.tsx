import React from 'react';
import Link from 'next/link';
import { XCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'إلغاء عملية الدفع | راقِي للأزياء',
};

export default function CheckoutCancelPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-[75vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xl text-center space-y-6">

          {/* Cancelled Icon */}
          <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center shadow-xs">
            <XCircle className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-rose-100 text-rose-800 inline-block mb-2">
              تم إلغاء عملية الدفع
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              لم يتم خصم أي مبلغ
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
            لقد قمت بإلغاء جلسة الدفع أو إغلاقها. ما زالت مشترياتك محفوظة بأمان داخل سلة التسوق الخاصة بك ويمكنك إتمام الطلب في أي وقت.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/cart"
              className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-[#9E866C] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>العودة إلى سلة التسوق</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <span>تصفح المتجر</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
