export const ADULT_SIZES = ['M', 'L', 'XL', 'XXL'];

export const MOCK_PRODUCTS = [
  // ─────────────────────────────────────────────────────────────
  // 1. WELLFIT WEDDING SUITS & TUXEDOS (Specialist in Wedding Suits)
  // ─────────────────────────────────────────────────────────────
  {
    _id: 'wedding-001',
    name: 'Royal Midnight Blue Velvet 3-Piece Wedding Tuxedo',
    description: 'WellFIT signature groom masterpiece. Luxurious micro-velvet jacket with lustrous silk peak lapel, matching single-breasted waistcoat, and precision-tailored flat-front trousers. Designed for grand wedding receptions and stage entrances.',
    category: 'men',
    subCategory: 'wedding-suits',
    targetAudience: 'Adult Men',
    price: 38500,
    originalPrice: 45000,
    discount: 14,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1000&auto=format&fit=crop'
    ],
    fabric: 'Super 140s Italian Wool & Silk Micro-Velvet',
    fit: 'Tailored Slim Fit (Bespoke Cut)',
    careInstructions: 'Dry clean only. Steam press on low heat.',
    colors: [
      { name: 'Royal Midnight Blue', hex: '#1E293B', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop' },
      { name: 'Classic Black Velvet', hex: '#0F172A', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 12 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 15 },
      { size: 'XXL', stock: 8 }
    ],
    color: 'Royal Midnight Blue',
    brand: 'WellFIT Luxury Wedding',
    stockQuantity: 53,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 5.0,
    numReviews: 87,
    features: [
      '3-Piece Set: Tuxedo Jacket, Horseshoe Vest & Trousers',
      'Silk Satin Peak Lapel with Boutonniere Loop',
      'Free in-store custom fitting & sleeve adjustment',
      'WhatsApp Consultation with Master Tailor (+94 76 555 4150)'
    ]
  },
  {
    _id: 'wedding-002',
    name: 'Imperial Handcrafted Gold Zari Groom Sherwani Suit',
    description: 'Breathtaking royal wedding attire handcrafted with intricate golden zari threadwork, mandarin collar with crystal buttons, tailored churidar trousers, and embroidered silk stole (dupatta).',
    category: 'men',
    subCategory: 'wedding-suits',
    targetAudience: 'Adult Men',
    price: 42000,
    originalPrice: 49000,
    discount: 14,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop'
    ],
    fabric: 'Raw Silk Jacquard with Pure Metallic Zari Embroidery',
    fit: 'Royal Imperial Fit',
    careInstructions: 'Strictly dry clean only. Preserve in WellFIT garment bag.',
    colors: [
      { name: 'Ivory Gold', hex: '#FEF3C7', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop' },
      { name: 'Royal Maroon Gold', hex: '#881337', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 8 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 10 },
      { size: 'XXL', stock: 5 }
    ],
    color: 'Ivory Gold',
    brand: 'WellFIT Royal Heritage',
    stockQuantity: 35,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 64,
    features: [
      'Includes Embroidered Sherwani Coat, Inner Kurta, Churidar & Stole',
      'Hand-finished ornate metallic buttons',
      'Traditional heritage styling for Tamil & Sri Lankan weddings',
      'Available Adult Sizes: M, L, XL, XXL'
    ]
  },
  {
    _id: 'wedding-003',
    name: 'Italian Cut Double-Breasted Charcoal Wedding Suit',
    description: 'Impeccable Italian suiting design crafted from Super 140s worsted wool blend. Features 6-button double-breasted closure, structured roped shoulders, horn buttons, and half-canvas chest piece.',
    category: 'men',
    subCategory: 'wedding-suits',
    targetAudience: 'Adult Men',
    price: 32500,
    originalPrice: 37000,
    discount: 12,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop'
    ],
    fabric: 'Super 140s Worsted Wool & Cashmere Touch',
    fit: 'Italian Modern Slim Fit',
    careInstructions: 'Dry clean only.',
    colors: [
      { name: 'Charcoal Grey', hex: '#374151', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop' },
      { name: 'Jet Black', hex: '#111827', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 14 },
      { size: 'L', stock: 16 },
      { size: 'XL', stock: 14 },
      { size: 'XXL', stock: 7 }
    ],
    color: 'Charcoal Grey',
    brand: 'WellFIT Sartorial',
    stockQuantity: 51,
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.9,
    numReviews: 72,
    features: [
      'Double-Breasted 6x2 button silhouette',
      'Breathable Bemberg cupro interior lining',
      'Perfect for Groom, Best Man & High-End Formal Receptions',
      'Available Adult Sizes: M, L, XL, XXL'
    ]
  },
  {
    _id: 'wedding-004',
    name: 'Champagne Ivory Silk-Shawl Reception Tuxedo',
    description: 'Dazzle on your wedding night. Premium ivory dinner jacket with contrasting black silk shawl lapel, single covered button, paired with classic tuxedo trousers featuring satin side galon stripes.',
    category: 'men',
    subCategory: 'wedding-suits',
    targetAudience: 'Adult Men',
    price: 36900,
    originalPrice: 42000,
    discount: 12,
    images: [
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop'
    ],
    fabric: 'Fine Wool-Silk Blend with Pure Satin Shawl Collar',
    fit: 'Tuxedo Slim Fit',
    careInstructions: 'Dry clean only.',
    colors: [
      { name: 'Champagne Ivory', hex: '#FDFBF7', image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 10 },
      { size: 'L', stock: 14 },
      { size: 'XL', stock: 12 },
      { size: 'XXL', stock: 6 }
    ],
    color: 'Champagne Ivory',
    brand: 'WellFIT Luxury Wedding',
    stockQuantity: 42,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 5.0,
    numReviews: 49,
    features: [
      'Contrast Black Silk Satin Shawl Collar',
      'Silk satin-covered button and jet pockets',
      'Comes with matching black bow tie and pocket square',
      'WhatsApp Custom Tailoring: +94 76 555 4150'
    ]
  },
  {
    _id: 'wedding-005',
    name: 'Emerald Green Velvet Royal Wedding Blazer',
    description: 'Statement occasion wear. Ultra-soft rich emerald green velvet blazer with satin shawl lapel and gold metal crest buttons. Adds immense personality and elegance to any wedding celebration.',
    category: 'men',
    subCategory: 'jackets',
    targetAudience: 'Adult Men',
    price: 21500,
    originalPrice: 25000,
    discount: 14,
    images: [
      'https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop'
    ],
    fabric: 'Premium Heavy Cotton Velvet',
    fit: 'Modern Tailored Fit',
    careInstructions: 'Dry clean only.',
    colors: [
      { name: 'Emerald Green', hex: '#064E3B', image: 'https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=1000&auto=format&fit=crop' },
      { name: 'Royal Wine', hex: '#4A0404', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 12 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 11 },
      { size: 'XXL', stock: 5 }
    ],
    color: 'Emerald Green',
    brand: 'WellFIT Sartorial',
    stockQuantity: 43,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.8,
    numReviews: 39,
    features: [
      'Deep emerald velvet with rich light luster',
      'Single-button satin shawl closure',
      'Dual rear vents for effortless movement',
      'Available Adult Sizes: M, L, XL, XXL'
    ]
  },
  {
    _id: 'wedding-006',
    name: 'Burgundy Wine Tailored 3-Piece Groom Wedding Suit',
    description: 'Turn heads on your special day. Tailored burgundy 3-piece suit with deep notched lapels, four-button horseshoe vest, and matching tapered trousers. Modern elegance at its finest.',
    category: 'men',
    subCategory: 'wedding-suits',
    targetAudience: 'Adult Men',
    price: 34900,
    originalPrice: 39900,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop'
    ],
    fabric: 'Fine Wool-Viscose Blend with Stretch Poly Lining',
    fit: 'Tailored Slim Fit',
    careInstructions: 'Dry clean only.',
    colors: [
      { name: 'Burgundy Wine', hex: '#581C87', image: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 14 },
      { size: 'L', stock: 16 },
      { size: 'XL', stock: 12 },
      { size: 'XXL', stock: 7 }
    ],
    color: 'Burgundy Wine',
    brand: 'WellFIT Luxury Wedding',
    stockQuantity: 49,
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.9,
    numReviews: 53,
    features: [
      'Complete 3-Piece Set: Jacket, Horseshoe Vest & Trousers',
      'Wrinkle-resistant luxury fabric',
      'Adult Sizes: M, L, XL, XXL',
      'WhatsApp Quick Order: +94 76 555 4150'
    ]
  },
  {
    _id: 'men-004',
    name: 'Luxury Egyptian Cotton French-Cuff Wedding Shirt',
    description: 'The definitive formal shirt for weddings and black-tie galas. Pure two-ply 120s Egyptian cotton with crisp spread collar, French double cuffs, and iridescent mother-of-pearl buttons. Includes complimentary silver cufflinks.',
    category: 'men',
    subCategory: 'shirts',
    targetAudience: 'Adult Men',
    price: 7450,
    originalPrice: 8500,
    discount: 12,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop'
    ],
    fabric: '100% Giza Egyptian Long-Staple Cotton (120s Two-Ply)',
    fit: 'Tailored Formal Fit',
    careInstructions: 'Machine wash gentle. Warm iron with steam.',
    colors: [
      { name: 'Crisp Wedding White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1000&auto=format&fit=crop' },
      { name: 'Soft French Blue', hex: '#BFDBFE', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 20 },
      { size: 'L', stock: 25 },
      { size: 'XL', stock: 20 },
      { size: 'XXL', stock: 12 }
    ],
    color: 'Crisp Wedding White',
    brand: 'WellFIT Sartorial',
    stockQuantity: 77,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 61,
    features: [
      'French Double Cuffs with complimentary silver cufflinks',
      'Removable brass collar stays included',
      'Non-iron easy care finish',
      'Available Adult Sizes: M, L, XL, XXL'
    ]
  },
  {
    _id: 'men-005',
    name: 'Tailored Flat-Front Stretch Formal Wedding Trousers',
    description: 'Precision-tailored dress trousers featuring hidden comfort flex waistband, crisp front crease, slant pockets, and buttoned rear welt pockets. Essential pairing for suits and blazers.',
    category: 'men',
    subCategory: 'pants',
    targetAudience: 'Adult Men',
    price: 6850,
    originalPrice: 7800,
    discount: 12,
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1000&auto=format&fit=crop'
    ],
    fabric: '70% Wool, 28% Poly, 2% Spandex Flex',
    fit: 'Tapered Slim Cut',
    careInstructions: 'Dry clean recommended or gentle cold wash.',
    colors: [
      { name: 'Jet Black', hex: '#111827', image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1000&auto=format&fit=crop' },
      { name: 'Charcoal Grey', hex: '#4B5563', image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 18 },
      { size: 'L', stock: 24 },
      { size: 'XL', stock: 20 },
      { size: 'XXL', stock: 10 }
    ],
    color: 'Jet Black',
    brand: 'WellFIT Sartorial',
    stockQuantity: 72,
    isFeatured: false,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.8,
    numReviews: 45,
    features: [
      'Hidden 2-inch stretch waistband for all-day comfort',
      'Anti-wrinkle crease retention',
      'Adult Sizes: M, L, XL, XXL'
    ]
  },
  {
    _id: 'boys-003',
    name: 'Junior Royal Prince 3-Piece Wedding Tuxedo (Boys)',
    description: 'Adorable miniature 3-piece wedding suit for young boys and ring bearers. Includes tailored black jacket with satin lapel, burgundy velvet vest, matching trousers, and clip-on bow tie.',
    category: 'boys',
    subCategory: 'jackets',
    targetAudience: 'Child Men (Boys)',
    price: 9800,
    originalPrice: 11500,
    discount: 15,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1000&auto=format&fit=crop'
    ],
    fabric: 'Soft Child-Friendly Poly-Viscose with Satin Trim',
    fit: 'Kids Tailored Fit',
    careInstructions: 'Dry clean or gentle hand wash.',
    colors: [
      { name: 'Classic Tuxedo Black', hex: '#111827', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: '2-3Y', stock: 10 },
      { size: '4-5Y', stock: 15 },
      { size: '6-7Y', stock: 12 },
      { size: '8-9Y', stock: 8 }
    ],
    color: 'Classic Tuxedo Black',
    brand: 'WellFIT Junior',
    stockQuantity: 45,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 31,
    features: [
      'Complete 3-Piece: Jacket, Velvet Vest & Elastic Waist Trousers',
      'Includes matching bow tie',
      'Elasticized waistband for comfy child fit',
      'Child Ages: 2-3Y, 4-5Y, 6-7Y, 8-9Y'
    ]
  },
  {
    _id: 'women-004',
    name: 'Bridal Georgette & Silk Embellished Reception Gown',
    description: 'Stunning celebration attire for brides and wedding guests. Hand-embroidered sequin bodice with flowing silk georgette flare skirt and sheer embellished sleeves.',
    category: 'women',
    subCategory: 'dresses',
    targetAudience: 'Adult Women',
    price: 18500,
    originalPrice: 22000,
    discount: 16,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop'
    ],
    fabric: 'Pure Silk Georgette with Hand-Crafted Sequin Work',
    fit: 'Flared Evening Silhouette',
    careInstructions: 'Dry clean only.',
    colors: [
      { name: 'Rose Gold Shimmer', hex: '#FDA4AF', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop' }
    ],
    sizes: [
      { size: 'M', stock: 12 },
      { size: 'L', stock: 16 },
      { size: 'XL', stock: 10 },
      { size: 'XXL', stock: 6 }
    ],
    color: 'Rose Gold Shimmer',
    brand: 'WellFIT Bridal',
    stockQuantity: 44,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 48,
    features: [
      'Handcrafted zari & sequin bridal motif',
      'Padded cups with concealed back zip',
      'Adult Sizes: M, L, XL, XXL'
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 2. ADULT MEN'S CASUAL & DAILY WEAR (Sizes: M, L, XL, XXL)
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
    brand: 'WellFIT Men',
    stockQuantity: 63,
    isFeatured: true,
    isNewArrival: false,
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
    brand: 'WellFIT Men',
    stockQuantity: 50,
    isFeatured: false,
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
    brand: 'WellFIT Men',
    stockQuantity: 95,
    isFeatured: false,
    isNewArrival: false,
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
  // 3. ADULT WOMEN'S CLOTHING (Category: 'women', Sizes: M, L, XL, XXL)
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
    brand: 'WellFIT Women',
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
    brand: 'WellFIT Women',
    stockQuantity: 43,
    isFeatured: false,
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
    brand: 'WellFIT Women',
    stockQuantity: 56,
    isFeatured: false,
    isNewArrival: false,
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
  // 4. CHILD MEN'S CLOTHING (Boys' Fashion - Category: 'boys')
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
    brand: 'WellFIT Junior',
    stockQuantity: 65,
    isFeatured: true,
    isNewArrival: false,
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
    brand: 'WellFIT Junior',
    stockQuantity: 47,
    isFeatured: false,
    isNewArrival: false,
    isBestseller: false,
    rating: 4.8,
    numReviews: 22,
    features: [
      'Heavy-duty copper shank buttons',
      'Child Sizes: 2-3Y, 4-5Y, 6-7Y, 8-9Y'
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 5. CHILD WOMEN'S CLOTHING (Girls' Wear - Category: 'girls')
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
    brand: 'WellFIT Junior',
    stockQuantity: 72,
    isFeatured: true,
    isNewArrival: false,
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
    brand: 'WellFIT Junior',
    stockQuantity: 55,
    isFeatured: false,
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
  { id: 'all', name: 'All Collections', count: '16 Items' },
  { id: 'men', name: 'Wedding Suits & Men’s Wear', count: '9 Items' },
  { id: 'women', name: 'Adult Women’s Fashion', count: '4 Items' },
  { id: 'boys', name: 'Child Men’s (Boys)', count: '3 Items' },
  { id: 'girls', name: 'Child Women’s (Girls)', count: '2 Items' },
];

export const MOCK_CLOTHING_TYPES = [
  'Wedding Suits & Tuxedos',
  'Blazers & Waistcoats',
  'Formal Shirts',
  'Dress Pants & Trousers',
  'Sherwanis & Traditional',
  'Bridal Dresses & Gowns',
  'Boys Wedding Suits',
  'Casual Tees & Denim'
];
