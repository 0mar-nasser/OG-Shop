'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface AuthCardProps {
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export function AuthCard({ initialMode = 'login', onSuccess }: AuthCardProps) {
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);

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

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(registerPassword);

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
      onSuccess?.();
    } else {
      setFormError(res.error || 'تعذر تسجيل الدخول، تأكد من صحة البيانات');
    }
  };

  const handleDemoLogin = async () => {
    setFormError(null);
    setLoginEmail('omar.ahmad@example.com');
    setLoginPassword('password123');
    const res = await login('omar.ahmad@example.com', 'password123', true);
    if (res.success) {
      onSuccess?.();
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
      onSuccess?.();
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

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xl relative overflow-hidden backdrop-blur-md">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#9E866C]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#D4BFA7]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Tab Switcher (Login / Register) */}
        {mode !== 'forgot' && (
          <div className="relative flex p-1 mb-6 bg-stone-100/80 rounded-2xl border border-stone-200/60">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setFormError(null);
              }}
              className={`relative flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all duration-300 z-10 cursor-pointer ${mode === 'login' ? 'text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                }`}
            >
              {mode === 'login' && (
                <motion.div
                  layoutId="auth-tab-pill"
                  className="absolute inset-0 bg-white rounded-xl shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">تسجيل الدخول</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('register');
                setFormError(null);
              }}
              className={`relative flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all duration-300 z-10 cursor-pointer ${mode === 'register' ? 'text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                }`}
            >
              {mode === 'register' && (
                <motion.div
                  layoutId="auth-tab-pill"
                  className="absolute inset-0 bg-white rounded-xl shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">حساب جديد</span>
            </button>
          </div>
        )}

        {/* Error Alert */}
        {formError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{formError}</span>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* ─────────────── 1. LOGIN FORM ─────────────── */}
          {mode === 'login' && (
            <motion.form
              key="login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleLoginSubmit}
              className="space-y-4"
            >
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pr-10 pl-4 py-3 text-xs bg-stone-50/80 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-900 placeholder:text-stone-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-stone-800">كلمة المرور</label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setFormError(null);
                      setForgotSent(false);
                    }}
                    className="text-[11px] font-bold text-[#9E866C] hover:underline cursor-pointer"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-10 py-3 text-xs bg-stone-50/80 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-900 placeholder:text-stone-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-stone-300 text-[#9E866C] focus:ring-[#9E866C] cursor-pointer"
                  />
                  <span>تذكر تسجيل دخولي</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-stone-900 hover:bg-[#9E866C] disabled:opacity-60 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري التحقق...</span>
                  </>
                ) : (
                  <>
                    <span>تسجيل الدخول</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Demo Login Option */}
              <div className="pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#9E866C] border border-[#9E866C]/20 text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#9E866C]" />
                  <span>دخول تجريبي سريع بنقرة واحدة</span>
                </button>
              </div>
            </motion.form>
          )}

          {/* ─────────────── 2. REGISTER FORM ─────────────── */}
          {mode === 'register' && (
            <motion.form
              key="register-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleRegisterSubmit}
              className="space-y-3.5"
            >
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  الاسم الكامل *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="مثال: عمر الأحمد"
                    className="w-full pr-10 pl-4 py-2.5 text-xs bg-stone-50/80 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-900"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  البريد الإلكتروني *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pr-10 pl-4 py-2.5 text-xs bg-stone-50/80 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-900"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  رقم الهاتف (اختياري)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    dir="ltr"
                    className="w-full pr-10 pl-4 py-2.5 text-xs bg-stone-50/80 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-900 text-right"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  كلمة المرور *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="6 خانات على الأقل"
                    className="w-full pr-10 pl-10 py-2.5 text-xs bg-stone-50/80 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {registerPassword && (
                  <div className="mt-1.5 space-y-1">
                    <div className="flex gap-1 h-1">
                      <div
                        className={`h-full flex-1 rounded-full transition-all ${strength >= 1 ? 'bg-red-500' : 'bg-stone-200'
                          }`}
                      />
                      <div
                        className={`h-full flex-1 rounded-full transition-all ${strength >= 2 ? 'bg-amber-500' : 'bg-stone-200'
                          }`}
                      />
                      <div
                        className={`h-full flex-1 rounded-full transition-all ${strength >= 3 ? 'bg-emerald-500' : 'bg-stone-200'
                          }`}
                      />
                      <div
                        className={`h-full flex-1 rounded-full transition-all ${strength >= 4 ? 'bg-emerald-600' : 'bg-stone-200'
                          }`}
                      />
                    </div>
                    <p className="text-[10px] text-stone-400 font-medium">
                      {strength <= 1 && 'ضعيفة'}
                      {strength === 2 && 'متوسطة'}
                      {strength === 3 && 'جيدة'}
                      {strength >= 4 && 'قوية جداً'}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  تأكيد كلمة المرور *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    placeholder="أعد كتابة كلمة المرور"
                    className="w-full pr-10 pl-10 py-2.5 text-xs bg-stone-50/80 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] font-medium text-stone-600 select-none leading-relaxed">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-stone-300 text-[#9E866C] focus:ring-[#9E866C] cursor-pointer"
                  />
                  <span>
                    أوافق على{' '}
                    <span className="font-bold text-stone-900 hover:underline">شروط الاستخدام</span>{' '}
                    و{' '}
                    <span className="font-bold text-stone-900 hover:underline">سياسة الخصوصية</span>{' '}
                    الخاصة بمتجر راقِي.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-stone-900 hover:bg-[#9E866C] disabled:opacity-60 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer mt-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري إنشاء الحساب...</span>
                  </>
                ) : (
                  <>
                    <span>إنشاء الحساب</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
          )}

          {/* ─────────────── 3. FORGOT PASSWORD FORM ─────────────── */}
          {mode === 'forgot' && (
            <motion.div
              key="forgot-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {forgotSent ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-extrabold text-stone-900">
                    تم إرسال رابط الاستعادة!
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
                    لقد أرسلنا تعليمات استعادة كلمة المرور إلى البريد الإلكتروني{' '}
                    <strong className="text-stone-800">{forgotEmail}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setForgotSent(false);
                    }}
                    className="mt-4 px-6 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-all cursor-pointer"
                  >
                    العودة لتسجيل الدخول
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">
                      البريد الإلكتروني المسجل
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full pr-10 pl-4 py-3 text-xs bg-stone-50/80 border border-stone-200 rounded-2xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-stone-900 hover:bg-[#9E866C] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>إرسال رابط الاستعادة</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setFormError(null);
                      }}
                      className="text-xs font-bold text-stone-600 hover:text-stone-900 hover:underline cursor-pointer"
                    >
                      تذكرت كلمة المرور؟ العودة لتسجيل الدخول
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Safe & Secure Notice */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-center gap-2 text-stone-400 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
          <span>بياناتك ومعلوماتك محمية ومشفرة بأعلى معايير الأمان</span>
        </div>
      </div>
    </div>
  );
}
