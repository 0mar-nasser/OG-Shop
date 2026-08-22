'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductReviews } from '@/components/products/ProductReviews';
import { ProductGrid } from '@/components/products/ProductGrid';
import { SizeGuideModal } from '@/components/products/SizeGuideModal';
import { StarRating } from '@/components/common/StarRating';
import { Badge } from '@/components/common/Badge';
import {
  HeartIcon,
  ShoppingBagIcon,
  CheckIcon,
  TruckIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  PlusIcon,
  MinusIcon,
  ChevronDownIcon
} from '@/components/common/Icons';

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailsClient({
  product,
  relatedProducts
}: ProductDetailsClientProps) {
  const router = useRouter();
  const { addToCart, setIsCartDrawerOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: '', hex: '' });
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>('description');

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartDrawerOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/cart');
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? '' : section);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-400 mb-6">
          <Link href="/" className="hover:text-stone-700 transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-stone-700 transition-colors"
          >
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-stone-800 font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout: Gallery & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Gallery Column (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Details & Actions Column (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Badges & Category */}
              <div className="flex items-center gap-2 mb-2.5">
                <Badge variant="outline">{product.subcategory || product.categoryName}</Badge>
                {product.isBestSeller && <Badge variant="bestseller">الأكثر مبيعاً</Badge>}
                {product.isNew && <Badge variant="new">وصل حديثاً</Badge>}
                {product.discount && <Badge variant="sale">خصم {product.discount}%</Badge>}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-snug mb-3">
                {product.name}
              </h1>

              {/* Rating & SKU */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={15} />
                <span className="text-xs text-stone-400 font-mono">رمز: {product.sku}</span>
              </div>

              {/* Price */}
              <div className="py-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-stone-900">
                  {product.price} <span className="text-sm font-normal text-stone-500">درهم / ر.س</span>
                </span>
                {product.oldPrice && (
                  <span className="text-base text-stone-400 line-through">
                    {product.oldPrice} درهم
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                    وفرت {product.oldPrice! - product.price} درهم ({product.discount}%)
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                {product.shortDescription}
              </p>

              {/* Colors Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-2.5">
                  <span>اللون المختار: <strong className="text-stone-950">{selectedColor.name}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-stone-900 ring-2 ring-stone-900/20 scale-110 shadow-xs'
                            : 'border-stone-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {isSelected && (
                          <CheckIcon
                            size={14}
                            className={
                              color.hex === '#FFFFFF' || color.hex === '#FAF7F2' || color.hex === '#F8FAFC'
                                ? 'text-stone-900'
                                : 'text-white'
                            }
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes Selection & Size Guide */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-2.5">
                  <span>المقاس: <strong className="text-stone-950">{selectedSize}</strong></span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#9E866C] hover:underline font-semibold"
                  >
                    دليل المقاسات 📐
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-12 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-stone-800">الكمية:</span>
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    <MinusIcon size={14} />
                  </button>
                  <span className="px-4 text-xs font-extrabold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    <PlusIcon size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions: Add to Cart, Buy Now, Wishlist */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-stone-900 text-white text-xs sm:text-sm font-bold rounded-2xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
                >
                  <ShoppingBagIcon size={18} />
                  <span>إضافة إلى السلة</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-3.5 rounded-2xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 transition-all shadow-xs"
                  title={isFavorited ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                >
                  <HeartIcon
                    size={20}
                    fill={isFavorited ? '#EF4444' : 'none'}
                    className={isFavorited ? 'text-red-500 scale-110' : 'text-stone-700'}
                  />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 bg-[#9E866C] hover:bg-[#8C7359] text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-sm active:scale-98"
              >
                شراء فوري الآن
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 text-center text-[11px] text-stone-500">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-stone-50 border border-stone-200/50">
                  <TruckIcon size={16} className="text-[#9E866C]" />
                  <span>شحن مجاني فوق 300</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-stone-50 border border-stone-200/50">
                  <RotateCcwIcon size={16} className="text-[#9E866C]" />
                  <span>إرجاع سهل 14 يوم</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-stone-50 border border-stone-200/50">
                  <ShieldCheckIcon size={16} className="text-[#9E866C]" />
                  <span>أصلي ومضمون 100%</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Product Information Accordions */}
        <div className="mb-16 bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-stone-900 pb-4 border-b border-stone-200">
            معلومات وتفاصيل المنتج
          </h3>

          {/* Description */}
          <div className="border-b border-stone-100 pb-4">
            <button
              onClick={() => toggleAccordion('description')}
              className="w-full flex items-center justify-between text-sm font-bold text-stone-800 text-right py-2"
            >
              <span>وصف القطعة والتصميم</span>
              <ChevronDownIcon
                size={16}
                className={`transition-transform duration-200 ${
                  openAccordion === 'description' ? 'rotate-180 text-[#9E866C]' : 'text-stone-400'
                }`}
              />
            </button>
            {openAccordion === 'description' && (
              <div className="pt-2 text-xs sm:text-sm text-stone-600 leading-relaxed space-y-2 animate-fade-in">
                <p>{product.description}</p>
              </div>
            )}
          </div>

          {/* Material & Care */}
          <div className="border-b border-stone-100 pb-4">
            <button
              onClick={() => toggleAccordion('material')}
              className="w-full flex items-center justify-between text-sm font-bold text-stone-800 text-right py-2"
            >
              <span>الخامة وتعليمات العناية والغسيل</span>
              <ChevronDownIcon
                size={16}
                className={`transition-transform duration-200 ${
                  openAccordion === 'material' ? 'rotate-180 text-[#9E866C]' : 'text-stone-400'
                }`}
              />
            </button>
            {openAccordion === 'material' && (
              <div className="pt-2 text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3 animate-fade-in">
                <div>
                  <strong className="text-stone-900 block mb-1">نوع القماش والخامة:</strong>
                  <p>{product.material}</p>
                </div>
                <div>
                  <strong className="text-stone-900 block mb-1">إرشادات الغسيل:</strong>
                  <ul className="list-disc list-inside space-y-1">
                    {product.careInstructions.map((inst, i) => (
                      <li key={i}>{inst}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Shipping and Returns */}
          <div>
            <button
              onClick={() => toggleAccordion('shipping')}
              className="w-full flex items-center justify-between text-sm font-bold text-stone-800 text-right py-2"
            >
              <span>سياسة الشحن والاسترجاع</span>
              <ChevronDownIcon
                size={16}
                className={`transition-transform duration-200 ${
                  openAccordion === 'shipping' ? 'rotate-180 text-[#9E866C]' : 'text-stone-400'
                }`}
              />
            </button>
            {openAccordion === 'shipping' && (
              <div className="pt-2 text-xs sm:text-sm text-stone-600 leading-relaxed space-y-2 animate-fade-in">
                <p>
                  • التوصيل يستغرق من 2 إلى 4 أيام عمل لكافة المناطق والمدن.
                </p>
                <p>
                  • الشحن مجاني للطلبات بقيمة 300 درهم / ريال أو أكثر.
                </p>
                <p>
                  • يحق للعميل استبدال أو استرجاع المنتج خلال 14 يوماً من تاريخ الاستلام بشرط أن يكون المنتج بحالته الأصلية وبالملصقات.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              تقييمات وآراء العملاء
            </h2>
          </div>
          <ProductReviews
            rating={product.rating}
            reviewsCount={product.reviewsCount}
            reviews={product.reviews}
          />
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-[#9E866C] uppercase tracking-wide block mb-1">
                  اقتراحات مشابهة
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                  قد يعجبك أيضاً
                </h2>
              </div>
              <Link
                href={`/category/${product.category}`}
                className="text-xs sm:text-sm font-bold text-[#9E866C] hover:underline"
              >
                تصفح المزيد ←
              </Link>
            </div>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}

      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}
