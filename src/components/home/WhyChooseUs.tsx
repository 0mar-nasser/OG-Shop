import React from 'react';
import { TruckIcon, RotateCcwIcon, ShieldCheckIcon, HeadphonesIcon } from '../common/Icons';

export function WhyChooseUs() {
  const features = [
    {
      icon: <TruckIcon size={26} className="text-[#9E866C]" />,
      title: 'شحن سريع ومجاني',
      description: 'توصيل مجاني للطلبات فوق 300 درهم لجميع المدن'
    },
    {
      icon: <RotateCcwIcon size={26} className="text-[#9E866C]" />,
      title: 'إرجاع واستبدال سهل',
      description: 'إمكانية الإرجاع بكل بساطة خلال 14 يوماً من الاستلام'
    },
    {
      icon: <ShieldCheckIcon size={26} className="text-[#9E866C]" />,
      title: 'دفع آمن وموثوق',
      description: 'بوابات دفع إلكترونية مشفرة وخيارات دفع عند الاستلام'
    },
    {
      icon: <HeadphonesIcon size={26} className="text-[#9E866C]" />,
      title: 'خدمة عملاء مميزة',
      description: 'فريق دعم متواجد للإجابة على استفساراتكم طوال الأسبوع'
    }
  ];

  return (
    <section className="py-12 bg-[#FAF9F6] border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-stone-200/60 shadow-xs"
            >
              <div className="p-3 rounded-xl bg-[#9E866C]/10 shrink-0">
                {feat.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-stone-900">{feat.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
