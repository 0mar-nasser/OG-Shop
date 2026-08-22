import React from 'react';
import Link from 'next/link';
import { getBestSellerProducts } from '@/lib/products';
import { ProductGrid } from '../products/ProductGrid';

export async function FeaturedProducts() {
  const bestSellers = await getBestSellerProducts(8);

  return (
    <section className="py-12 sm:py-16 bg-[#FAF9F6]">
      <div className="w-[90%] mx-auto px-4 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-bold text-[#9E866C] tracking-wide uppercase block mb-1">
              المختارات المميزة
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              القطع الأكثر مبيعاً
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-[#9E866C] hover:underline"
          >
            عرض الكل ←
          </Link>
        </div>

        {/* Products Grid */}
        <ProductGrid products={bestSellers} columns={4} />
      </div>
    </section>
  );
}
