'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useToast } from '@/context/ToastContext';
import { Lock, CheckCircle2 } from 'lucide-react';

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
    showToast('شكراً لاشتراكك! تم تسجيل بريدك بنجاح.', 'success');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FBF9F5] font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">

        {/* Split Card Container */}
        <div className="bg-[#171717] rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[460px] items-stretch">

          {/* Right Column: Dark Typography & Form (7 cols in RTL) */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden order-2 lg:order-1 text-right">

            {/* Subtle Abstract Watermark Background */}
            <div
              className="absolute  top-1/2 -translate-y-1/2 text-stone-600/[0.25] text-[220px] sm:text-[300px] font-black select-none pointer-events-none font-serif tracking-tighter leading-none"
              aria-hidden="true"
            >
              OG
            </div>

            <div className="relative z-10 max-w-lg">
              {/* Category Tag */}
              <span className="text-xs sm:text-sm font-bold text-[#BD5B24] tracking-wider uppercase block mb-3">
                النشرة البريدية
              </span>

              {/* Main Heading (2 Lines) */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-3">
                اشترك ليصلك <br />
                كل جديد
              </h2>

              {/* Subheading */}
              <p className="text-xs sm:text-sm text-stone-300 font-normal leading-relaxed mb-8 max-w-md">
                كن أول من يعرف بالعروض الخاصة والمجموعات الموسمية الجديدة.
              </p>

              {/* Form / Success message */}
              {isSubscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>تم تسجيل بريدك بنجاح! تفقد بريدك للحصول على كود الخصم.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Single Unified Input Pill Bar */}
                  <div className="flex w-full rounded-2xl overflow-hidden bg-[#F5F2EB] shadow-lg focus-within:ring-2 focus-within:ring-[#BD5B24]">
                    <input
                      type="email"
                      required
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent px-4 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none text-right"
                    />
                    <button
                      type="submit"
                      className="px-6 sm:px-9 py-3.5 sm:py-4 bg-[#BD5B24] hover:bg-[#A34B1B] text-white text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer active:scale-[0.99]"
                    >
                      اشتراك
                    </button>
                  </div>

                  {/* Privacy note */}
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-1">
                    <span>نحترم خصوصيتك، ويمكنك إلغاء الاشتراك في أي وقت.</span>
                    <Lock className="w-3.5 h-3.5 text-[#BD5B24]" />
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Left Column: Photo of Hoodies on Modern Wooden Hangers (5 cols in RTL -> Left) */}
          <div className="lg:col-span-5 relative hidden lg:block overflow-hidden order-1 lg:order-2 min-h-[460px] bg-stone-900">
            <Image
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop"
              alt="OFFGRID Collection"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
              className="object-cover object-center transition-transform duration-700"
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-stone-950/20 pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
