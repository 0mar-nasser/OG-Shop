'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardWeeklySalesChart from '@/components/admin/DashboardWeeklySalesChart';
import {
  AlertCircle,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  ExternalLink,
  MessageCircle,
  Printer,
  ChevronLeft,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  Tag,
  Eye,
  Check,
  X,
  Search,
  Download,
  BarChart3,
  Store,
  Star,
  FileText,
  CheckCheck,
  DollarSign,
  MessageSquare,
  BadgeCheck,
  RefreshCw,
} from 'lucide-react';

// Mock actionable orders
interface ActionOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  city: string;
  itemSummary: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  time: string;
  createdAt: string;
}

const initialActionOrders: ActionOrder[] = [
  {
    id: '1',
    orderNumber: 'ORD-8921',
    customerName: 'عبدالله الغامدي',
    customerPhone: '+966501234567',
    city: 'الرياض',
    itemSummary: 'بدلة كلاسيكية فاخرة (مقاس 50)',
    total: 890,
    status: 'pending',
    time: 'منذ 10 دقائق',
    createdAt: 'اليوم، 03:50 م',
  },
  {
    id: '2',
    orderNumber: 'ORD-8920',
    customerName: 'سارة العتيبي',
    customerPhone: '+966559876543',
    city: 'جدة',
    itemSummary: 'فستان حريري مطرز (مقاس M)',
    total: 340,
    status: 'pending',
    time: 'منذ 25 دقيقة',
    createdAt: 'اليوم، 03:35 م',
  },
  {
    id: '3',
    orderNumber: 'ORD-8919',
    customerName: 'خالد المنصور',
    customerPhone: '+966543332211',
    city: 'الدمام',
    itemSummary: 'قميص كتان + بنطال قطني (2 قطع)',
    total: 1350,
    status: 'processing',
    time: 'منذ ساعتين',
    createdAt: 'اليوم، 01:45 م',
  },
  {
    id: '4',
    orderNumber: 'ORD-8918',
    customerName: 'ريم الدوسري',
    customerPhone: '+966567788990',
    city: 'الخبر',
    itemSummary: 'عباية مخملية مطرزة (مقاس 54)',
    total: 780,
    status: 'shipped',
    time: 'منذ 4 ساعات',
    createdAt: 'اليوم، 11:20 ص',
  },
  {
    id: '5',
    orderNumber: 'ORD-8917',
    customerName: 'فيصل القحطاني',
    customerPhone: '+966531122445',
    city: 'مكة المكرمة',
    itemSummary: 'حذاء جلدي فاخر بني (مقاس 42)',
    total: 460,
    status: 'delivered',
    time: 'منذ 6 ساعات',
    createdAt: 'اليوم، 09:15 ص',
  },
];

// Top selling products mock
const topProducts = [
  {
    id: 'men-01',
    name: 'قميص كتان بيج كلاسيكي بقصة مريحة',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    category: 'رجالي',
    salesCount: 142,
    revenue: 26270,
    stock: 24,
    rating: 4.9,
    growth: '+28%',
  },
  {
    id: 'men-02',
    name: 'بنطال تشينو قماش مرن بقصة مستقيمة',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
    category: 'رجالي',
    salesCount: 98,
    revenue: 21560,
    stock: 18,
    rating: 4.8,
    growth: '+19%',
  },
  {
    id: 'men-04',
    name: 'هودي قطن ناعم كاجوال مريح',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
    category: 'كاجوال',
    salesCount: 86,
    revenue: 16340,
    stock: 7,
    rating: 4.7,
    growth: '+14%',
  },
  {
    id: 'prod-4',
    name: 'فستان حريري مطرز بأكمام واسعة',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop',
    category: 'نسائي',
    salesCount: 75,
    revenue: 25500,
    stock: 3,
    rating: 5.0,
    growth: '+32%',
  },
];

// Customer reviews mock
interface CustomerReview {
  id: string;
  customerName: string;
  rating: number;
  productName: string;
  comment: string;
  time: string;
  verified: boolean;
}

const recentReviews: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'سلطان القحطاني',
    rating: 5,
    productName: 'قميص كتان بيج كلاسيكي',
    comment: 'الخامة ممتازة جداً وباردة ومريحة في اللبس، والمقاس مضبوط 100%. التوصيل كان سريعاً.',
    time: 'منذ ساعتين',
    verified: true,
  },
  {
    id: 'rev-2',
    customerName: 'نورة العلي',
    rating: 5,
    productName: 'فستان حريري مطرز بأكمام واسعة',
    comment: 'الفستان رائع جداً، القماش فاخر والتطريز متقن للغاية، التغليف أنيق ومميز.',
    time: 'منذ 5 ساعات',
    verified: true,
  },
  {
    id: 'rev-3',
    customerName: 'محمد الدوسري',
    rating: 4,
    productName: 'بنطال تشينو قماش مرن',
    comment: 'البنطال مريح جداً ومناسب للعمل اليومي، جودة القماش ممتازة وعملية.',
    time: 'أمس',
    verified: true,
  },
];

