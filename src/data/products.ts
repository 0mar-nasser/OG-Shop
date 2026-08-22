import { Product } from '@/types/product';

export const PRODUCTS: Product[] = [
  // --- MEN PRODUCTS ---
  {
    id: 'men-01',
    name: 'قميص كتان بيج كلاسيكي بقصة مريحة',
    category: 'men',
    categoryName: 'ملابس رجالية',
    subcategory: 'قمصان',
    price: 185,
    oldPrice: 240,
    discount: 23,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620012253295-c15c429fbb41?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'بيج رملي', hex: '#D7C4B7' },
      { name: 'أبيض عاجي', hex: '#F4F1EA' },
      { name: 'رمادي حجري', hex: '#9E9A94' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviewsCount: 142,
    shortDescription: 'قميص كتان طبيعي 100% يمنحك انتعاشاً وأناقة لا مثيل لها في الأيام الدافئة.',
    description: 'صُمم هذا القميص من خيوط الكتان الطبيعي الفاخر ليمنحك شعوراً فائقاً بالراحة مع قصة واسعة مريحة (Relaxed Fit) وأزرار صدفيّة متقنة. مناسب للاستخدام اليومي أو المناسبات الشاطئية والمريحة.',
    material: '100% كتان طبيعي منتقى بعناية',
    careInstructions: ['غسيل آلي بماء بارد', 'يُكوى بالبخار على درجة حرارة متوسطة', 'لا يُستخدم المبيض'],
    inStock: true,
    isBestSeller: true,
    featured: true,
    sku: 'MN-SH-001'
  },
  {
    id: 'men-02',
    name: 'بنطال تشينو قماش مرن بقصة مستقيمة',
    category: 'men',
    categoryName: 'ملابس رجالية',
    subcategory: 'بناطيل',
    price: 220,
    oldPrice: 260,
    discount: 15,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'كحلي داكن', hex: '#1E293B' },
      { name: 'كاكي ترابي', hex: '#C2B69D' },
      { name: 'زيتوني مطفي', hex: '#555D50' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    rating: 4.6,
    reviewsCount: 89,
    shortDescription: 'بنطال تشينو قطني عالي الجودة مرن ومثالي للعمل والإطلالات اليومية.',
    description: 'بنطال بقصة مستقيمة مريحة مصنوع من مزيج القطن والإيلاستين لمرونة تدوم طوال اليوم. يتميز بجيوب جانبية مائلة وجيوب خلفية بزر أنيق.',
    material: '97% قطن معالج، 3% إيلاستين',
    careInstructions: ['غسيل مع ألوان مماثلة', 'يُفضل قلبه قبل الغسيل'],
    inStock: true,
    isNew: true,
    featured: true,
    sku: 'MN-TR-002'
  },
  {
    id: 'men-03',
    name: 'جاكيت بليزر كتان خفيف غير مبطن',
    category: 'men',
    categoryName: 'ملابس رجالية',
    subcategory: 'جاكيتات ومعاطف',
    price: 450,
    oldPrice: 580,
    discount: 22,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'بيج توب', hex: '#B8A89A' },
      { name: 'رمادي فاتح', hex: '#D1D5DB' }
    ],
    sizes: ['48', '50', '52', '54'],
    rating: 4.9,
    reviewsCount: 65,
    shortDescription: 'بليزر غير رسمي خفيف بقصة إيطالية يجمع بين الفخامة والعملية.',
    description: 'قطعة أساسية لكل رجل يبحث عن مظهر أنيق وعفوي (Smart Casual). خفيف الوزن ومصمم بدون بطانة داخلية ثقيلة ليمنح أقصى درجات التهوية والأناقة.',
    material: '70% كتان، 30% قطن عضوي',
    careInstructions: ['تنظيف جاف فقط'],
    inStock: true,
    isBestSeller: true,
    sku: 'MN-BL-003'
  },
  {
    id: 'men-04',
    name: 'تيشيرت بيسك قطن بيما فاخر بقبة دائرية',
    category: 'men',
    categoryName: 'ملابس رجالية',
    subcategory: 'تيشيرتات',
    price: 95,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'أبيض ناصع', hex: '#FFFFFF' },
      { name: 'أسود فحمي', hex: '#1C1917' },
      { name: 'زيتي هادئ', hex: '#444D41' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewsCount: 210,
    shortDescription: 'تيشيرت قطن بيما فائق النعومة بملمس حريري ومقاوم للتجعد.',
    description: 'صُنع من ألياف قطن البيما الطويلة لضمان نعومة تدوم لسنوات ولا تتأثر بالغسيل المتكرر. قصة قياسية تناسب تحت القمصان أو بمفرده.',
    material: '100% قطن بيما فاخر',
    careInstructions: ['غسيل آلي 30 درجة مئوية', 'تجفيف في الظل'],
    inStock: true,
    isBestSeller: true,
    sku: 'MN-TS-004'
  },
  {
    id: 'men-05',
    name: 'هودي أوفر سايز قطن سميك مبطن',
    category: 'men',
    categoryName: 'ملابس رجالية',
    subcategory: 'هوديز وسويت شيرت',
    price: 245,
    oldPrice: 310,
    discount: 21,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'رمادي ميلانج', hex: '#A8A29E' },
      { name: 'بني شوكولاتة', hex: '#452B1E' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewsCount: 78,
    shortDescription: 'هودي بتصميم واسع وعصري من القطن الثقيل 450 GSM للدفء المثالي.',
    description: 'قطعة شبابية دافئة بقبعة مزدوجة وجيب كنغر أمامي فسيح، منسوجة بوزن 450 جرام لثبات الشكل ومقاومة الانكماش.',
    material: '85% قطن ثقيل، 15% بوليستر معاد تدويره',
    careInstructions: ['غسيل بارد مع مقلوب القطعة'],
    inStock: true,
    isNew: true,
    sku: 'MN-HD-005'
  },

  // --- WOMEN PRODUCTS ---
  {
    id: 'women-01',
    name: 'فستان ميدي كريب بحزام خصر وأكمام واسعة',
    category: 'women',
    categoryName: 'ملابس نسائية',
    subcategory: 'فساتين',
    price: 320,
    oldPrice: 420,
    discount: 24,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'وردي ترابي', hex: '#D4A59A' },
      { name: 'بيج ساند', hex: '#E6D7C3' },
      { name: 'أسود ملكي', hex: '#18181B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 167,
    shortDescription: 'فستان أنثوي راقٍ بقصة انسيابية تناسب المناسبات والزيارات الخاصة.',
    description: 'فستان ميدي مصنوع من قماش الكريب الحريري غير الشفاف، مزين بحزام خصر من نفس القماش لتحديد القوام برقة، مع فتحة رقبة كلاسيكية وأكمام واسعة أنيقة.',
    material: 'كريب حريري ناعم عالي الجودة',
    careInstructions: ['غسيل يدوي أو دورة أقمشة رقيقة', 'كي خفيف على حرارة منخفضة'],
    inStock: true,
    isBestSeller: true,
    featured: true,
    sku: 'WM-DR-001'
  },
  {
    id: 'women-02',
    name: 'بلوزة حريرية بأزرار مخفية وقصة انسيابية',
    category: 'women',
    categoryName: 'ملابس نسائية',
    subcategory: 'بلايز وقمصان',
    price: 190,
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'أوف وايت عاجي', hex: '#FAF7F2' },
      { name: 'أخضر ميرمية', hex: '#9CAF88' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewsCount: 94,
    shortDescription: 'بلوزة ساتان حريري راقية للعمل والمناسبات المسائية.',
    description: 'تتميز بلمعان مطفي جذاب وقصة انسيابية مريحة مع ياقة ناعمة وأزرار أمامية مخفية لإطلالة مينيمالية ونظيفة.',
    material: '100% ساتان حريري معالج',
    careInstructions: ['غسيل جاف أو يدوي بارد'],
    inStock: true,
    isNew: true,
    featured: true,
    sku: 'WM-BL-002'
  },
  {
    id: 'women-03',
    name: 'عباية صيفية لينن خفيفة بقصة كيمونو عصرية',
    category: 'women',
    categoryName: 'ملابس نسائية',
    subcategory: 'عبايات وقفاطين',
    price: 380,
    oldPrice: 480,
    discount: 21,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'رمادي توب', hex: '#8C857B' },
      { name: 'بيج صحراوي', hex: '#D2C2B2' }
    ],
    sizes: ['52', '54', '56', '58', '60'],
    rating: 4.9,
    reviewsCount: 112,
    shortDescription: 'عباية كاجوال من الكتان الطبيعي الفاخر مع طرحة مطابقة.',
    description: 'عباية مفتوحة بقصة عصرية واسعة مستوحاة من أزياء الكيمونو، باردة جداً في الصيف ومثالية للتنسيقات اليومية والمناسبات الخفيفة.',
    material: 'كتان هندي طبيعي منتقى',
    careInstructions: ['غسيل جاف للمحافظة على نسيج الكتان'],
    inStock: true,
    isBestSeller: true,
    featured: true,
    sku: 'WM-AB-003'
  },
  {
    id: 'women-04',
    name: 'بنطال بالازو قماش لينن واسع برباط خصر',
    category: 'women',
    categoryName: 'ملابس نسائية',
    subcategory: 'بناطيل وتنانير',
    price: 210,
    images: [
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'بيج رملي', hex: '#D7C4B7' },
      { name: 'أبيض ثلجي', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviewsCount: 88,
    shortDescription: 'بنطال واسع ومريح جداً للأيام الحارة والتنزه.',
    description: 'بنطال بقصة بالازو فضفاضة مع خصر مطاطي برباط قابل للتعديل وجيوب جانبية مخفية تمنحك إحساساً رائعاً بالحرية والأناقة.',
    material: '100% كتان نقي',
    careInstructions: ['غسيل آلي رقيق'],
    inStock: true,
    sku: 'WM-PL-004'
  },
  {
    id: 'women-05',
    name: 'طقم بيجاما قطنية مريحة مع شورت ناعم',
    category: 'women',
    categoryName: 'ملابس نسائية',
    subcategory: 'ملابس نوم وراحة',
    price: 155,
    oldPrice: 195,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'رمادي فاتح', hex: '#E5E7EB' },
      { name: 'وردي شاحب', hex: '#FBCFE8' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewsCount: 54,
    shortDescription: 'طقم نوم منزلي من قطن المودال فائق النعومة والراحة.',
    description: 'يتكون من قميص بأكمام قصيرة وياقة مريحة مع شورت بخصر مرن، مصمم خصيصاً لنوم هادئ واسترخاء منزلي أنيق.',
    material: '95% قطن مودال، 5% سباندكس',
    careInstructions: ['غسيل آلي دافئ'],
    inStock: true,
    isNew: true,
    sku: 'WM-PJ-005'
  },

  // --- KIDS PRODUCTS ---
  {
    id: 'kids-01',
    name: 'طقم ولادي كاجوال قميص كتان مع شورت برمودا',
    category: 'kids',
    categoryName: 'ملابس أطفال',
    subcategory: 'أولاد',
    price: 145,
    oldPrice: 180,
    discount: 19,
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'بيج وأزرق', hex: '#93C5FD' },
      { name: 'أبيض وزيتي', hex: '#A7F3D0' }
    ],
    sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات'],
    rating: 4.9,
    reviewsCount: 76,
    shortDescription: 'طقم كاجوال أنيق ومريح للأولاد مناسب للرحلات والزيارات العائلية.',
    description: 'مزيج من الكتان والقطن الناعم على بشرة الطفل مع قميص بأزرار خشبية وشورت بخصر مطاطي مريح وجيوب عملية.',
    material: '60% قطن عضوي، 40% كتان',
    careInstructions: ['غسيل آلي 30 درجة'],
    inStock: true,
    isBestSeller: true,
    featured: true,
    sku: 'KD-BS-001'
  },
  {
    id: 'kids-02',
    name: 'فستان بناتي مزين بكشكشة وتطريز ورود ناعم',
    category: 'kids',
    categoryName: 'ملابس أطفال',
    subcategory: 'بنات',
    price: 160,
    oldPrice: 200,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'أصفر زبدة', hex: '#FEF08A' },
      { name: 'وردي ناعم', hex: '#FCE7F3' }
    ],
    sizes: ['3-4 سنوات', '5-6 سنوات', '7-8 سنوات', '9-10 سنوات'],
    rating: 4.8,
    reviewsCount: 92,
    shortDescription: 'فستان بناتي مبهج من القطن الخالص لحفلات أعياد الميلاد والمناسبات.',
    description: 'تصميم أميري رقيق مع طبقات كشكش على الأكتاف وتطريز يدوي ناعم ومبطن بالكامل بقطن 100% لحماية بشرة الطفلة.',
    material: '100% قطن عضوي نقي ومبطن',
    careInstructions: ['غسيل رقيق مع ألوان مماثلة'],
    inStock: true,
    isNew: true,
    sku: 'KD-GD-002'
  },
  {
    id: 'kids-03',
    name: 'أفرول بيبي ناعم مع قبعة مطابقة قطن 100%',
    category: 'kids',
    categoryName: 'ملابس أطفال',
    subcategory: 'مواليد وبيبي',
    price: 95,
    images: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'بيج كريمي', hex: '#F5F5DC' },
      { name: 'رمادي هادئ', hex: '#E5E7EB' }
    ],
    sizes: ['0-3 أشهر', '3-6 أشهر', '6-9 أشهر', '9-12 شهر'],
    rating: 5.0,
    reviewsCount: 105,
    shortDescription: 'أفرول لحديثي الولادة بملمس فائق النعومة وخالٍ من المواد الكيميائية.',
    description: 'مصنوع من القطن العضوي المعتمد GOTS بأزرار كبس سهلة الفتح لتغيير الحفاض بسهولة تامة مع حواف ناعمة لا تسبب حساسية.',
    material: '100% قطن عضوي نقي معتمد',
    careInstructions: ['غسيل آلي بمساحيق أطفال مخصصة'],
    inStock: true,
    isBestSeller: true,
    sku: 'KD-BB-003'
  }
];

