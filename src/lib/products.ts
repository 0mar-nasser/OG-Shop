import prisma from './prisma';
import { Prisma } from '@prisma/client';
import { Product, CategorySlug } from '@/types/product';

// ─── Type helper ────────────────────────────────────────────────
type DbProduct = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

/** Map a Prisma DB row to the frontend Product type */
function mapProduct(p: DbProduct): Product {
  return {
    id: p.id,
    name: p.name,
    category: p.category.slug as CategorySlug,
    categoryName: p.category.name,
    subcategory: p.subcategory,
    price: p.price,
    oldPrice: p.oldPrice ?? undefined,
    discount: p.discount ?? undefined,
    images: p.images,
    colors: p.colors as { name: string; hex: string }[],
    sizes: p.sizes,
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    description: p.description,
    shortDescription: p.shortDescription,
    material: p.material,
    careInstructions: p.careInstructions,
    inStock: p.inStock,
    isNew: p.isNew,
    isBestSeller: p.isBestSeller,
    featured: p.featured,
    sku: p.sku,
  };
}

const INCLUDE_CATEGORY = { include: { category: true } } as const;

// ─── Read Queries ────────────────────────────────────────────────

/** جلب كل المنتجات النشطة */
export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    ...INCLUDE_CATEGORY,
  });
  return products.map(mapProduct);
}

/** جلب منتج واحد بالـ id */
export async function getProductById(id: string): Promise<Product | null> {
  const p = await prisma.product.findFirst({
    where: { id, isActive: true },
    ...INCLUDE_CATEGORY,
  });
  return p ? mapProduct(p) : null;
}

/** جلب منتج واحد بالـ slug */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const p = await prisma.product.findFirst({
    where: { slug, isActive: true },
    ...INCLUDE_CATEGORY,
  });
  return p ? mapProduct(p) : null;
}

/** جلب منتجات فئة معينة */
export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  if (categorySlug === 'sale') {
    const products = await prisma.product.findMany({
      where: { isActive: true, discount: { gt: 0 } },
      orderBy: { discount: 'desc' },
      ...INCLUDE_CATEGORY,
    });
    return products.map(mapProduct);
  }

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: { slug: categorySlug },
    },
    orderBy: { createdAt: 'desc' },
    ...INCLUDE_CATEGORY,
  });
  return products.map(mapProduct);
}

/** جلب الـ Best Sellers */
export async function getBestSellerProducts(limit = 8): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { isActive: true, isBestSeller: true },
    take: limit,
    orderBy: { rating: 'desc' },
    ...INCLUDE_CATEGORY,
  });
  return products.map(mapProduct);
}

/** جلب المنتجات الجديدة */
export async function getNewProducts(limit = 4): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { isActive: true, isNew: true },
    take: limit,
    orderBy: { createdAt: 'desc' },
    ...INCLUDE_CATEGORY,
  });
  return products.map(mapProduct);
}

/** جلب المنتجات المميزة */
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { isActive: true, featured: true },
    take: limit,
    orderBy: { rating: 'desc' },
    ...INCLUDE_CATEGORY,
  });
  return products.map(mapProduct);
}

/** بحث داخل قاعدة البيانات مع فلاتر اختيارية */
export async function searchProducts(params: {
  q?: string;
  category?: string;
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}): Promise<Product[]> {
  const { q, category, featured, isNew, isBestSeller } = params;

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(featured !== undefined && { featured }),
    ...(isNew !== undefined && { isNew }),
    ...(isBestSeller !== undefined && { isBestSeller }),
    ...(category && category !== 'all' && {
      category: { slug: category },
    }),
    ...(q && q.trim() && {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { subcategory: { contains: q, mode: 'insensitive' } },
        { material: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
      ],
    }),
  };

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    ...INCLUDE_CATEGORY,
  });
  return products.map(mapProduct);
}

// ─── Write Queries (Admin) ───────────────────────────────────────

export interface CreateProductInput {
  name: string;
  categorySlug: string;
  subcategory: string;
  price: number;
  oldPrice?: number;
  sku: string;
  description: string;
  shortDescription?: string;
  material: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  featured?: boolean;
}

export async function createProduct(data: CreateProductInput): Promise<Product> {
  // Find category by slug
  const category = await prisma.category.findUnique({
    where: { slug: data.categorySlug },
  });
  if (!category) throw new Error(`Category "${data.categorySlug}" not found`);

  const discount =
    data.oldPrice && data.oldPrice > data.price
      ? Math.round(((data.oldPrice - data.price) / data.oldPrice) * 100)
      : undefined;

  const p = await prisma.product.create({
    data: {
      name: data.name,
      categoryId: category.id,
      subcategory: data.subcategory,
      price: data.price,
      oldPrice: data.oldPrice ?? null,
      discount: discount ?? null,
      sku: data.sku,
      description: data.description,
      shortDescription: data.shortDescription ?? '',
      material: data.material,
      images: data.images,
      colors: data.colors,
      sizes: data.sizes,
      inStock: data.inStock,
      isNew: data.isNew,
      isBestSeller: data.isBestSeller,
      featured: data.featured ?? false,
      isActive: true,
    },
    ...INCLUDE_CATEGORY,
  });
  return mapProduct(p);
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  inStock?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  featured?: boolean;
  isActive?: boolean;
}

export async function updateProduct(
  id: string,
  data: UpdateProductInput
): Promise<Product> {
  let categoryId: string | undefined;
  if (data.categorySlug) {
    const category = await prisma.category.findUnique({
      where: { slug: data.categorySlug },
    });
    if (!category) throw new Error(`Category "${data.categorySlug}" not found`);
    categoryId = category.id;
  }

  const discount =
    data.oldPrice !== undefined && data.price !== undefined && data.oldPrice > data.price
      ? Math.round(((data.oldPrice - data.price) / data.oldPrice) * 100)
      : undefined;

  const p = await prisma.product.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(categoryId && { categoryId }),
      ...(data.subcategory !== undefined && { subcategory: data.subcategory }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.oldPrice !== undefined && { oldPrice: data.oldPrice }),
      ...(discount !== undefined && { discount }),
      ...(data.sku && { sku: data.sku }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
      ...(data.material !== undefined && { material: data.material }),
      ...(data.images && { images: data.images }),
      ...(data.colors && { colors: data.colors }),
      ...(data.sizes && { sizes: data.sizes }),
      ...(data.inStock !== undefined && { inStock: data.inStock }),
      ...(data.isNew !== undefined && { isNew: data.isNew }),
      ...(data.isBestSeller !== undefined && { isBestSeller: data.isBestSeller }),
      ...(data.featured !== undefined && { featured: data.featured }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    },
    ...INCLUDE_CATEGORY,
  });
  return mapProduct(p);
}

/** Soft delete — يخفي المنتج من المتجر ويحفظ بياناته */
export async function deactivateProduct(id: string): Promise<void> {
  await prisma.product.update({
    where: { id },
    data: { isActive: false },
  });
}

/** Hard delete — يحذف المنتج نهائياً (للأدمن فقط) */
export async function deleteProduct(id: string): Promise<void> {
  await prisma.product.delete({ where: { id } });
}

// ─── Admin Queries (all products incl. inactive) ─────────────────

export async function getAllProductsAdmin(): Promise<
  (Product & { isActive: boolean })[]
> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    ...INCLUDE_CATEGORY,
  });
  return products.map((p) => ({
    ...mapProduct(p),
    isActive: p.isActive,
  }));
}
