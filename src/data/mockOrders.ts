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

export const MOCK_ORDERS: Order[] = [];
