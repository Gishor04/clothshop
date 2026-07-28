import React, { useEffect } from 'react';

export const SeoMeta = ({
  title = 'Kaithady Clothing Boutique — Adults (M-XXL) & Kids Apparel',
  description = 'Kaithady Clothing Boutique. Premium clothing for Adult Men (M, L, XL, XXL), Adult Women (M, L, XL, XXL), Child Men (Boys), and Child Women (Girls). Free island-wide shipping over Rs. 10,000.',
  ogImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop',
  url = 'https://sl-bag-boutique.lovable.app/',
  type = 'website',
  schemaData = null,
}) => {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', url);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');

    const schemaId = 'kaithady-json-ld';
    let scriptElement = document.getElementById(schemaId);
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = schemaId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Kaithady Clothing Boutique',
      url: 'https://sl-bag-boutique.lovable.app',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
      sameAs: [
        'https://instagram.com/kaithadyclothing',
        'https://facebook.com/kaithadyclothing',
        'https://wa.me/94770000000',
      ],
    };

    scriptElement.text = JSON.stringify(schemaData || defaultSchema);
  }, [title, description, ogImage, url, type, schemaData]);

  return null;
};
