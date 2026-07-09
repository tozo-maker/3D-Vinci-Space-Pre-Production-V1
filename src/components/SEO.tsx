import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  image?: string;
  keywords?: string[];
  schemaOverride?: Record<string, any>;
  productData?: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    currency?: string;
    availability?: 'InStock' | 'OutOfStock';
    category?: string;
  };
  serviceData?: {
    name: string;
    description: string;
    providerName?: string;
    areaServed?: string;
  };
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  type = 'website',
  image = '/og-image.jpg', // Default OG image path
  keywords = ['3D printing', 'additive manufacturing', 'Tbilisi', 'Georgia', 'custom fabrication', 'materials', 'parametric design'],
  schemaOverride,
  productData,
  serviceData
}) => {
  const siteName = '3D Vinci';
  const fullTitle = `${title} | ${siteName}`;
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');

  // Build JSON-LD Schema dynamically based on type
  const getSchemaJson = () => {
    if (schemaOverride) return schemaOverride;

    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": fullTitle,
      "description": description,
      "url": currentUrl,
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "logo": {
          "@type": "ImageObject",
          "url": "https://3dvinci.space/wp-content/uploads/2026/06/moody-lamps-collection.png" // Fallback logo
        },
        "location": {
          "@type": "Place",
          "name": "Tbilisi, Georgia"
        }
      }
    };

    if (type === 'product' && productData) {
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productData.name,
        "image": productData.image,
        "description": productData.description || description,
        "sku": productData.id,
        "mpn": productData.id,
        "brand": {
          "@type": "Brand",
          "name": siteName
        },
        "category": productData.category || "3D Printed Object",
        "offers": {
          "@type": "Offer",
          "url": currentUrl,
          "priceCurrency": productData.currency || "GEL",
          "price": productData.price,
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": productData.availability === 'OutOfStock' ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": siteName
          }
        }
      };
    }

    if (type === 'service' && serviceData) {
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceData.name,
        "description": serviceData.description || description,
        "provider": {
          "@type": "LocalBusiness",
          "name": serviceData.providerName || siteName,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tbilisi",
            "addressCountry": "GE"
          }
        },
        "areaServed": {
          "@type": "Place",
          "name": serviceData.areaServed || "Georgia"
        }
      };
    }

    if (type === 'article') {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "image": image,
        "author": {
          "@type": "Organization",
          "name": siteName
        },
        "publisher": {
          "@type": "Organization",
          "name": siteName
        },
        "datePublished": "2026-07-08T18:00:00Z",
        "description": description
      };
    }

    // Default: Website Home
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "alternateName": "3D Vinci Studio",
      "url": currentUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${currentUrl}?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}

      {/* Modern Preconnect Links for faster font / API loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://3dvinci.space" />

      {/* Explicit AI Crawler directives & Search Bot Optimization */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="ai-agent" content="index, follow" />
      <meta name="llm-crawler" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      {currentUrl && <meta property="og:url" content={currentUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* JSON-LD Schema for AI Engines, Google, and LLM Indexes */}
      <script type="application/ld+json">
        {JSON.stringify(getSchemaJson())}
      </script>
    </Helmet>
  );
};

