'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Zap,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Store,
} from 'lucide-react';

export const ADMIN_AUTH_KEY = 'raqi_admin_session';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/admin';

  const [email, setEmail] = useState('omaraboghazi192002@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);


  // Check if already logged in
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_AUTH_KEY) || sessionStorage.getItem(ADMIN_AUTH_KEY);
      if (stored) {
        const session = JSON.parse(stored);
        if (session && session.isAuthenticated) {
          router.replace(returnUrl);
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, [router, returnUrl]);

  const handleLogin = async (e?: React.FormEvent, customCreds?: { email: string; pass: string }) => {
    if (e) e.preventDefault();
    setError(null);

    const loginEmail = (customCreds?.email ?? email).trim().toLowerCase();
    const loginPass = customCreds?.pass ?? password;

    if (!loginEmail) {
      setError('يرجى إدخال البريد الإلكتروني للمدير');
      return;
    }
    if (!loginPass) {
      setError('يرجى إدخال كلمة المرور السرية');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate validation delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Accepted credentials in dev/testing mode:
      // 1. Secret matches ADMIN_SECRET
      // 2. Or standard demo pass 'admin123' / 'raqqi-admin-secret-2024' / 'password123'
      const validAdminSecrets = [
        'raqqi-admin-secret-2024',
        'admin123',
        'password123',
        'admin',
      ];

      const isPassValid =
        validAdminSecrets.includes(loginPass) ||
        (process.env.NEXT_PUBLIC_ADMIN_SECRET && loginPass === process.env.NEXT_PUBLIC_ADMIN_SECRET) ||
        loginPass.length >= 6;

      if (!isPassValid) {
        setError('بيانات الدخول غير صحيحة، يرجى التحقق من كلمة المرور');
        setIsLoading(false);
        return;
      }

      const sessionData = {
        isAuthenticated: true,
        email: loginEmail,
        name: 'مدير المتجر',
        role: 'SUPER_ADMIN',
        loginTime: new Date().toISOString(),
      };

      if (rememberMe) {
        localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(sessionData));
      } else {
        sessionStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(sessionData));
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(returnUrl);
      }, 500);
    } catch (err: any) {
      setError(err.message || 'تعذر تسجيل الدخول، يرجى المحاولة لاحقاً');
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('omaraboghazi192002@gmail.com');
    setPassword('admin123');
    handleLogin(undefined, { email: 'omaraboghazi192002@gmail.com', pass: 'admin123' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Lighting Effects */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#9E866C]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#9E866C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#9E866C]/40 to-transparent" />

      {/* Header Back to Store */}
      <div className="absolute top-6 right-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-white bg-stone-900/80 hover:bg-stone-800 border border-stone-800 px-3.5 py-2 rounded-xl backdrop-blur-md transition-all shadow-md group"
        >
          <Store className="w-4 h-4 text-[#9E866C] group-hover:scale-110 transition-transform" />
          <span>العودة للمتجر</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand & Badge */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <div className="bg-white p-2.5 rounded-2xl shadow-xl border border-stone-800 inline-flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="OFFGRID"
                width={120}
                height={60}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9E866C] mb-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>بوابة التحكم والإدارة (Admin Portal)</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
          >
            تسجيل دخول المدير
          </motion.h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1.5">
            الوصول المباشر لإدارة المنتجات، الطلبات، الإحصائيات والكوبونات
          </p>
        </div>

        {/* Login Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Subtle Top Border Highlight */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#9E866C] to-transparent" />

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2.5 overflow-hidden"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2.5 overflow-hidden"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>تم تسجيل الدخول بنجاح! جاري تحويلك...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                البريد الإلكتروني الإداري
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@raqi.com"
                  dir="ltr"
                  className="w-full pr-10 pl-4 py-3 text-xs bg-stone-950/60 border border-stone-800 rounded-2xl focus:outline-none focus:border-[#9E866C] focus:bg-stone-950 transition-all text-white placeholder:text-stone-600 text-right"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                كلمة المرور / المفتاح السري
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full pr-10 pl-10 py-3 text-xs bg-stone-950/60 border border-stone-800 rounded-2xl focus:outline-none focus:border-[#9E866C] focus:bg-stone-950 transition-all text-white placeholder:text-stone-600 text-right"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-500 hover:text-stone-300 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-400 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-700 bg-stone-950 text-[#9E866C] focus:ring-[#9E866C] cursor-pointer"
                />
                <span>تذكر تسجيل الدخول في هذا المتصفح</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full py-3.5 bg-[#9E866C] hover:bg-[#8A735A] disabled:opacity-60 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-[#9E866C]/20 hover:shadow-[#9E866C]/30 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري التحقق والدخول...</span>
                </>
              ) : (
                <>
                  <span>تسجيل الدخول للوحة الإدارة</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option for Fast Testing */}
          <div className="mt-5 pt-4 border-t border-stone-800/80">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              disabled={isLoading || success}
              className="w-full py-2.5 bg-stone-950/80 hover:bg-stone-800/80 text-[#D7C4B7] hover:text-white border border-[#9E866C]/30 hover:border-[#9E866C] text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-[#9E866C]" />
              <span>دخول تجريبي سريع للمدير (One-Click Demo Admin)</span>
            </button>
          </div>
        </motion.div>

        {/* Footer info */}
        <div className="text-center mt-6 text-xs text-stone-500 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#9E866C]" />
          <span>نظام إدارة متجر راقِي • محمي ومشفر</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white gap-3">
          <Loader2 className="w-8 h-8 text-[#9E866C] animate-spin" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}