// Activity stream mock
const recentActivities = [
  {
    id: 'act-1',
    type: 'order',
    title: 'طلب جديد #ORD-8921',
    description: 'قام عبدالله الغامدي بإتمام طلب بقيمة 890 ر.س',
    time: 'منذ 10 دقائق',
    icon: ShoppingBag,
  },
  {
    id: 'act-2',
    type: 'review',
    title: 'تقييم 5 نجوم جديد',
    description: 'كتبت منى الشمري مراجعة ممتازة على "قميص كتان بيج"',
    time: 'منذ 45 دقيقة',
    icon: Star,
  },
  {
    id: 'act-3',
    type: 'stock',
    title: 'تنبيه مخزون منخفض',
    description: 'متبقي 3 قطع فقط من "فستان حريري مطرز"',
    time: 'منذ ساعتين',
    icon: AlertCircle,
  },
  {
    id: 'act-4',
    type: 'delivery',
    title: 'تم تسليم الشحنة بنجاح',
    description: 'الشحنة #ORD-8917 تم تسليمها لفيصل القحطاني',
    time: 'منذ 6 ساعات',
    icon: Truck,
  },
];

// Weekly sales chart data
const weeklySalesData = [
  { day: 'السبت', sales: 4200, orders: 18, height: '55%' },
  { day: 'الأحد', sales: 5800, orders: 24, height: '72%' },
  { day: 'الإثنين', sales: 3900, orders: 15, height: '48%' },
  { day: 'الثلاثاء', sales: 6700, orders: 29, height: '85%' },
  { day: 'الأربعاء', sales: 5100, orders: 21, height: '64%' },
  { day: 'الخميس', sales: 8400, orders: 36, height: '100%', isPeak: true },
  { day: 'الجمعة (اليوم)', sales: 6100, orders: 27, height: '76%', isToday: true },
];

interface WeeklyKPIMetrics {
  weeklyRevenue: number;
  lastWeekRevenue: number;
  revenueGrowth: number;
  profitMargin: number;
  netProfit: number;
  weeklyOrdersCount: number;
  lastWeekOrdersCount: number;
  ordersGrowth: number;
  inTransitShipments: number;
  onTimeDeliveryRate: number;
}

