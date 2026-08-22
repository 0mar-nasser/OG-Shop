'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, FilterState } from '@/types/product';
import { ProductGrid } from './ProductGrid';
import { ProductFilters } from './ProductFilters';
import { FilterIcon, ChevronDownIcon } from '../common/Icons';

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
    <div className="py-8 sm:py-12">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <nav className="flex items-center gap-2 text-xs text-stone-400">
            <Link href="/" className="hover:text-stone-700 transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            {hasHub && categorySlug ? (
              <>
                <Link
                  href={`/category/${categorySlug}`}
                  className="hover:text-stone-700 transition-colors"
                >
                  {title}
                </Link>
                {activeHubTitle && (
                  <>
                    <span>/</span>
                    <span className="text-stone-800 font-semibold">{activeHubTitle}</span>
                  </>
                )}
              </>
            ) : (
              <span className="text-stone-800 font-semibold">{title}</span>
            )}
          </nav>

          {hasHub && categorySlug && (
            <Link
              href={`/category/${categorySlug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E866C] hover:text-stone-900 bg-[#9E866C]/10 hover:bg-[#9E866C]/20 px-3.5 py-1.5 rounded-full transition-all"
            >
              <span>← العودة لجميع تصنيفات {title}</span>
            </Link>
          )}
        </div>

        {/* Header Title & Description */}
        <div className="mb-8 pb-6 border-b border-stone-200">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900">
              {activeHubTitle ? `${title} - ${activeHubTitle}` : title}
            </h1>
          </div>
          {description && (
            <p className="text-xs sm:text-sm text-stone-500 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Subcategories quick filter pills */}
        {subcategoriesList.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            <button
              onClick={() => setFilters({ ...filters, subcategories: [] })}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${filters.subcategories.length === 0
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
                }`}
            >
              الكل ({initialProducts.length})
            </button>
            {subcategoriesList.map((sub) => {
              const isActive = filters.subcategories.includes(sub);
              return (
                <button
                  key={sub}
                  onClick={() => {
                    const exists = filters.subcategories.includes(sub);
                    setFilters({
                      ...filters,
                      subcategories: exists
                        ? filters.subcategories.filter((s) => s !== sub)
                        : [sub]
                    });
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
                    }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}

        {/* Control Bar: Total Count, Mobile Filter trigger, Sort Selector */}
        <div className="flex items-center justify-between gap-4 p-4 mb-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="text-xs sm:text-sm text-stone-600 font-medium">
            عرض <strong className="text-stone-950 font-bold">{filteredProducts.length}</strong> منتج
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold hover:bg-stone-200 transition-colors relative"
            >
              <FilterIcon size={16} />
              <span>تصفية</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#9E866C] text-white text-[10px] flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-400 hidden sm:inline">ترتيب حسب:</span>
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters({ ...filters, sortBy: e.target.value as any })
                  }
                  className="appearance-none bg-stone-50 text-stone-900 text-xs font-semibold py-2 pr-3 pl-8 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#9E866C]/40 cursor-pointer"
                >
                  <option value="featured">المميز والمقترح</option>
                  <option value="newest">الأحدث وصولاً</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                  <option value="rating">الأعلى تقييماً</option>
                </select>
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
                  <ChevronDownIcon size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Sidebar Filters + Products Grid */}
        <div className="flex items-start gap-8">
          <ProductFilters
            filters={filters}
            onFilterChange={setFilters}
            onReset={resetFilters}
            subcategoriesList={subcategoriesList}
            isMobileOpen={isMobileFiltersOpen}
            onMobileClose={() => setIsMobileFiltersOpen(false)}
            totalResultsCount={filteredProducts.length}
          />

          <div className="flex-1 min-w-0">
            <ProductGrid products={filteredProducts} columns={3} />
          </div>
        </div>

      </div>
    </div>
  );
}
