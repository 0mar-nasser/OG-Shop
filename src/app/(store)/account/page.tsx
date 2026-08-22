'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MOCK_ORDERS, MOCK_ADDRESSES } from '@/data/mockOrders';
import { useToast } from '@/context/ToastContext';
import {
  UserIcon,
  PackageIcon,
  MapPinIcon,
  HeartIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@/components/common/Icons';

type TabType = 'profile' | 'orders' | 'addresses' | 'settings';

export default function AccountPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('orders');

  // Profile Form State
  const [profile, setProfile] = useState({
    firstName: 'عمر',
    lastName: 'الأحمد',
    email: 'omar.ahmad@example.com',
    phone: '+971 50 123 4567',
    gender: 'male',
    birthdate: '1994-05-12'
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('تم حفظ وتحديث بيانات الملف الشخصي بنجاح', 'success');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF9F6] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-stone-200">
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-2">
            <Link href="/" className="hover:text-stone-700 transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-stone-800 font-semibold">حسابي الشخصي</span>
          </nav>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                أهلاً بك، {profile.firstName} 👋
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                إدارة طلباتك، عناوين التوصيل، ومعلوماتك الشخصية بكل سهولة.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1">
                <CheckIcon size={12} />
                عضوية موثقة
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid (Sidebar Tabs + Tab Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Tabs (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-stone-200/80 p-3 shadow-xs space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'orders'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <PackageIcon size={18} />
                  <span>سجل الطلبات ({MOCK_ORDERS.length})</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'profile'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserIcon size={18} />
                  <span>الملف الشخصي</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPinIcon size={18} />
                  <span>العناوين المحفوظة</span>
                </div>
              </button>

              <Link
                href="/wishlist"
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <HeartIcon size={18} />
                  <span>قائمة الرغبات</span>
                </div>
              </Link>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon size={18} />
                  <span>الأمان والإعدادات</span>
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content Area (9 cols) */}
          <div className="lg:col-span-9">
            
            {/* TAB 1: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-stone-900">سجل طلباتي</h2>
                  <span className="text-xs text-stone-500">عرض جميع الطلبات السابقة والحالية</span>
                </div>

                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-xs space-y-5"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-stone-900 font-mono">
                            {order.orderNumber}
                          </span>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                              order.status === 'delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {order.statusText}
                          </span>
                        </div>
                        <span className="text-xs text-stone-400">تاريخ الطلب: {order.date}</span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs text-stone-500 block">إجمالي الفاتورة:</span>
                        <span className="text-base font-extrabold text-stone-900">{order.total} درهم</span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="divide-y divide-stone-100 space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-4">
                          <div className="w-16 h-20 relative rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200/60">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                              {item.name}
                            </h4>
                            <div className="text-xs text-stone-500 mt-1 flex items-center gap-3">
                              <span>المقاس: {item.size}</span>
                              <span>اللون: {item.color}</span>
                              <span>الكمية: {item.quantity}</span>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-stone-900">
                            {item.price * item.quantity} درهم
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer Info */}
                    <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-500 gap-2">
                      <div className="flex items-center gap-1.5">
                        <TruckIcon size={16} className="text-[#9E866C]" />
                        <span>رقم التتبع: <strong className="text-stone-800 font-mono">{order.trackingNumber}</strong></span>
                      </div>
                      <div className="text-stone-600">
                        طريقة الدفع: {order.paymentMethod}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg font-bold text-stone-900 mb-6 pb-3 border-b border-stone-100">
                  المعلومات الشخصية
                </h2>

                <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">الاسم الأول</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="w-full bg-stone-50 p-3 rounded-xl border border-stone-300 text-stone-900 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">اسم العائلة</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="w-full bg-stone-50 p-3 rounded-xl border border-stone-300 text-stone-900 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">البريد الإلكتروني</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full bg-stone-50 p-3 rounded-xl border border-stone-300 text-stone-900 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">رقم الهاتف</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full bg-stone-50 p-3 rounded-xl border border-stone-300 text-stone-900 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-sm"
                    >
                      حفظ التغييرات
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-stone-900">عناوين التوصيل</h2>
                  <button
                    onClick={() => showToast('نموذج إضافة عنوان جديد متاح تجريبياً', 'info')}
                    className="text-xs font-bold text-[#9E866C] hover:underline"
                  >
                    + إضافة عنوان جديد
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MOCK_ADDRESSES.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-3xl bg-white border ${
                        addr.isDefault ? 'border-[#9E866C] ring-2 ring-[#9E866C]/20' : 'border-stone-200/80'
                      } shadow-xs space-y-3`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-stone-900">{addr.title}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-[#9E866C]/15 text-[#735A42] px-2 py-0.5 rounded-full font-bold">
                            العنوان الافتراضي
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-stone-600 space-y-1">
                        <p className="font-semibold text-stone-800">{addr.fullName} ({addr.phone})</p>
                        <p>{addr.city}، {addr.district}</p>
                        <p>{addr.street}، {addr.building}</p>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <button
                          onClick={() => showToast('تم تعيين العنوان الافتراضي', 'success')}
                          className="text-stone-500 hover:text-stone-900"
                        >
                          تعديل
                        </button>
                        {!addr.isDefault && (
                          <button
                            onClick={() => showToast('تم تعيين كعنوان افتراضي', 'success')}
                            className="text-[#9E866C] font-semibold hover:underline"
                          >
                            تعيين كافتراضي
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <h2 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
                  إعدادات الأمان والإشعارات
                </h2>

                <div className="space-y-4 text-xs text-stone-700">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200/60">
                    <div>
                      <h4 className="font-bold text-stone-900">تنبيهات العروض والخصومات</h4>
                      <p className="text-stone-500 text-[11px]">استلام رسائل بريدية بأحدث العروض الحصرية</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-stone-900" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200/60">
                    <div>
                      <h4 className="font-bold text-stone-900">تحديثات حالة الشحن بالرسائل النصية</h4>
                      <p className="text-stone-500 text-[11px]">استلام رسالة SMS عند تحرك الشحنة أو توصيلها</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-stone-900" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200/60">
                    <div>
                      <h4 className="font-bold text-stone-900">المصادقة الثنائية (2FA)</h4>
                      <p className="text-stone-500 text-[11px]">حماية إضافية لحسابك عند تسجيل الدخول</p>
                    </div>
                    <span className="text-emerald-700 font-bold">مفعلة ✓</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => showToast('تم تسجيل الخروج بنجاح', 'info')}
                    className="text-xs text-red-600 hover:text-red-700 font-bold underline"
                  >
                    تسجيل الخروج من الحساب
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
