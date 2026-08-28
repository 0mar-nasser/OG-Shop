'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { StarRating } from '../common/StarRating';
import { Badge } from '../common/Badge';
import { CloseIcon, HeartIcon, ShoppingBagIcon, CheckIcon } from '../common/Icons';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, setIsCartDrawerOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<string>(product?.images?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || 'Free Size');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || { name: 'افتراضي', hex: '#1C1917' });
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes?.[0] || 'Free Size';
    const color = selectedColor || product.colors?.[0] || { name: 'افتراضي', hex: '#1C1917' };
    addToCart(product, size, color, quantity);
    onClose();
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-right shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-stone-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 p-2 rounded-full bg-stone-100/90 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="إغلاق"
          >
            <CloseIcon size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Section */}
            <div className="p-6 bg-stone-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-stone-200">
              <div className="relative aspect-[3/4] w-full max-w-xs rounded-2xl overflow-hidden shadow-xs bg-white border border-stone-200">
                <Image
                  src={selectedImage || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 mt-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-14 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        (selectedImage || product.images[0]) === img
                          ? 'border-[#9E866C] ring-2 ring-[#9E866C]/20'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{product.categoryName}</Badge>
                  {product.discount && <Badge variant="sale">خصم {product.discount}%</Badge>}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2">
                  {product.name}
                </h3>

                <div className="mb-4">
                  <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-extrabold text-stone-900">
                    {product.price} درهم
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {product.oldPrice} درهم
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-6">
                  {product.shortDescription}
                </p>

                {/* Color Selection */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
                    <span>اللون: <strong className="text-stone-950 font-bold">{selectedColor.name || product.colors[0].name}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => {
                      const isSelected = (selectedColor.name || product.colors[0].name) === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-stone-900 ring-2 ring-stone-900/20 scale-110'
                              : 'border-stone-300 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {isSelected && (
                            <CheckIcon
                              size={12}
                              className={color.hex === '#FFFFFF' || color.hex === '#FAF7F2' || color.hex === '#F8FAFC' ? 'text-stone-900' : 'text-white'}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
                    <span>المقاس: <strong className="text-stone-950">{selectedSize || product.sizes[0]}</strong></span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = (selectedSize || product.sizes[0]) === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            isSelected
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-stone-100">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBagIcon size={16} />
                    <span>إضافة إلى السلة</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors"
                    title={isFavorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                  >
                    <HeartIcon
                      size={18}
                      fill={isFavorited ? '#EF4444' : 'none'}
                      className={isFavorited ? 'text-red-500' : 'text-stone-700'}
                    />
                  </button>
                </div>

                <Link
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="block text-center text-xs text-[#9E866C] hover:underline font-semibold py-1"
                >
                  عرض كافة تفاصيل المنتج ومواصفاته الكاملة ←
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
