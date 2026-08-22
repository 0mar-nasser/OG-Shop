import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon } from '../common/Icons';

export function PromoBanner() {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="mx-auto">
        <div className="relative overflow-hidden bg-[#2D2A28] text-white p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">

          {/* Subtle Background Pattern / Image */}
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
              alt="تخفيضات راقِي"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/70" />
          </div>

          {/* Text Info */}
          <div className="relative z-10 max-w-xl space-y-3 text-center md:text-right">
            <span className="inline-block text-xs font-bold tracking-widest text-[#D4BFA7] uppercase bg-white/10 px-3 py-1 rounded-full border border-white/15">
              عرض لفترة محدودة
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
              خصومات استثنائية تصل إلى <span className="text-[#D4BFA7]">40%</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-md font-normal leading-relaxed">
              جدد خزانة ملابسك بأرقى القطع الصيفية والشتوية من التشكيلة الحصرية بأسعار لا تُفوّت.
            </p>
          </div>

          {/* Action */}
          <div className="relative z-10 shrink-0">
            <Link
              href="/category/sale"
              className="px-8 py-4 bg-[#9E866C] hover:bg-[#8C7359] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <span>اكتشف العروض الآن</span>
              <ArrowLeftIcon size={16} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
