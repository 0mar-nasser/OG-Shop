'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Bell, Plus } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="h-16 lg:h-15 bg-white border-b border-stone-200 sticky top-0 z-30 px-3 sm:px-8 flex items-center justify-center shadow-xs">
      {/* Left Side: Search, Notifications & Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search */}
        <div className="relative hidden md:block w-56 lg:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث عن منتج، طلب، عميل..."
            className="w-full pl-4 pr-10 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-800 placeholder:text-stone-400"
          />
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 sm:p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
          title="الإشعارات"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
