'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, FilterState } from '@/types/product';
import { ProductGrid } from './ProductGrid';
import { ProductFilters } from './ProductFilters';
import { ChevronDownIcon } from '../common/Icons';
import { SlidersHorizontal, LayoutGrid, List, ChevronRight } from 'lucide-react';

interface ProductsListingViewProps {
  initialProducts: Product[];
  title: string;
  description?: string;
  categorySlug?: string;
  subcategoriesList: string[];
  initialSubcategories?: string[];
  activeHubTitle?: string;
  hasHub?: boolean;
}

export function ProductsListingView({
  initialProducts,
  title,
  description,
  categorySlug,
  subcategoriesList,
  initialSubcategories = [],
  activeHubTitle,
  hasHub = false
}: ProductsListingViewProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    category: categorySlug,
    subcategories: initialSubcategories,
    priceRange: [0, 600],
    sizes: [],
    colors: [],
    minRating: 0,
    onlyDiscount: false,
    onlyInStock: false,
    sortBy: 'featured'
  });

  const resetFilters = () => {
    setFilters({
      category: categorySlug,
      subcategories: [],
      priceRange: [0, 600],
      sizes: [],
      colors: [],
      minRating: 0,
      onlyDiscount: false,
      onlyInStock: false,
      sortBy: 'featured'
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Subcategories
      if (
        filters.subcategories.length > 0 &&
        !filters.subcategories.includes(product.subcategory)
      ) {
        return false;
      }

      // Price
      if (product.price > filters.priceRange[1]) {
        return false;
      }

      // Sizes
      if (
        filters.sizes.length > 0 &&
        !product.sizes.some((s) => filters.sizes.includes(s))
      ) {
        return false;
      }

      // Colors
      if (
        filters.colors.length > 0 &&
        !product.colors.some((c) => filters.colors.includes(c.name))
      ) {
        return false;
      }

      // Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // Only Discount
      if (filters.onlyDiscount && !product.discount) {
        return false;
      }

      // Only In Stock
      if (filters.onlyInStock && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      if (filters.sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // 'featured'
    });
  }, [initialProducts, filters]);

  const activeFiltersCount =
    filters.subcategories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.onlyDiscount ? 1 : 0) +
    (filters.onlyInStock ? 1 : 0) +
    (filters.priceRange[1] < 600 ? 1 : 0);

  return (
    <div className="py-4 bg-[#FAF9F6] min-h-screen font-sans" dir="rtl">
      {/* 1. Top Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-stone-400 mb-5 font-medium w-[90%] mx-auto">
        <span className="text-stone-800 font-bold">جميع المنتجات</span>
        <span className="text-stone-300">‹</span>
        <Link href="/products" className="hover:text-stone-700 transition-colors">
          جميع المنتجات والتشكيلات
        </Link>
        <span className="text-stone-300">‹</span>
        <Link href="/" className="hover:text-stone-700 transition-colors">
          الرئيسية
        </Link>
      </nav>

      {/* 2. Top Full-Width Header Banner with Background Image */}
      <div className="relative w-full overflow-hidden min-h-[180px] sm:min-h-[220px] mb-8 flex items-center justify-center p-6 sm:p-12 shadow-lg">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
          alt={title || 'جميع المنتجات'}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark & Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-stone-950/55 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40" />

        {/* Centered Content */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto text-white">
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#D7C4B7] bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 mb-3">
            المجموعة الكاملة
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
            {title || 'جميع المنتجات'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 max-w-lg mx-auto leading-relaxed font-normal">
            {description || 'اكتشف أحدث تشكيلات الأزياء والملابس الفاخرة المصنوعة بأعلى معايير الجودة'}
          </p>
          {/* Terracotta Line Indicator */}
          <div className="w-14 h-1 bg-[#BD5B24] rounded-full mx-auto mt-4 shadow-sm" />
        </div>
      </div>

      <div className="w-[90%] mx-auto">
        {/* 5. Main Content Area: Sidebar Filters + Products Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-8">
          <ProductFilters
            filters={filters}
            onFilterChange={setFilters}
            onReset={resetFilters}
            subcategoriesList={subcategoriesList}
            isMobileOpen={isMobileFiltersOpen}
            onMobileOpen={() => setIsMobileFiltersOpen(true)}
            onMobileClose={() => setIsMobileFiltersOpen(false)}
            totalResultsCount={filteredProducts.length}
          />

          <div className="flex-1 min-w-0 w-full">
            <ProductGrid products={filteredProducts} columns={viewMode === 'grid' ? 3 : 1} />
          </div>
        </div>

      </div>
    </div>
  );
}
