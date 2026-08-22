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
    englishTag: "MEN'S ATELIER",
    description: 'تشكيلة راقية ومتنوعة مصممة لتلائم مختلف أساليبك اليومية، الرياضية والرسمية بأعلى جودة.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop',
    itemCount: 48,
    featured: true,
    subcategories: ['قمصان', 'تيشيرتات', 'بناطيل', 'جاكيتات ومعاطف', 'بدل وأطقم', 'هوديز وسويت شيرت'],
    hubItems: [
      {
        id: 'men-casual',
        slug: 'casual',
        name: 'كاجوال يومي',
        englishTitle: 'CASUAL & EVERYDAY',
        badge: 'الأكثر طلباً',
        description: 'قمصان كتان طبيعي، تيشيرتات بيسك مريحة، وبناطيل تشينو لإطلالة عفوية راقية تناسب كل الأوقات.',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['قمصان', 'تيشيرتات', 'بناطيل'],
        itemCount: 24
      },
      {
        id: 'men-sport',
        slug: 'sport',
        name: 'رياضي ومريح',
        englishTitle: 'SPORT & ATHLEISURE',
        badge: 'راحة وأداء',
        description: 'هوديز وسويت شيرت بقطن ثقيل، وتيشيرتات قطنية وبناطيل مريحة تمنحك حرية تامة أثناء الحركة.',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['هوديز وسويت شيرت', 'تيشيرتات'],
        itemCount: 16
      },
      {
        id: 'men-formal',
        slug: 'formal',
        name: 'كلاسيك ورسمي',
        englishTitle: 'CLASSIC & FORMAL',
        badge: 'أناقة راقية',
        description: 'بليزرات إيطالية فاخرة، قمصان رسمية بقصات محكمة، وبناطيل قماش أنيقة للاجتماعات والمناسبات.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['جاكيتات ومعاطف', 'قمصان', 'بدل وأطقم'],
        itemCount: 18
      },
      {
        id: 'men-streetwear',
        slug: 'streetwear',
        name: 'ستريت وير وعصري',
        englishTitle: 'STREETWEAR & OVERSIZED',
        badge: 'تشكيلة شبابية',
        description: 'تصاميم واسعة بقصات أوفر سايز وألوان ترابية حديثة تعكس أحدث صيحات الموضة العالمية.',
        image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['هوديز وسويت شيرت', 'تيشيرتات', 'بناطيل'],
        itemCount: 14
      },
      {
        id: 'men-jackets',
        slug: 'jackets',
        name: 'جاكيتات ومعاطف',
        englishTitle: 'JACKETS & OUTERWEAR',
        badge: 'دفء وأناقة',
        description: 'جاكيتات خفيفة، بليزرات كتان غير مبطنة، ومعاطف شتوية مصنوعة بأدق تفاصيل الجودة.',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['جاكيتات ومعاطف'],
        itemCount: 12
      },
      {
        id: 'men-shirts',
        slug: 'shirts',
        name: 'قمصان وبولو',
        englishTitle: 'SHIRTS & ESSENTIALS',
        badge: 'أقمشة طبيعية 100%',
        description: 'تشكيلة متكاملة من القمصان الكلاسيكية والكتان الصيفي بألوان صيفية منعشة وتفاصيل فاخرة.',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['قمصان'],
        itemCount: 20
      }
    ]
  },
  {
    id: 'cat-women',
    slug: 'women',
    name: 'ملابس نسائية',
    englishTag: "WOMEN'S COLLECTION",
    description: 'أحدث فساتين الموسم، عبايات، بلايز وأطقم فاخرة تجمع بين الراحة والأنوثة العصرية.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    itemCount: 64,
    featured: true,
    subcategories: ['فساتين', 'بلايز وقمصان', 'بناطيل وتنانير', 'عبايات وقفاطين', 'جاكيتات ومعاطف', 'ملابس نوم وراحة'],
    hubItems: [
      {
        id: 'women-dresses',
        slug: 'dresses',
        name: 'فساتين ومناسبات',
        englishTitle: 'DRESSES & EVENING',
        badge: 'الأكثر تميزاً',
        description: 'فساتين ميدي وماكسي بتطريزات أنيقة وقصات انسيابية تلائم جميع الحفلات والزيارات.',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['فساتين'],
        itemCount: 22
      },
      {
        id: 'women-abayas',
        slug: 'abayas',
        name: 'عبايات وقفاطين',
        englishTitle: 'ABAYAS & KAFTANS',
        badge: 'أناقة شرقية',
        description: 'عبايات كتان وحريرية بقصات كيمونو عصرية ولمسات تطريز هادئة وفخمة.',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['عبايات وقفاطين'],
        itemCount: 18
      },
      {
        id: 'women-casual',
        slug: 'casual',
        name: 'كاجوال وبلايز',
        englishTitle: 'TOPS & CASUAL',
        badge: 'يومي وعصري',
        description: 'بلايز ساتان، قمصان قطنية، وبناطيل بالازو واسعة لإطلالة يومية متألقة وبسيطة.',
        image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['بلايز وقمصان', 'بناطيل وتنانير'],
        itemCount: 26
      },
      {
        id: 'women-loungewear',
        slug: 'loungewear',
        name: 'ملابس نوم وراحة',
        englishTitle: 'LOUNGEWEAR & SLEEP',
        badge: 'نعومة فائقة',
        description: 'أطقم بيجامات قطن مودال حريري فائق النعومة لنوم هادئ واسترخاء منزلي أنيق.',
        image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['ملابس نوم وراحة'],
        itemCount: 14
      }
    ]
  },
  {
    id: 'cat-kids',
    slug: 'kids',
    name: 'ملابس أطفال',
    englishTag: "KIDS EDIT",
    description: 'أزياء مريحة، ناعمة ومبهجة للأولاد والبنات تناسب جميع الأنشطة والمناسبات اليومية.',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1200&auto=format&fit=crop',
    itemCount: 32,
    featured: true,
    subcategories: ['أولاد', 'بنات', 'مواليد وبيبي', 'ملابس مناسبات', 'بيجامات'],
    hubItems: [
      {
        id: 'kids-boys',
        slug: 'boys',
        name: 'أولاد كاجوال',
        englishTitle: 'BOYS COLLECTION',
        badge: 'أطقم متكاملة',
        description: 'أطقم قمصان كتان وشورتات مريحة وتيشيرتات قطنية مرحة للأولاد في كل الأعمار.',
        image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['أولاد'],
        itemCount: 16
      },
      {
        id: 'kids-girls',
        slug: 'girls',
        name: 'بنات وفساتين',
        englishTitle: 'GIRLS & DRESSES',
        badge: 'مبهج وأنيق',
        description: 'فساتين بكشكشة ورود وتنانير قطنية ناعمة بألوان زاهية ومبهجة لحفلات الأطفال.',
        image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['بنات'],
        itemCount: 18
      },
      {
        id: 'kids-baby',
        slug: 'baby',
        name: 'مواليد وبيبي',
        englishTitle: 'BABY & NEWBORN',
        badge: 'قطن عضوي 100%',
        description: 'أفرولات وملابس قطنية نقية معتمدة لحماية بشرة الرضع وتوفير أقصى درجات الراحة.',
        image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1200&auto=format&fit=crop',
        matchingSubcategories: ['مواليد وبيبي'],
        itemCount: 12
      }
    ]
  }
];
