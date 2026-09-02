import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastContainer } from '@/components/common/ToastContainer';

export const metadata: Metadata = {
  title: 'OG STORE',
  icons: {
    icon: '/favicon.ico'
  },
  description: "Discover stylish men’s, women’s, and unisex fashion at OG OFF GRID STORE, including hoodies, oversized pants, and more. اكتشف أحدث الملابس الرجالية والنسائية والملابس الموحدة للجنسين من OG OFF GRID، بما يشمل الهوديز والبناطيل الواسعة والمزيد.",
  keywords: [
    // Arabic
    "ملابس",
    "أزياء",
    "متجر ملابس",
    "ملابس شبابية",
    "ملابس رجالية",
    "ملابس نسائية",
    "ملابس للجنسين",
    "ملابس أوفر سايز",
    "هوديز",
    "بناطيل واسعة",
    "متجر أوف جريد",
    "ملابس أوف جريد",

    // English
    "OG OFF GRID STORE",
    "Off Grid Store",
    "Off Grid Clothing",
    "OG Clothing",
    "OG Fashion",
    "men's clothing",
    "women's clothing",
    "unisex clothing",
    "streetwear clothing",
    "oversized clothing",
    "oversized hoodies",
    "oversized pants",
  ],
  authors: [{ name: 'OG OFF GRID STORE' }],
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