export default function PracticalAdminDashboard() {
  const [orders, setOrders] = useState<ActionOrder[]>(initialActionOrders);
  const [isVisible, setIsVisible] = useState(true);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<ActionOrder | null>(null);
  const [copiedExport, setCopiedExport] = useState(false);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);

  const [metrics, setMetrics] = useState<WeeklyKPIMetrics>({
    weeklyRevenue: 40200,
    lastWeekRevenue: 33950,
    revenueGrowth: 18.4,
    profitMargin: 35,
    netProfit: 14070,
    weeklyOrdersCount: 170,
    lastWeekOrdersCount: 152,
    ordersGrowth: 12.1,
    inTransitShipments: 24,
    onTimeDeliveryRate: 98,
  });

  const fetchMetrics = useCallback(async () => {
    try {
      setIsLoadingMetrics(true);
      const res = await fetch('/api/admin/metrics');
      if (res.ok) {
        const data = await res.json();
        if (data?.metrics) {
          setMetrics(data.metrics);
        }
      }
    } catch (err) {
      console.error('Failed to load metrics:', err);
    } finally {
      setIsLoadingMetrics(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  // Instant order confirmation action
  const handleQuickConfirm = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'processing' } : o))
    );
    setConfirmedId(orderId);
    setTimeout(() => setConfirmedId(null), 2500);
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesFilter = orderFilter === 'all' || order.status === orderFilter;
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.itemSummary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [orders, orderFilter, searchQuery]);

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const processingCount = orders.filter((o) => o.status === 'processing').length;
  const shippedCount = orders.filter((o) => o.status === 'shipped').length;

  // Dynamically reflect active in-transit shipments count
  const activeInTransitCount = useMemo(() => {
    return metrics.inTransitShipments > 0 ? metrics.inTransitShipments : shippedCount;
  }, [metrics.inTransitShipments, shippedCount]);

  const handleExportData = () => {
    const csvContent =
      'رقم الطلب,العميل,الهاتف,المدينة,المبلغ,الحالة\n' +
      orders
        .map((o) => `${o.orderNumber},${o.customerName},${o.customerPhone},${o.city},${o.total},${o.status}`)
        .join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sales-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* 2. Urgent Action Center */}
      {isVisible && (
        <div className="bg-white border border-stone-200 rounded-3xl p-4 sm:p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-stone-900">
              <AlertCircle className="w-5 h-5 text-[#9E866C] flex-shrink-0" />
              <h3 className="font-extrabold text-sm sm:text-base">
                مهام تتطلب انتباهك الفوري اليوم:
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                title="إخفاء التنبيهات"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {/* Action 1: Pending Orders */}
            <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/80 flex items-center justify-between">
              <div>
                <div className="text-lg font-black text-stone-900">
                  {pendingCount} طلبات بانتظار التأكيد
                </div>
              </div>
              <button
                onClick={() => setOrderFilter('pending')}
                className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                معالجة فورية
              </button>
            </div>

            {/* Action 2: Low Stock */}
            <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/80 flex items-center justify-between">
              <div>
                <div className="text-lg font-black text-stone-900">
                  2 منتجات قاربت على النفاد
                </div>
              </div>
              <Link
                href="/admin/products"
                className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-900 border border-stone-200 text-xs font-bold rounded-xl transition-colors"
              >
                تزويد المخزون
              </Link>
            </div>

            {/* Action 3: Ready to Ship */}
            <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/80 flex items-center justify-between">
              <div>
                <div className="text-lg font-black text-stone-900">
                  {processingCount} طلبات قيد التجهيز
                </div>
              </div>
              <Link
                href="/admin/orders"
                className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-900 border border-stone-200 text-xs font-bold rounded-xl transition-colors"
              >
                إصدار بوليصة
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. Primary Weekly KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* KPI 1: Weekly Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs hover:border-[#9E866C]/50 transition-all space-y-2 group">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>مبيعات هذا الأسبوع</span>
            <span
              className={`inline-flex items-center gap-0.5 text-stone-900 font-black text-xs px-2 py-0.5 rounded-full border ${
                metrics.revenueGrowth >= 0
                  ? 'bg-stone-100 border-stone-200 text-stone-900'
                  : 'bg-rose-50 border-rose-200 text-rose-700'
              }`}
            >
              {metrics.revenueGrowth >= 0 ? (
                <TrendingUp className="w-3 h-3 text-[#9E866C]" />
              ) : (
                <TrendingDown className="w-3 h-3 text-rose-600" />
              )}
              {metrics.revenueGrowth >= 0 ? `+${metrics.revenueGrowth}%` : `${metrics.revenueGrowth}%`}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            {metrics.weeklyRevenue.toLocaleString('ar-SA')}{' '}
            <span className="text-base font-bold text-stone-500">ر.س</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium">
            مقارنة بـ الأسبوع الماضي ({metrics.lastWeekRevenue.toLocaleString('ar-SA')} ر.س)
          </p>
        </div>

        {/* KPI 2: Net Profit (صافي الربح) */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs hover:border-[#9E866C]/50 transition-all space-y-2 group">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>صافي الربح الأسبوعي</span>
            <span className="inline-flex items-center gap-0.5 text-stone-900 font-black text-xs bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
              هامش {metrics.profitMargin}%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#9E866C] tracking-tight">
            {metrics.netProfit.toLocaleString('ar-SA')}{' '}
            <span className="text-base font-bold text-stone-500">ر.س</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium">بعد خصم التكلفة والشحن والرسوم</p>
        </div>

        {/* KPI 3: Total Orders */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs hover:border-[#9E866C]/50 transition-all space-y-2 group">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>طلبات هذا الأسبوع</span>
            <span
              className={`inline-flex items-center gap-0.5 text-stone-900 font-black text-xs px-2 py-0.5 rounded-full border ${
                metrics.ordersGrowth >= 0
                  ? 'bg-stone-100 border-stone-200 text-stone-900'
                  : 'bg-rose-50 border-rose-200 text-rose-700'
              }`}
            >
              {metrics.ordersGrowth >= 0 ? (
                <TrendingUp className="w-3 h-3 text-[#9E866C]" />
              ) : (
                <TrendingDown className="w-3 h-3 text-rose-600" />
              )}
              {metrics.ordersGrowth >= 0 ? `+${metrics.ordersGrowth}%` : `${metrics.ordersGrowth}%`}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            {metrics.weeklyOrdersCount.toLocaleString('ar-SA')}{' '}
            <span className="text-base font-bold text-stone-500">طلب</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium">
            معدل تسليم {metrics.onTimeDeliveryRate}% في الموعد المحدد
          </p>
        </div>

        {/* KPI 4: In-Transit Shipments (شحنات قيد التوصيل) */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs hover:border-[#9E866C]/50 transition-all space-y-2 group">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>شحنات قيد التوصيل</span>
            <span className="inline-flex items-center gap-1 text-stone-900 font-black text-xs bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
              <Truck className="w-3 h-3 text-[#9E866C]" />
              نشطة الآن
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            {activeInTransitCount.toLocaleString('ar-SA')}{' '}
            <span className="text-base font-bold text-stone-500">شحنة</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium">متوسط زمن التوصيل: 24-48 ساعة</p>
        </div>
      </div>

      {/* 4. Sales Analytics Chart & Top Products Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Interactive Chart */}
        <DashboardWeeklySalesChart data={weeklySalesData} />

        {/* Top Selling Products Ranking (مكان المستهدف المالي للشهر) */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#9E866C] fill-[#9E866C]" />
                <h3 className="font-extrabold text-base text-stone-900">
                  ترتيب الأكثر مبيعاً
                </h3>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                المنتجات الأعلى طلباً هذا الأسبوع
              </p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-[#9E866C] hover:underline"
            >
              الكل
            </Link>
          </div>

          {/* Ranked items */}
          <div className="space-y-2.5">
            {topProducts.slice(0, 4).map((product, idx) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 hover:bg-stone-100/80 transition-colors border border-stone-200/60"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${idx === 0
                        ? 'bg-[#9E866C] text-white'
                        : 'bg-stone-200 text-stone-700'
                      }`}
                  >
                    #{idx + 1}
                  </span>
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-stone-200 flex-shrink-0 border border-stone-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-stone-900 truncate max-w-[130px] sm:max-w-[150px]">
                      {product.name}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {product.salesCount} مبيعة
                    </div>
                  </div>
                </div>

                <div className="text-left flex-shrink-0">
                  <div className="text-xs font-black text-stone-900">
                    {product.revenue.toLocaleString('ar-SA')} ر.س
                  </div>
                  <span className="text-[10px] font-bold text-stone-500">
                    {product.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-stone-100 rounded-2xl text-center">
            <div className="text-[11px] text-stone-600 font-medium">
              المنتجات الأربعة تمثل <span className="font-bold text-stone-900">72%</span> من مبيعات الأسبوع
            </div>
          </div>
        </div>
      </div>

      {/* 5. Actionable Order Processing Desk */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9E866C]" />
              <h3 className="text-base font-extrabold text-stone-900">
                الطلبات الواردة والمعالجة الفورية
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              تأكيد الطلب، التواصل مع العميل واتساب، أو طباعة الفاتورة بنقرة واحدة
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#9E866C] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            عرض كافة الطلبات ({orders.length})
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: `الكل (${orders.length})` },
              { id: 'pending', label: `بانتظار التأكيد (${pendingCount})` },
              { id: 'processing', label: `قيد التجهيز (${processingCount})` },
              { id: 'shipped', label: `تم الشحن (${shippedCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setOrderFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${orderFilter === tab.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالرقم أو اسم العميل..."
              className="w-full text-xs font-medium pl-3 pr-9 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Orders Cards with Instant Action Buttons */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-stone-200 rounded-2xl space-y-2">
              <ShoppingBag className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs font-bold text-stone-500">لا توجد طلبات تطابق هذا التصنيف أو البحث</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Order Info */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl text-xs font-bold flex-shrink-0 bg-stone-100 text-stone-900 border border-stone-200">
                    {order.status === 'pending' && <Clock className="w-5 h-5 text-[#9E866C]" />}
                    {order.status === 'processing' && <Package className="w-5 h-5 text-stone-700" />}
                    {order.status === 'shipped' && <Truck className="w-5 h-5 text-stone-700" />}
                    {order.status === 'delivered' && <CheckCircle2 className="w-5 h-5 text-stone-700" />}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-black text-stone-900 text-sm">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs font-bold text-stone-800">
                        • {order.customerName}
                      </span>
                      <span className="text-[11px] text-stone-500 bg-white border border-stone-200 px-2 py-0.5 rounded-md font-medium">
                        {order.city}
                      </span>
                      <span className="text-[11px] text-stone-400 font-medium">
                        ({order.createdAt})
                      </span>
                    </div>

                    <p className="text-xs text-stone-700 font-medium">
                      {order.itemSummary}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-stone-400">
                      <span>{order.time}</span>
                      <span>•</span>
                      <span className="font-black text-stone-900 text-xs">
                        الإجمالي: {order.total} ر.س
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instant Action Triggers */}
                <div className="flex items-center gap-2 self-end lg:self-auto flex-wrap">
                  {/* WhatsApp Chat Shortcut */}
                  <a
                    href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold rounded-xl transition-colors"
                    title="محادثة العميل على واتساب"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#9E866C]" />
                    واتساب
                  </a>

                  {/* Print Invoice Button */}
                  <button
                    onClick={() => setSelectedOrderForInvoice(order)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    title="معاينة وطباعة الفاتورة"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    الفاتورة
                  </button>

                  {/* Quick Confirm Button */}
                  {order.status === 'pending' ? (
                    <button
                      onClick={() => handleQuickConfirm(order.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      {confirmedId === order.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#D7C4B7]" />
                          تم التأكيد!
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          تأكيد الطلب
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl border bg-stone-100 text-stone-800 border-stone-200">
                      {order.status === 'processing' && 'قيد التجهيز'}
                      {order.status === 'shipped' && 'تم الشحن'}
                      {order.status === 'delivered' && 'تم التسليم'}
                    </span>
                  )}

                  <Link
                    href={`/admin/orders`}
                    className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-xl transition-colors"
                    title="عرض في صفحة الطلبات"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 6. Customer Reviews & Live Activity Stream Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Reviews & Comments Section (قسم التقييمات والتعليقات) */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#9E866C]" />
                <h4 className="text-base font-extrabold text-stone-900">
                  أحدث التقييمات والتعليقات
                </h4>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">آراء وتجارب العملاء الموثقة</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-black bg-stone-100 px-2.5 py-1 rounded-xl border border-stone-200">
              <Star className="w-3.5 h-3.5 text-[#9E866C] fill-[#9E866C]" />
              <span>4.9 / 5.0</span>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {recentReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/70 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-xs">
                      {rev.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-black text-stone-900 flex items-center gap-1">
                        {rev.customerName}
                        {rev.verified && (
                          <span title="مشتري موثق">
                            <BadgeCheck className="w-3.5 h-3.5 text-[#9E866C]" />
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-stone-400">{rev.productName}</div>
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-[#9E866C] fill-[#9E866C]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400">{rev.time}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed bg-white p-2.5 rounded-xl border border-stone-200/60">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Stream */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-stone-900" />
                <h4 className="text-base font-extrabold text-stone-900">
                  سجل الأنشطة الحية
                </h4>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">موجز فوري لأحدث أحداث المتجر</p>
            </div>
            <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
              تحديث تلقائي
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {recentActivities.map((act) => {
              const IconComp = act.icon;
              return (
                <div
                  key={act.id}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/70"
                >
                  <div className="p-2.5 rounded-xl flex-shrink-0 bg-stone-100 text-stone-900 border border-stone-200">
                    <IconComp className="w-4 h-4 text-[#9E866C]" />
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-stone-900">
                        {act.title}
                      </span>
                      <span className="text-[10px] text-stone-400 font-medium">
                        {act.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600">
                      {act.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 7. Quick Invoice Modal */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#9E866C]" />
                <h3 className="font-extrabold text-stone-900 text-base">فاتورة الطلب</h3>
              </div>
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="p-1 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">رقم الطلب:</span>
                <span className="font-mono font-bold text-stone-900">{selectedOrderForInvoice.orderNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">اسم العميل:</span>
                <span className="font-bold text-stone-900">{selectedOrderForInvoice.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">رقم الهاتف:</span>
                <span className="font-mono font-bold text-stone-900">{selectedOrderForInvoice.customerPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">المدينة / العنوان:</span>
                <span className="font-bold text-stone-900">{selectedOrderForInvoice.city}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">تاريخ الطلب:</span>
                <span className="font-bold text-stone-900">{selectedOrderForInvoice.createdAt}</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <div className="font-bold text-stone-800">تفاصيل المنتجات:</div>
                <div className="text-stone-600">{selectedOrderForInvoice.itemSummary}</div>
              </div>

              <div className="flex justify-between items-center pt-2 text-sm font-black">
                <span className="text-stone-900">المبلغ الإجمالي:</span>
                <span className="text-[#9E866C]">{selectedOrderForInvoice.total} ر.س</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                طباعة الفاتورة
              </button>
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
