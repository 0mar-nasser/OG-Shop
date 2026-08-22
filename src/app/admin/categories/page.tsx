'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layers, Plus, Edit2, Trash2, Tag } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(CATEGORIES);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900">إدارة التصنيفات</h2>
          <p className="text-xs text-stone-500 mt-1">
            التحكم في الأقسام الرئيسية والفرعية لمتجر راقِـي
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9E866C] hover:bg-[#8b755d] text-white text-sm font-bold rounded-xl shadow-md transition-all self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          إضافة تصنيف جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-3 right-4 left-4 text-white">
                  <span className="text-[10px] font-bold text-[#e4d5c4] uppercase tracking-wider block">
                    {category.englishTag}
                  </span>
                  <h3 className="text-lg font-black">{category.name}</h3>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-stone-600 line-clamp-2">
                  {category.description}
                </p>

                <div>
                  <div className="text-[11px] font-bold text-stone-400 mb-2">
                    الأقسام الفرعية ({category.subcategories.length}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.subcategories.map((sub, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-stone-100 rounded-lg text-[11px] font-medium text-stone-700"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500">
                {category.itemCount} منتج متاح
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors"
                  title="تعديل"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
