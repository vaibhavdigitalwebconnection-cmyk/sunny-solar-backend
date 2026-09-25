import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '../../../components/layout/Breadcrumbs';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark
} from 'lucide-react';
import { api } from '../../../services/api';
import type { Article } from '../../../types/blog';
import LatticeLoadingBlock from '../../../components/ui/LatticeLoadingBlock';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLongContentOpen, setIsLongContentOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchArticle = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';
        const res = await api.getBlogBySlug(isPreview ? `${slug}?preview=true` : slug);
        if (isMounted) {
          if (res?.data) {
            setArticle(res.data);
          } else {
            setArticle(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          setArticle(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArticle();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Dynamic SEO Meta Tags & Schema Injection
  useEffect(() => {
    if (!article) return;

    const originalTitle = document.title;
    document.title = article.metaTitle ? article.metaTitle : `${article.title} | Sunny Solar`;

    // Helper to update or create meta tag
    const updateMetaTag = (nameAttr: string, nameValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${nameValue}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
      return element;
    };

    // Update Meta Description & Keywords
    const metaDesc = updateMetaTag('name', 'description', article.metaDescription || article.excerpt);
    const metaKeywords = article.keywords ? updateMetaTag('name', 'keywords', article.keywords) : null;

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (article.canonicalUrl) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', article.canonicalUrl);
    }

    // Schema (JSON-LD)
    let schemaScript = document.getElementById('sunny-solar-blog-schema') as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'sunny-solar-blog-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    if (article.schema && article.schema.trim().startsWith('{')) {
      schemaScript.textContent = article.schema;
    } else {
      const defaultSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        image: article.imageUrl,
        author: {
          '@type': 'Person',
          name: article.author || 'Trent Palmer'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Sunny Solar'
        },
        datePublished: article.publishDate,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': window.location.href
        }
      };
      schemaScript.textContent = JSON.stringify(defaultSchema);
    }

    return () => {
      document.title = originalTitle;
      if (schemaScript && schemaScript.parentNode) {
        schemaScript.parentNode.removeChild(schemaScript);
      }
    };
  }, [article]);

  if (!loading && !article) {
    return <Navigate to="/learn/blog" replace />;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-24">
        <LatticeLoadingBlock label="Loading article" />
      </div>
    );
  }

  // Render content whether it is rich HTML string or array of strings
  const renderContent = () => {
    if (!article.content) return null;

    if (typeof article.content === 'string') {
      return (
        <div
          className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed space-y-4 rich-blog-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      );
    }

    if (Array.isArray(article.content)) {
      return (
        <div className="space-y-6 text-slate-700 text-base leading-relaxed">
          {article.content.map((item, idx) => {
            if (item.includes('<') && item.includes('>')) {
              return (
                <div
                  key={idx}
                  className="rich-blog-content"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              );
            }
            return <p key={idx}>{item}</p>;
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-20">
      <Helmet>
        <title>{article.metaTitle || `${article.title} | Sunny Solar`}</title>
        <meta
          name="description"
          content={article.metaDescription || article.excerpt}
        />
        {article.keywords && <meta name="keywords" content={article.keywords} />}
        {article.canonicalUrl && <link rel="canonical" href={article.canonicalUrl} />}
      </Helmet>
      <Breadcrumbs
        customItems={[
          { label: 'Learn', href: '/learn/knowledge-hub' },
          { label: 'Blog', href: '/learn/blog' },
          { label: article.title }
        ]}
      />

      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="amber">{article.category}</Badge>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishDate}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 leading-tight">
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {article.excerpt}
          </p>

          <div className="mt-6 pt-6 border-t border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-amber-500/20">
                {article.author
                  ? article.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                  : 'TP'}
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">{article.author || 'Trent Palmer'}</span>
                <span className="text-xs text-slate-500 block">{article.authorRole || 'Founder & Master Electrician'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: article.title, url: window.location.href }).catch(() => null);
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="p-2.5 rounded-xl border border-slate-200/80 text-slate-600 hover:text-amber-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Share article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {article.imageUrl && (
          <div className="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200/70 aspect-video bg-slate-900">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Key Takeaways */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="my-8 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-500" />
              <span>Key Takeaways</span>
            </h3>
            <ul className="space-y-2">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="text-sm text-slate-700 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Body Content */}
        <div className="mt-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          {renderContent()}
        </div>

        {/* Long Content (Hidden / SEO Deep-Dive Section) */}
        {article.longContent && article.longContent.trim().length > 0 && (
          <div className="mt-8 bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            <button
              onClick={() => setIsLongContentOpen(!isLongContentOpen)}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Comprehensive Technical Notes & Extended Content
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Click to {isLongContentOpen ? 'collapse' : 'expand'} detailed reference material
                  </span>
                </div>
              </div>
              {isLongContentOpen ? (
                <ChevronUp className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              )}
            </button>

            {isLongContentOpen && (
              <div className="p-6 sm:p-8 border-t border-slate-100 bg-white">
                <div
                  className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed rich-blog-content"
                  dangerouslySetInnerHTML={{ __html: article.longContent }}
                />
              </div>
            )}
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <Button
            to="/learn/blog"
            variant="outline"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            Back to All Articles
          </Button>

          <Button
            to="/get-started/free-assessment"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Free Assessment
          </Button>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
