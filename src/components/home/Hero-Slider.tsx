"use client";

import Image from "next/image";
import Link from 'next/link';
import { ArrowLeftIcon } from '../common/Icons';

import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1600&auto=format&fit=crop",
        tag: "تشكيلة رجالية حصرية 2026",
        title: "هوديز وسويت بانتس بقطن ثقيل وفاخر",
        description: "تصاميم عصرية مريحة بخامات قطنية نقية 100% تمنحك الدفء والأناقة في كل إطلالة.",
        primaryLink: "/category/men",
        primaryText: "تسوق للرجال",
        secondaryLink: "/products",
        secondaryText: "كل المنتجات",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop",
        tag: "مجموعة النساء العصرية",
        title: "نعومة فائقة وقصات أنثوية مريحة",
        description: "تشكيلة راقية من الهوديز الناعمة وبناطيل السويت بانتس الواسعة لإطلالة يومية مريحة ومتألقة.",
        primaryLink: "/category/women",
        primaryText: "تسوق للنساء",
        secondaryLink: "/products",
        secondaryText: "كل المنتجات",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1600&auto=format&fit=crop",
        tag: "تشكيلة للجنسين (Unisex)",
        title: "تصاميم أوفر سايز تناسب الجميع",
        description: "قصات بوكسي ومينيمال محايدة بألوان ترابية كلاسيكية تعكس روح الموضة الحضرية الحديثة.",
        primaryLink: "/category/unisex",
        primaryText: "تسوق تشكيلة Unisex",
        secondaryLink: "/products",
        secondaryText: "كل المنتجات",
    },
];

export default function HeroSlider() {
    return (
        <section className="relative h-[600px] w-full overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                // navigation
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full overflow-hidden bg-stone-900 text-white min-h-[480px] sm:min-h-[540px] flex items-center shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-l from-stone-950/90 via-stone-950/60 to-transparent z-[1]" />
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority={slide.id === 1}
                                className="object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 z-[1]" />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center z-[2]">
                                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                                    <div className="max-w-2xl text-white space-y-4">
                                        <span className="inline-block text-xs uppercase tracking-widest text-[#D4BFA7] font-bold bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                                            {slide.tag}
                                        </span>
                                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                            {slide.title}
                                        </h1>

                                        <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-md font-normal">
                                            {slide.description}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-3 pt-3">
                                            <Link
                                                href={slide.primaryLink}
                                                className="px-6 py-3.5 bg-white text-stone-900 text-xs sm:text-sm font-bold rounded-2xl hover:bg-stone-100 transition-all flex items-center gap-2 shadow-lg active:scale-95"
                                            >
                                                <span>{slide.primaryText}</span>
                                                <ArrowLeftIcon size={16} />
                                            </Link>

                                            <Link
                                                href={slide.secondaryLink}
                                                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold rounded-2xl border border-white/25 transition-all"
                                            >
                                                {slide.secondaryText}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
