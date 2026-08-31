'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/types/product';
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
  const { user, isLoggedIn } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null);

  // Close mobile menu and search dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setShowResultsDropdown(false);
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

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedDesktop = searchContainerRef.current?.contains(target);
      const clickedMobile = mobileSearchContainerRef.current?.contains(target);
      if (!clickedDesktop && !clickedMobile) {
        setShowResultsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search query
  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setShowResultsDropdown(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.products ?? []);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setShowResultsDropdown(false);
    }
  };

  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [hoveredMegaCategory, setHoveredMegaCategory] = useState<'default' | 'men' | 'women' | 'unisex' | 'hoodies' | 'sweatpants'>('default');
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterCatalog = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setCatalogDropdownOpen(true);
  };

  const handleMouseLeaveCatalog = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCatalogDropdownOpen(false);
      setHoveredMegaCategory('default');
    }, 150);
  };

  const megaMenuCards: Record<
    string,
    Array<{
      title: string;
      desc: string;
      image: string;
      href: string;
    }>
  > = {
    default: [
      {
        title: 'تصاميم استثنائية',
        desc: 'نبتكر خارج الصندوق لعشاق التميز والأناقة العصرية.',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
        href: '/products',
      },
      {
        title: 'القطع الأساسية',
        desc: 'قطع أساسية مريحة وعملية تناسب إطلالتك في كل مكان.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
        href: '/products',
      },
    ],
    men: [
      {
        title: 'هوديز رجالي',
        desc: 'خامات قطنية ثقيلة وقصات أوفر سايز عصرية للشتاء.',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
        href: '/category/men?sub=هوديز',
      },
      {
        title: 'سويت بانتس رجالي',
        desc: 'بناطيل قطنية مريحة بقصات حديثة لإطلالة كاجوال يومية.',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop',
        href: '/category/men?sub=سويت بانتس',
      },
    ],
    women: [
      {
        title: 'هوديز نسائي',
        desc: 'قصات أنيقة وألوان دافئة تمنحك الدفء والجاذبية طوال اليوم.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
        href: '/category/women?sub=هوديز',
      },
      {
        title: 'سويت بانتس نسائي',
        desc: 'بناطيل سويت بانتس واسعة ومريحة بجودة فائقة.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
        href: '/category/women?sub=سويت بانتس',
      },
    ],
    unisex: [
      {
        title: 'هوديز للجنسين',
        desc: 'تصاميم مينيمال وألوان كلاسيكية تناسب الجميع.',
        image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
        href: '/category/unisex?sub=هوديز',
      },
      {
        title: 'سويت بانتس للجنسين',
        desc: 'قصات جوغر وفضفاضة مريحة جداً تناسب كل الأوقات.',
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200&auto=format&fit=crop',
        href: '/category/unisex?sub=سويت بانتس',
      },
    ],
    hoodies: [
      {
        title: 'هوديز ثقيل أوفر سايز',
        desc: 'خامات قطنية 100% ثقيلة ومبطنة لدفء وأناقة لا تضاهى.',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
        href: '/products?sub=هوديز',
      },
      {
        title: 'هوديز بيسك كلاسيك',
        desc: 'ألوان سادة كلاسيكية تناسب جميع التنسيقات اليومية.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
        href: '/products?sub=هوديز',
      },
    ],
    sweatpants: [
      {
        title: 'سويت بانتس جوغر',
        desc: 'أستك مرن عند الكاحل مع جيوب عميقة وسحاب متين.',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop',
        href: '/products?sub=سويت بانتس',
      },
      {
        title: 'سويت بانتس وايد ليج',
        desc: 'قصة ستريت فضفاضة ومريحة للاستخدام اليومي والسفر.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
        href: '/products?sub=سويت بانتس',
      },
    ],
  };

  const currentCards = megaMenuCards[hoveredMegaCategory] || megaMenuCards.default;

  const navLinks: { name: string; href: string; isCatalog?: boolean }[] = [
    { name: 'الرئيسية', href: '/' },
    { name: 'كاتالوج الملابس', href: '/products', isCatalog: true },
    { name: 'تواصل معنا', href: '/contact' },
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
                  height={90}
                  className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.isCatalog && (pathname.startsWith('/products') || pathname.startsWith('/category')));

                if (link.isCatalog) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={handleMouseEnterCatalog}
                      onMouseLeave={handleMouseLeaveCatalog}
                    >
                      <Link
                        href={link.href}
                        className={`text-sm font-bold transition-colors relative py-2 flex items-center gap-1.5 ${isActive
                          ? 'text-stone-950 font-bold'
                          : 'text-stone-600 hover:text-stone-950'
                          }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDownIcon size={14} className={`transition-transform duration-200 ${catalogDropdownOpen ? 'rotate-180 text-stone-900' : 'text-stone-400'}`} />
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />
                        )}
                      </Link>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-bold transition-colors relative py-1 ${isActive
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
              <div ref={searchContainerRef} className="relative hidden md:block">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="ابحث عن قميص، بنطال..."
                    value={searchQuery}
                    onFocus={() => searchQuery.trim() && setShowResultsDropdown(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowResultsDropdown(true);
                    }}
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

                {/* Live Search Autocomplete Dropdown (Desktop) */}
                {showResultsDropdown && searchQuery.trim().length > 0 && (
                  <div className="absolute top-full right-0 w-80 lg:w-96 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200/90 z-50 overflow-hidden backdrop-blur-md animate-fade-in">
                    {/* Header with count and loading */}
                    <div className="px-3.5 py-2 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-semibold">
                      <span>نتائج البحث عن &ldquo;{searchQuery}&rdquo;</span>
                      {isSearching ? (
                        <span className="flex items-center gap-1.5 text-[#9E866C]">
                          <span className="w-2 h-2 rounded-full bg-[#9E866C] animate-pulse" />
                          جاري البحث...
                        </span>
                      ) : (
                        <span>{searchResults.length} منتج</span>
                      )}
                    </div>

                    {/* Products List - 4 visible items max before scroll */}
                    <div className="max-h-[240px] overflow-y-auto divide-y divide-stone-100 custom-scrollbar">
                      {searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            onClick={() => {
                              setShowResultsDropdown(false);
                            }}
                            className="flex items-center gap-3 p-2.5 hover:bg-stone-50 transition-colors group"
                          >
                            <div className="w-11 h-11 rounded-lg bg-stone-100 overflow-hidden relative flex-shrink-0 border border-stone-200/60">
                              <Image
                                src={product.images[0] || '/logo.png'}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                                sizes="44px"
                              />
                            </div>
                            <div className="flex-1 min-w-0 text-right">
                              <h4 className="text-xs font-bold text-stone-900 truncate group-hover:text-[#9E866C] transition-colors">
                                {product.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-stone-400 font-medium truncate">
                                  {product.categoryName || product.subcategory}
                                </span>
                                {!product.inStock && (
                                  <span className="text-[9px] text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                                    نفذت
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-left flex-shrink-0">
                              <span className="text-xs font-bold text-stone-900 block">
                                {product.price} <span className="text-[10px] font-normal text-stone-500">درهم</span>
                              </span>
                              {product.oldPrice && (
                                <span className="text-[10px] text-stone-400 line-through block">
                                  {product.oldPrice}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))
                      ) : !isSearching ? (
                        <div className="p-6 text-center text-xs text-stone-500">
                          لا توجد منتجات مطابقة لـ &ldquo;{searchQuery}&rdquo;
                        </div>
                      ) : null}
                    </div>

                    {/* Footer - View all */}
                    {searchResults.length > 0 && (
                      <div className="p-2 bg-stone-50 border-t border-stone-100 text-center">
                        <button
                          type="button"
                          onClick={handleSearchSubmit}
                          className="w-full py-1.5 px-3 text-xs font-bold text-[#9E866C] hover:text-[#846f58] hover:bg-stone-100 rounded-lg transition-colors"
                        >
                          عرض كل النتائج ({searchResults.length}) ←
                        </button>
                      </div>
                    )}
                  </div>
                )}
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
                href="/login"
                className={`p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors flex items-center gap-1.5 ${pathname.startsWith('/account') || pathname.startsWith('/login') || pathname.startsWith('/register')
                  ? 'text-stone-950 bg-stone-100'
                  : ''
                  }`}
                aria-label="حسابي"
                title={isLoggedIn ? `حسابي (${user?.name})` : 'تسجيل الدخول / إنشاء حساب'}
              >
                {isLoggedIn ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-7 h-7 rounded-full bg-[#9E866C] text-white text-xs font-black flex items-center justify-center shadow-xs uppercase">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                    <span className="text-xs font-bold text-stone-800 max-w-[90px] truncate hidden xl:inline">
                      {user?.firstName || user?.name}
                    </span>
                  </div>
                ) : (
                  <UserIcon size={20} />
                )}
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

        {/* Full-Width Dark Mega Menu (Arabic Luxury Style) */}
        {catalogDropdownOpen && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 w-full bg-[#0f0f0f] text-white border-t border-stone-800 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={handleMouseEnterCatalog}
            onMouseLeave={handleMouseLeaveCatalog}
            dir="rtl"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
              <div className="grid grid-cols-12 gap-8 items-stretch">

                {/* Column 1: الأقسام الرئيسية */}
                <div className="col-span-3 space-y-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block mb-4">
                      الأقسام الرئيسية
                    </span>
                    <div className="space-y-2">
                      <Link
                        href="/products"
                        onClick={() => setCatalogDropdownOpen(false)}
                        onMouseEnter={() => setHoveredMegaCategory('default')}
                        className={`block text-sm font-bold tracking-wide py-2 px-3 rounded-lg transition-all ${hoveredMegaCategory === 'default'
                          ? 'text-amber-400 bg-stone-900/80 translate-x-[-4px]'
                          : 'text-stone-200 hover:text-amber-400 hover:bg-stone-900/40'
                          }`}
                      >
                        اكتشف أحدث الإطلالات
                      </Link>
                      <Link
                        href="/category/men"
                        onClick={() => setCatalogDropdownOpen(false)}
                        onMouseEnter={() => setHoveredMegaCategory('men')}
                        className={`block text-sm font-bold tracking-wide py-2 px-3 rounded-lg transition-all ${hoveredMegaCategory === 'men'
                          ? 'text-amber-400 bg-stone-900/80 translate-x-[-4px]'
                          : 'text-stone-200 hover:text-amber-400 hover:bg-stone-900/40'
                          }`}
                      >
                        ملابس رجالية
                      </Link>
                      <Link
                        href="/category/women"
                        onClick={() => setCatalogDropdownOpen(false)}
                        onMouseEnter={() => setHoveredMegaCategory('women')}
                        className={`block text-sm font-bold tracking-wide py-2 px-3 rounded-lg transition-all ${hoveredMegaCategory === 'women'
                          ? 'text-amber-400 bg-stone-900/80 translate-x-[-4px]'
                          : 'text-stone-200 hover:text-amber-400 hover:bg-stone-900/40'
                          }`}
                      >
                        ملابس نسائية
                      </Link>
                      <Link
                        href="/category/unisex"
                        onClick={() => setCatalogDropdownOpen(false)}
                        onMouseEnter={() => setHoveredMegaCategory('unisex')}
                        className={`block text-sm font-bold tracking-wide py-2 px-3 rounded-lg transition-all ${hoveredMegaCategory === 'unisex'
                          ? 'text-amber-400 bg-stone-900/80 translate-x-[-4px]'
                          : 'text-stone-200 hover:text-amber-400 hover:bg-stone-900/40'
                          }`}
                      >
                        تشكيلة للجنسين (Unisex)
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Column 2: تسوق حسب النوع */}
                <div className="col-span-4 space-y-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block mb-4">
                      تسوق حسب النوع
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/products?sub=هوديز"
                        onClick={() => setCatalogDropdownOpen(false)}
                        className={`text-sm font-semibold tracking-wide p-2.5 rounded-lg transition-all ${hoveredMegaCategory === 'hoodies'
                          ? 'text-amber-400 bg-stone-900/80'
                          : 'text-stone-300 hover:text-white hover:bg-stone-900/40'
                          }`}
                      >
                        هوديز وسويت شيرت
                      </Link>
                      <Link
                        href="/products?sub=تيشيرت"
                        onClick={() => setCatalogDropdownOpen(false)}
                        className="text-sm font-semibold tracking-wide p-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-900/40 transition-all"
                      >
                        تيشيرتات وتوبات
                      </Link>
                      <Link
                        href="/products?sub=سويت بانتس"
                        onClick={() => setCatalogDropdownOpen(false)}
                        className={`text-sm font-semibold tracking-wide p-2.5 rounded-lg transition-all ${hoveredMegaCategory === 'sweatpants'
                          ? 'text-amber-400 bg-stone-900/80'
                          : 'text-stone-300 hover:text-white hover:bg-stone-900/40'
                          }`}
                      >
                        بناطيل وسويت بانتس
                      </Link>
                      <Link
                        href="/products"
                        onClick={() => setCatalogDropdownOpen(false)}
                        className="text-sm font-semibold tracking-wide p-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-900/40 transition-all"
                      >
                        إكسسوارات وكابات
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Column 3: بطاقات الصور التفاعلية (صور بكامل الارتفاع بدون لينكات) */}
                <div className="col-span-5 grid grid-cols-2 gap-4 h-full min-h-[220px]">
                  {currentCards.map((card, idx) => (
                    <div
                      key={`${hoveredMegaCategory}-${idx}`}
                      className="group relative rounded-2xl border border-stone-800/90 h-full w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                    >
                      {/* Background Image with Zoom */}
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 1200px) 250px, 320px"
                        className="object-cover transition-transform duration-700 ease-out"
                      />

                      {/* Dark Gradient Overlay for Polished Aesthetics */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent transition-colors duration-300" />
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div ref={mobileSearchContainerRef} className="md:hidden border-t border-stone-200 bg-white p-3 shadow-md animate-fade-in relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                placeholder="ما الذي تبحث عنه اليوم؟"
                value={searchQuery}
                onFocus={() => searchQuery.trim() && setShowResultsDropdown(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResultsDropdown(true);
                }}
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

            {/* Mobile Live Search Autocomplete */}
            {showResultsDropdown && searchQuery.trim().length > 0 && (
              <div className="mt-2 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
                <div className="px-3 py-1.5 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-semibold">
                  <span>النتائج ({searchResults.length})</span>
                  {isSearching && (
                    <span className="text-[#9E866C] text-[10px] animate-pulse">جاري البحث...</span>
                  )}
                </div>

                <div className="max-h-[240px] overflow-y-auto divide-y divide-stone-100 custom-scrollbar">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        onClick={() => {
                          setShowResultsDropdown(false);
                          setSearchOpen(false);
                        }}
                        className="flex items-center gap-3 p-2.5 hover:bg-stone-50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden relative flex-shrink-0 border border-stone-200">
                          <Image
                            src={product.images[0] || '/logo.png'}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-right">
                          <h4 className="text-xs font-bold text-stone-900 truncate">
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-stone-400 font-medium block">
                            {product.categoryName || product.subcategory}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-stone-900 flex-shrink-0">
                          {product.price} <span className="text-[10px] font-normal text-stone-500">درهم</span>
                        </span>
                      </Link>
                    ))
                  ) : !isSearching ? (
                    <div className="p-4 text-center text-xs text-stone-500">
                      لا توجد نتائج مطابقة
                    </div>
                  ) : null}
                </div>

                {searchResults.length > 0 && (
                  <div className="p-2 bg-stone-50 border-t border-stone-100 text-center">
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full py-1 text-xs font-bold text-[#9E866C] hover:bg-stone-100 rounded-lg"
                    >
                      عرض جميع النتائج ({searchResults.length}) ←
                    </button>
                  </div>
                )}
              </div>
            )}
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

            <nav className="p-4 flex-1 overflow-y-auto space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-colors ${pathname === '/'
                  ? 'bg-stone-100 text-stone-950'
                  : 'text-stone-700 hover:bg-stone-50'
                  }`}
              >
                <span>الرئيسية</span>
                <ChevronDownIcon size={16} className="-rotate-90 text-stone-400" />
              </Link>

              {/* Catalog Section in Mobile */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/60 space-y-2">
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between font-bold text-sm text-stone-900 px-1"
                >
                  <span>كاتالوج الملابس الكامل</span>
                  <span className="text-xs text-[#9E866C]">عرض الكل ←</span>
                </Link>

                <div className="pt-2 border-t border-stone-200/60 grid grid-cols-3 gap-1.5 text-center text-xs">
                  <Link
                    href="/category/men"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-white rounded-xl font-semibold text-stone-800 border border-stone-200/60 hover:border-stone-900"
                  >
                    رجالي
                  </Link>
                  <Link
                    href="/category/women"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-white rounded-xl font-semibold text-stone-800 border border-stone-200/60 hover:border-stone-900"
                  >
                    نسائي
                  </Link>
                  <Link
                    href="/category/unisex"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-white rounded-xl font-bold text-amber-800 border border-amber-200 bg-amber-50/50"
                  >
                    Unisex
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-center text-xs pt-1">
                  <Link
                    href="/products?sub=هوديز"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-stone-900 text-white rounded-xl font-bold"
                  >
                    هوديز (Hoodies)
                  </Link>
                  <Link
                    href="/products?sub=سويت بانتس"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-stone-900 text-white rounded-xl font-bold"
                  >
                    سويت بانتس
                  </Link>
                </div>
              </div>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-colors ${pathname === '/contact'
                  ? 'bg-stone-100 text-stone-950'
                  : 'text-stone-700 hover:bg-stone-50'
                  }`}
              >
                <span>تواصل معنا</span>
                <ChevronDownIcon size={16} className="-rotate-90 text-stone-400" />
              </Link>

              <div className="pt-4 mt-4 border-t border-stone-100 space-y-2">
                <Link
                  href="/account"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 text-sm font-medium"
                >
                  <div className="flex items-center gap-3">
                    <UserIcon size={18} />
                    <span>{isLoggedIn ? `حسابي (${user?.name})` : 'تسجيل الدخول / حساب جديد'}</span>
                  </div>
                  {isLoggedIn && (
                    <span className="text-[10px] bg-[#9E866C]/15 text-[#7A6148] font-bold px-2 py-0.5 rounded-full">
                      مسجل
                    </span>
                  )}
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
