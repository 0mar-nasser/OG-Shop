'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/types/product';
import { ProductGrid } from '@/components/products/ProductGrid';
import { SearchIcon, CloseIcon } from '@/components/common/Icons';

const POPULAR_SEARCHES = [
  'هودي',
  'سويت بانتس',
  'أوفر سايز',
  'رجالي',
  'نسائي',
  'unisex',
  'أسود',
  'رمادي',
  'قطن ثقيل',
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch results from API whenever query or category changes
  useEffect(() => {
    const currentQ = searchParams.get('q') || '';
    setQuery(currentQ);
  }, [searchParams]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchResults() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (query.trim()) params.set('q', query.trim());
        if (activeCategory !== 'all') params.set('category', activeCategory);

        const res = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setResults(data.products ?? []);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Search error:', err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
    return () => controller.abort();
  }, [query, activeCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    router.push(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF9F6] min-h-[75vh]">
      <div className="max-w-7xl mx-auto">

        {/* Header & Big Search Input */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-stone-400 mb-2">
            <Link href="/" className="hover:text-stone-700 transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-stone-800 font-semibold">البحث في المتجر</span>
          </nav>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900">
            ما الذي تبحث عنه؟
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto pt-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث بالاسم، القماش، الفئة، أو المناسبة..."
              className="w-full bg-white text-stone-900 text-sm sm:text-base py-3.5 pr-12 pl-12 rounded-2xl border border-stone-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9E866C]/40 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
              <SearchIcon size={20} />
            </div>
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  router.push('/search');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <CloseIcon size={18} />
              </button>
            )}
          </form>

          {/* Popular searches tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-stone-400 font-medium">عمليات البحث الشائعة:</span>
            {POPULAR_SEARCHES.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full border transition-all ${query.toLowerCase() === tag.toLowerCase()
                    ? 'bg-stone-900 text-white border-stone-900 font-bold'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info & Category Quick Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 mb-8 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="text-xs sm:text-sm text-stone-700">
            {isLoading ? (
              <span className="text-stone-400">جارٍ البحث...</span>
            ) : query ? (
              <>
                نتائج البحث عن: <strong className="text-stone-950 font-bold">&quot;{query}&quot;</strong> ({results.length} منتج)
              </>
            ) : (
              <>عرض جميع المنتجات ({results.length} منتج)</>
            )}
          </div>

          {/* Quick Category filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none text-xs">
            {[
              { label: 'الكل', value: 'all' },
              { label: 'رجال', value: 'men' },
              { label: 'نساء', value: 'women' },
              { label: 'Unisex', value: 'unisex' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${activeCategory === tab.value
                    ? 'bg-stone-900 text-white shadow-xs font-bold'
                    : 'text-stone-600 hover:bg-stone-100'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={results}
          columns={4}
          emptyMessage={
            isLoading
              ? 'جارٍ التحميل...'
              : `لم نتمكن من العثور على أي نتائج مطابقة لـ "${query}". جرب البحث بكلمات أخرى مثل (قميص، كتان، فستان).`
          }
        />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500">جاري تحميل صفحة البحث...</div>}>
      <SearchContent />
    </Suspense>
  );
}
