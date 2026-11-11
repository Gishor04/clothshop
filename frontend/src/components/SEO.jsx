import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getCanonicalUrl, getSiteBaseUrl } from '../utils/seoHelpers';

const DEFAULT_TITLE = "WellFIT — Specialist in Wedding Suits & Men's Wear | வாங்க இது நம்ம ஊர் கட";
const DEFAULT_DESCRIPTION =
  "WellFIT is Sri Lanka's specialist in Wedding Suits & Men's Wear. Curated 3-piece groom tuxedos, royal sherwanis, blazers, and celebration attire. Contact WhatsApp: +94 76 555 4150.";
const SITE_NAME = 'WellFIT — Specialist in Wedding Suits';

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
