'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  Loader2,
} from 'lucide-react';
import { Product } from '@/types/product';

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_SECRET!;

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load products from DB on mount
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProductsList(data.products ?? []);
    } catch (err) {
      setError('تعذّر تحميل المنتجات. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'men',
    subcategory: '',
    price: '',
    oldPrice: '',
    sku: '',
    inStock: true,
    isBestSeller: false,
    isNew: true,
    description: '',
    material: 'قطن 100% طبيعي',
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
  });

  // Filter products
  const filteredProducts = productsList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'men',
      subcategory: 'قمصان',
      price: '',
      oldPrice: '',
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      inStock: true,
      isBestSeller: false,
      isNew: true,
      description: '',
      material: 'خامات طبيعية فاخرة',
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
      sizes: ['S', 'M', 'L', 'XL'],
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price.toString(),
      oldPrice: product.oldPrice ? product.oldPrice.toString() : '',
      sku: product.sku,
      inStock: product.inStock,
      isBestSeller: product.isBestSeller ?? false,
      isNew: product.isNew ?? false,
      description: product.description,
      material: product.material,
      imageUrl: product.images[0] || '',
      sizes: product.sizes,
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج؟ سيتم إخفاؤه من المتجر.')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': ADMIN_KEY },
      });
      if (!res.ok) throw new Error('Failed to delete');
      setProductsList((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('تعذّر حذف المنتج. حاول مرة أخرى.');
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    setIsSaving(true);

    try {
      if (editingProduct) {
        // PATCH — update existing product
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
          body: JSON.stringify({
            name: formData.name,
            categorySlug: formData.category,
            subcategory: formData.subcategory,
            price: parseFloat(formData.price),
            oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
            sku: formData.sku,
            description: formData.description,
            material: formData.material,
            images: [formData.imageUrl],
            inStock: formData.inStock,
            isNew: formData.isNew,
            isBestSeller: formData.isBestSeller,
            sizes: formData.sizes,
          }),
        });
        if (!res.ok) throw new Error('Failed to update');
        const { product } = await res.json();
        setProductsList((prev) => prev.map((p) => (p.id === editingProduct.id ? product : p)));
      } else {
        // POST — create new product
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
          body: JSON.stringify({
            name: formData.name,
            categorySlug: formData.category,
            subcategory: formData.subcategory || 'عام',
            price: parseFloat(formData.price),
            oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
            sku: formData.sku || `SKU-${Date.now().toString().slice(-6)}`,
            description: formData.description || 'منتج عصري فائق الجودة والأناقة.',
            shortDescription: 'تصميم راقٍ ومريح.',
            material: formData.material,
            images: [formData.imageUrl],
            colors: [{ name: 'أسود', hex: '#1C1917' }, { name: 'بيج', hex: '#D2B48C' }],
            sizes: formData.sizes,
            inStock: formData.inStock,
            isNew: formData.isNew,
            isBestSeller: formData.isBestSeller,
            featured: false,
          }),
        });
        if (!res.ok) throw new Error('Failed to create');
        const { product } = await res.json();
        setProductsList((prev) => [product, ...prev]);
      }
      setIsModalOpen(false);
    } catch {
      alert('حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Banner */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900">إدارة المنتجات</h2>
          <p className="text-xs text-stone-500 mt-1">
            {isLoading ? 'جارٍ التحميل...' : `إجمالي ${productsList.length} منتج في قاعدة البيانات`}
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9E866C] hover:bg-[#8b755d] text-white text-sm font-bold rounded-xl shadow-md shadow-[#9E866C]/20 transition-all hover:scale-105 active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          إضافة منتج جديد
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم أو كود SKU..."
            className="w-full pl-4 pr-10 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white transition-all text-stone-800"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${selectedCategory === 'all'
              ? 'bg-stone-900 text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
          >
            الكل ({productsList.length})
          </button>
          <button
            onClick={() => setSelectedCategory('men')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${selectedCategory === 'men'
              ? 'bg-stone-900 text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
          >
            رجالي
          </button>
          <button
            onClick={() => setSelectedCategory('women')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${selectedCategory === 'women'
              ? 'bg-stone-900 text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
          >
            نسائي
          </button>
          <button
            onClick={() => setSelectedCategory('kids')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${selectedCategory === 'kids'
              ? 'bg-stone-900 text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
          >
            أطفال
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-600 font-bold text-xs sm:text-sm">
                <th className="py-4 px-4 sm:px-6">المنتج</th>
                <th className="py-4 px-4">كود SKU</th>
                <th className="py-4 px-4">التصنيف</th>
                <th className="py-4 px-4">السعر</th>
                <th className="py-4 px-4">المخزون</th>
                <th className="py-4 px-4 sm:px-6 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-stone-400 mx-auto" />
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-stone-400">
                    لا توجد منتجات مطابقة لخيارات البحث
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-stone-50/70 transition-colors group"
                  >
                    {/* Product Image & Title */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-14 h-14 rounded-xl bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-stone-900 text-sm sm:text-base line-clamp-1 max-w-auto">
                            {product.name}
                          </p>
                          <p className="text-xs text-stone-400 font-medium mt-0.5">
                            {product.subcategory}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-4 px-4 font-mono font-medium text-stone-700 text-xs sm:text-sm">
                      {product.sku}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-lg bg-stone-100 text-stone-800 font-bold text-xs">
                        {product.category === 'men'
                          ? 'رجالي'
                          : product.category === 'women'
                            ? 'نسائي'
                            : 'أطفال'}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4">
                      <div className="font-black text-stone-900 text-sm sm:text-base">
                        {product.price} <span className="text-xs text-stone-500 font-bold">ر.س</span>
                      </div>
                      {product.oldPrice && (
                        <div className="text-xs text-stone-400 line-through mt-0.5">
                          {product.oldPrice} ر.س
                        </div>
                      )}
                    </td>

                    {/* Stock Status */}
                    <td className="py-4 px-4">
                      {product.inStock ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          متوفر
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-rose-700 font-bold text-xs bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          نفد
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                          title="تعديل"
                        >
                          <Edit2 className="w-4.5 h-4.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-lg font-black text-stone-900">
                {editingProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    اسم المنتج *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="مثال: قميص كتان بيج كلاسيكي"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    القسم الأساسي *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white"
                  >
                    <option value="men">ملابس رجالية</option>
                    <option value="women">ملابس نسائية</option>
                    <option value="kids">أطفال</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    النوع الفرعي
                  </label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) =>
                      setFormData({ ...formData, subcategory: e.target.value })
                    }
                    placeholder="مثال: قمصان، فساتين، بدل"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    السعر الحالي (ر.س) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="280"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    السعر قبل الخصم (اختياري)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.oldPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, oldPrice: e.target.value })
                    }
                    placeholder="350"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    كود المنتج (SKU)
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    placeholder="MEN-SHIRT-01"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    الخامة
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) =>
                      setFormData({ ...formData, material: e.target.value })
                    }
                    placeholder="قطن طبيعي 100%"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    رابط الصورة الرئيسية
                  </label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    وصف المنتج
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="وصف تفصيلي لمميزات المنتج ومناسباته..."
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E866C] focus:bg-white"
                  />
                </div>

                {/* Toggles */}
                <div className="sm:col-span-2 flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) =>
                        setFormData({ ...formData, inStock: e.target.checked })
                      }
                      className="rounded border-stone-300 text-[#9E866C] focus:ring-[#9E866C]"
                    />
                    متوفر في المخزون
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isBestSeller: e.target.checked,
                        })
                      }
                      className="rounded border-stone-300 text-[#9E866C] focus:ring-[#9E866C]"
                    />
                    الأكثر مبيعاً
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800">
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) =>
                        setFormData({ ...formData, isNew: e.target.checked })
                      }
                      className="rounded border-stone-300 text-[#9E866C] focus:ring-[#9E866C]"
                    />
                    وصل حديثاً
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-6 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#9E866C] hover:bg-[#8b755d] disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {editingProduct ? 'حفظ التعديلات' : 'إضافة المنتج'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
