'use client';

import React, { useState } from 'react';
import { Tag, Plus, Check, Copy, Trash2, Calendar, Percent } from 'lucide-react';

interface CouponMock {
  id: string;
  code: string;
  discount: string;
  minSpend: number;
  usageCount: number;
  expiryDate: string;
  isActive: boolean;
}

const initialCoupons: CouponMock[] = [
  {
    id: '1',
    code: 'RAQI20',
    discount: 'خصم 20%',
    minSpend: 250,
    usageCount: 84,
    expiryDate: '2026-12-31',
    isActive: true,
  },
  {
    id: '2',
    code: 'WELCOME10',
    discount: 'خصم 10%',
    minSpend: 100,
    usageCount: 215,
    expiryDate: '2026-10-15',
    isActive: true,
  },
  {
    id: '3',
    code: 'SUMMER50',
    discount: 'خصم 50 ر.س',
    minSpend: 400,
    usageCount: 38,
    expiryDate: '2026-09-01',
    isActive: false,
  },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponMock[]>(initialCoupons);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleActive = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل تريد حذف هذا الكوبون؟')) {
      setCoupons((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900">
            كوبونات الخصم والعروض
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            إدارة رموز التخفيض والحملات الترويجية
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9E866C] hover:bg-[#8b755d] text-white text-sm font-bold rounded-xl shadow-md transition-all self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          إنشاء كوبون جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`bg-white rounded-2xl p-6 border transition-all shadow-xs flex flex-col justify-between ${
              coupon.isActive
                ? 'border-stone-200 hover:shadow-md'
                : 'border-stone-200 bg-stone-50/70 opacity-75'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#9E866C] border border-amber-200">
                  <Tag className="w-5 h-5" />
                </div>
                <button
                  onClick={() => handleToggleActive(coupon.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    coupon.isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {coupon.isActive ? 'مفعّل' : 'معطّل'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-dashed border-stone-300 mb-4">
                <span className="font-mono font-black text-base text-stone-900 tracking-wider">
                  {coupon.code}
                </span>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="text-stone-400 hover:text-stone-900 transition-colors p-1"
                  title="نسخ الكوبون"
                >
                  {copiedCode === coupon.code ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="space-y-2 text-xs text-stone-600 mb-4">
                <div className="flex justify-between">
                  <span className="text-stone-400">قيمة الخصم:</span>
                  <span className="font-extrabold text-stone-900">
                    {coupon.discount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">الحد الأدنى للشراء:</span>
                  <span className="font-bold">{coupon.minSpend} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">عدد مرات الاستخدام:</span>
                  <span className="font-bold">{coupon.usageCount} مرة</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">تاريخ الانتهاء:</span>
                  <span className="font-bold">{coupon.expiryDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => handleDelete(coupon.id)}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 p-1 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                حذف الكوبون
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
