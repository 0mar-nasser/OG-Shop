'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { CloseIcon, TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon, ArrowLeftIcon } from '../common/Icons';

export function CartDrawer() {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateQuantity,
    removeFromCart,
    summary,
    totalItemsCount
  } = useCart();

  // Lock background scroll when drawer is open
  React.useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300 z-[100]"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 pr-0 sm:pr-10 z-[101]">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBagIcon size={20} className="text-stone-800" />
              <h2 className="text-lg font-bold text-stone-900">سلة المشتريات</h2>
              <span className="bg-stone-100 text-stone-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                {totalItemsCount} قطع
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="إغلاق السلة"
            >
              <CloseIcon size={20} />
            </button>
          </div>

          {/* Free shipping progress */}
          <div className="bg-stone-50 p-3.5 border-b border-stone-200/70 text-xs">
            {summary.amountNeededForFreeShipping > 0 ? (
              <div>
                <p className="text-stone-600 mb-1.5 font-medium">
                  أضف بـ <strong className="text-stone-900">{summary.amountNeededForFreeShipping} درهم</strong> إضافية للحصول على <strong className="text-[#9E866C]">شحن مجاني</strong>
                </p>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#9E866C] h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (summary.subtotal / summary.freeShippingThreshold) * 100)}%`
                    }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-emerald-700 font-semibold flex items-center gap-1.5">
                🎉 تهانينا! حصلت على شحن مجاني لهذا الطلب
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBagIcon size={28} />
                </div>
                <h3 className="text-base font-bold text-stone-800 mb-1">السلة فارغة حالياً</h3>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  استكشف تشكيلتنا الفاخرة وأضف المنتجات المفضلة لديك إلى سلة التسوق.
                </p>
                <Link
                  href="/products"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors"
                >
                  بدء التسوق
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                  <div className="w-20 h-24 relative rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200/60">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between h-24">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.product.id}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="text-sm font-semibold text-stone-800 hover:text-[#9E866C] transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          title="حذف"
                        >
                          <TrashIcon size={15} />
                        </button>
                      </div>
                      <div className="text-xs text-stone-500 mt-1 flex items-center gap-3">
                        <span>المقاس: <strong>{item.selectedSize}</strong></span>
                        <span className="flex items-center gap-1">
                          اللون:
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-stone-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm font-bold text-stone-900">
                        {item.product.price * item.quantity} درهم
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-stone-600 hover:bg-stone-200 transition-colors"
                          aria-label="تقليل الكمية"
                        >
                          <MinusIcon size={13} />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-stone-600 hover:bg-stone-200 transition-colors"
                          aria-label="زيادة الكمية"
                        >
                          <PlusIcon size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/50 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-semibold text-stone-800">{summary.subtotal} درهم</span>
                </div>
                {summary.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>خصم الكوبون ({summary.appliedCoupon?.code}):</span>
                    <span className="font-semibold">-{summary.discount} درهم</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>الشحن:</span>
                  <span className="font-semibold text-stone-800">
                    {summary.shipping === 0 ? 'مجاني' : `${summary.shipping} درهم`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>الإجمالي التقريبي:</span>
                  <span className="text-base text-stone-950">{summary.total} درهم</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-3 px-4 rounded-xl border border-stone-300 text-stone-800 text-xs font-bold text-center hover:bg-stone-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>عرض السلة</span>
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-3 px-4 rounded-xl bg-stone-900 text-white text-xs font-bold text-center hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>إتمام الشراء</span>
                  <ArrowLeftIcon size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
