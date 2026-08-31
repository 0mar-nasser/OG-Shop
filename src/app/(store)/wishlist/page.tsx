'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { HeartIcon, ShoppingBagIcon, TrashIcon, ArrowLeftIcon } from '@/components/common/Icons';
import { StarRating } from '@/components/common/StarRating';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, setIsCartDrawerOpen } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product, product.sizes[0], product.colors[0], 1);
    removeFromWishlist(product.id);
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="py-8 sm:py-6 bg-[#FAF9F6] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-stone-200">
          <div>
            <nav className="flex items-center gap-2 text-xs text-stone-400 mb-2">
              <Link href="/" className="hover:text-stone-700 transition-colors">
                الرئيسية
              </Link>
              <span>/</span>
              <span className="text-stone-800 font-semibold">قائمة الرغبات</span>
            </nav>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-stone-500 hover:text-red-600 transition-colors underline"
            >
              تفريغ القائمة
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          /* Empty Wishlist State */
          <div className="bg-white rounded-3xl border border-stone-200/80 p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-5">
              <HeartIcon size={36} />
            </div>
            <h2 className="text-xl font-bold text-stone-900 mb-2">قائمة الرغبات فارغة</h2>
            <p className="text-xs sm:text-sm text-stone-500 mb-8 leading-relaxed">
              احفظ القطع المفضلة لديك بالضغط على أيقونة القلب لتعود إليها في أي وقت وتتسوقها بسهولة.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-stone-900 text-white text-xs sm:text-sm font-bold rounded-2xl hover:bg-stone-800 transition-colors shadow-md"
            >
              <span>تصفح المنتجات الآن</span>
              <ArrowLeftIcon size={16} />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/70 hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden">
                  <Link href={`/products/${product.id}`} className="block w-full h-full">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-red-500 hover:bg-white flex items-center justify-center shadow-xs"
                    title="إزالة من المفضلة"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block mb-1">
                      {product.categoryName}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="block text-sm font-bold text-stone-900 hover:text-[#9E866C] transition-colors line-clamp-1 mb-1.5"
                    >
                      {product.name}
                    </Link>
                    <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={12} />
                  </div>

                  <div className="pt-4 border-t border-stone-100 mt-4 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-base font-extrabold text-stone-900">
                        {product.price} درهم
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-stone-400 line-through">
                          {product.oldPrice} درهم
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <ShoppingBagIcon size={14} />
                      <span>نقل إلى السلة</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
