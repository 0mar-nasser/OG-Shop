'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnalyticsPerformanceChart from '@/components/admin/AnalyticsPerformanceChart';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  CreditCard,
  Calendar,
  Download,
  Printer,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Layers,
  MapPin,
  Compass,
  Repeat,
  PackageCheck,
  RotateCcw,
  CheckCircle2,
  Share2,
  Filter,
  Check,
} from 'lucide-react';

type Timeframe = 'hour' | 'day' | 'week' | 'month' | 'year';
type ChartMetric = 'revenue' | 'orders' | 'profit';

interface DayData {
  label: string;
  revenue: number;
  orders: number;
  profit: number;
  heightRevenue: string;
  heightOrders: string;
  heightProfit: string;
  isPeak?: boolean;
}

const analyticsDataByTimeframe: Record<
  Timeframe,
  {
    title: string;
    totalRevenue: number;
    revenueGrowth: string;
    netProfit: number;
    profitMargin: string;
    totalOrders: number;
    ordersGrowth: string;
    aov: number; // Average Order Value
    aovGrowth: string;
    conversionRate: string;
    conversionGrowth: string;
    returnRate: string;
    visitors: number;
    chartData: DayData[];
  }
> = {
  hour: {
    title: 'اليوم (آخر 24 ساعة)',
    totalRevenue: 3820,
    revenueGrowth: '+12.4%',
    netProfit: 1337,
    profitMargin: '35%',
    totalOrders: 18,
    ordersGrowth: '+8.0%',
    aov: 212.2,
    aovGrowth: '+4.1%',
    conversionRate: '4.1%',
    conversionGrowth: '+0.5%',
    returnRate: '0.0%',
    visitors: 439,
    chartData: [
      { label: '03:00 ص', revenue: 180, orders: 1, profit: 65, heightRevenue: '20%', heightOrders: '15%', heightProfit: '20%' },
      { label: '06:00 ص', revenue: 340, orders: 2, profit: 120, heightRevenue: '35%', heightOrders: '30%', heightProfit: '35%' },
      { label: '09:00 ص', revenue: 620, orders: 3, profit: 215, heightRevenue: '60%', heightOrders: '45%', heightProfit: '58%' },
      { label: '12:00 م', revenue: 980, orders: 4, profit: 340, heightRevenue: '90%', heightOrders: '60%', heightProfit: '88%', isPeak: true },
      { label: '03:00 م', revenue: 760, orders: 3, profit: 270, heightRevenue: '75%', heightOrders: '45%', heightProfit: '72%' },
      { label: '06:00 م', revenue: 540, orders: 3, profit: 190, heightRevenue: '55%', heightOrders: '45%', heightProfit: '52%' },
      { label: '09:00 م', revenue: 400, orders: 2, profit: 137, heightRevenue: '40%', heightOrders: '30%', heightProfit: '38%' },
    ],
  },
  day: {
    title: 'آخر 7 أيام',
    totalRevenue: 40200,
    revenueGrowth: '+18.4%',
    netProfit: 14070,
    profitMargin: '35%',
    totalOrders: 170,
    ordersGrowth: '+12.1%',
    aov: 236.5,
    aovGrowth: '+5.3%',
    conversionRate: '3.65%',
    conversionGrowth: '+0.8%',
    returnRate: '1.2%',
    visitors: 4680,
    chartData: [
      { label: 'السبت', revenue: 4200, orders: 18, profit: 1470, heightRevenue: '50%', heightOrders: '50%', heightProfit: '50%' },
      { label: 'الأحد', revenue: 5800, orders: 24, profit: 2030, heightRevenue: '69%', heightOrders: '66%', heightProfit: '69%' },
      { label: 'الإثنين', revenue: 3900, orders: 15, profit: 1365, heightRevenue: '46%', heightOrders: '41%', heightProfit: '46%' },
      { label: 'الثلاثاء', revenue: 6700, orders: 29, profit: 2345, heightRevenue: '80%', heightOrders: '80%', heightProfit: '80%' },
      { label: 'الأربعاء', revenue: 5100, orders: 21, profit: 1785, heightRevenue: '60%', heightOrders: '58%', heightProfit: '60%' },
      { label: 'الخميس', revenue: 8400, orders: 36, profit: 2940, heightRevenue: '100%', heightOrders: '100%', heightProfit: '100%', isPeak: true },
      { label: 'الجمعة', revenue: 6100, orders: 27, profit: 2135, heightRevenue: '72%', heightOrders: '75%', heightProfit: '72%' },
    ],
  },
  week: {
    title: 'هذا الشهر (أغسطس)',
    totalRevenue: 158400,
    revenueGrowth: '+22.6%',
    netProfit: 55440,
    profitMargin: '35%',
    totalOrders: 640,
    ordersGrowth: '+16.5%',
    aov: 247.5,
    aovGrowth: '+6.1%',
    conversionRate: '3.82%',
    conversionGrowth: '+1.1%',
    returnRate: '1.4%',
    visitors: 16750,
    chartData: [
      { label: 'الأسبوع 1', revenue: 32000, orders: 130, profit: 11200, heightRevenue: '65%', heightOrders: '62%', heightProfit: '65%' },
      { label: 'الأسبوع 2', revenue: 38400, orders: 155, profit: 13440, heightRevenue: '78%', heightOrders: '75%', heightProfit: '78%' },
      { label: 'الأسبوع 3', revenue: 49000, orders: 198, profit: 17150, heightRevenue: '100%', heightOrders: '100%', heightProfit: '100%', isPeak: true },
      { label: 'الأسبوع 4', revenue: 39000, orders: 157, profit: 13650, heightRevenue: '80%', heightOrders: '79%', heightProfit: '80%' },
    ],
  },
  month: {
    title: 'الربع الحالي (Q3)',
    totalRevenue: 420000,
    revenueGrowth: '+28.2%',
    netProfit: 147000,
    profitMargin: '35%',
    totalOrders: 1720,
    ordersGrowth: '+21.4%',
    aov: 244.1,
    aovGrowth: '+5.7%',
    conversionRate: '3.70%',
    conversionGrowth: '+0.9%',
    returnRate: '1.5%',
    visitors: 46500,
    chartData: [
      { label: 'يوليو', revenue: 125000, orders: 510, profit: 43750, heightRevenue: '78%', heightOrders: '76%', heightProfit: '78%' },
      { label: 'أغسطس', revenue: 158400, orders: 640, profit: 55440, heightRevenue: '100%', heightOrders: '100%', heightProfit: '100%', isPeak: true },
      { label: 'سبتمبر (المتوقع)', revenue: 136600, orders: 570, profit: 47810, heightRevenue: '86%', heightOrders: '89%', heightProfit: '86%' },
    ],
  },
  year: {
    title: 'هذا العام (2026)',
    totalRevenue: 1240000,
    revenueGrowth: '+34.8%',
    netProfit: 434000,
    profitMargin: '35%',
    totalOrders: 5150,
    ordersGrowth: '+27.0%',
    aov: 240.8,
    aovGrowth: '+6.2%',
    conversionRate: '3.60%',
    conversionGrowth: '+0.7%',
    returnRate: '1.3%',
    visitors: 143000,
    chartData: [
      { label: 'يناير - فبراير', revenue: 180000, orders: 750, profit: 63000, heightRevenue: '55%', heightOrders: '55%', heightProfit: '55%' },
      { label: 'مارس - أبريل', revenue: 260000, orders: 1080, profit: 91000, heightRevenue: '80%', heightOrders: '80%', heightProfit: '80%' },
      { label: 'مايو - يونيو', revenue: 320000, orders: 1330, profit: 112000, heightRevenue: '98%', heightOrders: '98%', heightProfit: '98%' },
      { label: 'يوليو - أغسطس', revenue: 325000, orders: 1350, profit: 113750, heightRevenue: '100%', heightOrders: '100%', heightProfit: '100%', isPeak: true },
      { label: 'سبتمبر - أكتوبر (المتوقع)', revenue: 210000, orders: 880, profit: 73500, heightRevenue: '64%', heightOrders: '65%', heightProfit: '64%' },
    ],
  },
};

