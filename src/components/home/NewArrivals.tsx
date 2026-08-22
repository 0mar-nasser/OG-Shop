import React from 'react';
import Link from 'next/link';
import { getNewProducts } from '@/lib/products';
import { ProductGrid } from '../products/ProductGrid';

export async function NewArrivals() {
  const newProducts = await getNewProducts(4);

  return (
    <section className="py-12 sm:py-16 bg-[#FAF9F6]">
      <div className="w-[90%] mx-auto px-4 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-bold text-[#9E866C] tracking-wide uppercase block mb-1">
              أحدث الإضافات
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              وصل حديثاً
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-[#9E866C] hover:underline"
          >
            استعراض الجميع ←
          </Link>
        </div>

        {/* Products */}
        <ProductGrid products={newProducts} columns={4} />
      </div>
    </section>
  );
}
