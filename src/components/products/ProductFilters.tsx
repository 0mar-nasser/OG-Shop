'use client';

import React from 'react';
import { FilterState } from '@/types/product';
import { CloseIcon, FilterIcon, StarIcon, CheckIcon } from '../common/Icons';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  subcategoriesList: string[];
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  onMobileOpen?: () => void;
  totalResultsCount: number;
}

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const AVAILABLE_COLORS = [
  { name: 'أبيض', hex: '#FFFFFF' },
  { name: 'أسود', hex: '#1C1917' },
  { name: 'بيج', hex: '#D7C4B7' },
  { name: 'رمادي', hex: '#9E9A94' },
  { name: 'كحلي', hex: '#1E293B' },
  { name: 'بني', hex: '#523423' },
  { name: 'وردي', hex: '#D4A59A' },
  { name: 'زيتي', hex: '#444D41' }
];

export function ProductFilters({
  filters,
  onFilterChange,
  onReset,
  subcategoriesList,
  isMobileOpen,
  onMobileClose,
  onMobileOpen,
  totalResultsCount
}: ProductFiltersProps) {
  const activeFiltersCount =
    filters.subcategories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.onlyDiscount ? 1 : 0) +
    (filters.onlyInStock ? 1 : 0) +
    (filters.priceRange[1] < 600 ? 1 : 0);

  const toggleSubcategory = (sub: string) => {
    const exists = filters.subcategories.includes(sub);
    const updated = exists
      ? filters.subcategories.filter((s) => s !== sub)
      : [...filters.subcategories, sub];
    onFilterChange({ ...filters, subcategories: updated });
  };

  const toggleSize = (size: string) => {
    const exists = filters.sizes.includes(size);
    const updated = exists
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: updated });
  };

  const toggleColor = (colorName: string) => {
    const exists = filters.colors.includes(colorName);
    const updated = exists
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: updated });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = Number(e.target.value);
    onFilterChange({ ...filters, priceRange: [filters.priceRange[0], maxPrice] });
  };

  const Content = (
    <div className="space-y-6">
      {/* Header with Active Filters summary */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200 sticky top-0 bg-white z-10 -mt-1 pt-1">
        <div className="flex items-center gap-2">
          <FilterIcon size={18} className="text-stone-700" />
          <h3 className="text-sm font-bold text-stone-900">تصفية المنتجات</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-stone-500 hover:text-stone-900 underline transition-colors"
        >
          إعادة ضبط
        </button>
      </div>

      {/* Subcategories (if available) */}
      {subcategoriesList.length > 0 && (
        <div className="space-y-2.5 pb-5 border-b border-stone-200/70">
          <label className="text-xs font-bold text-stone-800 block">النوع / الفئة</label>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {subcategoriesList.map((sub) => {
              const isChecked = filters.subcategories.includes(sub);
              return (
                <label
                  key={sub}
                  className="flex items-center gap-2.5 text-xs text-stone-600 hover:text-stone-950 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSubcategory(sub)}
                    className="w-4 h-4 rounded-md border-stone-300 text-stone-900 focus:ring-stone-900/20 accent-stone-900"
                  />
                  <span>{sub}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-3 pb-5 border-b border-stone-200/70">
        <div className="flex items-center justify-between text-xs font-bold text-stone-800">
          <span>السعر الأقصى</span>
          <span className="text-[#9E866C] font-extrabold">{filters.priceRange[1]} درهم</span>
        </div>
        <input
          type="range"
          min="50"
          max="600"
          step="10"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-stone-900 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-stone-400 font-medium">
          <span>50 درهم</span>
          <span>600 درهم</span>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2.5 pb-5 border-b border-stone-200/70">
        <label className="text-xs font-bold text-stone-800 block">المقاس</label>
        <div className="flex flex-wrap gap-1.5">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                  }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-2 pb-5 border-b border-stone-200/70">
        <label className="text-xs font-bold text-stone-800 block">التقييم</label>
        <div className="space-y-1.5">
          {[4, 3, 0].map((star) => (
            <label
              key={star}
              className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              <input
                type="radio"
                name="rating_filter"
                checked={filters.minRating === star}
                onChange={() => onFilterChange({ ...filters, minRating: star })}
                className="accent-stone-900"
              />
              <span className="flex items-center gap-1">
                {star > 0 ? (
                  <>
                    <span className="font-semibold">{star} نجوم وأكثر</span>
                    <StarIcon size={13} filled />
                  </>
                ) : (
                  'جميع التقييمات'
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Quick Toggles (Only Sale, Only In Stock) */}
      <div className="space-y-2.5 pt-1">
        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-medium">المنتجات المخفضة فقط</span>
          <input
            type="checkbox"
            checked={filters.onlyDiscount}
            onChange={(e) => onFilterChange({ ...filters, onlyDiscount: e.target.checked })}
            className="w-4 h-4 rounded text-stone-900 accent-stone-900"
          />
        </label>
        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-medium">المتوفر في المخزون فقط</span>
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={(e) => onFilterChange({ ...filters, onlyInStock: e.target.checked })}
            className="w-4 h-4 rounded text-stone-900 accent-stone-900"
          />
        </label>
      </div>
    </div>
  );

  // Prevent body scroll when filter drawer is open
  React.useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Desktop Sidebar Filter */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 max-h-[calc(100vh-7.5rem)] overflow-y-auto bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs overscroll-contain">
        {Content}
      </aside>

      {/* Mobile Sticky Horizontal Filter Bar */}
      <div className="block lg:hidden w-full sticky top-16 sm:top-20 z-30 bg-[#FAF9F6]/95 backdrop-blur-md py-2.5 border-y border-stone-200/70 mb-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 px-0.5 scroll-smooth">
          {/* Filter Drawer Trigger Button */}
          {onMobileOpen && (
            <button
              type="button"
              onClick={onMobileOpen}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${activeFiltersCount > 0
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white text-stone-800 border-stone-300 hover:border-stone-400'
                }`}
            >
              <FilterIcon size={14} className={activeFiltersCount > 0 ? 'text-white' : 'text-stone-700'} />
              <span>تصفية</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-stone-900 text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          )}

          <div className="h-4 w-px bg-stone-300 shrink-0" />

          {/* "الكل" (All) Category Chip */}
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, subcategories: [] })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all border ${filters.subcategories.length === 0
                ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
          >
            الكل
          </button>

          {/* Subcategories Horizontal Scrollable Chips */}
          {subcategoriesList.map((sub) => {
            const isSelected = filters.subcategories.includes(sub);
            return (
              <button
                type="button"
                key={sub}
                onClick={() => toggleSubcategory(sub)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all border ${isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs font-semibold'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
              >
                {sub}
              </button>
            );
          })}

          <div className="h-4 w-px bg-stone-300 shrink-0" />

          {/* Quick Sale Toggle */}
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, onlyDiscount: !filters.onlyDiscount })}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all border ${filters.onlyDiscount
                ? 'bg-[#BD5B24] text-white border-[#BD5B24] shadow-xs font-semibold'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
          >
            <span>عروض وخصومات</span>
            {filters.onlyDiscount && <CheckIcon size={12} />}
          </button>

          {/* Reset button if any filters active */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs text-red-600 hover:text-red-700 underline whitespace-nowrap shrink-0 px-2 transition-colors font-medium"
            >
              إعادة ضبط
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[95] lg:hidden overflow-hidden">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity z-[95]"
            onClick={onMobileClose}
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex z-[96]">
            <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col animate-slide-in-right">
              <div className="p-4 border-b border-stone-200 flex items-center justify-between">
                <span className="font-bold text-stone-900 text-base">تصفية النتائج</span>
                <button
                  onClick={onMobileClose}
                  className="p-1 text-stone-400 hover:text-stone-900 rounded-md"
                >
                  <CloseIcon size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">{Content}</div>

              <div className="p-4 border-t border-stone-200 bg-stone-50">
                <button
                  onClick={onMobileClose}
                  className="w-full py-3 bg-stone-900 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  عرض النتائج ({totalResultsCount})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