// Categories breakdown data
const categorySalesData = [
  { name: 'ملابس رجالية', percentage: 46, revenue: '72,864 ر.س', color: 'bg-stone-900', textColor: 'text-stone-900' },
  { name: 'ملابس نسائية', percentage: 34, revenue: '53,856 ر.س', color: 'bg-[#9E866C]', textColor: 'text-[#9E866C]' },
  { name: 'أحذية وإكسسوارات', percentage: 14, revenue: '22,176 ر.س', color: 'bg-amber-600', textColor: 'text-amber-600' },
  { name: 'عطور ومستحضرات', percentage: 6, revenue: '9,504 ر.س', color: 'bg-emerald-600', textColor: 'text-emerald-600' },
];

// Traffic & Channels source data
const channelSources = [
  { name: 'إعلانات إنستغرام وتيك توك', share: 44, visits: '7,370 زيارة', revenue: '69,696 ر.س', trend: '+22%' },
  { name: 'محركات البحث (Google SEO)', share: 26, visits: '4,355 زيارة', revenue: '41,184 ر.س', trend: '+14%' },
  { name: 'مباشر وتطبيق الواتساب', share: 18, visits: '3,015 زيارة', revenue: '28,512 ر.س', trend: '+8%' },
  { name: 'حملات البريد والرسائل النصية', share: 12, visits: '2,010 زيارة', revenue: '19,008 ر.س', trend: '+19%' },
];

