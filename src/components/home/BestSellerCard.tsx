'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useWishlist } from '@/context/WishlistContext';
import { HeartIcon } from '../common/Icons';
import { Star } from 'lucide-react';

interface BestSellerCardProps {
  product: Product;
}

export function BestSellerCard({ product }: BestSellerCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Determine active image if multiple exist
  const activeImage =
    isHovered && product.images.length > 1
      ? product.images[1]
      : product.images[0] || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800';

  const discountAmount = product.discount || (product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null);

  return (
    <div
      className="group relative flex flex-col bg-white rounded-lg border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir="rtl"
    >
      <div>
        {/* Product Media Container (3:4 Aspect Ratio) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 mb-3.5">
          <Link href={`/products/${product.id}`} className="block w-full h-full">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-700 ease-out "
            />
          </Link>

          {/* Top Right: Discount Pill Badge */}
          {discountAmount && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-[#E8DCC4]/95 text-[#6E553B] text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs shadow-xs">
                خصم {discountAmount}%
              </span>
            </div>
          )}

          {/* Top Left: Circular Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 left-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 backdrop-blur-xs text-stone-700 hover:text-rose-500 hover:bg-white flex items-center justify-center shadow-md transition-all duration-200 z-10 active:scale-90 cursor-pointer"
            aria-label={isFavorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            title={isFavorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          >
            <HeartIcon
              size={17}
              fill={isFavorited ? '#EF4444' : 'none'}
              className={isFavorited ? 'text-rose-500 scale-110' : 'text-stone-700'}
            />
          </button>
        </div>

        {/* Product Info (Centered Alignment as in mockup) */}
        <div className="flex flex-col items-center text-center px-1">
          {/* Product Title */}
          <Link
            href={`/products/${product.id}`}
            className="block text-xs sm:text-[13px] font-bold text-stone-900 hover:text-[#9E866C] transition-colors leading-snug line-clamp-2  mb-2"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Ratings & Reviews Row */}
          <div className="flex items-center justify-center gap-1 mb-2.5 text-xs">
            <span className="text-[11px] text-stone-400 font-semibold order-1">
              ({product.reviewsCount || 120})
            </span>
            <span className="text-xs font-bold text-stone-800 order-2 mr-1">
              {product.rating ? product.rating.toFixed(1) : '4.9'}
            </span>
            <div className="flex items-center text-amber-500 order-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                />
              ))}
            </div>
          </div>

          {/* Color Swatches */}
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {Array.isArray(product.colors) && product.colors.length > 0 ? (
              product.colors.slice(0, 4).map((col, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${selectedColorIdx === idx
                    ? 'ring-2 ring-stone-900 ring-offset-1 border-transparent scale-110'
                    : 'border-stone-300 hover:scale-110'
                    }`}
                  style={{ backgroundColor: col?.hex || '#1C1917' }}
                  title={col?.name || ''}
                />
              ))
            ) : (
              <>
                <span className="w-4 h-4 rounded-full bg-stone-900 border border-stone-300" />
                <span className="w-4 h-4 rounded-full bg-[#D7C4B7] border border-stone-300" />
                <span className="w-4 h-4 rounded-full bg-[#78716C] border border-stone-300" />
              </>
            )}
          </div>

          {/* Price Section */}
          <div className="flex items-baseline justify-center gap-2 mb-3">
            <span className="text-base sm:text-lg font-extrabold text-stone-950">
              {product.price} <span className="text-xs font-bold text-stone-600">درهم</span>
            </span>
            {product.oldPrice && (
              <span className="text-xs text-stone-400 line-through font-normal">
                {product.oldPrice} درهم
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Button: عرض المنتج */}
      <Link
        href={`/products/${product.id}`}
        className="w-[90%] mx-auto py-3 bg-[#18181B] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-md transition-all shadow-xs active:scale-[0.99] flex items-center justify-center text-center my-3"
      >
        عرض المنتج
      </Link>
    </div>
  );
}
