'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import {
  ShoppingBagIcon,
  HeartIcon,
  SearchIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
  ChevronDownIcon
} from '../common/Icons';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItemsCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'الرجال', href: '/category/men' },
    { name: 'النساء', href: '/category/women' },
    { name: 'الأطفال', href: '/category/kids' },
    { name: 'العروض', href: '/category/sale', highlight: true },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200/80'
          : 'bg-white border-b border-stone-100'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                aria-label="القائمة"
              >
                {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center group py-1">
                <Image
                  src="/logo.png"
                  alt="OFFGRID"
                  width={130}
                  height={80}
                  className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-bold transition-colors relative py-1 ${link.highlight
                      ? 'text-amber-700 font-bold hover:text-amber-800'
                      : isActive
                        ? 'text-stone-950 font-bold'
                        : 'text-stone-600 hover:text-stone-950'
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Search, Account, Wishlist, Cart Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Desktop search toggle or bar */}
              <div className="relative hidden md:block">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="ابحث عن قميص، فستان، بنطال..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-56 lg:w-64 bg-stone-100/90 text-stone-900 text-xs py-2 pr-9 pl-4 rounded-full border border-stone-200/60 focus:outline-none focus:ring-2 focus:ring-[#9E866C]/40 focus:bg-white transition-all placeholder:text-stone-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                    aria-label="بحث"
                  >
                    <SearchIcon size={16} />
                  </button>
                </form>
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
                aria-label="البحث"
              >
                <SearchIcon size={20} />
              </button>

              {/* Account Button */}
              <Link
                href="/account"
                className={`p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors ${pathname.startsWith('/account') ? 'text-stone-950 bg-stone-100' : ''
                  }`}
                aria-label="حسابي"
                title="حسابي"
              >
                <UserIcon size={20} />
              </Link>

              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors relative"
                aria-label="قائمة الرغبات"
                title="قائمة الرغبات"
              >
                <HeartIcon size={20} fill={wishlistCount > 0 ? '#9E866C' : 'none'} className={wishlistCount > 0 ? 'text-[#9E866C]' : ''} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#9E866C] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors relative"
                aria-label="سلة المشتريات"
                title="سلة المشتريات"
              >
                <ShoppingBagIcon size={20} />
                {totalItemsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center animate-fade-in">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white p-3 shadow-md animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                placeholder="ما الذي تبحث عنه اليوم؟"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100 text-stone-900 text-sm py-2.5 pr-10 pl-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#9E866C]/40 focus:bg-white"
              />
              <button
                type="submit"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                aria-label="بحث"
              >
                <SearchIcon size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100]"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl z-[101] flex flex-col animate-slide-in-right">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center group"
              >
                <Image
                  src="/logo.png"
                  alt="OFFGRID"
                  width={95}
                  height={60}
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                aria-label="إغلاق القائمة"
              >
                <CloseIcon size={22} />
              </button>
            </div>

            <nav className="p-4 flex-1 overflow-y-auto space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${link.highlight
                      ? 'bg-amber-50 text-amber-900 font-bold'
                      : isActive
                        ? 'bg-stone-100 text-stone-950 font-bold'
                        : 'text-stone-700 hover:bg-stone-50'
                      }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDownIcon size={16} className="-rotate-90 text-stone-400" />
                  </Link>
                );
              })}

              <div className="pt-6 mt-6 border-t border-stone-100 space-y-2">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 text-sm font-medium"
                >
                  <UserIcon size={18} />
                  <span>حسابي وطلباتي</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 text-sm font-medium"
                >
                  <div className="flex items-center gap-3">
                    <HeartIcon size={18} />
                    <span>قائمة الرغبات</span>
                  </div>
                  {wishlistCount > 0 && (
                    <span className="text-xs bg-stone-100 text-stone-800 px-2 py-0.5 rounded-full font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
            </nav>

            <div className="p-4 border-t border-stone-200 bg-stone-50 text-xs text-stone-500 text-center">
              خدمة العملاء: support@raqi-fashion.com
            </div>
          </div>
        </div>
      )}
    </>
  );
}
