'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  MapPin,
  X,
  CreditCard,
  Calendar,
} from 'lucide-react';

interface OrderMock {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  district: string;
  street: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  items: {
    name: string;
    image: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

const initialOrders: OrderMock[] = [
  {
    id: '1',
    orderNumber: 'ORD-8921',
    customerName: 'عبدالله محمد الغامدي',
    customerPhone: '+966 50 123 4567',
    customerEmail: 'abdullah@example.com',
    city: 'الرياض',
    district: 'حي الملقا',
    street: 'شارع الأمير محمد بن سعد',
    date: '2026-08-20 12:45',
    status: 'pending',
    paymentMethod: 'الدفع عند الاستلام',
    subtotal: 850,
    shipping: 40,
    discount: 0,
    total: 890,
    items: [
      {
        name: 'بدلة كلاسيكية فاخرة سليم فيت',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
        size: '50',
        color: 'كحلي داكن',
        price: 850,
        quantity: 1,
      },
    ],
  },
  {
    id: '2',
    orderNumber: 'ORD-8920',
    customerName: 'سارة خالد العتيبي',
    customerPhone: '+966 55 987 6543',
    customerEmail: 'sara.o@example.com',
    city: 'جدة',
    district: 'حي الشاطئ',
    street: 'طريق الكورنيش',
    date: '2026-08-20 11:15',
    status: 'processing',
    paymentMethod: 'بطاقة ائتمانية (مدى)',
    subtotal: 340,
    shipping: 0,
    discount: 0,
    total: 340,
    items: [
      {
        name: 'فستان حريري مطرز بأكمام واسعة',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop',
        size: 'M',
        color: 'رملي',
        price: 340,
        quantity: 1,
      },
    ],
  },
  {
    id: '3',
    orderNumber: 'ORD-8919',
    customerName: 'خالد المنصور',
    customerPhone: '+966 54 333 2211',
    customerEmail: 'khaled.m@example.com',
    city: 'الدمام',
    district: 'حي الفاخرية',
    street: 'شارع الملك سعود',
    date: '2026-08-20 09:30',
    status: 'shipped',
    paymentMethod: 'أبل باي (Apple Pay)',
    subtotal: 1450,
    shipping: 0,
    discount: 100,
    total: 1350,
    items: [
      {
        name: 'قميص كتان بيج كلاسيكي',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
        size: 'L',
        color: 'بيج',
        price: 280,
        quantity: 2,
      },
      {
        name: 'بنطال قطن قماش إيطالي',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop',
        size: '34',
        color: 'زيتي',
        price: 445,
        quantity: 2,
      },
    ],
  },
  {
    id: '4',
    orderNumber: 'ORD-8918',
    customerName: 'نورة الشمري',
    customerPhone: '+966 56 777 8899',
    customerEmail: 'noura@example.com',
    city: 'الرياض',
    district: 'حي النرجس',
    street: 'طريق عثمان بن عفان',
    date: '2026-08-19 18:20',
    status: 'delivered',
    paymentMethod: 'بطاقة ائتمانية',
    subtotal: 620,
    shipping: 0,
    discount: 50,
    total: 570,
    items: [
      {
        name: 'عباية كريب بقصة ملكية فاخرة',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
        size: '56',
        color: 'أسود فحمي',
        price: 620,
        quantity: 1,
      },
    ],
  },
];

const statusConfig: Record<string, { label: string; bg: string; icon: any }> = {
  pending: {
    label: 'جديد (بانتظار التأكيد)',
    bg: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Clock,
  },
  processing: {
    label: 'قيد التجهيز',
    bg: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Package,
  },
  shipped: {
    label: 'تم الشحن',
    bg: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: Truck,
  },
  delivered: {
    label: 'تم التوصيل بنجاح',
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'ملغي',
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: XCircle,
  },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderMock[]>(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderMock | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);
    const matchesStatus =
      selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (
    orderId: string,
    newStatus: OrderMock['status']
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900">إدارة الطلبات</h2>
          <p className="text-xs text-stone-500 mt-1">
            متابعة وتحديث حالات طلبات العملاء والشحن
          </p>
        </div>

        {/* Quick Summary Badges */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
            1 جديد
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            1 قيد التجهيز
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold">
            1 مشحون
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث برقم الطلب، العميل، الهاتف..."
            className="w-full pl-4 pr-10 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-800"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'pending', label: 'جديد' },
            { id: 'processing', label: 'قيد التجهيز' },
            { id: 'shipped', label: 'مشحون' },
            { id: 'delivered', label: 'تم التوصيل' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                selectedStatus === tab.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 font-bold uppercase">
                <th className="py-4 px-4 sm:px-6">رقم الطلب</th>
                <th className="py-4 px-4">العميل</th>
                <th className="py-4 px-4">المدينة</th>
                <th className="py-4 px-4">التاريخ</th>
                <th className="py-4 px-4">طريقة الدفع</th>
                <th className="py-4 px-4">الإجمالي</th>
                <th className="py-4 px-4">الحالة</th>
                <th className="py-4 px-4 sm:px-6 text-left">التفاصيل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-400">
                    لا توجد طلبات مطابقة للبحث
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const conf = statusConfig[order.status];
                  const Icon = conf.icon;
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-stone-50/70 transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900 font-mono">
                        {order.orderNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900">
                          {order.customerName}
                        </div>
                        <div className="text-[11px] text-stone-400">
                          {order.customerPhone}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-stone-600">
                        {order.city}
                      </td>
                      <td className="py-3.5 px-4 text-stone-500">{order.date}</td>
                      <td className="py-3.5 px-4 text-stone-600">
                        {order.paymentMethod}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-stone-900">
                        {order.total} ر.س
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${conf.bg}`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {conf.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-left">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          معاينة
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#9E866C]/10 text-[#9E866C]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-900">
                    تفاصيل الطلب {selectedOrder.orderNumber}
                  </h3>
                  <p className="text-xs text-stone-400">{selectedOrder.date}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Status Changer */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-stone-500 mb-1">
                    تغيير حالة الطلب:
                  </div>
                  <div className="text-sm font-extrabold text-stone-900">
                    {statusConfig[selectedOrder.status].label}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                          selectedOrder.status === st
                            ? 'bg-stone-900 text-white shadow-sm'
                            : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {statusConfig[st].label.split(' ')[0]}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="text-xs font-bold text-stone-400 uppercase">
                    بيانات العميل
                  </div>
                  <div className="font-bold text-stone-900">
                    {selectedOrder.customerName}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="text-xs font-bold text-stone-400 uppercase">
                    عنوان التوصيل
                  </div>
                  <div className="flex items-start gap-2 text-xs text-stone-800 font-semibold">
                    <MapPin className="w-4 h-4 text-[#9E866C] flex-shrink-0 mt-0.5" />
                    <div>
                      {selectedOrder.city} - {selectedOrder.district}
                      <br />
                      {selectedOrder.street}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-3">
                  المنتجات المطلوبة ({selectedOrder.items.length})
                </h4>
                <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white flex items-center gap-3"
                    >
                      <div className="relative w-14 h-14 rounded-xl bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-stone-900">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                          <span className="bg-stone-100 px-2 py-0.5 rounded">
                            المقاس: {item.size}
                          </span>
                          <span className="bg-stone-100 px-2 py-0.5 rounded">
                            اللون: {item.color}
                          </span>
                          <span>الكمية: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-xs font-extrabold text-stone-900">
                        {item.price * item.quantity} ر.س
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Summary */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold">{selectedOrder.subtotal} ر.س</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>تكلفة الشحن:</span>
                  <span className="font-bold">
                    {selectedOrder.shipping === 0
                      ? 'مجاني'
                      : `${selectedOrder.shipping} ر.س`}
                  </span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>خصم الكوبون:</span>
                    <span className="font-bold">
                      -{selectedOrder.discount} ر.س
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-black text-stone-900">
                  <span>الإجمالي الكلي:</span>
                  <span>{selectedOrder.total} ر.س</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors"
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
