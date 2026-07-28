export interface FAQItem {
  q: string;
  a: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

const DOMAIN = 'https://media-forge-sage.vercel.app';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MediaForge Pro',
    url: DOMAIN,
    logo: `${DOMAIN}/favicon.svg`,
    sameAs: [
      'https://twitter.com/mediaforgepro',
      'https://github.com/mediaforgepro',
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MediaForge Pro',
    url: DOMAIN,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${DOMAIN}/?url={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MediaForge Pro',
    operatingSystem: 'All (Web-based, iOS, Android, Windows, macOS, Linux)',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online video and audio downloader for TikTok, Instagram, and Facebook. Download HD videos without watermarks.',
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${DOMAIN}${item.url}`,
    })),
  };
}

export function generateWebPageSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: url.startsWith('http') ? url : `${DOMAIN}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'MediaForge Pro',
      url: DOMAIN,
    },
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  publishDate: string;
  updatedDate: string;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url.startsWith('http') ? article.url : `${DOMAIN}${article.url}`,
    },
    datePublished: article.publishDate,
    dateModified: article.updatedDate || article.publishDate,
    author: {
      '@type': 'Organization',
      name: article.author || 'MediaForge Pro Tech Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MediaForge Pro',
      logo: {
        '@type': 'ImageObject',
        url: `${DOMAIN}/favicon.svg`,
      },
    },
    image: article.image || `${DOMAIN}/favicon.svg`,
  };
}
