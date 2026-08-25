'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '../common/Icons';

export function GenderSection() {
  const sections = [
    {
      id: 'women',
      tag: "WOMEN'S COLLECTION",
      badge: 'المجموعة النسائية',
      title: 'تشكيلة النساء',
      subtitle: 'أحدث الفساتين والأطقم الفاخرة المصممة بعناية فائقة وتطريز راقٍ',
      href: '/category/women',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'men',
      tag: "MEN'S ATELIER",
      badge: 'المجموعة الرجالية',
      title: 'تشكيلة الرجال',
      subtitle: 'قمصان وبدل وأزياء عصرية كلاسيكية تجمع بين الأصالة والراحة التامة',
      href: '/category/men',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'kids',
      tag: "KIDS EDIT",
      badge: 'مجموعة الأطفال',
      title: 'تشكيلة الأطفال',
      subtitle: 'أزياء قطنية ناعمة ومرحة مصممة بأعلى معايير الراحة لجميع الأوقات',
      href: '/category/kids',
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  return (
    <section className="pt-8 sm:pt-16 lg:pt-16 bg-[#FAF7F2]">
      <div className="mx-auto">

        {/* Classic Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between px-6 mb-4 sm:mb-8 border-b border-stone-300/70 pb-6 gap-4"
        >
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#9E866C] tracking-wide uppercase block mb-1">
              الفئات الأساسية
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              تسوق حسب الفئة
            </h2>
          </div>
        </motion.div>

        {/* Full-Height Editorial 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {sections.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative h-[480px] sm:h-[560px] lg:h-[620px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 block bg-stone-900"
            >
              {/* Main Image with smooth zoom */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Luxury Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-black/10 transition-opacity duration-500 group-hover:from-stone-950" />

              {/* Top Tag */}
              <div className="absolute top-6 right-6 left-6 flex items-center justify-between z-10">
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="text-[11px] font-semibold text-stone-200 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20"
                >
                  {item.badge}
                </motion.span>
              </div>

              {/* Bottom Content Area */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.15, ease: 'easeOut' }}
                className="absolute bottom-0 right-0 left-0 p-6 sm:p-8 lg:p-10 text-white space-y-3.5 z-10"
              >
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 line-clamp-2 leading-relaxed font-normal">
                  {item.subtitle}
                </p>

                {/* Classic Button */}
                <div className="pt-2">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white text-stone-900 text-xs sm:text-sm font-bold shadow-md group-hover:bg-[#9E866C] group-hover:text-white transition-colors duration-300 group-hover:shadow-xl"
                  >
                    <span>تسوق الآن</span>
                    <ArrowLeftIcon size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
