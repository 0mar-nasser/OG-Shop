import { Order, Address } from '@/types/order';

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    title: 'المنزل (الرئيسي)',
    fullName: 'عمر الأحمد',
    phone: '+971 50 123 4567',
    city: 'دبي',
    district: 'وسط مدينة دبي',
    street: 'شارع بوليفارد الشيخ محمد بن راشد',
    building: 'برج الأناقة، شقة 1402',
    isDefault: true
  },
  {
    id: 'addr-2',
    title: 'مقر العمل',
    fullName: 'عمر الأحمد',
    phone: '+971 50 123 4567',
    city: 'دبي',
    district: 'مركز دبي المالي العالمي (DIFC)',
    street: 'شارع السعادة',
    building: 'برج البوابة، الطابق 8',
    isDefault: false
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ORD-2026-9842',
    date: '14 أغسطس 2026',
    status: 'delivered',
    statusText: 'تم التوصيل بنجاح',
    items: [
      {
        id: 'men-01',
        name: 'قميص كتان بيج كلاسيكي بقصة مريحة',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop',
        size: 'L',
        color: 'بيج رملي',
        price: 185,
        quantity: 1
      },
      {
        id: 'women-01',
        name: 'فستان ميدي قطني بطيات ناعمة وحزام خصر',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=400&auto=format&fit=crop',
        size: 'M',
        color: 'أوف وايت عاجي',
        price: 245,
        quantity: 1
      }
    ],
    subtotal: 475,
    shipping: 0,
    discount: 47.5,
    total: 427.5,
    paymentMethod: 'بطاقة مدى / فيزا (تنتهي بـ 4128)',
    shippingAddress: MOCK_ADDRESSES[0],
    trackingNumber: 'TRK-98420182-AE',
    estimatedDelivery: '16 أغسطس 2026'
  },
  {
    id: 'ord-1002',
    orderNumber: 'ORD-2026-9915',
    date: '16 أغسطس 2026',
    status: 'processing',
    statusText: 'قيد التجهيز والشحن',
    items: [
      {
        id: 'women-01',
        name: 'فستان ميدي كريب بحزام خصر وأكمام واسعة',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=400&auto=format&fit=crop',
        size: 'M',
        color: 'وردي ترابي',
        price: 320,
        quantity: 1
      }
    ],
    subtotal: 320,
    shipping: 0,
    discount: 0,
    total: 320,
    paymentMethod: 'الدفع عند الاستلام',
    shippingAddress: MOCK_ADDRESSES[0],
    trackingNumber: 'TRK-99150331-AE',
    estimatedDelivery: '19 أغسطس 2026'
  }
];