export const MOCK_REVIEWS = [
  {
    id: 'rev-1',
    userName: 'عبدالله السعيد',
    rating: 5,
    date: 'منذ يومين',
    comment: 'الخامة ممتازة جداً والمقاس مضبوط تماماً مثل الوصف. التغليف فخم وسرعة التوصيل خرافية!',
    verifiedPurchase: true,
    helpfulCount: 14
  },
  {
    id: 'rev-2',
    userName: 'سارة المنصوري',
    rating: 5,
    date: 'منذ أسبوع',
    comment: 'اللون في الواقع أجمل من الصور، والقطن ناعم جداً ومريح في اللبس طوال اليوم. سأطلب لون ثاني بالتأكيد.',
    verifiedPurchase: true,
    helpfulCount: 9
  },
  {
    id: 'rev-3',
    userName: 'خالد المطيري',
    rating: 4,
    date: 'منذ أسبوعين',
    comment: 'جودة التصنيع عالية والتفاصيل دقيقة، استحق كل درهم صراحة. تجربة تسوق راقية وسلسة.',
    verifiedPurchase: true,
    helpfulCount: 6
  }
];

export const MOCK_COUPONS = [
  {
    code: 'WELCOME10',
    discountPercentage: 10,
    description: 'خصم 10% على طلبك الأول'
  },
  {
    code: 'SUMMER20',
    discountPercentage: 20,
    minSpend: 300,
    description: 'خصم 20% للطلبات فوق 300 درهم / ريال'
  },
  {
    code: 'FASHION15',
    discountPercentage: 15,
    description: 'خصم 15% على تشكيلة الأزياء الجديدة'
  }
];
