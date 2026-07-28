import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = process.env.VITE_SITE_URL
  ? process.env.VITE_SITE_URL.replace(/\/$/, '')
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, '')}`
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

  const blogUrls = [
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    ...BLOG_SLUGS.map((slug) => ({ url: `/blog/${slug}`, priority: '0.7', changefreq: 'weekly' })),
  ];

  // Single Sitemap containing all URLs
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...PAGES, ...blogUrls].map((p) => buildUrlXml(p.url, TODAY, p.changefreq, p.priority)).join('\n')}
</urlset>`;

  const writeTargets = [publicDir, distDir];
  const oldFiles = ['sitemap-pages.xml', 'sitemap-blog.xml', 'sitemap-index.xml'];

  writeTargets.forEach((targetDir) => {
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'sitemap.xml'), sitemapXml);

    // Remove legacy sitemap files
    oldFiles.forEach((file) => {
      const filePath = path.join(targetDir, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  });

  console.log('✓ Single sitemap.xml generated successfully:', PAGES.length + blogUrls.length, 'URLs indexed for domain:', DOMAIN);
}

generateSitemaps();