// Geographic distribution data
const geographicData = [
  { city: 'الرياض', share: 42, orders: 269, revenue: '66,528 ر.س', avgDelivery: '24 ساعة' },
  { city: 'جدة', share: 24, orders: 154, revenue: '38,016 ر.س', avgDelivery: '48 ساعة' },
  { city: 'المنطقة الشرقية (الدمام والخبر)', share: 18, orders: 115, revenue: '28,512 ر.س', avgDelivery: '48 ساعة' },
  { city: 'مكة المكرمة والمدينة المنورة', share: 11, orders: 70, revenue: '17,424 ر.س', avgDelivery: '48 ساعة' },
  { city: 'باقي مدن المملكة', share: 5, orders: 32, revenue: '7,920 ر.س', avgDelivery: '72 ساعة' },
];

// Top products detailed matrix
const detailedProductsMatrix = [
  {
    name: 'قميص كتان بيج كلاسيكي',
    category: 'رجالي',
    unitsSold: 242,
    revenue: 44770,
    profitMargin: '38%',
    returnRate: '0.8%',
    stock: 24,
    status: 'high_demand',
  },
  {
    name: 'بنطال تشينو قماش مرن',
    category: 'رجالي',
    unitsSold: 184,
    revenue: 40480,
    profitMargin: '35%',
    returnRate: '1.1%',
    stock: 18,
    status: 'stable',
  },
  {
    name: 'فستان حريري مطرز بأكمام واسعة',
    category: 'نسائي',
    unitsSold: 125,
    revenue: 42500,
    profitMargin: '42%',
    returnRate: '1.6%',
    stock: 3,
    status: 'low_stock',
  },
  {
    name: 'هودي قطن ناعم كاجوال',
    category: 'كاجوال',
    unitsSold: 112,
    revenue: 21280,
    profitMargin: '32%',
    returnRate: '0.9%',
    stock: 7,
    status: 'stable',
  },
];

