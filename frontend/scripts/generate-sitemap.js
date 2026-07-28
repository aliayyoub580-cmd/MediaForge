import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = process.env.VITE_SITE_URL
  ? process.env.VITE_SITE_URL.replace(/\/$/, '')
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://media-forge-sage.vercel.app';

const TODAY = new Date().toISOString().split('T')[0];

const PAGES = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/tiktok-downloader', priority: '0.9', changefreq: 'daily' },
  { url: '/tiktok-downloader/hd', priority: '0.8', changefreq: 'weekly' },
  { url: '/tiktok-downloader/no-watermark', priority: '0.9', changefreq: 'daily' },
  { url: '/instagram-downloader', priority: '0.9', changefreq: 'daily' },
  { url: '/instagram-reels-downloader', priority: '0.9', changefreq: 'daily' },
  { url: '/instagram-story-downloader', priority: '0.8', changefreq: 'weekly' },
  { url: '/instagram-photo-downloader', priority: '0.8', changefreq: 'weekly' },
  { url: '/facebook-downloader', priority: '0.9', changefreq: 'daily' },
  { url: '/facebook-reels-downloader', priority: '0.8', changefreq: 'weekly' },
  { url: '/facebook-video-downloader-hd', priority: '0.8', changefreq: 'weekly' },
  { url: '/mp4-downloader', priority: '0.8', changefreq: 'weekly' },
  { url: '/hd-video-downloader', priority: '0.8', changefreq: 'weekly' },
  { url: '/faq', priority: '0.7', changefreq: 'weekly' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.4', changefreq: 'yearly' },
  { url: '/terms', priority: '0.4', changefreq: 'yearly' },
  { url: '/dmca', priority: '0.4', changefreq: 'yearly' },
];

const BLOG_SLUGS = [
  'download-tiktok-video-without-watermark',
  'tiktok-hd-download-guide',
  'download-instagram-reels-2026',
  'facebook-video-download-guide',
  'instagram-story-downloader-explained',
  'best-online-video-downloader',
  'how-video-downloaders-work',
  'is-downloading-videos-legal',
  'tiktok-mp4-vs-mov',
  'why-hd-downloads-matter',
];

function buildUrlXml(url, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemaps() {
  const publicDir = path.resolve(__dirname, '../public');
  const distDir = path.resolve(__dirname, '../dist');

  // Pages sitemap
  const pagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => buildUrlXml(p.url, TODAY, p.changefreq, p.priority)).join('\n')}
</urlset>`;

  // Blog sitemap
  const blogUrls = [
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    ...BLOG_SLUGS.map((slug) => ({ url: `/blog/${slug}`, priority: '0.7', changefreq: 'weekly' })),
  ];
  const blogXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogUrls.map((p) => buildUrlXml(p.url, TODAY, p.changefreq, p.priority)).join('\n')}
</urlset>`;

  // Sitemap Index
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/sitemap-pages.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemap-blog.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`;

  // Combined Single Sitemap
  const combinedXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...PAGES, ...blogUrls].map((p) => buildUrlXml(p.url, TODAY, p.changefreq, p.priority)).join('\n')}
</urlset>`;

  const writeTargets = [publicDir, distDir];

  writeTargets.forEach((targetDir) => {
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'sitemap-pages.xml'), pagesXml);
    fs.writeFileSync(path.join(targetDir, 'sitemap-blog.xml'), blogXml);
    fs.writeFileSync(path.join(targetDir, 'sitemap-index.xml'), indexXml);
    fs.writeFileSync(path.join(targetDir, 'sitemap.xml'), combinedXml);
  });

  console.log('✓ Sitemaps generated successfully:', PAGES.length + blogUrls.length, 'URLs indexed for domain:', DOMAIN);
}

generateSitemaps();
