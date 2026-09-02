import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/data/categories';
import { getProductsByCategory } from '@/lib/products';
import { ProductsListingView } from '@/components/products/ProductsListingView';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    sub?: string;
    view?: string;
    subcategory?: string;
  }>;
}

export async function generateStaticParams() {
  // Categories are fixed — safe to pre-generate
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const { sub, subcategory } = resolvedSearchParams;

  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Fetch products from DB
  const categoryProducts = await getProductsByCategory(slug);

  // If a subcategory hub is selected
  let initialSubcategories: string[] = [];
  let activeHubTitle: string | undefined;

  if (sub && category.hubItems) {
    const selectedHub = category.hubItems.find((h) => h.slug === sub);
    if (selectedHub) {
      initialSubcategories = selectedHub.matchingSubcategories;
      activeHubTitle = selectedHub.name;
    }
  } else if (subcategory) {
    initialSubcategories = [subcategory];
    activeHubTitle = subcategory;
  }

  return (
    <ProductsListingView
      initialProducts={categoryProducts}
      title={category.name}
      description={category.description}
      categorySlug={slug}
      subcategoriesList={category.subcategories}
      initialSubcategories={initialSubcategories}
      activeHubTitle={activeHubTitle}
      hasHub={false}
    />
  );
}

