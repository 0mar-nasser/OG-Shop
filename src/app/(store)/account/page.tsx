'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MOCK_ORDERS, MOCK_ADDRESSES } from '@/data/mockOrders';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { AuthCard } from '@/components/auth/AuthCard';
import {
  UserIcon,
  PackageIcon,
  MapPinIcon,
  TruckIcon,
  ShieldCheckIcon,
} from '@/components/common/Icons';
import { LogOut, Sparkles, UserCheck, Edit3 } from 'lucide-react';

type TabType = 'orders' | 'profile' | 'addresses' | 'settings';

export default function AccountPage() {
  const { showToast } = useToast();
  const { user, isLoggedIn, logout, updateProfile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('orders');

  // Profile Form State initialized from user
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'male',
    birthdate: '1994-05-12'
  });

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || user.name.split(' ')[0] || '',
        lastName: user.lastName || user.name.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone || '+971 50 123 4567',
        gender: user.gender || 'male',
        birthdate: user.birthdate || '1994-05-12'
      });
    }
  }, [user]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${profile.firstName} ${profile.lastName}`.trim();
    await updateProfile({
      name: fullName,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      gender: profile.gender as any,
      birthdate: profile.birthdate
    });
  };

  // If not logged in, render the luxury Auth screen (Login & Register)
  if (!isLoggedIn && !isLoading) {
    return (
      <div className="py-10 sm:py-16 bg-[#FAF7F2] min-h-[80vh] flex flex-col justify-center relative overflow-hidden">
        {/* Subtle decorative background fashion elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9E866C]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4BFA7]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs text-stone-400 mb-8">
            <Link href="/" className="hover:text-stone-700 transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-stone-800 font-bold">تسجيل الدخول وإنشاء حساب</span>
          </nav>

          {/* Auth Card Component */}
          <AuthCard initialMode="login" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 bg-[#FAF7F2] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-stone-400 mb-6">
          <Link href="/" className="hover:text-stone-700 transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-stone-800 font-bold">حسابي</span>
        </nav>

        {/* Header with User Info & Logout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 sm:p-8 bg-white rounded-3xl border border-stone-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#9E866C] to-[#C68B59] text-white flex items-center justify-center font-black text-2xl shadow-md uppercase">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                  أهلاً بك، {user?.name || 'عزيزي العميل'}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="px-4 py-2.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </motion.div>

        {/* Dashboard Grid (Sidebar Tabs + Tab Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar Tabs (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-stone-200/80 p-3 shadow-xs space-y-1.5 sticky top-24">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'orders'
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
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'profile'
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
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'addresses'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <MapPinIcon size={18} />
                  <span>العناوين المحفوظة</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'settings'
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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
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
                            className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${order.status === 'delivered'
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
              </motion.div>
            )}

            {/* TAB 2: PROFILE */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs"
              >
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-100">
                  <h2 className="text-lg font-bold text-stone-900">
                    المعلومات الشخصية
                  </h2>
                  <span className="text-xs text-stone-400">يمكنك تعديل بياناتك وحفظها</span>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">الاسم الأول</label>
                      <input
                        type="text"
                        required
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="w-full bg-stone-50 p-3 rounded-xl border border-stone-300 text-stone-900 focus:bg-white focus:outline-none focus:border-[#9E866C]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">اسم العائلة</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="w-full bg-stone-50 p-3 rounded-xl border border-stone-300 text-stone-900 focus:bg-white focus:outline-none focus:border-[#9E866C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">البريد الإلكتروني</label>
                      <input
                        type="email"
                        required
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full bg-stone-50 p-3 rounded-xl border border-stone-300 text-stone-900 focus:bg-white focus:outline-none focus:border-[#9E866C]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">رقم الهاتف</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full bg-stone-50 p-3 rounded-xl border border-stone-300 text-stone-900 focus:bg-white focus:outline-none focus:border-[#9E866C]"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-[#9E866C] transition-colors shadow-sm cursor-pointer"
                    >
                      حفظ التغييرات
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* TAB 3: ADDRESSES */}
            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-stone-900">عناوين التوصيل</h2>
                  <button
                    onClick={() => showToast('نموذج إضافة عنوان جديد متاح تجريبياً', 'info')}
                    className="text-xs font-bold text-[#9E866C] hover:underline cursor-pointer"
                  >
                    + إضافة عنوان جديد
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MOCK_ADDRESSES.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-3xl bg-white border ${addr.isDefault ? 'border-[#9E866C] ring-2 ring-[#9E866C]/20' : 'border-stone-200/80'
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
                          className="text-stone-500 hover:text-stone-900 cursor-pointer"
                        >
                          تعديل
                        </button>
                        {!addr.isDefault && (
                          <button
                            onClick={() => showToast('تم تعيين كعنوان افتراضي', 'success')}
                            className="text-[#9E866C] font-semibold hover:underline cursor-pointer"
                          >
                            تعيين كافتراضي
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 4: SETTINGS */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-6"
              >
                <h2 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
                  إعدادات الأمان والإشعارات
                </h2>

                <div className="space-y-4 text-xs text-stone-700">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200/60">
                    <div>
                      <h4 className="font-bold text-stone-900">تنبيهات العروض والخصومات</h4>
                      <p className="text-stone-500 text-[11px]">استلام رسائل بريدية بأحدث العروض الحصرية</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-stone-900 cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200/60">
                    <div>
                      <h4 className="font-bold text-stone-900">تحديثات حالة الشحن بالرسائل النصية</h4>
                      <p className="text-stone-500 text-[11px]">استلام رسالة SMS عند تحرك الشحنة أو توصيلها</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-stone-900 cursor-pointer" />
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
                    onClick={logout}
                    className="text-xs text-red-600 hover:text-red-700 font-bold underline cursor-pointer"
                  >
                    تسجيل الخروج من الحساب
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
