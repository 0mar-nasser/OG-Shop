'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'استفسار عن طلب أو منتج',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }

    setIsSubmitting(true);
    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);
    showToast('تم استلام رسالتك بنجاح! سيتواصل معك فريق راقِي خلال 24 ساعة.', 'success');
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FAF7F2] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-400 mb-8">
          <Link href="/" className="hover:text-stone-700 transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-stone-800 font-bold">تواصل معنا</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3"
        >
          <span className="text-xs font-bold text-[#9E866C] uppercase tracking-wider bg-[#9E866C]/10 px-3.5 py-1 rounded-full inline-block">
            خدمة العملاء على مدار الساعة
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            نحن هنا لمساعدتك والإجابة عن استفساراتك
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
            يسعد فريق راقِي بخدمتك. يمكنك التواصل معنا عبر النموذج المباشر، أو عبر واتساب، أو تفضل بزيارة صالة العرض الخاصة بنا.
          </p>
        </motion.div>

        {/* Main Grid: Contact Form (Left/Center) + Info Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Contact Information & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick WhatsApp Card */}
            <div className="bg-gradient-to-br from-[#128C7E] to-[#075E54] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[11px] bg-emerald-400 text-emerald-950 font-bold px-2.5 py-0.5 rounded-full">
                    رد فوري
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">محادثة واتساب الفورية</h3>
                  <p className="text-xs text-emerald-100 mt-1">
                    تواصل مباشرة مع أحد ممثلي خدمة العملاء للإجابة الفورية عن كافة تساؤلاتك وتتبع شحنتك.
                  </p>
                </div>
                <a
                  href="https://wa.me/971500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-white text-emerald-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-emerald-50 transition-colors shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ابدأ المحادثة الآن عبر واتساب</span>
                </a>
              </div>
            </div>

            {/* Channels Info List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
                قنوات التواصل المباشرة
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">الهاتف الموحد</span>
                    <strong className="text-stone-900 text-sm dir-ltr block mt-0.5">+971 4 123 4567</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">البريد الإلكتروني</span>
                    <strong className="text-stone-900 text-sm block mt-0.5">support@raqi-fashion.com</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">الموقع وصالة العرض</span>
                    <strong className="text-stone-900 text-xs sm:text-sm block mt-0.5">
                      دبي، شارع بوليفارد الشيخ محمد بن راشد، برج الأناقة
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">ساعات العمل</span>
                    <strong className="text-stone-900 text-xs block mt-0.5">
                      السبت - الخميس: 9:00 ص - 10:00 م
                    </strong>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs">
              <div className="mb-6 pb-4 border-b border-stone-100">
                <h2 className="text-xl font-bold text-stone-900">
                  أرسل لنا رسالة
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  املأ النموذج أدناه وسيقوم فريق الدعم الفني بالرد عليك بأسرع وقت.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                    شكراً لتواصلك معنا. تم تحويل استفسارك إلى فريق خدمة العملاء وسيتم التواصل معك عبر البريد الإلكتروني أو الهاتف المسجل.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'استفسار عام',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-[#9E866C] transition-colors"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">الاسم الكامل *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="مثال: عمر الأحمد"
                        className="w-full bg-stone-50 p-3.5 rounded-2xl border border-stone-300 text-stone-900 focus:bg-white focus:outline-none focus:border-[#9E866C] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">رقم الهاتف</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full bg-stone-50 p-3.5 rounded-2xl border border-stone-300 text-stone-900 focus:bg-white focus:outline-none focus:border-[#9E866C] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">البريد الإلكتروني *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full bg-stone-50 p-3.5 rounded-2xl border border-stone-300 text-stone-900 focus:bg-white focus:outline-none focus:border-[#9E866C] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1.5">موضوع الرسالة</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-stone-50 p-3.5 rounded-2xl border border-stone-300 text-stone-900 focus:bg-white focus:outline-none focus:border-[#9E866C] transition-colors cursor-pointer"
                      >
                        <option value="استفسار عن طلب">استفسار عن طلب وشحنة</option>
                        <option value="استفسار عن مقاس أو منتج">استفسار عن مقاس أو منتج</option>
                        <option value="طلب استرجاع أو استبدال">طلب استرجاع أو استبدال</option>
                        <option value="اقتراح أو ملاحظة">اقتراح أو ملاحظة عامة</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-800 mb-1.5">تفاصيل الرسالة *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اكتب استفسارك بالتفصيل هنا..."
                      className="w-full bg-stone-50 p-3.5 rounded-2xl border border-stone-300 text-stone-900 focus:bg-white focus:outline-none focus:border-[#9E866C] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-stone-900 hover:bg-[#9E866C] disabled:opacity-60 text-white font-bold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>جاري الإرسال...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>إرسال الرسالة الآن</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
