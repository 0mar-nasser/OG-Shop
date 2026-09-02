'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { StarRating } from '../common/StarRating';
import { Badge } from '../common/Badge';
import { HeartIcon } from '../common/Icons';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setIsCartDrawerOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const hasSecondaryImage = product.images.length > 1;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200/70 hover:border-stone-300 hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-[3/3] w-full bg-stone-100 overflow-hidden">
        {/* Main Image */}
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <Image
            src={isHovered && hasSecondaryImage ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestSeller && <Badge variant="bestseller">الأكثر مبيعاً</Badge>}
          {product.isNew && <Badge variant="new">وصل حديثاً</Badge>}
          {product.discount && <Badge variant="sale">خصم {product.discount}%</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-red-500 hover:bg-white flex items-center justify-center shadow-xs transition-all duration-200 z-10"
          aria-label={isFavorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          title={isFavorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        >
          <HeartIcon
            size={17}
            fill={isFavorited ? '#EF4444' : 'none'}
            className={isFavorited ? 'text-red-500 scale-110' : 'text-stone-700'}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category / Subcategory */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
            <span>{product.subcategory || product.categoryName}</span>
            {product.colors.length > 1 && (
              <span className="text-[10px] text-stone-500">
                {product.colors.length} ألوان
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link
            href={`/products/${product.id}`}
            className="block text-sm font-semibold text-stone-800 hover:text-[#9E866C] transition-colors line-clamp-1 mb-1.5"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="mb-2">
            <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={12} />
          </div>
        </div>

        {/* Price & Colors Preview */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-stone-900">
              {product.price} <span className="text-xs font-normal text-stone-500">درهم</span>
            </span>
            {product.oldPrice && (
              <span className="text-xs text-stone-400 line-through">
                {product.oldPrice}
              </span>
            )}
          </div>

          {/* Color swatches */}
          <div className="flex items-center gap-1">
            {Array.isArray(product.colors) &&
              product.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-stone-300"
                  style={{ backgroundColor: col?.hex || '#1C1917' }}
                  title={col?.name || ''}
                />
              ))}
            {Array.isArray(product.colors) && product.colors.length > 3 && (
              <span className="text-[9px] text-stone-400 font-medium">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

