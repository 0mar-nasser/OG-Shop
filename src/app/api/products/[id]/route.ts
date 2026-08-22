import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProductById, updateProduct, deactivateProduct } from '@/lib/products';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// ─── GET /api/products/[id] ──────────────────────────────────────
export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    console.error('[GET /api/products/[id]]', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// ─── PATCH /api/products/[id] (Admin only) ───────────────────────
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const adminKey = request.headers.get('x-admin-key');
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const product = await updateProduct(id, body);

    // Revalidate affected pages
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/products/${id}`);
    if (product.category) revalidatePath(`/category/${product.category}`);

    return NextResponse.json({ product });
  } catch (error) {
    console.error('[PATCH /api/products/[id]]', error);
    const message = error instanceof Error ? error.message : 'Failed to update product';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─── DELETE /api/products/[id] (Admin only — Soft Delete) ────────
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const adminKey = request.headers.get('x-admin-key');
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    // Soft delete — keeps data, hides from store
    await deactivateProduct(id);

    revalidatePath('/');
    revalidatePath('/products');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE /api/products/[id]]', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
