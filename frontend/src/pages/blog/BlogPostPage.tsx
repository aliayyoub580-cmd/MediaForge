import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Download, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { BLOG_POSTS } from '../../data/blogPosts';
import NotFoundPage from '../NotFoundPage';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '../../lib/seo/schema';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }

  const pageUrl = `/blog/${post.slug}`;
  const breadcrumbs = [
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: pageUrl },
  ];

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.metaDescription,
    url: pageUrl,
    publishDate: post.publishDate,
    updatedDate: post.updatedDate,
    author: post.author,
    image: post.coverImage,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(post.faqs);

  return (
    <>
      <SEOHead
        title={`${post.title} — MediaForge Pro`}
        description={post.metaDescription}
        canonicalPath={pageUrl}
        ogImage={post.coverImage}
        ogType="article"
        jsonLd={[articleSchema, breadcrumbSchema, faqSchema]}
      />

      <div className="min-h-screen pt-28 pb-20 section-padding relative">
        <div className="container-max">
          <Breadcrumbs items={breadcrumbs} />

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-300 hover:text-teal-500 mb-6 transition-colors font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {/* Category Pill & Title */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold font-mono mb-3 uppercase tracking-wider">
                {post.category}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-teal-50 leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Author & Meta */}
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-teal-200/70 pb-6 border-b border-slate-200/60 dark:border-teal-500/15 mb-6 font-mono">
              <span className="flex items-center gap-1 text-slate-700 dark:text-teal-100 font-semibold">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                Published {post.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {post.readTime}
              </span>
            </div>

            {/* Cover Image */}
            <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200/80 dark:border-white/10 shadow-lg">
              <img src={post.coverImage} alt={post.title} className="w-full max-h-96 object-cover" />
            </div>

            {/* Article Content */}
            <div
              className="prose dark:prose-invert max-w-none text-slate-700 dark:text-teal-100/90 leading-relaxed text-sm sm:text-base space-y-4 mb-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Call to Action Box */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl mb-12 text-center border border-teal-500/30">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mx-auto mb-3">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-teal-50 mb-2">
                Ready to Download Media Cleanly?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 max-w-md mx-auto mb-5 leading-relaxed">
                Paste any TikTok, Instagram, or Facebook link into MediaForge Pro to save watermark-free HD videos or MP3 audio instantly.
              </p>
              <Link to="/" className="btn-primary inline-flex items-center gap-2 text-sm font-semibold">
                <span>Go to Downloader</span>
                <Download className="w-4 h-4" />
              </Link>
            </div>

            {/* Visible FAQ Section */}
            {post.faqs.length > 0 && (
              <div className="pt-8 border-t border-slate-200/80 dark:border-teal-500/20">
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-teal-50 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {post.faqs.map((faq, index) => (
                    <div key={index} className="glass-card p-5 rounded-xl border border-slate-200/60 dark:border-teal-500/20">
                      <h3 className="font-display font-semibold text-base text-slate-900 dark:text-teal-50 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{faq.q}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 leading-relaxed pl-6">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        </div>
      </div>
    </>
  );
}
