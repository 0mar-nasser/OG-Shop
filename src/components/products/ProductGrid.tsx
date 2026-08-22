'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { ShoppingBagIcon } from '../common/Icons';

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  columns = 4,
  emptyMessage = 'لم يتم العثور على أي منتجات مطابقة لخيارات البحث أو التصفية.'
}: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-stone-200/80 p-8">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
          <ShoppingBagIcon size={28} />
        </div>
        <h3 className="text-base font-bold text-stone-800 mb-2">لا توجد منتجات</h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  const gridColsClass =
    columns === 3
      ? 'grid-cols-2 md:grid-cols-3'
      : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <>
      <div className={`grid ${gridColsClass} gap-3 sm:gap-6`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
