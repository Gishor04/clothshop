/**
 * SEO & Structured Data (JSON-LD) Helper Utilities
 * Reusable for any E-commerce / Modern Web project.
 */

export const getSiteBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return import.meta.env.VITE_SITE_URL || 'https://kaithadyclothing.com';
};

export const getCanonicalUrl = (path = '') => {
  const baseUrl = getSiteBaseUrl();
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path.split('?')[0]; // strip query string for canonical
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${baseUrl}${cleanPath}`;
  return fullUrl.split('?')[0];
};

/**
 * Generate Organization / ClothingStore Schema (JSON-LD)
 */
export const generateOrganizationSchema = () => {
  const baseUrl = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Kaithady Clothing Boutique',
    url: baseUrl,
    logo: `${baseUrl}/vite.svg`,
    description:
      'Kaithady Clothing Boutique offers premium apparel for Adult Men (M-XXL), Adult Women (M-XXL), Boys, and Girls with island-wide shipping and Cash on Delivery.',
    priceRange: '$$',
    currenciesAccepted: 'LKR',
    paymentAccepted: 'Cash, Credit Card',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kaithady',
      addressRegion: 'Northern Province',
      addressCountry: 'LK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+94 77 123 4567',
      contactType: 'customer service',
      areaServed: 'LK',
      availableLanguage: ['en', 'ta', 'si'],
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
 * Generate E-commerce Product Schema (JSON-LD)
 */
export const generateProductSchema = (product, canonicalUrl) => {
  if (!product) return null;
  const baseUrl = getSiteBaseUrl();
  const productUrl = canonicalUrl || `${baseUrl}/product/${product._id || product.id}`;
  
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.image ? [product.image] : [`${baseUrl}/vite.svg`];

  const inStock = product.countInStock > 0 || product.stock > 0 || product.inStock === true;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images,
    description: product.description || `${product.name} - Premium clothing from Kaithady Boutique.`,
    sku: product._id || product.id || 'N/A',
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
    },
  };

  if (product.rating && product.numReviews) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.numReviews,
    };
  }

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
