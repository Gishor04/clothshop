import React from 'react';
import { SEO } from './SEO';

/**
 * Re-export SEO component for backward compatibility
 */
export const SeoMeta = ({
  title,
  description,
  url,
  canonicalUrl,
  robots,
  ogImage,
  type,
  schemaData,
  schema,
  ...rest
}) => {
  return (
    <SEO
      title={title}
      description={description}
      canonicalUrl={canonicalUrl || url}
      robots={robots}
      ogImage={ogImage}
      ogType={type}
      schema={schema || schemaData}
      {...rest}
    />
  );
};

export default SeoMeta;
