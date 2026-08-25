'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
        <div className="grid grid-cols-1 md:grid-cols-2">
          {hubItems.map((item: SubcategoryHubItem, index: number) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            >
              <Link
                href={`/category/${category.slug}?sub=${item.slug}`}
                className="group relative block h-[400px] sm:h-[480px] lg:h-[540px] overflow-hidden"
              >
                {/* Background Image with Smooth Zoom */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  priority={index < 2}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Luxury Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-transparent transition-opacity duration-500 group-hover:from-stone-950 group-hover:via-stone-900/50" />

                {/* Bottom Content Area */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                  className="absolute bottom-0 right-0 left-0 p-6 sm:p-8 lg:p-10 text-white space-y-3 z-10"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <motion.h2
                      className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm transition-transform duration-300 group-hover:translate-x-1"
                    >
                      {item.name}
                    </motion.h2>
                    {item.itemCount && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="text-xs text-stone-300 font-medium bg-stone-900/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10"
                      >
                        +{item.itemCount} قطعة
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
