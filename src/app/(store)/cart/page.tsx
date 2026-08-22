'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import {
  ShoppingBagIcon,
  TrashIcon,
  HeartIcon,
  PlusIcon,
  MinusIcon,
  TagIcon,
  CloseIcon,
  CheckIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  TruckIcon
} from '@/components/common/Icons';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    summary,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [couponCode, setCouponCode] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Checkout Form State
  const [formData, setFormData] = useState({
    fullName: 'عمر الأحمد',
    phone: '0501234567',
    city: 'دبي',
    address: 'شارع بوليفارد الشيخ محمد بن راشد، برج الأناقة',
    paymentMethod: 'card'
  });

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (success) {
      setCouponCode('');
    }
  };

  const handleMoveToWishlist = (item: any) => {
    if (!isInWishlist(item.product.id)) {
      toggleWishlist(item.product);
    }
    removeFromCart(item.id);
    showToast('تم نقل المنتج إلى قائمة الرغبات', 'success');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeOrderNum = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(fakeOrderNum);
    setIsOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF9F6] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-2">
            <Link href="/" className="hover:text-stone-700 transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-stone-800 font-semibold">سلة التسوق</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            سلة المشتريات ({cart.length})
          </h1>
        </div>

        {cart.length === 0 && !isOrderPlaced ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-stone-200/80 p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-5">
              <ShoppingBagIcon size={36} />
            </div>
            <h2 className="text-xl font-bold text-stone-900 mb-2">سلة التسوق فارغة</h2>
            <p className="text-xs sm:text-sm text-stone-500 mb-8 leading-relaxed">
              لم تقم بإضافة أي قطع إلى سلة مشترياتك بعد. تصفح أحدث التشكيلات واستمتع بتجربة تسوق فريدة.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-stone-900 text-white text-xs sm:text-sm font-bold rounded-2xl hover:bg-stone-800 transition-colors shadow-md"
            >
              <span>استكشف المنتجات</span>
              <ArrowLeftIcon size={16} />
            </Link>
          </div>
        ) : isOrderPlaced ? (
          /* Order Confirmation Success State */
          <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-md animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
              <CheckIcon size={40} />
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
              تم استلام طلبك بنجاح
            </span>
            <h2 className="text-2xl font-extrabold text-stone-900 mb-2">شكراً لتسوقك معنا!</h2>
            <p className="text-xs sm:text-sm text-stone-600 mb-4">
              رقم الطلب الخاص بك: <strong className="text-stone-900 font-mono text-base">{orderNumber}</strong>
            </p>
            <p className="text-xs text-stone-500 leading-relaxed mb-8">
              تم إرسال تفاصيل الفاتورة ومعلومات التتبع عبر رسالة نصية وبريد إلكتروني. يمكنك متابعة حالة الطلب في صفحة حسابك.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/account"
                className="px-6 py-3 bg-stone-900 text-white text-xs sm:text-sm font-bold rounded-2xl hover:bg-stone-800 transition-colors"
              >
                عرض في حسابي وطلباتي
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-stone-100 text-stone-800 text-xs sm:text-sm font-semibold rounded-2xl hover:bg-stone-200 transition-colors"
              >
                العودة للرئيسية
              </Link>
            </div>
          </div>
        ) : (
          /* Full Cart Layout (Items + Summary) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Alert Bar */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs">
                {summary.amountNeededForFreeShipping > 0 ? (
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-700 mb-2 font-medium">
                      <span>
                        أضف بقيمة <strong>{summary.amountNeededForFreeShipping} درهم</strong> للحصول على <strong>شحن مجاني</strong>
                      </span>
                      <span className="text-[#9E866C] font-bold">
                        {Math.round((summary.subtotal / summary.freeShippingThreshold) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#9E866C] h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (summary.subtotal / summary.freeShippingThreshold) * 100)}%`
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                    <TruckIcon size={18} className="text-emerald-600" />
                    <span>🎉 طلبك مؤهل للشحن المجاني والسريع!</span>
                  </div>
                )}
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-xs">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Item Image */}
                    <div className="w-24 h-32 relative rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200/60">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover object-center"
                        sizes="100px"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-sm sm:text-base font-bold text-stone-900 hover:text-[#9E866C] transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                        <span>المقاس: <strong className="text-stone-800">{item.selectedSize}</strong></span>
                        <span className="flex items-center gap-1.5">
                          اللون:
                          <span
                            className="w-3 h-3 rounded-full inline-block border border-stone-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <strong className="text-stone-800">{item.selectedColor.name}</strong>
                        </span>
                        <span className="text-stone-400">|</span>
                        <span>سعر القطعة: <strong className="text-stone-800">{item.product.price} درهم</strong></span>
                      </div>

                      {/* Actions: Move to Wishlist & Delete */}
                      <div className="flex items-center gap-4 pt-3 text-xs">
                        <button
                          onClick={() => handleMoveToWishlist(item)}
                          className="flex items-center gap-1 text-stone-500 hover:text-[#9E866C] transition-colors"
                        >
                          <HeartIcon size={14} />
                          <span>نقل للمفضلة</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 text-stone-400 hover:text-red-600 transition-colors"
                        >
                          <TrashIcon size={14} />
                          <span>حذف</span>
                        </button>
                      </div>
                    </div>

                    {/* Price & Quantity Selector */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0">
                      <span className="text-base sm:text-lg font-extrabold text-stone-900">
                        {item.product.price * item.quantity} درهم
                      </span>

                      <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-stone-600 hover:bg-stone-100 transition-colors"
                          aria-label="تقليل الكمية"
                        >
                          <MinusIcon size={13} />
                        </button>
                        <span className="px-3 text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-stone-600 hover:bg-stone-100 transition-colors"
                          aria-label="زيادة الكمية"
                        >
                          <PlusIcon size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Suggestions pills */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70 text-xs text-stone-600 flex flex-wrap items-center justify-between gap-2">
                <span>💡 جرب الكوبونات التجريبية المتاحة:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { applyCoupon('WELCOME10'); }}
                    className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 font-mono font-bold text-stone-800 hover:bg-stone-100"
                  >
                    WELCOME10 (-10%)
                  </button>
                  <button
                    onClick={() => { applyCoupon('SUMMER20'); }}
                    className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 font-mono font-bold text-stone-800 hover:bg-stone-100"
                  >
                    SUMMER20 (-20%)
                  </button>
                </div>
              </div>

            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              
              <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-xs space-y-6">
                <h3 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
                  ملخص الطلب
                </h3>

                {/* Coupon Input Form */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-2">
                    كوبون الخصم
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                      <div className="flex items-center gap-2">
                        <TagIcon size={15} />
                        <div>
                          <strong>{appliedCoupon.code}</strong>
                          <span className="block text-[11px] text-emerald-700">{appliedCoupon.description}</span>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-emerald-700 hover:text-emerald-900 p-1"
                        title="إلغاء الكوبون"
                      >
                        <CloseIcon size={16} />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="أدخل كود الخصم..."
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 bg-stone-50 px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#9E866C]/40 text-stone-900 uppercase font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors shrink-0"
                      >
                        تطبيق
                      </button>
                    </form>
                  )}
                </div>

                {/* Financial Breakdown */}
                <div className="space-y-3 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span className="font-bold text-stone-900">{summary.subtotal} درهم</span>
                  </div>

                  {summary.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>خصم الكوبون ({appliedCoupon?.code}):</span>
                      <span>-{summary.discount} درهم</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>رسوم الشحن والتوصيل:</span>
                    <span className="font-bold text-stone-900">
                      {summary.shipping === 0 ? (
                        <span className="text-emerald-700">مجاني</span>
                      ) : (
                        `${summary.shipping} درهم`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-stone-950 pt-4 border-t border-stone-200">
                    <span>المجموع الكلي:</span>
                    <span className="text-xl text-stone-950">{summary.total} درهم</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>متابعة إتمام الطلب</span>
                  <ArrowLeftIcon size={16} />
                </button>

                {/* Security Guarantee */}
                <div className="flex items-center justify-center gap-2 text-xs text-stone-400 text-center pt-2">
                  <ShieldCheckIcon size={16} />
                  <span>دفع آمن ومشفر بنسبة 100%</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Mock Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCheckoutOpen(false)}
          />

          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="relative transform overflow-hidden rounded-3xl bg-white text-right shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-6 sm:p-8 border border-stone-200">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">إتمام الطلب السريع</h3>
                  <p className="text-xs text-stone-500">يرجى تأكيد عنوان التوصيل وطريقة الدفع</p>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <CloseIcon size={20} />
                </button>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-stone-50 p-2.5 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-800 mb-1">رقم الهاتف</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-50 p-2.5 rounded-xl border border-stone-300 text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-800 mb-1">المدينة</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-stone-50 p-2.5 rounded-xl border border-stone-300 text-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">العنوان بالتفصيل</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-stone-50 p-2.5 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-2">طريقة الدفع</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'border-stone-900 bg-stone-50 font-bold'
                          : 'border-stone-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className="accent-stone-900"
                      />
                      <span>بطاقة مدى / ائتمان</span>
                    </label>

                    <label
                      className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-stone-900 bg-stone-50 font-bold'
                          : 'border-stone-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className="accent-stone-900"
                      />
                      <span>الدفع عند الاستلام</span>
                    </label>
                  </div>
                </div>

                {/* Total Preview in modal */}
                <div className="p-3 bg-stone-50 rounded-xl flex items-center justify-between text-stone-900 font-bold">
                  <span>المبلغ الإجمالي للدفع:</span>
                  <span className="text-base text-[#9E866C]">{summary.total} درهم</span>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-md text-sm"
                  >
                    تأكيد الطلب الآن
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
