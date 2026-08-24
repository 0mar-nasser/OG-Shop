import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-[#1C1917] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 item-start">
            <Link href="/" className="inline-block bg-white p-2 sm:p-2.5 rounded-xl hover:opacity-95 transition-opacity shadow-xs">
              <Image
                src="/logo.png"
                alt="OFFGRID"
                width={120}
                height={75}
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              وجهتك الأولى للأزياء العصرية الفاخرة ذات التصميم البسيط والجودة العالية. نحرص على تقديم أفضل الخامات وتجربة تسوق مريحة واستثنائية.
            </p>
          </div>

          {/* Nav Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">أقسام المتجر</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link href="/category/men" className="hover:text-white transition-colors">ملابس رجالية</Link></li>
              <li><Link href="/category/women" className="hover:text-white transition-colors">ملابس نسائية</Link></li>
              <li><Link href="/category/kids" className="hover:text-white transition-colors">ملابس أطفال</Link></li>
              <li><Link href="/category/sale" className="text-amber-400 hover:text-amber-300 transition-colors font-semibold">عروض وتخفيضات الموسم</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">خدمة العملاء</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link href="/account" className="hover:text-white transition-colors">تتبع الشحنات والطلبات</Link></li>
              <li><a href="#faq" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">الشحن والتوصيل</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">سياسة الاسترجاع والاستبدال</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Legal and Info */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">معلومات وقوانين</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#about" className="hover:text-white transition-colors">عن راقِي للأزياء</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">الشروط والأحكام</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#cookies" className="hover:text-white transition-colors">إشعار ملفات تعريف الارتباط</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} RAQI FASHION. جميع الحقوق محفوظة لمتجر راقِي للأزياء.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="hover:text-white transition-colors cursor-pointer">Apple Pay</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Mada</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Visa / Mastercard</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Tabby / Tamara</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
