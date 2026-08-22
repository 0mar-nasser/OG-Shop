'use client';

import React, { useState } from 'react';
import { Users, Search, Mail, Phone, ShoppingBag, Eye } from 'lucide-react';

const mockCustomers = [
  {
    id: 'CUST-101',
    name: 'عبدالله محمد الغامدي',
    email: 'abdullah@example.com',
    phone: '+966 50 123 4567',
    city: 'الرياض',
    ordersCount: 5,
    totalSpent: 3420,
    registeredDate: '2026-01-12',
  },
  {
    id: 'CUST-102',
    name: 'سارة خالد العتيبي',
    email: 'sara.o@example.com',
    phone: '+966 55 987 6543',
    city: 'جدة',
    ordersCount: 3,
    totalSpent: 1850,
    registeredDate: '2026-02-05',
  },
  {
    id: 'CUST-103',
    name: 'خالد المنصور',
    email: 'khaled.m@example.com',
    phone: '+966 54 333 2211',
    city: 'الدمام',
    ordersCount: 8,
    totalSpent: 7200,
    registeredDate: '2025-11-20',
  },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');

  const filtered = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900">إدارة العملاء</h2>
          <p className="text-xs text-stone-500 mt-1">
            سجل العملاء المسجلين والنشاط الشرائي
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث باسم العميل أو البريد أو المدينة..."
            className="w-full pl-4 pr-10 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-800"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 font-bold uppercase">
                <th className="py-4 px-4 sm:px-6">العميل</th>
                <th className="py-4 px-4">رقم الجوال</th>
                <th className="py-4 px-4">المدينة</th>
                <th className="py-4 px-4">عدد الطلبات</th>
                <th className="py-4 px-4">إجمالي الإنفاق</th>
                <th className="py-4 px-4">تاريخ الانضمام</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-stone-50/70">
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="font-bold text-stone-900">
                      {customer.name}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {customer.email}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 font-mono">
                    {customer.phone}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">{customer.city}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 bg-stone-100 rounded-lg font-bold text-stone-800">
                      {customer.ordersCount} طلبات
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-stone-900">
                    {customer.totalSpent} ر.س
                  </td>
                  <td className="py-3.5 px-4 text-stone-400">
                    {customer.registeredDate}
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
