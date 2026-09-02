import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: <Truck className="w-6 h-6 text-[#BD5B24]" />,
      title: 'شحن سريع ومجاني',
      description: 'توصيل مجاني لطلبات فوق 300 درهم لجميع المدن'
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-[#BD5B24]" />,
      title: 'إرجاع واستبدال سهل',
      description: 'إمكانية الإرجاع بكل بساطة خلال 14 يوماً من الاستلام'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#BD5B24]" />,
      title: 'دفع آمن وموثوق',
      description: 'بوابات دفع إلكترونية مشفرة وخيارات دفع عند الاستلام'
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#BD5B24]" />,
      title: 'خدمة عملاء مميزة',
      description: 'فريق دعم متواجد على استفساراتكم طوال الأسبوع'
    }
  ];

  return (
    <section className="py-10 sm:py-14 bg-[#FBF9F5] border-y border-stone-200/70 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-stone-200/80">
          {features.map((feat, index) => (
            <div
              key={feat.title}
              className={`flex items-center justify-start gap-4 py-4 sm:py-2 px-3 sm:px-6 ${index !== 0 ? 'lg:pr-6' : ''
                }`}
            >
              {/* Circular Outlined Icon (Placed on Right in RTL) */}
              <div className="w-12 h-12 rounded-full border border-[#BD5B24]/80 flex items-center justify-center shrink-0 bg-transparent shadow-2xs">
                {feat.icon}
              </div>

              {/* Text content */}
              <div className="space-y-0.5 text-right">
                <h4 className="text-sm sm:text-[15px] font-extrabold text-stone-900 tracking-tight">
                  {feat.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed max-w-[210px]">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
