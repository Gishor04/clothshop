# Production SEO Architecture & Standard Practice Guide

This document defines the production-ready, reusable SEO architecture implemented in **Kaithady Clothing Boutique**. This standard can be copied directly into any future React / Vite / Next.js web application.

---

## 1. Core Principles & Standards

### A. Dynamic Canonical Tags (`<link rel="canonical">`)
- **Requirement**: Every indexable page MUST output a `<link rel="canonical" href="..." />`.
- **Purpose**: Eliminates duplicate content penalties caused by URL parameters (e.g. `?search=shirt`, `?category=men`), tracking tags (`?utm_source`), trailing slashes, or duplicate domains.
- **Rule**: Standardize URLs to clean base canonical paths.

### B. Robots Meta Directives (`<meta name="robots">`)
- **Public Pages**: `<meta name="robots" content="index, follow">` (Allows search engines to index page content and follow links).
- **Utility / Private Pages**: `<meta name="robots" content="noindex, follow">` or `noindex, nofollow` on Cart (`/cart`), Checkout (`/checkout`), Wishlist (`/wishlist`), Auth (`/auth`), and Admin (`/admin`).

### C. Dynamic Head Management (`react-helmet-async`)
- Powered by `react-helmet-async` wrapped at application root (`<HelmetProvider>`).
- Client-side route changes immediately update document `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph (`og:*`), Twitter Cards (`twitter:*`), and `<script type="application/ld+json">`.

---

## 2. Reusable Architecture Blueprint

```
src/
├── components/
│   └── SEO.jsx               <-- Reusable Head Manager Component
├── utils/
│   └── seoHelpers.js         <-- JSON-LD Schema Builders & URL Formatter
public/
├── robots.txt                <-- Crawl Rules & Sitemap Pointer
└── sitemap.xml               <-- XML Sitemap Index
```

### Component 1: `<SEO />` (`src/components/SEO.jsx`)
```jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getCanonicalUrl, getSiteBaseUrl } from '../utils/seoHelpers';

export const SEO = ({
  title,
  description,
  canonicalUrl,
  robots = 'index, follow',
  keywords,
  ogType = 'website',
  ogImage,
  schema,
}) => {
  const location = useLocation();
  const baseUrl = getSiteBaseUrl();
  const computedCanonical = canonicalUrl || getCanonicalUrl(location.pathname + location.search);
  const formattedTitle = title ? `${title} | Kaithady Clothing Boutique` : 'Kaithady Clothing Boutique';
  const defaultOgImage = ogImage || `${baseUrl}/vite.svg`;
  const schemasArray = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={computedCanonical} />
      <meta property="og:site_name" content="Kaithady Clothing Boutique" />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={computedCanonical} />
      <meta property="og:image" content={defaultOgImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultOgImage} />
      {schemasArray.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};
```

### Component 2: JSON-LD Schema Generators (`src/utils/seoHelpers.js`)
- `generateProductSchema(product, canonicalUrl)`: E-Commerce Product schema (`Product`, `Offer`, `Brand`, `AggregateRating`, `InStock` / `OutOfStock`).
- `generateOrganizationSchema()`: Store / Business info schema (`ClothingStore`).
- `generateWebSiteSchema()`: SearchAction site search schema (`WebSite`).
- `generateBreadcrumbSchema(crumbs)`: Navigation list schema (`BreadcrumbList`).
- `generateFaqSchema(faqs)`: FAQ rich snippet schema (`FAQPage`).

---

## 3. How to Apply in Future Web Projects

1. Install `react-helmet-async`:
   ```bash
   npm install react-helmet-async
   ```
2. Wrap `main.jsx`:
   ```jsx
   import { HelmetProvider } from 'react-helmet-async';
   <HelmetProvider><App /></HelmetProvider>
   ```
3. Copy `src/components/SEO.jsx` and `src/utils/seoHelpers.js`.
4. Include `<SEO title="..." description="..." schema={...} />` on every page component.
5. Create `public/robots.txt` and `public/sitemap.xml`.
