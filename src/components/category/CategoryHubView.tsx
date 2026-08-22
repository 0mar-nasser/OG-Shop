'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CategoryItem, SubcategoryHubItem } from '@/data/categories';
import { ArrowLeftIcon, SparklesIcon, ShoppingBagIcon } from '../common/Icons';

interface CategoryHubViewProps {
  category: CategoryItem;
  totalProductsCount: number;
}

export function CategoryHubView({
  category,
  totalProductsCount
}: CategoryHubViewProps) {
  const hubItems = category.hubItems || [];

  return (
    <div className="w-full bg-[#FAF7F2]">

      {/* Top Header & Breadcrumb */}
      <div className="w-full px-4 sm:px-6 lg:px-10 mb-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mt-4">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">{category.name}</span>
        </nav>
      </div>

      {/* Full-Width 2-Column Grid (كل 2 في سطر وتاخد عرض الشاشة كلها) */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {hubItems.map((item: SubcategoryHubItem, index: number) => (
            <Link
              key={item.id || index}
              href={`/category/${category.slug}?sub=${item.slug}`}
              className="group relative h-[400px] sm:h-[480px] lg:h-[540px]"
            >
              {/* Background Image with Smooth Zoom */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                priority={index < 2}
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Luxury Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-800 via-stone-950/30 to-stone-900/10 transition-opacity duration-500" />

              {/* Bottom Content Area */}
              <div className="absolute bottom-0 right-0 left-0 p-6 sm:p-8 lg:p-10 text-white space-y-3 z-10">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-xs">
                    {item.name}
                  </h2>
                  {item.itemCount && (
                    <span className="text-xs text-stone-300 font-medium">
                      +{item.itemCount} قطعة
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
