'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ADMIN_AUTH_KEY } from './login/page';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // If user is currently on the login page, render children directly without admin layout
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true);
      return;
    }

    try {
      const stored = localStorage.getItem(ADMIN_AUTH_KEY) || sessionStorage.getItem(ADMIN_AUTH_KEY);
      if (stored) {
        const session = JSON.parse(stored);
        if (session && session.isAuthenticated) {
          setIsAuthenticated(true);
          return;
        }
      }

      // Not authenticated -> redirect to login
      setIsAuthenticated(false);
      router.replace(`/admin/login?returnUrl=${encodeURIComponent(pathname)}`);
    } catch {
      setIsAuthenticated(false);
      router.replace(`/admin/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, isLoginPage, router]);

  // If it's the login page, render directly
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while verifying admin authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white gap-3 font-sans">
        <Loader2 className="w-8 h-8 text-[#9E866C] animate-spin" />
        <p className="text-xs text-stone-400 font-medium tracking-wide">
          جاري التحقق من صلاحيات المدير...
        </p>
      </div>
    );
  }

  // If not authenticated (while redirecting)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white gap-3 font-sans">
        <ShieldAlert className="w-8 h-8 text-[#9E866C]" />
        <p className="text-xs text-stone-400 font-medium">
          يرجى تسجيل الدخول للوصول إلى لوحة التحكم...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F2] flex">
      {/* Permanent Responsive Sidebar (Icons on mobile, full width on desktop) */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 mr-16 md:mr-15 lg:mr-60 transition-all duration-300">
        <AdminHeader />

        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

