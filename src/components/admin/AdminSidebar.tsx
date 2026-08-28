'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingBag,
  Layers,
  Tag,
  Users,
  Settings,
  ExternalLink,
  Store,
  LogOut,
} from 'lucide-react';
import { ADMIN_AUTH_KEY } from '@/app/admin/login/page';

const navItems = [
  {
    name: 'لوحة التحكم',
    href: '/admin',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: 'الإحصائيات',
    href: '/admin/analytics',
    icon: BarChart3,
    badge: 'متقدم',
    dotBadge: false,
    badgeColor: 'bg-[#9E866C]/20 text-[#D7C4B7] border-[#9E866C]/30',
  },
  {
    name: 'المنتجات',
    href: '/admin/products',
    icon: Package,
    badge: '12',
    dotBadge: false,
  },
  {
    name: 'الطلبات',
    href: '/admin/orders',
    icon: ShoppingBag,
    badge: 'جديد 3',
    dotBadge: true,
    dotColor: 'bg-emerald-500',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
  {
    name: 'التصنيفات',
    href: '/admin/categories',
    icon: Layers,
    badge: null,
  },
  {
    name: 'الكوبونات والخصومات',
    href: '/admin/coupons',
    icon: Tag,
    badge: null,
  },
  {
    name: 'العملاء',
    href: '/admin/customers',
    icon: Users,
    badge: null,
  },
  {
    name: 'الإعدادات',
    href: '/admin/settings',
    icon: Settings,
    badge: null,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState('omaraboghazi192002@gmail.com');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_AUTH_KEY) || sessionStorage.getItem(ADMIN_AUTH_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.email) {
          setAdminEmail(parsed.email);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    router.replace('/admin/login');
  };

  return (
    <aside className="fixed top-0 right-0 h-full w-16 md:w-15 lg:w-60 bg-stone-900 text-stone-100 z-50 flex flex-col border-l border-stone-800 transition-all duration-300">
      {/* Brand Header */}
      <div className="h-16 lg:h-20 flex items-center justify-center px-2 lg:px-4 border-b border-stone-800/80">
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <div className="bg-white p-1 rounded-lg flex items-center justify-center shadow-xs">
            <Image
              src="/logo.png"
              alt="OFFGRID"
              width={140}
              height={70}
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Navigation Links (Icon Rail on Mobile / Full on Desktop) */}
      <div className="flex-1 overflow-y-auto px-2 lg:px-4 py-4 lg:py-6 space-y-2 lg:space-y-1.5 custom-scrollbar flex flex-col items-center lg:items-stretch">

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center justify-center lg:justify-between w-11 h-11 lg:w-full lg:h-auto lg:px-3.5 lg:py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${isActive
                ? 'bg-[#9E866C] text-white shadow-lg shadow-[#9E866C]/25 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                }`}
            >
              {/* Icon & Label */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive
                      ? 'text-white'
                      : 'text-stone-400 group-hover:text-[#9E866C]'
                      }`}
                  />
                  {/* Dot Badge on Mobile */}
                  {item.dotBadge && (
                    <span
                      className={`lg:hidden absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${item.dotColor || 'bg-emerald-500'} ring-2 ring-stone-900`}
                    />
                  )}
                </div>

                <span className="hidden lg:inline truncate">{item.name}</span>
              </div>

              {/* Floating Tooltip on Small Screens */}
              <div className="lg:hidden fixed pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-xl border border-stone-800 right-18 z-50 whitespace-nowrap">
                {item.name}
              </div>
            </Link>
          );
        })}

        <div className="hidden lg:block pt-6 px-3 pb-2 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
          المتجر
        </div>

        {/* Live Store Link */}
        <Link
          href="/"
          target="_blank"
          className="relative flex items-center justify-center lg:justify-between w-11 h-11 lg:w-full lg:h-auto lg:px-3.5 lg:py-3 rounded-xl font-medium text-sm text-stone-300 hover:text-white hover:bg-stone-800/80 transition-all border border-stone-800 group mt-2 lg:mt-0"
        >
          <div className="flex items-center gap-3">
            <Store className="w-5 h-5 text-[#9E866C] group-hover:scale-110 transition-transform" />
            <span className="hidden lg:inline">زيارة المتجر</span>
          </div>
          <ExternalLink className="hidden lg:inline w-4 h-4 text-stone-500" />

          {/* Tooltip for Store */}
          <div className="lg:hidden fixed pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-xl border border-stone-800 right-18 z-50 whitespace-nowrap">
            زيارة المتجر
          </div>
        </Link>
      </div>

      {/* Admin User Profile Footer */}
      <div className="p-2 lg:p-4 border-t border-stone-800 bg-stone-950/40 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3 p-1.5 lg:p-2 rounded-xl lg:bg-stone-800/50 lg:border lg:border-stone-800 w-full justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#9E866C]/20 border border-[#9E866C]/40 flex items-center justify-center font-bold text-[#9E866C] shrink-0 text-xs sm:text-sm">
              م
              <span className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-stone-900" />
            </div>

            <div className="hidden lg:block min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">مدير المتجر</p>
              <p className="text-[11px] text-stone-400 truncate" title={adminEmail}>
                {adminEmail}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            title="تسجيل الخروج من لوحة الإدارة"
            className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

