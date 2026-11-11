/**
 * Advanced SEO & Structured Data (JSON-LD) Helper Utilities
 * Reusable for any E-commerce / Modern Web project.
 */

export const getSiteBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return import.meta.env.VITE_SITE_URL || 'https://kaithady-clothing-boutique.vercel.app';
};

export const getCanonicalUrl = (path = '') => {
  const baseUrl = getSiteBaseUrl();
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path.split('?')[0]; // strip query string for clean canonical
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${baseUrl}${cleanPath}`;
  return fullUrl.split('?')[0];
};

/**
 * Generate Complete Organization / ClothingStore Schema (JSON-LD)
 */
export const generateOrganizationSchema = () => {
  const baseUrl = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: "WellFIT — Specialist in Wedding Suits & Men's Wear",
    legalName: "WellFIT Specialist in Wedding Suits",
    url: baseUrl,
    logo: `${baseUrl}/wellfit-logo.jpg`,
    image: `${baseUrl}/wellfit-logo.jpg`,
    description:
      "WellFIT is Sri Lanka's specialist in Wedding Suits, Groom 3-Piece Tuxedos, Handcrafted Royal Sherwanis, Blazers, Executive Shirts, and Family Occasion Wear. வாங்க இது நம்ம ஊர் கட.",
    telephone: '+94 76 555 4150',
    email: 'contact@wellfitsuits.lk',
    priceRange: '$$',
    currenciesAccepted: 'LKR',
    paymentAccepted: 'Cash, Credit Card, Cash on Delivery, WhatsApp Order',
    foundingDate: '2022',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main Street',
      addressLocality: 'Sri Lanka',
      addressCountry: 'LK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '9.6615',
      longitude: '80.0890',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+94 76 555 4150',
      contactType: 'customer service',
      areaServed: 'LK',
      availableLanguage: ['en', 'ta', 'si'],
    },
    sameAs: [
      'https://facebook.com/wellfitsuits',
      'https://instagram.com/wellfitsuits',
      'https://wa.me/94765554150',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'WellFIT Wedding Suits & Apparel Catalog',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: "Wedding Suits, Tuxedos & Men's Wear",
        },
        {
          '@type': 'OfferCatalog',
          name: "Adult Women's Fashion (M-XXL)",
        },
        {
          '@type': 'OfferCatalog',
          name: "Boys' Fashion (Child)",
        },
        {
          '@type': 'OfferCatalog',
          name: "Girls' Wear (Child)",
        },
      ],
    },
  };
};

/**
 * Generate WebSite Schema with SearchAction (JSON-LD)
 */
export const generateWebSiteSchema = () => {
  const baseUrl = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kaithady Clothing Boutique',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
};

/**
 * Generate Enhanced E-commerce Product Schema (JSON-LD)
 */
export const generateProductSchema = (product, canonicalUrl) => {
  if (!product) return null;
  const baseUrl = getSiteBaseUrl();
  const productUrl = canonicalUrl || `${baseUrl}/product/${product._id || product.id}`;
  
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.image ? [product.image] : [`${baseUrl}/vite.svg`];

  const inStock = product.countInStock > 0 || product.stockQuantity > 0 || product.stock > 0 || product.inStock === true;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images,
    description: product.description || `${product.name} - Premium clothing item from Kaithady Boutique.`,
    sku: product._id || product.id || 'SKU-KTB-001',
    mpn: product._id || product.id || 'MPN-KTB-001',
    category: product.category || 'Apparel',
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Kaithady Clothing',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'LKR',
      price: product.price || 0,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Kaithady Clothing Boutique',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'LK',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: product.price >= 10000 ? 0 : 350,
          currency: 'LKR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'LK',
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.9,
      reviewCount: product.numReviews || 18,
      bestRating: '5',
      worstRating: '1',
    },
  };

  return schema;
};

/**
 * Generate BreadcrumbList Schema (JSON-LD)
 */
export const generateBreadcrumbSchema = (crumbs = []) => {
  const baseUrl = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${baseUrl}${crumb.url.startsWith('/') ? '' : '/'}${crumb.url}`,
    })),
  };
};

/**
 * Generate FAQPage Schema (JSON-LD)
 */
export const generateFaqSchema = (faqs = []) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q || faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a || faq.answer,
      },
    })),
  };
};
