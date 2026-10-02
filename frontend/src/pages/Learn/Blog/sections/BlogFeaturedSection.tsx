import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../../services/api';
import type { Article } from '../../../../types/blog';
import { Calendar, Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

import LatticeLoadingBlock from '../../../../components/ui/LatticeLoadingBlock';

interface BlogFeaturedSectionProps {
  featuredArticle?: Article | null;
}

export const BlogFeaturedSection: React.FC<BlogFeaturedSectionProps> = ({ featuredArticle: propFeatured }) => {
  const [featured, setFeatured] = useState<Article | null>(
    propFeatured !== undefined ? propFeatured : null
  );
  const [loading, setLoading] = useState<boolean>(propFeatured === undefined);

  useEffect(() => {
    if (propFeatured !== undefined) {
      setFeatured(propFeatured);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const res = await api.getBlogs();
        if (isMounted) {
          if (res?.data && res.data.length > 0) {
            setFeatured(res.data[0]);
          } else {
            setFeatured(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          setFeatured(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFeatured();

    return () => {
      isMounted = false;
    };
  }, [propFeatured]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <LatticeLoadingBlock label="Loading featured editorial" />
      </section>
    );
  }

  if (!featured) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <Link
        to={`/learn/blog/${featured.slug}`}
        className="block bg-white border border-slate-200/90 shadow-sm overflow-hidden hover:border-[#2B3CB8] hover:shadow-md transition-all group cursor-pointer"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Image Side */}
          <div className="lg:col-span-7 relative min-h-70 sm:min-h-90 bg-slate-900">
            <img
              src={featured.imageUrl || '/images/blog/default.webp'}
              alt={featured.title}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/images/blog/default.webp')) {
                  target.src = '/images/blog/default.webp';
                }
              }}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="text-xs font-black uppercase tracking-wider bg-[#2B3CB8] text-white px-3 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Editorial
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs">
              <span className="bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/20">
                {featured.category}
              </span>
              <span className="text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {featured.readTime}
              </span>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{featured.publishDate}</span>
                <span>•</span>
                <span>By {featured.author}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#2B3CB8] transition-colors tracking-tight leading-snug">
                {featured.title}
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {featured.excerpt}
              </p>

              {/* Key Takeaways snippet */}
              {featured.keyTakeaways && featured.keyTakeaways.length > 0 && (
                <div className="mt-4 bg-[#F5F7FD] border border-[#D1DCF8] rounded-xl p-3 text-xs text-[#0C123E] space-y-1.5">
                  <span className="font-bold block text-[11px] uppercase tracking-wider text-[#1D2984]">
                    Quick Takeaway:
                  </span>
                  <div className="flex items-start gap-1.5 text-[11px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2B3CB8] shrink-0 mt-0.5" />
                    <span>{featured.keyTakeaways[0]}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                {featured.authorRole}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B3CB8] text-white text-xs font-bold group-hover:bg-[#1D2984] transition-colors">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default BlogFeaturedSection;
