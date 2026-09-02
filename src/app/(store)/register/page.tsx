import { Metadata } from 'next';
import { AuthCard } from '@/components/auth/AuthCard';

export const metadata: Metadata = {
  title: 'إنشاء حساب جديد | راقِي للأزياء',
  description: 'انضم إلى عالم راقِي وأنشئ حسابك الجديد للاستمتاع بخصومات حصرية وتجربة تسوق لا تُضاهى.',
};

export default function RegisterPage() {
  return (
    <div className="py-8 bg-[#FBF9F5] min-h-[90vh] flex flex-col justify-center items-center relative overflow-hidden font-sans">

      {/* Subtle Background Watermark Monogram "OG" on the left side */}
      <div
        className="absolute -left-12 top-1/2 -translate-y-1/2 text-[#9E866C]/[0.07] text-[240px] sm:text-[380px] font-black select-none pointer-events-none font-serif tracking-tighter leading-none"
        aria-hidden="true"
      >
        OG
      </div>

      {/* Decorative ambient blur */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#9E866C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <AuthCard initialMode="register" />
      </div>
    </div>
  );
}
