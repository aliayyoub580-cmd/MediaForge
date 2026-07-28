import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { BLOG_POSTS } from '../../data/blogPosts';
import { generateBreadcrumbSchema, generateWebPageSchema } from '../../lib/seo/schema';

export default function BlogIndexPage() {
  const pageTitle = 'MediaForge Pro Blog — Video Downloading Guides & Tutorials';
  const pageDesc = 'Guides, tutorials, and tips on downloading TikTok videos without watermark, Instagram Reels, and Facebook videos in HD quality.';

  const breadcrumbs = [{ name: 'Blog', url: '/blog' }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const webPageSchema = generateWebPageSchema(pageTitle, pageDesc, '/blog');

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDesc}
        canonicalPath="/blog"
        jsonLd={[breadcrumbSchema, webPageSchema]}
      />

      <div className="min-h-screen pt-28 pb-20 section-padding relative">
        <div className="container-max">
          <Breadcrumbs items={[{ name: 'Blog', url: '/blog' }]} />

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Knowledge Base & Tutorials</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-teal-50 mb-4">
              MediaForge Pro <span className="gradient-text">Blog & Guides</span>
            </h1>
            <p className="text-slate-600 dark:text-teal-100/80 max-w-xl mx-auto text-sm sm:text-base">
              Learn how to extract, back up, and format social media videos from TikTok, Instagram, and Facebook cleanly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden flex flex-col justify-between hover:border-teal-400/40 transition-all group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-dark-800">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-dark-900/80 backdrop-blur-md border border-white/10 text-[11px] font-bold text-teal-300 font-mono">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-teal-200/70 mb-2 font-mono">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-teal-400" /> {post.publishDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-cyan-400" /> {post.readTime}</span>
                    </div>

                    <h2 className="font-display font-bold text-base text-slate-900 dark:text-teal-50 mb-2 line-clamp-2 group-hover:text-teal-400 transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/75 line-clamp-3 leading-relaxed mb-4">
                      {post.metaDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-200/60 dark:border-teal-500/10 mt-auto">
                  <span className="text-[11px] text-slate-500 dark:text-teal-200/60 flex items-center gap-1 font-mono">
                    <User className="w-3 h-3 text-emerald-400" />
                    {post.author}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-300 hover:text-teal-500 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
