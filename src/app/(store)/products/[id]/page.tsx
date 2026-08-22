import { notFound } from 'next/navigation';
import { getProductById, getProductsByCategory } from '@/lib/products';
import { ProductDetailsClient } from './ProductDetailsClient';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: 'المنتج غير متوفر' };

  return {
    title: `${product.name} | راقِي`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Related products from the same category
  const categoryProducts = await getProductsByCategory(product.category);
  const relatedProducts = categoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailsClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
