'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LockKeyhole,
  UserPlus,
  LogIn
} from 'lucide-react';

function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

interface AuthCardProps {
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export function AuthCard({ initialMode = 'login', onSuccess }: AuthCardProps) {
  const router = useRouter();
  const { isLoggedIn, login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [direction, setDirection] = useState<number>(1); // 1 = right-to-left, -1 = left-to-right

  // Redirect already authenticated users to account page
  React.useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace('/account');
    }
  }, [isLoading, isLoggedIn, router]);

  // Form Fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const switchMode = (newMode: 'login' | 'register' | 'forgot') => {
    if (newMode === mode) return;
    setDirection(newMode === 'register' ? 1 : -1);
    setMode(newMode);
    setFormError(null);
    if (typeof window !== 'undefined') {
      const targetUrl = newMode === 'register' ? '/register' : newMode === 'login' ? '/login' : undefined;
      if (targetUrl && window.location.pathname !== targetUrl) {
        window.history.pushState(null, '', targetUrl);
      }
    }
  };

  if (isLoading || isLoggedIn) {
    return (
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center p-16 min-h-[400px]">
        <div className="w-9 h-9 border-3 border-[#9E866C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!loginEmail.trim()) {
      setFormError('يرجى إدخال البريد الإلكتروني');
      return;
    }
    if (!loginPassword) {
      setFormError('يرجى إدخال كلمة المرور');
      return;
    }

    const res = await login(loginEmail, loginPassword, rememberMe);
    if (res.success) {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/');
        router.refresh();
      }
    } else {
      setFormError(res.error || 'تعذر تسجيل الدخول، تأكد من صحة البيانات');
    }
  };

  const handleDemoGoogleLogin = async () => {
    setFormError(null);
    setLoginEmail('omar.ahmad@example.com');
    setLoginPassword('password123');
    const res = await login('omar.ahmad@example.com', 'password123', true);
    if (res.success) {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/');
        router.refresh();
      }
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!registerName.trim()) {
      setFormError('يرجى إدخال الاسم الكامل');
      return;
    }
    if (!registerEmail.trim() || !registerEmail.includes('@')) {
      setFormError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    if (registerPassword.length < 6) {
      setFormError('كلمة المرور يجب أن لا تقل عن 6 أحرف');
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setFormError('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
      return;
    }
    if (!agreeTerms) {
      setFormError('يجب الموافقة على شروط الاستخدام وسياسة الخصوصية');
      return;
    }

    const res = await register(registerName, registerEmail, registerPassword, registerPhone);
    if (res.success) {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/');
        router.refresh();
      }
    } else {
      setFormError(res.error || 'تعذر إنشاء الحساب');
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setFormError('يرجى إدخال البريد الإلكتروني');
      return;
    }
    setFormError(null);
    setForgotSent(true);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 35 : -35,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -35 : 35,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-sans" dir="rtl">
      {/* Main Combined Card Container */}
      <motion.div
        layout
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl shadow-stone-900/10 border border-stone-200/70 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]"
      >

        {/* Right Column: Fashion Model Image (5 cols) */}
        <div className="lg:col-span-6 relative hidden lg:block overflow-hidden order-1 lg:order-2 bg-stone-900 min-h-[580px]">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
            alt="OFFGRID Fashion"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover object-top transition-transform duration-700"
          />
          {/* Subtle Warm Gradient Overlay for Sunlit Luxury Look */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-stone-900/10 pointer-events-none" />
        </div>

        {/* Left Column: The Clean Minimal Form (6 cols) */}
        <motion.div
          layout
          className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-center order-2 lg:order-1 relative bg-white"
        >
          <div className="w-full max-w-sm mx-auto">

            {/* Animated Heading & Subheading */}
            <div className="text-center mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`header-${mode}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                    {mode === 'login' && 'أهلاً بعودتك'}
                    {mode === 'register' && 'إنشاء حساب جديد'}
                    {mode === 'forgot' && 'استعادة كلمة المرور'}
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1 font-normal">
                    {mode === 'login' && 'سجّل دخولك لمتابعة طلباتك وحفظ اختياراتك المفضلة'}
                    {mode === 'register' && 'انضم إلينا واستمتع بتجربة تسوق فريدة ومميزات حصرية'}
                    {mode === 'forgot' && 'أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Error Alert */}
            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{formError}</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              {/* ───────────────── 1. LOGIN FORM ───────────────── */}
              {mode === 'login' && (
                <motion.form
                  key="login-view"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onSubmit={handleLoginSubmit}
                  className="space-y-4"
                >
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 text-right">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="name@example.com"
                        dir="ltr"
                        className="w-full pr-4 pl-10 py-3 text-xs sm:text-sm bg-stone-50/60 border border-stone-200/90 rounded-2xl focus:outline-none focus:border-stone-800 focus:bg-white transition-all text-stone-900 placeholder:text-stone-400 text-right shadow-xs"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Mail className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 text-right">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer transition-colors z-10"
                        aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        dir="ltr"
                        className="w-full pr-10 pl-10 py-3 text-xs sm:text-sm bg-stone-50/60 border border-stone-200/90 rounded-2xl focus:outline-none focus:border-stone-800 focus:bg-white transition-all text-stone-900 placeholder:text-stone-400 text-center tracking-widest shadow-xs"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Lock className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password Row */}
                  <div className="flex items-center justify-between pt-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-[#D95A11] hover:text-[#B8480A] font-semibold transition-colors cursor-pointer"
                    >
                      نسيت كلمة المرور؟
                    </button>

                    <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-700 select-none">
                      <span>تذكّرني</span>
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 accent-stone-900 cursor-pointer"
                      />
                    </label>
                  </div>

                  {/* Primary Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-[#171717] hover:bg-black disabled:opacity-60 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer mt-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>جاري تسجيل الدخول...</span>
                      </>
                    ) : (
                      <span>تسجيل الدخول</span>
                    )}
                  </button>

                  {/* Divider: أو */}
                  <div className="relative flex items-center justify-center my-3">
                    <div className="border-t border-stone-200 w-full" />
                    <span className="bg-white px-3 text-xs text-stone-400 font-medium absolute">أو</span>
                  </div>

                  {/* Google Button */}
                  <button
                    type="button"
                    onClick={handleDemoGoogleLogin}
                    disabled={isLoading}
                    className="w-full py-3 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs sm:text-sm font-medium rounded-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs active:scale-[0.99]"
                  >
                    <GoogleIcon className="w-4 h-4" />
                    <span>المتابعة باستخدام Google</span>
                  </button>

                  {/* Bottom Register Prompt */}
                  <div className="text-center pt-2 text-xs text-stone-600">
                    <span>ليس لديك حساب؟ </span>
                    <button
                      type="button"
                      onClick={() => switchMode('register')}
                      className="font-bold text-[#D95A11] hover:underline cursor-pointer transition-colors"
                    >
                      إنشاء حساب
                    </button>
                  </div>
                </motion.form>
              )}

              {/* ───────────────── 2. REGISTER FORM ───────────────── */}
              {mode === 'register' && (
                <motion.form
                  key="register-view"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onSubmit={handleRegisterSubmit}
                  className="space-y-3.5"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 text-right">
                      الاسم الكامل
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        placeholder="مثال: عمر الأحمد"
                        className="w-full pr-4 pl-10 py-2.5 text-xs bg-stone-50/60 border border-stone-200 rounded-2xl focus:outline-none focus:border-stone-800 focus:bg-white transition-all text-stone-900 shadow-xs"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 text-right">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="name@example.com"
                        dir="ltr"
                        className="w-full pr-4 pl-10 py-2.5 text-xs bg-stone-50/60 border border-stone-200 rounded-2xl focus:outline-none focus:border-stone-800 focus:bg-white transition-all text-stone-900 text-right shadow-xs"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Mail className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 text-right">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer z-10"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="6 خانات على الأقل"
                        dir="ltr"
                        className="w-full pr-10 pl-10 py-2.5 text-xs bg-stone-50/60 border border-stone-200 rounded-2xl focus:outline-none focus:border-stone-800 focus:bg-white transition-all text-stone-900 text-right shadow-xs"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Lock className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 text-right">
                      تأكيد كلمة المرور
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer z-10"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        placeholder="أعد كتابة كلمة المرور"
                        dir="ltr"
                        className="w-full pr-10 pl-10 py-2.5 text-xs bg-stone-50/60 border border-stone-200 rounded-2xl focus:outline-none focus:border-stone-800 focus:bg-white transition-all text-stone-900 text-right shadow-xs"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Lock className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Agree terms */}
                  <div className="pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[11px] font-medium text-stone-600 select-none">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 accent-stone-900 cursor-pointer"
                      />
                      <span>أوافق على شروط الاستخدام والخصوصية</span>
                    </label>
                  </div>

                  {/* Register button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-[#171717] hover:bg-black disabled:opacity-60 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>جاري إنشاء الحساب...</span>
                      </>
                    ) : (
                      <span>إنشاء الحساب</span>
                    )}
                  </button>

                  {/* Back to login */}
                  <div className="text-center pt-2 text-xs text-stone-600">
                    <span>لديك حساب بالفعل؟ </span>
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="font-bold text-[#D95A11] hover:underline cursor-pointer transition-colors"
                    >
                      تسجيل الدخول
                    </button>
                  </div>
                </motion.form>
              )}

              {/* ───────────────── 3. FORGOT PASSWORD FORM ───────────────── */}
              {mode === 'forgot' && (
                <motion.div
                  key="forgot-view"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-4"
                >
                  {forgotSent ? (
                    <div className="text-center py-4 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-stone-900">تم إرسال الرابط!</h4>
                      <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
                        تفقد بريدك الإلكتروني <strong className="text-stone-800">{forgotEmail}</strong>
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          switchMode('login');
                          setForgotSent(false);
                        }}
                        className="mt-2 px-5 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-all cursor-pointer"
                      >
                        العودة لتسجيل الدخول
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5 text-right">
                          البريد الإلكتروني المسجل
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="name@example.com"
                            dir="ltr"
                            className="w-full pr-4 pl-10 py-3 text-xs bg-stone-50/60 border border-stone-200 rounded-2xl focus:outline-none focus:border-stone-800 focus:bg-white transition-all text-stone-900 text-right"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                            <Mail className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#171717] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>إرسال رابط الاستعادة</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => switchMode('login')}
                          className="text-xs font-bold text-stone-600 hover:text-stone-900 hover:underline cursor-pointer"
                        >
                          تذكرت كلمة المرور؟ العودة
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
