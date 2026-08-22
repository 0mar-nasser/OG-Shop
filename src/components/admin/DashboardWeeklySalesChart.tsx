'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  ChevronLeft,
  Sparkles,
  Layers,
  Calendar,
} from 'lucide-react';

export interface WeeklySalesItem {
  day: string;
  sales: number;
  orders: number;
  height?: string;
  isPeak?: boolean;
  isToday?: boolean;
}

interface DashboardWeeklySalesChartProps {
  data: WeeklySalesItem[];
}

export default function DashboardWeeklySalesChart({ data }: DashboardWeeklySalesChartProps) {
  const [metric, setMetric] = useState<'sales' | 'orders' | 'both'>('sales');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  const stats = useMemo(() => {
    let totalSales = 0;
    let totalOrders = 0;
    let peakDay = data[0];

    data.forEach((item) => {
      totalSales += item.sales;
      totalOrders += item.orders;
      if (item.sales > (peakDay?.sales || 0)) {
        peakDay = item;
      }
    });

    const avgDailySales = Math.round(totalSales / (data.length || 1));

    return { totalSales, totalOrders, peakDay, avgDailySales };
  }, [data]);

  const formatYAxis = (val: number) => {
    if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
    return val.toString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    const item = payload[0]?.payload as WeeklySalesItem;
    if (!item) return null;

    const avgOrder = item.orders > 0 ? Math.round(item.sales / item.orders) : 0;

    return (
      <div className="bg-stone-900/95 backdrop-blur-xl border border-stone-800 text-white rounded-2xl p-3.5 shadow-2xl min-w-[210px] text-right z-50">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-2.5">
          <span className="text-xs font-black text-stone-200">{label}</span>
          {item.isToday && (
            <span className="text-[10px] font-bold bg-[#9E866C]/30 text-[#D7C4B7] px-2 py-0.5 rounded-full border border-[#9E866C]/40">
              اليوم الحالي
            </span>
          )}
          {item.isPeak && !item.isToday && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              أعلى ذروة
            </span>
          )}
        </div>

        <div className="space-y-1.5 text-xs">
          {(metric === 'sales' || metric === 'both') && (
            <div className="flex items-center justify-between gap-3 bg-stone-800/60 p-1.5 px-2 rounded-xl">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#9E866C]" />
                <span className="text-stone-300">المبيعات:</span>
              </div>
              <span className="font-black text-stone-100 dir-ltr">
                {item.sales.toLocaleString('ar-SA')} ر.س
              </span>
            </div>
          )}

          {(metric === 'orders' || metric === 'both') && (
            <div className="flex items-center justify-between gap-3 bg-stone-800/60 p-1.5 px-2 rounded-xl">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-stone-300">الطلبات:</span>
              </div>
              <span className="font-black text-indigo-300">
                {item.orders.toLocaleString('ar-SA')} طلب
              </span>
            </div>
          )}
        </div>

        <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-400">
          <span>متوسط قيمة الطلب:</span>
          <span className="font-bold text-stone-200">{avgOrder.toLocaleString('ar-SA')} ر.س</span>
        </div>
      </div>
    );
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header with Title & Metric Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-[#9E866C]/10 text-[#9E866C]">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base text-stone-900">
              تحليل المبيعات الأسبوعية
            </h3>
          </div>
          <p className="text-xs text-stone-400 mt-0.5">
            متابعة حركة المبيعات وتدفق الإيرادات اليومية بالوقت الفعلي
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-xl text-xs font-bold">
            <button
              onClick={() => setChartType('area')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                chartType === 'area'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="عرض مساحي"
            >
              <TrendingUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                chartType === 'bar'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="عرض أعمدة"
            >
              <BarChart3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Metric Selector */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-xl text-xs font-bold">
            <button
              onClick={() => setMetric('sales')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                metric === 'sales'
                  ? 'bg-[#9E866C] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              المبيعات
            </button>
            <button
              onClick={() => setMetric('orders')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                metric === 'orders'
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              الطلبات
            </button>
            <button
              onClick={() => setMetric('both')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                metric === 'both'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              معاً
            </button>
          </div>

          <Link
            href="/admin/analytics"
            className="text-xs font-bold text-[#9E866C] hover:underline inline-flex items-center gap-1 mr-1"
          >
            التقرير الكامل
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Interactive Recharts */}
      <div className="h-64 w-full pt-2" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          {metric === 'both' ? (
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSalesDash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9E866C" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#9E866C" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={{ stroke: '#e7e5e4' }}
                tick={{ fill: '#78716c', fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                tick={{ fill: '#a8a29e', fontSize: 10 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}`}
                tick={{ fill: '#818cf8', fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                name="المبيعات"
                stroke="#9E866C"
                strokeWidth={2.5}
                fill="url(#colorSalesDash)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                name="الطلبات"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
              />
            </ComposedChart>
          ) : chartType === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSalesArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9E866C" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#9E866C" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="colorOrdersArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={{ stroke: '#e7e5e4' }}
                tick={{ fill: '#78716c', fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={metric === 'sales' ? formatYAxis : (v) => `${v}`}
                tick={{ fill: '#a8a29e', fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              {metric === 'sales' ? (
                <Area
                  type="monotone"
                  dataKey="sales"
                  name="المبيعات"
                  stroke="#9E866C"
                  strokeWidth={2.5}
                  fill="url(#colorSalesArea)"
                  activeDot={{ r: 6, fill: '#9E866C', stroke: '#ffffff', strokeWidth: 2 }}
                />
              ) : (
                <Area
                  type="monotone"
                  dataKey="orders"
                  name="الطلبات"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#colorOrdersArea)"
                  activeDot={{ r: 6, fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2 }}
                />
              )}
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={{ stroke: '#e7e5e4' }}
                tick={{ fill: '#78716c', fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={metric === 'sales' ? formatYAxis : (v) => `${v}`}
                tick={{ fill: '#a8a29e', fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              {metric === 'sales' ? (
                <Bar
                  dataKey="sales"
                  name="المبيعات"
                  fill="#9E866C"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={44}
                />
              ) : (
                <Bar
                  dataKey="orders"
                  name="الطلبات"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={44}
                />
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Highlights Footer */}
      <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
          <div className="text-[10px] text-stone-400 font-bold">أعلى يوم مبيعاً</div>
          <div className="text-xs sm:text-sm font-black text-stone-900 truncate">
            {stats.peakDay?.day || 'الخميس'} ({stats.peakDay?.sales.toLocaleString('ar-SA')} ر.س)
          </div>
        </div>
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
          <div className="text-[10px] text-stone-400 font-bold">متوسط اليوم</div>
          <div className="text-xs sm:text-sm font-black text-[#9E866C]">
            {stats.avgDailySales.toLocaleString('ar-SA')} ر.س / يوم
          </div>
        </div>
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
          <div className="text-[10px] text-stone-400 font-bold">نمو المبيعات</div>
          <div className="text-xs sm:text-sm font-black text-emerald-700">
            +18.4% ↗
          </div>
        </div>
      </div>
    </div>
  );
}
