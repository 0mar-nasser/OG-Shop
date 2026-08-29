import { Product } from '@/types/product';

export const PRODUCTS: Product[] = [
  // ==========================================
  // --- MEN PRODUCTS (Hoodies & Sweatpants) ---
  // ==========================================
  {
    id: 'men-01',
    name: 'هودي رجالي قطن ثقيل بقصة أوفر سايز فاخرة',
    category: 'men',
    categoryName: 'ملابس رجالية',
    subcategory: 'هوديز',
    price: 240,
    oldPrice: 320,
    discount: 25,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop',
    ],
    colors: [
      { name: 'أسود ملكي', hex: '#111827' },
      { name: 'بيج رملي', hex: '#D7C4B7' },
      { name: 'رمادي ميلانج', hex: '#9CA3AF' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewsCount: 168,
    shortDescription: 'هودي قطن 100% ثقيل بقصة مريحة وغطاء رأس مزدوج الطبقات لراحة وأناقة شتوية لا تضاهى.',
    description: 'صُنع هذا الهودي من أفخم خيوط القطن المغزول بوزن 450 GSM ليمنحك الدفء والملمس الفاخر. يتميز بجيب أمامي كانغارو متين وأكتاف منسدلة تعكس أحدث صيحات الموضة العصرية.',
    material: '100% قطن فاخر مع بطانة ناعمة (Fleece)',
    careInstructions: ['غسيل آلي بماء بارد', 'يُفضل قلبه قبل الغسيل', 'لا تستخدم المبيض'],
    inStock: true,
    isBestSeller: true,
    featured: true,
    sku: 'MN-HD-001'
  },
  {
    id: 'men-02',
    name: 'سويت بانتس رجالي قطني بقصة جوغر عصرية',
    category: 'men',
    categoryName: 'ملابس رجالية',
    subcategory: 'سويت بانتس',
    price: 195,
    oldPrice: 260,
    discount: 25,
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop',
    ],
    colors: [
      { name: 'كحلي داكن', hex: '#1E293B' },
      { name: 'رمادي غامق', hex: '#374151' },
      { name: 'أسود', hex: '#000000' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviewsCount: 115,
    shortDescription: 'بنطال سويت بانتس مريح بخصر مطاطي برباط وجيوب جانبية بسحاب خفي.',
    description: 'صُمم هذا البنطال ليوفر لك أقصى درجات المرونة والراحة طوال اليوم سواء أثناء التمرين أو الإطلالات اليومية الكاجوال. خامة قطنية متماسكة تحافظ على رونقها بعد تكرار الغسيل.',
    material: '85% قطن ممشط، 15% بوليستر متين',
    careInstructions: ['غسيل مع ألوان مماثلة', 'كي على حرارة منخفضة'],
    inStock: true,
    isNew: true,
    featured: true,
    sku: 'MN-SP-002'
  },
  {
    id: 'men-03',
    name: 'هودي رجالي مينيمال برقبة مريحة وأكمام محكمة',
    category: 'men',
    categoryName: 'ملابس رجالية',
    subcategory: 'هوديز',
    price: 220,
    oldPrice: 280,
    discount: 21,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'أخضر غابي', hex: '#2D3B36' },
      { name: 'أبيض لؤلؤي', hex: '#F9FAFB' },
      { name: 'توب ترابي', hex: '#8B7355' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviewsCount: 84,
    shortDescription: 'هودي كلاسيكي بتصميم نقي خالي من الرسومات مع تطريز راقٍ لشعار راقِي.',
    description: 'قطعة أساسية لكل خزانة ملابس شتوية، تمنحك إطلالة فخمة وغير متكلفة مع نعومة لا تضاهى من الداخل.',
    material: '100% قطن طبيعي ناعم',
    careInstructions: ['غسيل بماء بارد', 'تجفيف في الظل'],
    inStock: true,
    featured: false,
    sku: 'MN-HD-003'
  },
  {
    id: 'men-04',
    name: 'سويت بانتس رجالي وايد ليج بقصة واسعة ومريحة',
    category: 'men',
    categoryName: 'ملابس رجالية',
    subcategory: 'سويت بانتس',
    price: 210,
    oldPrice: 270,
    discount: 22,
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'فحمي أسود', hex: '#18181B' },
      { name: 'بيج كلاسيك', hex: '#E5DCCB' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewsCount: 92,
    shortDescription: 'سويت بانتس بقصة واسعة مستقيمة تمنحك حرية الحركة وإطلالة ستريت وير عصرية.',
    description: 'بنطال واسع مريح مصنوع من قطن عالي الكثافة مع خصر مرن وأربطة قماشية بلون مطابق.',
    material: '90% قطن عضوي، 10% ألياف مرنة',
    careInstructions: ['غسيل آلي معتدل', 'لا يُستخدم التجفيف الآلي الحار'],
    inStock: true,
    isBestSeller: true,
    sku: 'MN-SP-004'
  },

  // ============================================
  // --- WOMEN PRODUCTS (Hoodies & Sweatpants) ---
  // ============================================
  {
    id: 'women-01',
    name: 'هودي نسائي كروب ناعم بقصة مريحة',
    category: 'women',
    categoryName: 'ملابس نسائية',
    subcategory: 'هوديز',
    price: 215,
    oldPrice: 290,
    discount: 25,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'وردي ترابي', hex: '#E2B4B7' },
      { name: 'أوف وايت عاجي', hex: '#FDFBF7' },
      { name: 'أخضر مريمي', hex: '#9CAF88' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 204,
    shortDescription: 'هودي نسائي ناعم بلمسة كروب عصرية وأكتاف منسدلة لإطلالة أنثوية أنيقة وعفوية.',
    description: 'قطعة أنيقة تجمع بين الراحة والأنوثة، مصممة من أنعم خامات القطن الفاخر المبطن بالصوف فائق النعومة ليمنحك دفئاً وخفة في الحركة.',
    material: '95% قطن ممتاز، 5% إيلاستين',
    careInstructions: ['غسيل رقيق بماء بارد', 'يُكوى على درجة حرارة خفيفة'],
    inStock: true,
    isBestSeller: true,
    featured: true,
    sku: 'WM-HD-001'
  },
  {
    id: 'women-02',
    name: 'سويت بانتس نسائي وايد ليج قطني بخصر عالي',
    category: 'women',
    categoryName: 'ملابس نسائية',
    subcategory: 'سويت بانتس',
    price: 200,
    oldPrice: 260,
    discount: 23,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'رمادي فاتح', hex: '#E5E7EB' },
      { name: 'كافيه لاتيه', hex: '#C4A482' },
      { name: 'أسود مطفي', hex: '#1F2937' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewsCount: 138,
    shortDescription: 'سويت بانتس نسائي بخصر عالي وأرجل واسعة يمنح قواماً رشيقاً ومظهراً فائق الأناقة.',
    description: 'تصميم راقٍ يوفر الراحة القصوى والجمال في آن واحد مع حزام خصر مرن مريح وجيوب خفية.',
    material: '100% قطن فرنش تيري عالي الجودة',
    careInstructions: ['غسيل آلي معتدل مع ألوان فاتحة'],
    inStock: true,
    isNew: true,
    featured: true,
    sku: 'WM-SP-002'
  },
  {
    id: 'women-03',
    name: 'هودي نسائي أوفر سايز طويل بياقة مبطنة',
    category: 'women',
    categoryName: 'ملابس نسائية',
    subcategory: 'هوديز',
    price: 250,
    oldPrice: 330,
    discount: 24,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'بيج كشمير', hex: '#E8D8C8' },
      { name: 'أزرق سماوي باهت', hex: '#BACCD8' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 97,
    shortDescription: 'هودي مريح وطويل بتصميم أوفر سايز مثالي لأيام الشتاء الباردة.',
    description: 'يتميز بقصة واسعة ومريحة وغطاء رأس كبير مبطن لحماية ودفء مثالي طوال الموسم.',
    material: '100% قطن عضوي منسوج بعناية',
    careInstructions: ['غسيل يدوي أو آلي خفيف'],
    inStock: true,
    featured: false,
    sku: 'WM-HD-003'
  },
  {
    id: 'women-04',
    name: 'سويت بانتس نسائي جوغر بنقشة مضلعة ناعمة',
    category: 'women',
    categoryName: 'ملابس نسائية',
    subcategory: 'سويت بانتس',
    price: 185,
    oldPrice: 240,
    discount: 22,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'موكا دافئ', hex: '#8B6B58' },
      { name: 'كريمي', hex: '#FFFDF9' }
    ],
    sizes: ['S', 'M', 'L'],
    rating: 4.7,
    reviewsCount: 76,
    shortDescription: 'بنطال جوغر نسائي كاحل ضيق وملمس قطني فائق النعومة.',
    description: 'مثالي للاسترخاء المنزلي أو المشاوير اليومية السريعة مع حزام خصر مرن غير ضاغط.',
    material: '90% قطن مودال ناعم، 10% إيلاستين',
    careInstructions: ['غسيل بماء فاتر'],
    inStock: true,
    sku: 'WM-SP-004'
  },

  // ============================================
  // --- UNISEX PRODUCTS (Hoodies & Sweatpants) -
  // ============================================
  {
    id: 'unisex-01',
    name: 'طقم هودي وسويت بانتس للجنسين بقصة بوكسي واسعة',
    category: 'unisex',
    categoryName: 'تشكيلة للجنسين (Unisex)',
    subcategory: 'هوديز',
    price: 360,
    oldPrice: 480,
    discount: 25,
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop',
    ],
    colors: [
      { name: 'رمادي إسفلتي', hex: '#4B5563' },
      { name: 'أسود كربوني', hex: '#111111' },
      { name: 'بيج نود', hex: '#DFD3C3' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 5.0,
    reviewsCount: 220,
    shortDescription: 'طقم فاخر للجنسين هودي ثقيل مع سويت بانتس مريح متناسق لأقصى درجات الأناقة والراحة.',
    description: 'تم تصميم هذه القطعة لتلائم الجنسين معاً بقصة عصرية محايدة (Gender-Neutral Boxy Fit) وخامة قطنية ثقيلة وملمس فائق النعومة، لتكون اختيارك الأول في كل مكان.',
    material: '100% قطن عضوي ثقيل 480 GSM',
    careInstructions: ['غسيل مقلوباً بماء بارد', 'لا يُستخدم المبيض'],
    inStock: true,
    isBestSeller: true,
    featured: true,
    sku: 'UX-SET-001'
  },
  {
    id: 'unisex-02',
    name: 'هودي كلاسيكي للجنسين بتطريز شعار راقِي المصغر',
    category: 'unisex',
    categoryName: 'تشكيلة للجنسين (Unisex)',
    subcategory: 'هوديز',
    price: 230,
    oldPrice: 300,
    discount: 23,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'زيتي كلاسيك', hex: '#3B443B' },
      { name: 'أبيض عاجي', hex: '#F9F6F0' },
      { name: 'رمادي غامق', hex: '#2E3033' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewsCount: 154,
    shortDescription: 'هودي أنيق ومريح بقصة محايدة تناسب الرجال والنساء وتطريز متقن على الصدر.',
    description: 'هودي مينيمال فاخر يجمع بين البساطة والأناقة الراقية مع أكمام محكمة وجيب أمامي مريح.',
    material: '100% قطن نقي معالج ضد الانكماش',
    careInstructions: ['غسيل آلي معتدل'],
    inStock: true,
    isNew: true,
    featured: true,
    sku: 'UX-HD-002'
  },
  {
    id: 'unisex-03',
    name: 'سويت بانتس فضفاض للجنسين بخصر قابل للتعديل',
    category: 'unisex',
    categoryName: 'تشكيلة للجنسين (Unisex)',
    subcategory: 'سويت بانتس',
    price: 210,
    oldPrice: 270,
    discount: 22,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'فحمي داكن', hex: '#1C1917' },
      { name: 'بيج رملي', hex: '#D6C7B2' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewsCount: 88,
    shortDescription: 'سويت بانتس قطني واسع للجنسين بجيوب جانبية عميقة وأربطة متينة.',
    description: 'بنطال مريح جداً مناسب لجميع الإطلالات اليومية والنشاطات الرياضية مع قصة انسيابية.',
    material: '92% قطن، 8% بوليستر مرن',
    careInstructions: ['غسيل مع ألوان مماثلة'],
    inStock: true,
    featured: true,
    sku: 'UX-SP-003'
  },
  {
    id: 'unisex-04',
    name: 'هودي بدون سحاب للجنسين بقبعة ثقيلة وقصة دروب شولدر',
    category: 'unisex',
    categoryName: 'تشكيلة للجنسين (Unisex)',
    subcategory: 'هوديز',
    price: 245,
    oldPrice: 310,
    discount: 21,
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'كحلي نايت', hex: '#0F172A' },
      { name: 'رمادي حجري', hex: '#94A3B8' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 110,
    shortDescription: 'هودي ثقيل مريح يمنحك دفئاً وحضوراً لافتاً في الشتاء.',
    description: 'صُمم بأعلى مواصفات الجودة والأناقة مع نسيج قطني كثيف ومقاوم للوبر.',
    material: '100% قطن مصقول',
    careInstructions: ['غسيل آلي بماء بارد'],
    inStock: true,
    isBestSeller: true,
    sku: 'UX-HD-004'
  }
];

export const MOCK_COUPONS = [
  {
    code: 'RAQI10',
    discountPercentage: 10,
    minSpend: 150,
    description: 'خصم 10% على كافة تشكيلات الهوديز والسويت بانتس'
  },
  {
    code: 'WELCOME20',
    discountPercentage: 20,
    minSpend: 250,
    description: 'خصم ترحيبي 20% للعملاء الجدد'
  },
  {
    code: 'SUMMER20',
    discountPercentage: 20,
    minSpend: 200,
    description: 'خصم 20% لفترة محدودة'
  }
];

export const MOCK_REVIEWS = [
  {
    id: 'rev-1',
    userName: 'عبدالله الشامسي',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    date: 'منذ 3 أيام',
    comment: 'الخامة قطن ثقيل ومحبوكة بإتقان شديد، المقاس والقصة ممتازة ومريحة جداً.',
    verifiedPurchase: true,
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    userName: 'نورة المنصوري',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    date: 'منذ أسبوع',
    comment: 'اللون أجمل من الصور بكثير، والتوصيل كان سريعاً في يومين فقط!',
    verifiedPurchase: true,
    helpfulCount: 18
  },
  {
    id: 'rev-3',
    userName: 'فيصل العتيبي',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop',
    rating: 4,
    date: 'منذ أسبوعين',
    comment: 'سويت بانتس مريح جداً وعملي، خامة تدوم بعد الغسيل.',
    verifiedPurchase: true,
    helpfulCount: 12
  }
];

