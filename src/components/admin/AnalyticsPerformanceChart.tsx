'use client';

import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  LineChart as LineChartIcon,
  Layers,
  Sparkles,
  ArrowUpRight,
  Eye,
  DollarSign,
  ShoppingBag,
  CreditCard,
  Users,
} from 'lucide-react';

export interface DayData {
  label: string;
  revenue: number;
  orders: number;
  profit: number;
  heightRevenue?: string;
  heightOrders?: string;
  heightProfit?: string;
  isPeak?: boolean;
}

export type ChartType = 'area' | 'bar' | 'line' | 'composed';
export type ChartMetric = 'revenue' | 'profit' | 'orders' | 'all';

interface AnalyticsPerformanceChartProps {
  chartData: DayData[];
  title: string;
  timeframe: string;
}

export default function AnalyticsPerformanceChart({
  chartData,
  title,
}: AnalyticsPerformanceChartProps) {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [metric, setMetric] = useState<ChartMetric>('revenue');

  // Compute summary stats dynamically
  const stats = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return { totalRev: 0, totalProfit: 0, totalOrders: 0, maxPoint: null, avgRev: 0 };
    }

    let totalRev = 0;
    let totalProfit = 0;
    let totalOrders = 0;
    let maxPoint = chartData[0];

    chartData.forEach((item) => {
      totalRev += item.revenue;
      totalProfit += item.profit;
      totalOrders += item.orders;
      if (item.revenue > maxPoint.revenue) {
        maxPoint = item;
      }
    });

    const avgRev = Math.round(totalRev / chartData.length);
    const profitMargin = totalRev > 0 ? ((totalProfit / totalRev) * 100).toFixed(1) : '0';

    return { totalRev, totalProfit, totalOrders, maxPoint, avgRev, profitMargin };
  }, [chartData]);

  // Format currency in Arabic compact or full style
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  // Custom RTL & Glassmorphic Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0]?.payload as DayData;
    if (!data) return null;

    const aov = data.orders > 0 ? Math.round(data.revenue / data.orders) : 0;
    const margin = data.revenue > 0 ? ((data.profit / data.revenue) * 100).toFixed(0) : '0';

    return (
      <div className="bg-stone-900/95 backdrop-blur-xl border border-stone-700/70 text-white rounded-2xl p-4 shadow-2xl min-w-[240px] text-right z-50 transition-all">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2.5 mb-3">
          <span className="text-xs font-black text-stone-100">{label}</span>
          {data.isPeak && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              أعلى ذروة
            </span>
          )}
        </div>

        <div className="space-y-2 text-xs">
          {/* Revenue */}
          {(metric === 'revenue' || metric === 'all') && (
            <div className="flex items-center justify-between gap-3 bg-stone-800/60 p-2 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9E866C] ring-2 ring-[#9E866C]/30" />
                <span className="text-stone-300 font-medium">الإيرادات:</span>
              </div>
              <span className="font-black text-stone-100 dir-ltr">
                {data.revenue.toLocaleString('ar-SA')} ر.س
              </span>
            </div>
          )}

          {/* Net Profit */}
          {(metric === 'profit' || metric === 'all') && (
            <div className="flex items-center justify-between gap-3 bg-stone-800/60 p-2 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
                <span className="text-stone-300 font-medium">صافي الربح:</span>
              </div>
              <span className="font-black text-emerald-400 dir-ltr">
                {data.profit.toLocaleString('ar-SA')} ر.س
              </span>
            </div>
          )}

          {/* Orders */}
          {(metric === 'orders' || metric === 'all') && (
            <div className="flex items-center justify-between gap-3 bg-stone-800/60 p-2 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 ring-2 ring-indigo-400/30" />
                <span className="text-stone-300 font-medium">الطلبات:</span>
              </div>
              <span className="font-black text-indigo-300">
                {data.orders.toLocaleString('ar-SA')} طلب
              </span>
            </div>
          )}
        </div>

        {/* Micro KPI footnote */}
        <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-400 font-semibold">
          <span>متوسط السلة: <strong className="text-stone-200">{aov.toLocaleString('ar-SA')} ر.س</strong></span>
          <span>الهامش: <strong className="text-emerald-300">{margin}%</strong></span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-2 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#9E866C]/10 text-[#9E866C]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-stone-900">
                منحنى ومؤشرات الأداء التفاعلي ({title})
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                تتبع احترافي لحركة المبيعات، نمو الأرباح، وتدفق الطلبات بالوقت الفعلي
              </p>
            </div>
          </div>
        </div>

        {/* Controls Container */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Chart Type Selector */}
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setChartType('area')}
              title="مخطط مساحي انسيابي"
              className={`p-1.5 px-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                chartType === 'area'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>مساحي</span>
            </button>
            <button
              onClick={() => setChartType('bar')}
              title="مخطط أعمدة عصرية"
              className={`p-1.5 px-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                chartType === 'bar'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>أعمدة</span>
            </button>
            <button
              onClick={() => setChartType('line')}
              title="مخطط خطي تفصيلي"
              className={`p-1.5 px-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                chartType === 'line'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LineChartIcon className="w-3.5 h-3.5" />
              <span>خطي</span>
            </button>
            <button
              onClick={() => setChartType('composed')}
              title="مقارنة شاملة متداخلة"
              className={`p-1.5 px-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                chartType === 'composed'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>مزدوج</span>
            </button>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setMetric('revenue')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                metric === 'revenue'
                  ? 'bg-[#9E866C] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              الإيرادات
            </button>
            <button
              onClick={() => setMetric('profit')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                metric === 'profit'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              صافي الربح
            </button>
            <button
              onClick={() => setMetric('orders')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                metric === 'orders'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              عدد الطلبات
            </button>
            <button
              onClick={() => setMetric('all')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                metric === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              الكل معاً
            </button>
          </div>
        </div>
      </div>

      {/* Mini Performance Highlights Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50/80 p-3 rounded-2xl border border-stone-100">
        <div className="px-3 py-1.5 border-l border-stone-200/60 last:border-l-0">
          <div className="text-[11px] text-stone-400 font-bold">إجمالي إيراد الفترة</div>
          <div className="text-sm sm:text-base font-black text-stone-900">
            {stats.totalRev.toLocaleString('ar-SA')} <span className="text-xs text-[#9E866C] font-bold">ر.س</span>
          </div>
        </div>
        <div className="px-3 py-1.5 border-l border-stone-200/60 last:border-l-0">
          <div className="text-[11px] text-stone-400 font-bold">صافي الأرباح المحققة</div>
          <div className="text-sm sm:text-base font-black text-emerald-700">
            {stats.totalProfit.toLocaleString('ar-SA')} <span className="text-xs text-emerald-600 font-bold">ر.س</span>
          </div>
        </div>
        <div className="px-3 py-1.5 border-l border-stone-200/60 last:border-l-0">
          <div className="text-[11px] text-stone-400 font-bold">إجمالي الطلبات المكتملة</div>
          <div className="text-sm sm:text-base font-black text-indigo-950">
            {stats.totalOrders.toLocaleString('ar-SA')} <span className="text-xs text-indigo-600 font-bold">طلب</span>
          </div>
        </div>
        <div className="px-3 py-1.5">
          <div className="text-[11px] text-stone-400 font-bold flex items-center gap-1">
            <span>ذروة الأداء</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          </div>
          <div className="text-sm sm:text-base font-black text-amber-900 truncate">
            {stats.maxPoint?.label || '—'} ({stats.maxPoint?.revenue.toLocaleString('ar-SA')} ر.س)
          </div>
        </div>
      </div>

      {/* Main Interactive Recharts Area */}
      <div className="h-[330px] sm:h-[360px] w-full pt-3" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData} margin={{ top: 15, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9E866C" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#9E866C" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tick={{ fill: '#78716c', fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                tick={{ fill: '#a8a29e', fontSize: 11, fontWeight: 500 }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              {(metric === 'revenue' || metric === 'all') && (
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="الإيرادات"
                  stroke="#9E866C"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  activeDot={{ r: 6, fill: '#9E866C', stroke: '#ffffff', strokeWidth: 2 }}
                />
              )}
              {(metric === 'profit' || metric === 'all') && (
                <Area
                  type="monotone"
                  dataKey="profit"
                  name="صافي الربح"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                  activeDot={{ r: 6, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                />
              )}
              {(metric === 'orders' || metric === 'all') && (
                <Area
                  type="monotone"
                  dataKey="orders"
                  name="عدد الطلبات"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                  activeDot={{ r: 6, fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2 }}
                />
              )}
            </AreaChart>
          ) : chartType === 'bar' ? (
            <BarChart data={chartData} margin={{ top: 15, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tick={{ fill: '#78716c', fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                tick={{ fill: '#a8a29e', fontSize: 11, fontWeight: 500 }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              {(metric === 'revenue' || metric === 'all') && (
                <Bar
                  dataKey="revenue"
                  name="الإيرادات"
                  fill="#9E866C"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={48}
                />
              )}
              {(metric === 'profit' || metric === 'all') && (
                <Bar
                  dataKey="profit"
                  name="صافي الربح"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={48}
                />
              )}
              {(metric === 'orders' || metric === 'all') && (
                <Bar
                  dataKey="orders"
                  name="الطلبات"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={48}
                />
              )}
            </BarChart>
          ) : chartType === 'line' ? (
            <LineChart data={chartData} margin={{ top: 15, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tick={{ fill: '#78716c', fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                tick={{ fill: '#a8a29e', fontSize: 11, fontWeight: 500 }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              {(metric === 'revenue' || metric === 'all') && (
                <Line
                  type="natural"
                  dataKey="revenue"
                  name="الإيرادات"
                  stroke="#9E866C"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#9E866C', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, fill: '#9E866C', stroke: '#fff', strokeWidth: 3 }}
                />
              )}
              {(metric === 'profit' || metric === 'all') && (
                <Line
                  type="natural"
                  dataKey="profit"
                  name="صافي الربح"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, fill: '#10b981', stroke: '#fff', strokeWidth: 3 }}
                />
              )}
              {(metric === 'orders' || metric === 'all') && (
                <Line
                  type="natural"
                  dataKey="orders"
                  name="عدد الطلبات"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, fill: '#6366f1', stroke: '#fff', strokeWidth: 3 }}
                />
              )}
            </LineChart>
          ) : (
            <ComposedChart data={chartData} margin={{ top: 15, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorComposedRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9E866C" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#9E866C" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tick={{ fill: '#78716c', fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                tick={{ fill: '#a8a29e', fontSize: 11, fontWeight: 500 }}
                width={40}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}`}
                tick={{ fill: '#818cf8', fontSize: 11, fontWeight: 500 }}
                width={35}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="الإيرادات"
                fill="url(#colorComposedRev)"
                stroke="#9E866C"
                strokeWidth={2.5}
              />
              <Bar
                yAxisId="left"
                dataKey="profit"
                name="صافي الربح"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                maxBarSize={36}
                opacity={0.85}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                name="الطلبات"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend & Quick Color Tags */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-3 border-t border-stone-100 text-xs font-bold text-stone-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-[#9E866C]" />
          <span>الإيرادات الإجمالية (ر.س)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-emerald-500" />
          <span>صافي الأرباح (ر.س)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-indigo-500" />
          <span>الطلبات المنجزة</span>
        </div>
        <div className="flex items-center gap-2 text-stone-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>نقاط الذروة والارتفاعات</span>
        </div>
      </div>

      {/* Strategic Insights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-stone-400 font-bold">فترة الذروة الشرائية</div>
            <div className="text-sm font-black text-stone-900">نهاية الأسبوع (الخميس والجمعة)</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#9E866C]/20 text-[#9E866C] font-bold shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-stone-400 font-bold">أعلى وسيلة دفع استخداماً</div>
            <div className="text-sm font-black text-stone-900">Apple Pay و مدى (82%)</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-800 font-bold shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-stone-400 font-bold">نسبة تكرار الشراء</div>
            <div className="text-sm font-black text-stone-900">36% عملاء عائدون (Loyal)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
