import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastContainer } from '@/components/common/ToastContainer';

export const metadata: Metadata = {
  title: 'راقِي | متجر أزياء وملابس عصرية راقية',
  description: 'متجر راقِي للأزياء - تسوق أحدث صيحات الملابس الرجالية، النسائية، ملابس الأطفال، الأحذية والإكسسوارات الفاخرة بجودة استثنائية وشحن سريع.',
  keywords: ['ملابس', 'أزياء', 'متجر ملابس', 'ملابس رجالية', 'فساتين نسائية', 'أحذية', 'عروض أزياء', 'متجر راقي'],
  authors: [{ name: 'RAQI Fashion' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF9F6] text-[#1C1917] antialiased selection:bg-[#9E866C]/20 selection:text-stone-900 font-['Cairo',sans-serif]">
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <ToastContainer />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
