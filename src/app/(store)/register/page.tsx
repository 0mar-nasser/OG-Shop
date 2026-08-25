import { Metadata } from 'next';
import { AuthCard } from '@/components/auth/AuthCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'إنشاء حساب جديد | راقِي للأزياء',
  description: 'انضم إلى عالم راقِي وأنشئ حسابك الجديد للاستمتاع بخصومات حصرية وتجربة تسوق لا تُضاهى.',
};

export default function RegisterPage() {
  return (
    <div className="py-12 sm:py-16 bg-[#FAF7F2] min-h-[80vh] flex flex-col justify-center relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9E866C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4BFA7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <nav className="flex items-center justify-center gap-2 text-xs text-stone-400 mb-8">
          <Link href="/" className="hover:text-stone-700 transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-stone-800 font-bold">إنشاء حساب جديد</span>
        </nav>

        <AuthCard initialMode="register" />
      </div>
    </div>
  );
}
