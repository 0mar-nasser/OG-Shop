export interface SubcategoryHubItem {
  id: string;
  slug: string;
  name: string;
  englishTitle: string;
  badge?: string;
  description: string;
  image: string;
  matchingSubcategories: string[];
  itemCount?: number;
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  englishTag: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
  subcategories: string[];
  hubItems?: SubcategoryHubItem[];
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-men',
    slug: 'men',
    name: 'ملابس رجالية',
    englishTag: "MEN'S COLLECTION",
    description: 'تشكيلة فاخرة من الهوديز والسويت بانتس الرجالية المصممة بأعلى معايير الراحة والأناقة.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
    itemCount: 24,
    featured: true,
    subcategories: ['هوديز', 'سويت بانتس'],
    hubItems: [
      {
        id: 'men-hoodies',
        slug: 'hoodies',
        name: 'هوديز رجالي',
        englishTitle: 'MEN HOODIES',
        badge: 'الأكثر طلباً',
        description: 'هوديز قطنية فاخرة بقصات مريحة وأوفر سايز وخامات ثقيلة للشتاء والأوقات اليومية.',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['هوديز'],
        itemCount: 14
      },
      {
        id: 'men-sweatpants',
        slug: 'sweatpants',
        name: 'سويت بانتس رجالي',
        englishTitle: 'MEN SWEATPANTS',
        badge: 'راحة تامة',
        description: 'بناطيل سويت بانتس قطنية بقصات عصرية وجيوب عملية تمنحك إطلالة رياضية أنيقة.',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['سويت بانتس'],
        itemCount: 10
      }
    ]
  },
  {
    id: 'cat-women',
    slug: 'women',
    name: 'ملابس نسائية',
    englishTag: "WOMEN'S COLLECTION",
    description: 'تصاميم نسائية عصرية ومريحة من الهوديز الناعمة والسويت بانتس المريح بألوان راقية.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    itemCount: 22,
    featured: true,
    subcategories: ['هوديز', 'سويت بانتس'],
    hubItems: [
      {
        id: 'women-hoodies',
        slug: 'hoodies',
        name: 'هوديز نسائي',
        englishTitle: 'WOMEN HOODIES',
        badge: 'خامات ناعمة',
        description: 'هوديز نسائية بقصات عصرية وألوان باستيل أنيقة تمنحك الدفء والنعومة طوال اليوم.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['هوديز'],
        itemCount: 12
      },
      {
        id: 'women-sweatpants',
        slug: 'sweatpants',
        name: 'سويت بانتس نسائي',
        englishTitle: 'WOMEN SWEATPANTS',
        badge: 'أناقة يومية',
        description: 'بناطيل سويت بانتس بقصات وايد ليج وسليم فيت من خامات قطن فاخرة.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['سويت بانتس'],
        itemCount: 10
      }
    ]
  },
  {
    id: 'cat-unisex',
    slug: 'unisex',
    name: 'تشكيلة للجنسين (Unisex)',
    englishTag: "UNISEX ATELIER",
    description: 'تشكيلة عصرية تناسب الجميع بقصات واسعة ومحايدة تناسب مختلف الأذواق والإطلالات.',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
    itemCount: 20,
    featured: true,
    subcategories: ['هوديز', 'سويت بانتس'],
    hubItems: [
      {
        id: 'unisex-hoodies',
        slug: 'hoodies',
        name: 'هوديز للجنسين',
        englishTitle: 'UNISEX HOODIES',
        badge: 'أوفر سايز',
        description: 'هوديز أوفر سايز للجنسين بتصاميم مينيمال وألوان كلاسيكية كالأسود والبيج والرمادي.',
        image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['هوديز'],
        itemCount: 10
      },
      {
        id: 'unisex-sweatpants',
        slug: 'sweatpants',
        name: 'سويت بانتس للجنسين',
        englishTitle: 'UNISEX SWEATPANTS',
        badge: 'مريح وعصري',
        description: 'بناطيل جوغر وسويت بانتس فضفاضة مريحة جداً ومناسبة للجميع.',
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['سويت بانتس'],
        itemCount: 10
      }
    ]
  }
];
