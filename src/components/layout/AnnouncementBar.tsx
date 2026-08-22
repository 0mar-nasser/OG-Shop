import React from 'react';
import Link from 'next/link';

export function AnnouncementBar() {
  return (
    <div className="bg-[#2B2826] text-stone-200 text-xs py-2 px-4 text-center font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span>✨ شحن مجاني لجميع الطلبات فوق 300 ر.س / درهم</span>
        <span className="text-stone-500 hidden sm:inline">•</span>
        <Link
          href="/products"
          className="underline underline-offset-4 text-stone-300 hover:text-white transition-colors hidden sm:inline"
        >
          تسوق الآن
        </Link>
      </div>
    </div>
  );
}
