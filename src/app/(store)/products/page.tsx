import { getProducts } from '@/lib/products';
import { ProductsListingView } from '@/components/products/ProductsListingView';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'جميع المنتجات والأزياء | راقِي',
  description:
    'استكشف تشكيلة راقِي الكاملة من الملابس الرجالية، النسائية، الأطفال والأحذية والإكسسوارات الفاخرة.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  const allSubcategories = Array.from(
    new Set(products.map((p) => p.subcategory).filter(Boolean))
  );

  return (
    <ProductsListingView
      initialProducts={products}
      title="جميع المنتجات والتشكيلات"
      description="تصفح كافة القطع المنتقاة بعناية، المصنوعة من أفخر الخامات الطبيعية لتمنحك إطلالة راقية في كل مناسبة."
      subcategoriesList={allSubcategories}
    />
  );
}
