import React from 'react';
import Link from 'next/link';
import { getBestSellerProducts } from '@/lib/products';
import { BestSellerCard } from './BestSellerCard';
import { ArrowLeft } from 'lucide-react';

export async function FeaturedProducts() {
  const bestSellers = await getBestSellerProducts(4);

  return (
    <section className="py-8 sm:py-20 bg-[#FBF9F5]" dir="rtl">
      <div className="max-w-7xl mx-auto">

        {/* Section Header Matching Mockup */}
        <div className="flex items-end justify-between mb-6 sm:mb-6">
          {/* Right side: Titles */}
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#9E866C] tracking-wide uppercase block mb-1.5 font-sans">
              المختارات المميزة
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              القطع الأكثر مبيعاً
            </h2>
          </div>

          {/* Left side: View All Link */}
          <Link
            href="/products"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-900 hover:text-[#9E866C] transition-colors pb-1"
          >
            <span>عرض الكل</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* Best Sellers 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {bestSellers.map((product) => (
            <BestSellerCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
