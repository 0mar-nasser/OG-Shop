import 'dotenv/config';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '@prisma/client';
import { CATEGORIES } from '../src/data/categories';
import { PRODUCTS } from '../src/data/products';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create Categories
  console.log('Creating categories...');
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        image: cat.image,
        description: cat.description,
      },
      create: {
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        image: cat.image,
        description: cat.description,
      },
    });
  }

  // 2. Create Initial Admin User
  console.log('Creating admin user...');
  await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      email: 'admin@ecommerce.com',
      name: 'مدير المتجر',
      role: Role.ADMIN,
      phone: '+966500000000',
    },
  });

  // 3. Create Products
  console.log('Creating products...');
  for (const product of PRODUCTS) {
    // Find category ID by slug
    const category = await prisma.category.findUnique({
      where: { slug: product.category },
    });

    if (!category) continue;

    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        name: product.name,
        categoryId: category.id,
        subcategory: product.subcategory,
        price: product.price,
        oldPrice: product.oldPrice ?? null,
        discount: product.discount ?? null,
        images: product.images,
        colors: product.colors,
        sizes: product.sizes,
        rating: product.rating,
        reviewsCount: product.reviewsCount,
        description: product.description,
        shortDescription: product.shortDescription,
        material: product.material,
        careInstructions: product.careInstructions,
        inStock: product.inStock,
        isNew: product.isNew ?? false,
        isBestSeller: product.isBestSeller ?? false,
        featured: product.featured ?? false,
      },
      create: {
        id: product.id,
        sku: product.sku,
        name: product.name,
        categoryId: category.id,
        subcategory: product.subcategory,
        price: product.price,
        oldPrice: product.oldPrice ?? null,
        discount: product.discount ?? null,
        images: product.images,
        colors: product.colors,
        sizes: product.sizes,
        rating: product.rating,
        reviewsCount: product.reviewsCount,
        description: product.description,
        shortDescription: product.shortDescription,
        material: product.material,
        careInstructions: product.careInstructions,
        inStock: product.inStock,
        isNew: product.isNew ?? false,
        isBestSeller: product.isBestSeller ?? false,
        featured: product.featured ?? false,
      },
    });
  }

  // 4. Create Sample Coupon
  await prisma.coupon.upsert({
    where: { code: 'SAVE20' },
    update: {},
    create: {
      code: 'SAVE20',
      discountPercent: 20,
      minSpend: 200,
      isActive: true,
    },
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
