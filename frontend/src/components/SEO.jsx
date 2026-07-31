import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getCanonicalUrl, getSiteBaseUrl } from '../utils/seoHelpers';

const DEFAULT_TITLE = 'Kaithady Clothing Boutique — Adults (M-XXL) & Kids Apparel';
const DEFAULT_DESCRIPTION =
  'Discover premium clothing at Kaithady Clothing Boutique. Fashion for Adult Men (M-XXL), Adult Women (M-XXL), Boys, and Girls. Enjoy free island-wide shipping & Cash on Delivery.';
const SITE_NAME = 'Kaithady Clothing Boutique';

/**
 * Reusable SEO Component using react-helmet-async
 */
export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  robots = 'index, follow',
  keywords,
  ogType = 'website',
  ogImage,
  schema,
}) => {
  const location = useLocation();
  const baseUrl = getSiteBaseUrl();

  // Compute canonical URL automatically from current location path if not provided
  const computedCanonical = canonicalUrl || getCanonicalUrl(location.pathname + location.search);
  
  // Format page title cleanly
  const formattedTitle = title
    ? `${title} | ${SITE_NAME}`
    : DEFAULT_TITLE;

  const defaultOgImage = ogImage || `${baseUrl}/vite.svg`;

  // Render array of schemas or single schema
  const schemasArray = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical Link (Crucial for preventing duplicate content) */}
      <link rel="canonical" href={computedCanonical} />

      {/* Open Graph Meta Tags for Social Media */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={computedCanonical} />
      <meta property="og:image" content={defaultOgImage} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultOgImage} />

      {/* Dynamic JSON-LD Structured Data */}
      {schemasArray.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
