export const ADULT_SIZES = ['M', 'L', 'XL', 'XXL'];

export const MOCK_PRODUCTS = [
  // ─────────────────────────────────────────────────────────────
  // 1. ADULT MEN'S CLOTHING (Category: 'men', Sizes: M, L, XL, XXL)
  // ─────────────────────────────────────────────────────────────
  {
    _id: 'men-001',
    name: 'Classic Oxford Button-Down Cotton Shirt',
    description: 'Tailored for the modern gentleman. Crafted from 100% breathable Egyptian Oxford cotton with reinforced collar, buttoned cuffs, and a flattering regular-slim profile.',
    category: 'men',
    subCategory: 'shirts',
    targetAudience: 'Adult Men',
    price: 6490,
    originalPrice: 7500,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1000&auto=format&fit=crop'
    ],
    fabric: '100% Premium Egyptian Cotton',
    fit: 'Classic Tailored Fit',
    careInstructions: 'Machine wash cold with like colors. Warm iron if needed.',
    colors: [
      { name: 'Sky Blue', hex: '#60A5FA', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop' },
      { name: 'Crisp White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 15 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 18 },
      { size: 'XXL', stock: 10 }
    ],
    color: 'Sky Blue',
    brand: 'UrbanCraft Men',
    stockQuantity: 63,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 54,
    features: [
      '100% Breathable Egyptian Oxford Cotton',
      'Wrinkle-resistant luxury finish',
      'Available Adult Sizes: M, L, XL, XXL',
      'Perfect for business casual and weekend events'
    ]
  },
  {
    _id: 'men-002',
    name: 'Slim-Fit Stretch Denim Jeans',
    description: 'Versatile dark indigo denim built with flex-stretch cotton for unrestricted movement and durable daily wear.',
    category: 'men',
    subCategory: 'pants',
    targetAudience: 'Adult Men',
    price: 7850,
    originalPrice: 8900,
    discount: 12,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=1000&auto=format&fit=crop'
    ],
    fabric: '98% Cotton, 2% Elastane Flex Denim',
    fit: 'Slim Tapered Fit',
    careInstructions: 'Wash inside out in cold water. Tumble dry low.',
    colors: [
      { name: 'Dark Indigo', hex: '#1E3A8A', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&auto=format&fit=crop' },
      { name: 'Washed Black', hex: '#1F2937', image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 12 },
      { size: 'L', stock: 16 },
      { size: 'XL', stock: 14 },
      { size: 'XXL', stock: 8 }
    ],
    color: 'Dark Indigo',
    brand: 'DenimCo Men',
    stockQuantity: 50,
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.8,
    numReviews: 42,
    features: [
      'Heavyweight 12.5 oz flex denim construction',
      'Deep reinforced 5-pocket styling',
      'Available Adult Sizes: M, L, XL, XXL'
    ]
  },
  {
    _id: 'men-003',
    name: 'Minimalist Organic Heavyweight Crewneck Tee',
    description: 'Ultra-soft 220 GSM combed organic cotton t-shirt with reinforced ribbed collar. Designed to maintain fit wash after wash.',
    category: 'men',
    subCategory: 't-shirts',
    targetAudience: 'Adult Men',
    price: 3250,
    originalPrice: 3800,
    discount: 14,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop'
    ],
    fabric: '100% Organic Combed Cotton (220 GSM)',
    fit: 'Relaxed Fit',
    careInstructions: 'Machine wash cold.',
    colors: [
      { name: 'Heather Grey', hex: '#9CA3AF', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 25 },
      { size: 'L', stock: 30 },
      { size: 'XL', stock: 25 },
      { size: 'XXL', stock: 15 }
    ],
    color: 'Heather Grey',
    brand: 'UrbanCraft Men',
    stockQuantity: 95,
    isFeatured: false,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 68,
    features: [
      'Pre-shrunk organic combed cotton',
      'Double-needle hem stitching',
      'Available Adult Sizes: M, L, XL, XXL'
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 2. ADULT WOMEN'S CLOTHING (Category: 'women', Sizes: M, L, XL, XXL)
  // ─────────────────────────────────────────────────────────────
  {
    _id: 'women-001',
    name: 'Elegant Midi Wrap Silk Blend Dress',
    description: 'Graceful flowing silhouette featuring an adjustable waist wrap tie, deep V-neckline, and subtle flutter sleeves.',
    category: 'women',
    subCategory: 'dresses',
    targetAudience: 'Adult Women',
    price: 9850,
    originalPrice: 11500,
    discount: 14,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop'
    ],
    fabric: '70% Silk, 30% Breathable Rayon',
    fit: 'Adjustable Wrap Fit',
    careInstructions: 'Hand wash or dry clean recommended.',
    colors: [
      { name: 'Emerald Green', hex: '#047857', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop' },
      { name: 'Ruby Red', hex: '#BE123C', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 14 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 12 },
      { size: 'XXL', stock: 8 }
    ],
    color: 'Emerald Green',
    brand: 'Aura Women',
    stockQuantity: 52,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 61,
    features: [
      'Lustrous breathable silk blend texture',
      'Self-tie waist belt for customizable fit',
      'Available Adult Sizes: M, L, XL, XXL'
    ]
  },
  {
    _id: 'women-002',
    name: 'Tailored Double-Breasted Executive Blazer',
    description: 'Chic structured blazer with sharp peak lapels, tortoise-shell buttons, and full inner lining.',
    category: 'women',
    subCategory: 'jackets',
    targetAudience: 'Adult Women',
    price: 11500,
    originalPrice: 13000,
    discount: 11,
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=1000&auto=format&fit=crop'
    ],
    fabric: 'Structured Poly-Viscose Suiting Fabric',
    fit: 'Tailored Professional Fit',
    careInstructions: 'Dry clean only.',
    colors: [
      { name: 'Cream Beige', hex: '#F3E8DC', image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 10 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 12 },
      { size: 'XXL', stock: 6 }
    ],
    color: 'Cream Beige',
    brand: 'VogueLines Women',
    stockQuantity: 43,
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.8,
    numReviews: 36,
    features: [
      'Structured padded shoulders',
      'Functional front welt flap pockets',
      'Available Adult Sizes: M, L, XL, XXL'
    ]
  },
  {
    _id: 'women-003',
    name: 'High-Waisted Vintage Flare Jeans',
    description: 'Flattering high-rise flared leg denim with gentle stretch and retro wash detailing.',
    category: 'women',
    subCategory: 'pants',
    targetAudience: 'Adult Women',
    price: 6900,
    originalPrice: 7900,
    discount: 12,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&auto=format&fit=crop'
    ],
    fabric: '99% Cotton Denim, 1% Spandex',
    fit: 'High-Rise Flare Fit',
    careInstructions: 'Machine wash cold.',
    colors: [
      { name: 'Vintage Blue', hex: '#3B82F6', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 15 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 14 },
      { size: 'XXL', stock: 7 }
    ],
    color: 'Vintage Blue',
    brand: 'DenimCo Women',
    stockQuantity: 56,
    isFeatured: false,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.7,
    numReviews: 29,
    features: [
      'High-waisted tummy shaping waistband',
      'Flattering wide flare leg opening',
      'Available Adult Sizes: M, L, XL, XXL'
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 3. CHILD MEN'S CLOTHING (Boys' Fashion - Category: 'boys')
  // ─────────────────────────────────────────────────────────────
  {
    _id: 'boys-001',
    name: 'Dino Adventure Fleece Hoodie (Boys)',
    description: 'Cozy fleece-lined cotton hoodie featuring energetic dinosaur graphics and front kangaroo pocket for active young boys.',
    category: 'boys',
    subCategory: 'hoodies',
    targetAudience: 'Child Men (Boys)',
    price: 4250,
    originalPrice: 4800,
    discount: 11,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1000&auto=format&fit=crop'
    ],
    fabric: '80% Cotton, 20% Soft Fleece',
    fit: 'Regular Kids Fit',
    careInstructions: 'Machine wash warm with like colors.',
    colors: [
      { name: 'Navy Blue', hex: '#1E3A8A', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: '2-3Y', stock: 15 },
      { size: '4-5Y', stock: 20 },
      { size: '6-7Y', stock: 18 },
      { size: '8-9Y', stock: 12 }
    ],
    color: 'Navy Blue',
    brand: 'LittleStars Boys',
    stockQuantity: 65,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 38,
    features: [
      'Soft brushed fleece interior',
      'Ribbed cuffs and hem to lock in warmth',
      'Child Sizes: 2-3Y, 4-5Y, 6-7Y, 8-9Y'
    ]
  },
  {
    _id: 'boys-002',
    name: 'Rugged Kids Denim Trucker Jacket (Boys)',
    description: 'Classic durable denim jacket for boys featuring button chest flap pockets and sturdy double stitching.',
    category: 'boys',
    subCategory: 'jackets',
    targetAudience: 'Child Men (Boys)',
    price: 5400,
    originalPrice: 6200,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1000&auto=format&fit=crop'
    ],
    fabric: '100% Cotton Kid-Safe Denim',
    fit: 'Regular Kids Jacket',
    careInstructions: 'Machine wash cold.',
    colors: [
      { name: 'Light Denim', hex: '#60A5FA', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: '2-3Y', stock: 10 },
      { size: '4-5Y', stock: 15 },
      { size: '6-7Y', stock: 14 },
      { size: '8-9Y', stock: 8 }
    ],
    color: 'Light Denim',
    brand: 'JuniorDenim Boys',
    stockQuantity: 47,
    isFeatured: false,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.8,
    numReviews: 22,
    features: [
      'Heavy-duty copper shank buttons',
      'Child Sizes: 2-3Y, 4-5Y, 6-7Y, 8-9Y'
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 4. CHILD WOMEN'S CLOTHING (Girls' Wear - Category: 'girls')
  // ─────────────────────────────────────────────────────────────
  {
    _id: 'girls-001',
    name: 'Sunshine Floral Twirl Summer Dress (Girls)',
    description: 'Adorable 100% cotton dress with vibrant floral blooms and a full circle twirl skirt that young girls adore.',
    category: 'girls',
    subCategory: 'dresses',
    targetAudience: 'Child Women (Girls)',
    price: 4750,
    originalPrice: 5500,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1000&auto=format&fit=crop'
    ],
    fabric: '100% Organic Breathable Cotton',
    fit: 'Fit & Flare Twirl Fit',
    careInstructions: 'Machine wash gentle cold.',
    colors: [
      { name: 'Yellow Blossom', hex: '#F59E0B', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: '2-3Y', stock: 16 },
      { size: '4-5Y', stock: 22 },
      { size: '6-7Y', stock: 20 },
      { size: '8-9Y', stock: 14 }
    ],
    color: 'Yellow Blossom',
    brand: 'BloomKids Girls',
    stockQuantity: 72,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 51,
    features: [
      'Soft 100% organic cotton lining',
      'Full circle skirt for 360 twirling',
      'Child Sizes: 2-3Y, 4-5Y, 6-7Y, 8-9Y'
    ]
  },
  {
    _id: 'girls-002',
    name: 'Unicorn Sparkle Soft Knit Sweater (Girls)',
    description: 'Charming soft knit pullover sweater featuring embroidered unicorn design and sparkling sequin details.',
    category: 'girls',
    subCategory: 'sweaters',
    targetAudience: 'Child Women (Girls)',
    price: 4150,
    originalPrice: 4800,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=1000&auto=format&fit=crop'
    ],
    fabric: '100% Itch-Free Soft Knit Cotton',
    fit: 'Cozy Regular Fit',
    careInstructions: 'Hand wash cold or place in mesh laundry bag.',
    colors: [
      { name: 'Pastel Lavender', hex: '#C084FC', image: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: '2-3Y', stock: 12 },
      { size: '4-5Y', stock: 18 },
      { size: '6-7Y', stock: 15 },
      { size: '8-9Y', stock: 10 }
    ],
    color: 'Pastel Lavender',
    brand: 'BloomKids Girls',
    stockQuantity: 55,
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.8,
    numReviews: 34,
    features: [
      'Non-scratchy kid-friendly yarn',
      'Reversible sequin patch',
      'Child Sizes: 2-3Y, 4-5Y, 6-7Y, 8-9Y'
    ]
  }
];

export const MOCK_CATEGORIES = [
  { id: 'all', name: 'All Collections', count: '10 Items' },
  { id: 'men', name: 'Adult Men’s Clothing', count: '3 Items' },
  { id: 'women', name: 'Adult Women’s Clothing', count: '3 Items' },
  { id: 'boys', name: 'Child Men’s (Boys)', count: '2 Items' },
  { id: 'girls', name: 'Child Women’s (Girls)', count: '2 Items' },
];

export const MOCK_CLOTHING_TYPES = [
  'Shirts',
  'T-Shirts',
  'Pants & Jeans',
  'Dresses',
  'Jackets & Blazers',
  'Hoodies & Sweaters'
];
