'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('يرجى إدخال بريد إلكتروني صحيح', 'warning');
      return;
    }

    setIsSubscribed(true);
    showToast('شكراً لاشتراكك في نشرة راقِي الإخبارية!', 'success');
  };

  return (
    <section className="py-14 sm:py-18 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF9F6] border border-stone-200/80 space-y-4">
          <span className="text-xs font-bold text-[#9E866C] tracking-wide uppercase">
            النشرة البريدية
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            اشترك ليصلك كل جديد
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            احصل على إشعارات مسبقة بالعروض الخاصة، والمجموعات الموسمية الجديدة فور صدورها، واستمتع بكوبون خصم فوري.
          </p>

          {isSubscribed ? (
            <div className="pt-4 text-emerald-800 text-sm font-bold bg-emerald-50 py-3 px-6 rounded-2xl max-w-md mx-auto border border-emerald-200">
              ✓ تم تسجيل بريدك الإلكتروني بنجاح. تفقد بريدك للحصول على كود الخصم!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pt-3 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white px-4 py-3 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#9E866C]/40 text-stone-900"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-stone-900 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-xs"
              >
                اشتراك
              </button>
            </form>
          )}

          <p className="text-[11px] text-stone-400">
            نحترم خصوصيتك، يمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </div>
      </div>
    </section>
  );
}