export default function AdminAnalyticsPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>('month');
  const [chartMetric, setChartMetric] = useState<ChartMetric>('revenue');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const currentData = analyticsDataByTimeframe[timeframe];

  const handleExportFullReport = () => {
    const csvContent =
      'المؤشر,القيمة,النمو\n' +
      `الفترة الزمنية,${currentData.title},-\n` +
      `إجمالي المبيعات,${currentData.totalRevenue} ر.س,${currentData.revenueGrowth}\n` +
      `صافي الأرباح,${currentData.netProfit} ر.س,${currentData.profitMargin}\n` +
      `الطلبات المستلمة,${currentData.totalOrders},${currentData.ordersGrowth}\n` +
      `متوسط قيمة الطلب,${currentData.aov} ر.س,${currentData.aovGrowth}\n` +
      `معدل التحويل,${currentData.conversionRate},${currentData.conversionGrowth}\n` +
      `معدل الاسترجاع,${currentData.returnRate},-\n` +
      `إجمالي الزيارات,${currentData.visitors},-\n`;

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `store-analytics-${timeframe}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* 1. Analytics Header & Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Metric 1: Total Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>إجمالي المبيعات</span>
            <span className="inline-flex items-center text-emerald-700 font-black text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3 ml-0.5" />
              {currentData.revenueGrowth}
            </span>
          </div>
          <div className="text-2xl font-black text-stone-900">
            {currentData.totalRevenue.toLocaleString('ar-SA')} <span className="text-xs font-bold text-stone-400">ر.س</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium">مقارنة بالفترة السابقة</p>
        </div>

        {/* Metric 2: Net Profit */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>صافي الأرباح</span>
            <span className="inline-flex items-center text-amber-700 font-black text-xs bg-amber-50 px-2 py-0.5 rounded-full">
              هامش {currentData.profitMargin}
            </span>
          </div>
          <div className="text-2xl font-black text-[#9E866C]">
            {currentData.netProfit.toLocaleString('ar-SA')} <span className="text-xs font-bold text-stone-400">ر.س</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium">بعد خصم التكلفة والشحن</p>
        </div>

        {/* Metric 3: Orders Count */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>عدد الطلبات</span>
            <span className="inline-flex items-center text-emerald-700 font-black text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3 ml-0.5" />
              {currentData.ordersGrowth}
            </span>
          </div>
          <div className="text-2xl font-black text-stone-900">
            {currentData.totalOrders.toLocaleString('ar-SA')} <span className="text-xs font-bold text-stone-400">طلب</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium">معدل تنفيذ 99.2%</p>
        </div>

        {/* Metric 4: Average Order Value (AOV) */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>متوسط الطلب (AOV)</span>
            <span className="inline-flex items-center text-emerald-700 font-black text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3 ml-0.5" />
              {currentData.aovGrowth}
            </span>
          </div>
          <div className="text-2xl font-black text-stone-900">
            {currentData.aov} <span className="text-xs font-bold text-stone-400">ر.س</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium">2.4 قطعة في السلة</p>
        </div>

        {/* Metric 5: Conversion Rate */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>معدل التحويل</span>
            <span className="inline-flex items-center text-emerald-700 font-black text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3 ml-0.5" />
              {currentData.conversionGrowth}
            </span>
          </div>
          <div className="text-2xl font-black text-stone-900">
            {currentData.conversionRate}
          </div>
          <p className="text-[11px] text-stone-400 font-medium">من {currentData.visitors.toLocaleString('ar-SA')} زائر</p>
        </div>

        {/* Metric 6: Return Rate */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>معدل الاسترجاع</span>
            <span className="inline-flex items-center text-emerald-700 font-black text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
              ممتاز ✓
            </span>
          </div>
          <div className="text-2xl font-black text-stone-900">
            {currentData.returnRate}
          </div>
          <p className="text-[11px] text-stone-400 font-medium">أقل من المعدل العام (3%)</p>
        </div>
      </div>


      {/* 2. Executive 6-KPI Metric Cards Grid */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#9E866C]/10 text-[#9E866C]">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              مركز الإحصائيات والتحليلات المتقدمة
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl">
            تقارير شاملة لأداء المتجر المالي، سلوك العملاء، قنوات التسويق، وتوزيع المبيعات الجغرافي.
          </p>
        </div>

        {/* Action Buttons & Timeframe Switcher */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Timeframe selector */}
          <div className="flex items-center bg-stone-100 p-1.5 rounded-2xl border border-stone-200 text-xs font-bold">
            {[
              { id: 'hour', label: 'ساعه' },
              { id: 'day', label: 'يوم' },
              { id: 'week', label: 'اسبوع' },
              { id: 'month', label: 'شهر' },
              { id: 'year', label: 'سنه' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeframe(tab.id as Timeframe)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${timeframe === tab.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Export button */}
          <button
            onClick={handleExportFullReport}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#9E866C] hover:bg-[#8A745D] text-white rounded-2xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            {copiedNotification ? (
              <>
                <Check className="w-4 h-4" />
                تم التحميل!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                تصدير التقرير
              </>
            )}
          </button>

          {/* Print button */}
          <button
            onClick={() => window.print()}
            className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-2xl transition-colors cursor-pointer"
            title="طباعة التقرير"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Main Chart: Interactive Performance Trends */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#9E866C]" />
              <h2 className="text-lg font-black text-stone-900">
                منحنى ومؤشرات الأداء خلال ({currentData.title})
              </h2>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              تتبع الإيرادات، عدد الطلبات المنجزة، وصافي الأرباح الفعلية
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setChartMetric('revenue')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${chartMetric === 'revenue'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
                }`}
            >
              الإيرادات (ر.س)
            </button>
            <button
              onClick={() => setChartMetric('profit')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${chartMetric === 'profit'
                ? 'bg-[#9E866C] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
                }`}
            >
              صافي الربح
            </button>
            <button
              onClick={() => setChartMetric('orders')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${chartMetric === 'orders'
                ? 'bg-indigo-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
                }`}
            >
              عدد الطلبات
            </button>
          </div>
        </div>

        {/* Visual Dynamic Bar Chart */}
        <div className="h-64 pt-6 flex items-end justify-between gap-3 sm:gap-6 border-b border-stone-100 pb-3">
          {currentData.chartData.map((item, idx) => {
            const height =
              chartMetric === 'revenue'
                ? item.heightRevenue
                : chartMetric === 'profit'
                  ? item.heightProfit
                  : item.heightOrders;

            const displayValue =
              chartMetric === 'revenue'
                ? `${item.revenue.toLocaleString('ar-SA')} ر.س`
                : chartMetric === 'profit'
                  ? `${item.profit.toLocaleString('ar-SA')} ر.س`
                  : `${item.orders} طلب`;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2.5 h-full justify-end group relative">
                {/* Floating Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -top-12 bg-stone-900 text-white text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-xl transition-opacity whitespace-nowrap z-20">
                  <div className="text-stone-300 text-[10px]">{item.label}</div>
                  <div className="text-[#D7C4B7]">{displayValue}</div>
                </div>

                {/* Bar */}
                <div className="w-full max-w-[56px] bg-stone-100 rounded-t-2xl h-full flex items-end overflow-hidden p-0.5">
                  <div
                    style={{ height }}
                    className={`w-full rounded-t-xl transition-all duration-700 group-hover:opacity-90 ${item.isPeak
                      ? 'bg-gradient-to-t from-stone-900 to-[#9E866C]'
                      : chartMetric === 'profit'
                        ? 'bg-gradient-to-t from-[#9E866C] to-[#D7C4B7]'
                        : chartMetric === 'orders'
                          ? 'bg-gradient-to-t from-indigo-700 to-indigo-400'
                          : 'bg-stone-800'
                      }`}
                  />
                </div>
                <span className="text-[11px] font-bold text-stone-600 truncate max-w-full text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-stone-400 font-bold">فترة الذروة الشرائية</div>
              <div className="text-sm font-black text-stone-900">نهاية الأسبوع (الخميس والجمعة)</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#9E866C]/20 text-[#9E866C] font-bold">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-stone-400 font-bold">أعلى وسيلة دفع استخداماً</div>
              <div className="text-sm font-black text-stone-900">Apple Pay و مدى (82%)</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-800 font-bold">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-stone-400 font-bold">نسبة تكرار الشراء</div>
              <div className="text-sm font-black text-stone-900">36% عملاء عائدون (Loyal)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sales by Category & Marketing Channels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#9E866C]" />
                <h3 className="text-base font-black text-stone-900">
                  توزيع المبيعات حسب التصنيفات
                </h3>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">نسبة مشاركة كل قسم من إجمالي الإيرادات</p>
            </div>
            <Link href="/admin/categories" className="text-xs font-bold text-[#9E866C] hover:underline">
              التصنيفات
            </Link>
          </div>

          {/* Unified Progress Stack Bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex bg-stone-100 p-0.5 border border-stone-200">
            {categorySalesData.map((cat, idx) => (
              <div
                key={idx}
                style={{ width: `${cat.percentage}%` }}
                className={`h-full first:rounded-r-full last:rounded-l-full ${cat.color}`}
                title={`${cat.name}: ${cat.percentage}%`}
              />
            ))}
          </div>

          {/* Category List Details */}
          <div className="space-y-3 pt-2">
            {categorySalesData.map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-stone-50/70 border border-stone-200/60"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <div>
                    <span className="text-xs font-black text-stone-900">{cat.name}</span>
                    <div className="text-[11px] text-stone-400 font-medium">{cat.revenue}</div>
                  </div>
                </div>
                <div className="text-xs font-black text-stone-900">{cat.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing & Traffic Channels */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-black text-stone-900">
                  قنوات التسويق ومصادر الزيارات
                </h3>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">القنوات الأعلى تحويلاً وإيراداً للمتجر</p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ROI عالي 🚀
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {channelSources.map((chan, idx) => (
              <div key={idx} className="space-y-1.5 p-3 rounded-2xl bg-stone-50/70 border border-stone-200/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-stone-900">{chan.name}</span>
                  <span className="font-bold text-stone-900">{chan.revenue}</span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#9E866C] to-stone-900 rounded-full transition-all duration-500"
                    style={{ width: `${chan.share}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-400 font-medium">
                  <span>{chan.visits} ({chan.share}%)</span>
                  <span className="text-emerald-600 font-bold">{chan.trend} نمو</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Geographic Distribution (المبيعات الجغرافية والمدن) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-600" />
              <h3 className="text-base font-black text-stone-900">
                التوزيع الجغرافي للمبيعات وسرعة الشحن
              </h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              تركز طلبات العملاء حسب المناطق داخل المملكة العربية السعودية
            </p>
          </div>
          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            تغطية أكثر من 30 مدينة
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {geographicData.map((geo, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-[#9E866C] transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-stone-900">{geo.city}</span>
                <span className="text-xs font-bold text-[#9E866C] bg-[#9E866C]/10 px-2 py-0.5 rounded-lg">
                  {geo.share}% من المبيعات
                </span>
              </div>

              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-900 rounded-full"
                  style={{ width: `${geo.share * 2}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-200/60 text-stone-600">
                <span>{geo.orders} طلب ({geo.revenue})</span>
                <span className="text-emerald-700 font-bold text-[11px]">⚡ {geo.avgDelivery}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Top Products Margins & Performance Matrix */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#9E866C]" />
              <h3 className="text-base font-black text-stone-900">
                مصفوفة أداء وهوامش أرباح المنتجات الأعلى أداءً
              </h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              مقارنة بين حجم المبيعات، الإيراد، هامش الربح الصافي، ونسبة الاسترجاع
            </p>
          </div>
          <Link href="/admin/products" className="text-xs font-bold text-[#9E866C] hover:underline">
            إدارة كل المنتجات
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold text-[11px]">
                <th className="pb-3 pr-2">المنتج</th>
                <th className="pb-3 text-center">القسم</th>
                <th className="pb-3 text-center">القطع المباعة</th>
                <th className="pb-3 text-center">إجمالي الإيرادات</th>
                <th className="pb-3 text-center">هامش الربح</th>
                <th className="pb-3 text-center">معدل الاسترجاع</th>
                <th className="pb-3 text-center">المخزون الحالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {detailedProductsMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 pr-2 font-black text-stone-900">{item.name}</td>
                  <td className="py-3.5 text-center text-stone-500">{item.category}</td>
                  <td className="py-3.5 text-center font-bold text-stone-900">{item.unitsSold} قطعة</td>
                  <td className="py-3.5 text-center font-bold text-stone-900">{item.revenue.toLocaleString('ar-SA')} ر.س</td>
                  <td className="py-3.5 text-center">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-black border border-emerald-200">
                      {item.profitMargin}
                    </span>
                  </td>
                  <td className="py-3.5 text-center text-stone-600 font-bold">{item.returnRate}</td>
                  <td className="py-3.5 text-center">
                    {item.stock <= 5 ? (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold border border-rose-200">
                        متبقي {item.stock} فقط ⚠️
                      </span>
                    ) : (
                      <span className="text-stone-600 font-bold">{item.stock} قطعة</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
