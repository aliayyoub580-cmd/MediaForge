import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DOMAIN = 'https://media-forge-sage.vercel.app';
const DEFAULT_IMAGE = `${DOMAIN}/favicon.svg`;

export function SEOHead({
  title,
  description,
  canonicalPath = '/',
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd,
}: SEOHeadProps) {
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const canonicalUrl = `${DOMAIN}${cleanPath === '/' ? '' : cleanPath}`;

  const gscVerification = import.meta.env.VITE_GSC_VERIFICATION || '';
  const bingVerification = import.meta.env.VITE_BING_VERIFICATION || '';

  const jsonLdList = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      <link rel="canonical" href={canonicalUrl} />

      {/* Verification Tags */}
      {gscVerification && <meta name="google-site-verification" content={gscVerification} />}
      {bingVerification && <meta name="msvalidate.01" content={bingVerification} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="MediaForge Pro" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Language */}
      <html lang="en" />

      {/* JSON-LD Structured Data */}
      {jsonLdList.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
