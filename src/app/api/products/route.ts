import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { searchProducts, createProduct } from '@/lib/products';

// ─── GET /api/products ───────────────────────────────────────────
// Supports: ?q=&category=&featured=&isNew=&isBestSeller=
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const q = searchParams.get('q') ?? undefined;
    const category = searchParams.get('category') ?? undefined;
    const featured = searchParams.has('featured')
      ? searchParams.get('featured') === 'true'
      : undefined;
    const isNew = searchParams.has('isNew')
      ? searchParams.get('isNew') === 'true'
      : undefined;
    const isBestSeller = searchParams.has('isBestSeller')
      ? searchParams.get('isBestSeller') === 'true'
      : undefined;

    const products = await searchProducts({ q, category, featured, isNew, isBestSeller });
    return NextResponse.json({ products });
  } catch (error) {
    console.error('[GET /api/products]', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// ─── POST /api/products (Admin only) ────────────────────────────
export async function POST(request: NextRequest) {
  // Admin protection
  const adminKey = request.headers.get('x-admin-key');
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const product = await createProduct(body);

    // Revalidate all pages that show products
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/category/${body.categorySlug}`);

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/products]', error);
    const message = error instanceof Error ? error.message : 'Failed to create product';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
